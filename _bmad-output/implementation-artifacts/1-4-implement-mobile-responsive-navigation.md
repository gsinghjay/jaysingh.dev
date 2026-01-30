# Story 1.4: Implement Mobile Responsive Navigation

Status: done

## Story

As a **mobile site visitor**,
I want **a responsive navigation menu**,
so that **I can navigate the site on small screens**.

## Acceptance Criteria

1. **AC1: Hamburger Button on Mobile**
   - Given I am viewing on a screen < 768px (md breakpoint)
   - When I view the header
   - Then I see a hamburger menu button instead of horizontal nav links

2. **AC2: Menu Open Behavior**
   - Given the mobile menu is closed
   - When I tap the hamburger button
   - Then the navigation menu opens/expands with all nav links visible

3. **AC3: Menu Close via Button**
   - Given the mobile menu is open
   - When I tap the hamburger button again (now showing X icon)
   - Then the navigation menu closes/collapses

4. **AC4: Auto-Close on Navigation**
   - Given the mobile menu is open
   - When I tap a navigation link
   - Then I navigate to that page AND the menu closes

5. **AC5: JavaScript Pattern Compliance**
   - Given the mobile menu toggle
   - When I review the JavaScript
   - Then it uses vanilla JS with `data-*` attributes for hooks (NOT class-based selectors) per Architecture spec

6. **AC6: Responsive Breakpoint Transition**
   - Given I am viewing on a screen >= 768px
   - When I resize from mobile to desktop
   - Then the horizontal navigation reappears and mobile menu/button is hidden

## Tasks / Subtasks

