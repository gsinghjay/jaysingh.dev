---
id: postgresql-performance
title: POSTGRESQL PERFORMANCE OPTIMIZATION FOR HIGH-TRAFFIC APPLICATIONS
date: 2024-08-30
excerpt: Techniques for optimizing PostgreSQL databases handling real-time analytics and high concurrent user loads.
tags:
  - postgresql
  - database
  - performance
  - backend
readTime: 12 min
featured: false
---

PostgreSQL is incredibly powerful, but it requires proper tuning for high-traffic applications. Here are the techniques we used to maintain sub-second response times while serving 5,000+ users with real-time analytics.

## Indexing Strategy

Indexes are the foundation of database performance. Analyze your query patterns and create appropriate indexes, but understand the tradeoffs. Every index speeds up reads but slows down writes.

```sql
EXPLAIN ANALYZE
SELECT * FROM scans
WHERE user_id = 123
AND created_at > NOW() - INTERVAL '30 days';

CREATE INDEX idx_scans_user_created
ON scans(user_id, created_at DESC);

CREATE INDEX idx_active_users
ON users(email)
WHERE is_active = true;

CREATE INDEX idx_scans_summary
ON scans(user_id)
INCLUDE (scan_type, created_at);
```

> **Tip:** Use EXPLAIN ANALYZE, not just EXPLAIN. The actual execution plan can differ significantly from the estimated plan.

Don't over-index. Each index requires storage and maintenance overhead. Focus on indexes that support your most common and critical queries. Use pg_stat_user_indexes to identify unused indexes and remove them.

## Connection Pooling

Database connections are expensive. Use a connection pool like PgBouncer to manage connections efficiently and prevent connection exhaustion under high load.

```python
[databases]
mydb = host=localhost port=5432 dbname=production

[pgbouncer]
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 25
reserve_pool_size = 5
reserve_pool_timeout = 3

from sqlalchemy.ext.asyncio import create_async_engine

engine = create_async_engine(
    'postgresql+asyncpg://user:pass@pgbouncer:6432/mydb',
    pool_size=20,
    max_overflow=10,
    pool_pre_ping=True,
    echo_pool=True
)
```

Configure pool sizes based on your workload. Monitor connection usage with pg_stat_activity to avoid exhaustion. Use transaction pooling mode for maximum efficiency with stateless applications.

## Query Optimization

Efficient queries are critical for performance. Avoid common pitfalls like N+1 queries and unindexed lookups.

### Avoiding N+1 Queries

```python
users = await session.execute(select(User))
for user in users.scalars():
    scans = await session.execute(
        select(Scan).where(Scan.user_id == user.id)
    )

result = await session.execute(
    select(User)
    .options(selectinload(User.scans))
)
users = result.scalars().all()

result = await session.execute(
    select(User, Scan)
    .join(Scan, User.id == Scan.user_id)
)

SELECT
    u.*,
    COUNT(s.id) OVER (PARTITION BY u.id) as scan_count
FROM users u
LEFT JOIN scans s ON u.id = s.user_id;
```

### Pagination and Result Limits

```sql
SELECT * FROM scans
WHERE (created_at, id) < ($1, $2)
ORDER BY created_at DESC, id DESC
LIMIT 50;

CREATE MATERIALIZED VIEW daily_stats AS
SELECT
    DATE(created_at) as date,
    COUNT(*) as scan_count,
    COUNT(DISTINCT user_id) as unique_users
FROM scans
GROUP BY DATE(created_at);

CREATE INDEX idx_daily_stats_date ON daily_stats(date);

REFRESH MATERIALIZED VIEW CONCURRENTLY daily_stats;
```

> **Important:** Materialized views are perfect for dashboards and reports. They cache expensive aggregations and can be refreshed on a schedule.

## Database Design

Good schema design prevents performance problems before they start. Normalize for data integrity, but denormalize strategically for performance.

```sql
CREATE TABLE scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    scan_type VARCHAR(50) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT valid_scan_type
        CHECK (scan_type IN ('qr', 'barcode', 'nfc')),
    CONSTRAINT metadata_not_empty
        CHECK (jsonb_typeof(metadata) = 'object')
);

CREATE INDEX idx_scans_metadata
ON scans USING GIN (metadata);

CREATE TABLE scans_partitioned (
    LIKE scans INCLUDING ALL
) PARTITION BY RANGE (created_at);

CREATE TABLE scans_2024_11
PARTITION OF scans_partitioned
FOR VALUES FROM ('2024-11-01') TO ('2024-12-01');

CREATE TABLE scans_2024_12
PARTITION OF scans_partitioned
FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');
```

Partitioning is essential for tables with time-series data. Query performance improves dramatically when PostgreSQL can eliminate entire partitions from the scan.

## Monitoring and Maintenance

Continuous monitoring prevents performance degradation. Track query performance, connection usage, and table statistics.

```sql
SELECT
    query,
    calls,
    total_exec_time,
    mean_exec_time,
    max_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_size_pretty(pg_relation_size(indexrelid)) DESC;

SELECT
    state,
    COUNT(*)
FROM pg_stat_activity
GROUP BY state;

SELECT
    schemaname,
    tablename,
    n_dead_tup,
    n_live_tup,
    ROUND(n_dead_tup * 100.0 / NULLIF(n_live_tup + n_dead_tup, 0), 2) as dead_pct
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY dead_pct DESC;
```

> **Warning:** Enable pg_stat_statements extension for query performance tracking. It's essential for identifying bottlenecks in production.

Run VACUUM ANALYZE regularly to maintain table statistics and reclaim space. Consider autovacuum tuning for high-write workloads. Set up monitoring alerts for connection exhaustion, slow queries, and replication lag.

## Real-World Results

Our analytics pipeline processes 11+ table schemas with real-time event sourcing while maintaining 99.9% uptime. Query response times average under 100ms for indexed lookups and under 2 seconds for complex aggregations.

```mermaid
graph LR
    A[Application] --> B[PgBouncer]
    B --> C[Primary DB]
    C --> D[Read Replica 1]
    C --> E[Read Replica 2]
    A --> D
    A --> E
    F[Analytics] --> E
    G[Prometheus] --> C
    G --> D
    G --> E
```

Proper optimization enabled us to handle 5,000+ concurrent users with minimal hardware. The key is measuring first, optimizing second. Use the built-in PostgreSQL monitoring tools to identify bottlenecks, then apply targeted optimizations.

> **Tip:** Premature optimization is the root of all evil, but measuring is not premature. Always instrument and monitor from day one.