- [x] Task 1: Add hamburger/close icons to header (AC: #1, #3)
  - [x] 1.1 Add SVG hamburger icon (3 horizontal lines) inline in header.njk
  - [x] 1.2 Add SVG X (close) icon inline in header.njk
  - [x] 1.3 Create mobile menu button with `data-mobile-menu-toggle` attribute
  - [x] 1.4 Style button with Neubrutalist design (border-2 border-black, bg-white, shadow-brutal-sm)
  - [x] 1.5 Add `md:hidden` to show button only on mobile
  - [x] 1.6 Add `aria-label="Open menu"` and `aria-expanded="false"` accessibility attributes

- [x] Task 2: Create mobile navigation menu structure (AC: #2, #6)
  - [x] 2.1 Add mobile menu container below header content with `data-mobile-menu` attribute
  - [x] 2.2 Use `hidden` class initially (menu starts closed)
  - [x] 2.3 Add mobile nav links using same `navItems` array as desktop
  - [x] 2.4 Style mobile menu: `border-t-4 border-black mt-4 pt-4 flex flex-col gap-3`
  - [x] 2.5 Style mobile nav links with `.nav-btn-mobile` (full width, text-left)
  - [x] 2.6 Ensure mobile menu only visible when `md:hidden` and toggled open

- [x] Task 3: Implement JavaScript toggle logic (AC: #2, #3, #4, #5)
  - [x] 3.1 Add mobile menu toggle handler in `js/main.js`
  - [x] 3.2 Query elements using `data-*` selectors (NOT class selectors per Architecture)
  - [x] 3.3 Toggle `hidden` class on menu container
  - [x] 3.4 Toggle icon visibility (show Menu when closed, X when open)
  - [x] 3.5 Update `aria-expanded` attribute on toggle
  - [x] 3.6 Update `aria-label` on toggle ("Open menu" / "Close menu")
  - [x] 3.7 Add click handlers to mobile nav links to close menu after navigation

- [x] Task 4: Implement press/shadow effects (React parity) (AC: #5)
  - [x] 4.1 Add mousedown/mouseup/mouseleave handlers for button press effect
  - [x] 4.2 Pressed state: `box-shadow: 2px 2px 0 #000`
  - [x] 4.3 Released/default state: `box-shadow: 3px 3px 0 #000`
  - [x] 4.4 Add `active:translate-y-1` class for press feedback

- [x] Task 5: Handle responsive breakpoint transition (AC: #6)
  - [x] 5.1 Add `md:hidden` to mobile menu container
  - [x] 5.2 Ensure desktop nav remains `hidden md:flex`
  - [x] 5.3 Add resize listener to close mobile menu if window resized to desktop

- [x] Task 6: Add keyboard accessibility (AC: #5)
  - [x] 6.1 Ensure hamburger button is focusable and activatable via Enter/Space
  - [x] 6.2 Add Escape key handler to close mobile menu
  - [x] 6.3 When menu opens, focus first nav link
  - [x] 6.4 When menu closes via Escape, return focus to hamburger button

- [x] Task 7: Test and verify (AC: #1-6)
  - [x] 7.1 Test on mobile viewport (< 768px): hamburger visible, desktop nav hidden
  - [x] 7.2 Test menu open/close cycle
  - [x] 7.3 Test auto-close on link click
  - [x] 7.4 Test responsive transition (resize from mobile to desktop)
  - [x] 7.5 Test keyboard navigation (Tab, Enter, Escape)
  - [x] 7.6 Verify build succeeds with `npm run build`
  - [x] 7.7 Run Playwright tests: `npm run test:e2e`

## Dev Notes

### React Implementation Reference - CRITICAL for Parity

**Source File:** `src/components/Header.tsx`

**State Management (React lines 9, 21-25):**
```typescript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const handleNavigate = (page: Page) => {
  onNavigate(page);
  setMobileMenuOpen(false);  // AUTO-CLOSES MENU
  window.scrollTo({ top: 0, behavior: 'auto' });
};
```

**Toggle Button (React lines 48-53):**
- Visible: `md:hidden`
- Icon size: 32px (`size={32}`)
- Uses lucide-react `Menu` and `X` icons
- No aria attributes in React (we're adding them for accessibility improvement)

**Mobile Menu Structure (React lines 83-110):**
```jsx
{mobileMenuOpen && (
  <ul className="md:hidden mt-4 border-t-4 border-black pt-4 flex flex-col gap-3">
    {navLinks.map((link) => (
      <li key={link.page}>
        <button onClick={() => handleNavigate(link.page)}
          className="nav-btn w-full text-left px-4 py-3 ...">
          {link.label}
        </button>
      </li>
    ))}
  </ul>
)}
```

**Press Effects (React lines 35-42):**
```javascript
onMouseDown: boxShadow = '2px 2px 0 #000'  // Pressed
onMouseUp: boxShadow = '3px 3px 0 #000'    // Released
onMouseLeave: boxShadow = '3px 3px 0 #000' // Default
```

### SVG Icons (Inline - No External Dependencies)

**Hamburger Icon (3 lines):**
```html
<svg data-icon="menu" class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  <line x1="3" y1="6" x2="21" y2="6"/>
  <line x1="3" y1="12" x2="21" y2="12"/>
  <line x1="3" y1="18" x2="21" y2="18"/>
</svg>
```

**X (Close) Icon:**
```html
<svg data-icon="close" class="w-8 h-8 hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  <line x1="6" y1="6" x2="18" y2="18"/>
  <line x1="6" y1="18" x2="18" y2="6"/>
</svg>
```

### JavaScript Implementation Pattern

**Architecture Compliance (per Architecture spec):**
- Use `data-*` attributes for JS hooks, NOT classes
- Vanilla JS only - no jQuery or external dependencies
- Event delegation pattern

**Implementation in `js/main.js`:**
```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuIcon = document.querySelector('[data-icon="menu"]');
  const closeIcon = document.querySelector('[data-icon="close"]');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');

      // Toggle menu visibility
      mobileMenu.classList.toggle('hidden');

      // Toggle icons
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');

      // Update ARIA
      menuToggle.setAttribute('aria-expanded', !isOpen);
      menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');

      // Focus management
      if (!isOpen) {
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        menuToggle.focus();
      }
    });
  }
});
```

### CSS Classes

**Already Defined in `css/input.css`:**
```css
.nav-btn-mobile {
  @apply w-full text-left px-4 py-3 text-sm font-bold uppercase border-2 border-black bg-white text-black;
  box-shadow: var(--shadow-brutal-sm);
  transition: var(--transition-default);
}

.nav-btn-mobile:hover {
  @apply bg-lime-300;
}

.nav-btn-mobile.is-active {
  @apply bg-yellow-400 text-black;
}
```

### Header Structure Update

**Current header.njk structure to modify:**
```nunjucks
<div class="flex justify-between items-center">
  {# Logo #}
  <a href="/" class="logo-btn ...">JAYSINGH.DEV</a>

  {# ADD: Mobile menu button here #}
  <button data-mobile-menu-toggle
          class="md:hidden border-2 border-black bg-white p-2"
          aria-label="Open menu"
          aria-expanded="false">
    {# Icons here #}
  </button>

  {# Desktop nav - unchanged #}
  <nav aria-label="Main navigation">
    <ul class="hidden md:flex gap-4">...</ul>
  </nav>
</div>

{# ADD: Mobile menu container #}
<nav data-mobile-menu class="hidden md:hidden" aria-label="Mobile navigation">
  <ul class="mt-4 border-t-4 border-black pt-4 flex flex-col gap-3">
    {% for item in navItems %}
      <li>
        <a href="{{ item.url }}"
           class="nav-btn-mobile{% if page.url == item.url %} is-active{% endif %}"
           {% if page.url == item.url %}aria-current="page"{% endif %}>
          {{ item.text }}
        </a>
      </li>
    {% endfor %}
  </ul>
</nav>
```

### Accessibility Improvements Over React

React implementation has NO accessibility attributes. We're adding:
1. `aria-label` on toggle button ("Open menu" / "Close menu")
2. `aria-expanded` to indicate menu state
3. `aria-label="Mobile navigation"` on mobile nav element
4. Escape key to close menu
5. Focus management (focus first link when open, return focus on close)

### Project Structure Notes

**Files to Modify:**
- `_includes/partials/header.njk` - Add mobile button and menu structure
- `js/main.js` - Add toggle logic
- `css/input.css` - Verify `.nav-btn-mobile` styles (already added in 1.3)

**No New Files Required**

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.4] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#CSS--JavaScript-Patterns] - `data-*` attributes, `js-*` prefix
- [Source: _bmad-output/planning-artifacts/architecture.md#Accessibility-Patterns] - ARIA labels, focus states
- [Source: src/components/Header.tsx] - React implementation for parity
- [Source: src/index.css] - React CSS variables and transitions

## Previous Story Intelligence

### From Story 1.3 Learnings

**What was established:**
- Header partial with `navItems` array (5 links: HOME, BLOG, PROJECTS, RESUME, CONTACT)
- Active state using `page.url` comparison with `is-active` class
- Desktop nav: `hidden md:flex gap-4`
- Logo button with box-shadow effects
- Footer with React parity (bg-black, "Built with raw HTML energy")

**Patterns established:**
- Use `.nav-btn` for desktop nav links (border-2, shadow-brutal-sm)
- Active state: `bg-yellow-400` (matches React)
- All nav text: UPPERCASE
- Header: `sticky top-0 z-50`

**React parity learnings:**
- Box shadows: `3px 3px 0 #000` default, `2px 2px 0 #000` pressed
- Transitions: `all 0.15s ease` (via `--transition-default`)
- Colors: hover `bg-lime-300`, active `bg-yellow-400`

### From Story 1.2 Learnings

**CSS already available:**
- `.nav-btn-mobile` class is pre-defined in `css/input.css`
- Shadow utilities: `--shadow-brutal-sm`, `--shadow-brutal`
- Focus states: `focus-visible:outline focus-visible:outline-4 focus-visible:outline-black`
- Reduced motion support: `@media (prefers-reduced-motion: reduce)`

### Git Intelligence

**Recent commits:**
- `bc04ac2` - Story 1.3: Header and footer with React parity
- `feb3e86` - Story 1.2: Neubrutalist design system
- `74959d0` - Story 1.1: 11ty foundation

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None

### Completion Notes List

- Implemented mobile hamburger menu with toggle functionality
- Added inline SVG icons for menu (3-line hamburger) and close (X)
- Mobile menu uses `data-*` attributes per Architecture spec (AC5)
- JavaScript toggle in `js/main.js` with vanilla JS only
- Press effects match React implementation (shadow: 3px default, 2px pressed)
- Keyboard accessibility: Enter/Space activate, Escape closes, focus management
- Responsive: auto-closes on resize to desktop via matchMedia listener
- All 16 Story 1.4 E2E tests pass (139 total tests pass)
- Fixed test selector issue for desktop nav visibility check
- Added `js` directory to 11ty passthrough copy
- Added `<script src="/js/main.js">` to base layout

**Code Review Fixes (Amelia - Dev Agent):**
- Refactored `js/main.js` to extract `closeMenu()` and `openMenu()` helpers (DRY)
- Expanded `.nav-btn-mobile` CSS class with full Neubrutalist styling
- Simplified `header.njk` mobile nav links to use CSS class (removed inline styles)
- Updated test file header comments (removed stale RED PHASE references)
- Installed Firefox/WebKit browsers for cross-browser testing

### File List

- `_includes/partials/header.njk` - Added hamburger button and mobile menu structure
- `_includes/layouts/base.njk` - Added script tag for main.js
- `js/main.js` - Implemented mobile menu toggle with accessibility features
- `eleventy.config.js` - Added js directory passthrough copy
- `tests/e2e/mobile-navigation.spec.ts` - Enabled tests (removed test.skip), fixed selector
- `css/input.css` - Expanded .nav-btn-mobile with full styling
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Updated story status
