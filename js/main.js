// Main client-side JavaScript
// Mobile menu toggle with accessibility support
// Code copy functionality with progressive enhancement

document.addEventListener('DOMContentLoaded', () => {
  // Initialize code copy functionality
  initCodeCopy();
  // Initialize social share functionality
  initSocialShare();
  // Initialize diagram viewer functionality
  initDiagramViewer();
  // Initialize resume print functionality
  initResumePrint();
  // Mobile menu toggle
  const menuToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuIcon = document.querySelector('[data-icon="menu"]');
  const closeIcon = document.querySelector('[data-icon="close"]');

  if (menuToggle && mobileMenu && menuIcon && closeIcon) {
    // Helper: Close the mobile menu (DRY - used by multiple handlers)
    const closeMenu = () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    };

    // Helper: Open the mobile menu
    const openMenu = () => {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Close menu');
      // Focus first link for accessibility
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    };

    // Toggle menu on button click
    menuToggle.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu on link click (auto-close on navigation)
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Close menu when viewport resized to desktop (>= 768px)
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addEventListener('change', (e) => {
      if (e.matches && !mobileMenu.classList.contains('hidden')) {
        closeMenu();
      }
    });
  }

  // Press effects for mobile menu button (React parity)
  if (menuToggle) {
    menuToggle.addEventListener('mousedown', () => {
      menuToggle.style.boxShadow = '2px 2px 0 #000';
    });
    menuToggle.addEventListener('mouseup', () => {
      menuToggle.style.boxShadow = '3px 3px 0 #000';
    });
    menuToggle.addEventListener('mouseleave', () => {
      menuToggle.style.boxShadow = '3px 3px 0 #000';
    });
  }
});

// Code copy functionality - wraps code blocks and adds copy buttons
function initCodeCopy() {
  // Find all code blocks with language class
  const codeBlocks = document.querySelectorAll('pre[class*="language-"]');

  codeBlocks.forEach((pre) => {
    // Extract language from class (e.g., "language-python" → "PYTHON")
    const langClass = [...pre.classList].find((c) => c.startsWith('language-'));
    const language = langClass ? langClass.replace('language-', '').toUpperCase() : 'CODE';

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    wrapper.setAttribute('data-code-block', '');

    // Create header
    const header = document.createElement('div');
    header.className = 'code-block-header';
    header.innerHTML =
      `<span class="code-block-language">${language}</span>` +
      `<button class="code-block-copy" data-copy-button aria-label="Copy ${language} code">COPY</button>`;

    // Wrap the pre element
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);
  });

  // Event delegation for copy buttons
  document.addEventListener('click', async (e) => {
    const copyBtn = e.target.closest('[data-copy-button]');
    if (!copyBtn) return;

    const wrapper = copyBtn.closest('[data-code-block]');
    const code = wrapper?.querySelector('code');
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code.textContent);

      // Visual feedback
      copyBtn.textContent = 'COPIED';
      copyBtn.classList.add('is-copied');

      // Clear any previous timeout to prevent race condition on rapid clicks
      clearTimeout(copyBtn._copyTimeout);

      // Revert after 2 seconds
      copyBtn._copyTimeout = setTimeout(() => {
        copyBtn.textContent = 'COPY';
        copyBtn.classList.remove('is-copied');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      copyBtn.textContent = 'ERROR';
      clearTimeout(copyBtn._copyTimeout);
      copyBtn._copyTimeout = setTimeout(() => {
        copyBtn.textContent = 'COPY';
      }, 2000);
    }
  });
}

// Diagram viewer functionality - fullscreen modal with zoom controls
function initDiagramViewer() {
  // Create modal HTML if diagrams exist on page
  const diagrams = document.querySelectorAll('[data-diagram-viewer]');
  if (diagrams.length === 0) return;

  // Create modal container
  const modal = document.createElement('div');
  modal.id = 'diagram-modal';
  modal.className = 'diagram-modal hidden';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Diagram viewer');
  modal.innerHTML = `
    <div class="diagram-modal-backdrop"></div>
    <div class="diagram-modal-content">
      <div class="diagram-modal-header">
        <span class="diagram-modal-title">Architecture Diagram</span>
        <div class="diagram-modal-controls">
          <button class="diagram-zoom-btn" data-zoom="out" aria-label="Zoom out">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
          <span class="diagram-zoom-level" aria-live="polite">100%</span>
          <button class="diagram-zoom-btn" data-zoom="in" aria-label="Zoom in">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
          <button class="diagram-zoom-btn" data-zoom="reset" aria-label="Reset zoom">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
          </button>
          <button class="diagram-close-btn" data-close aria-label="Close diagram viewer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div class="diagram-modal-body">
        <div class="diagram-container">
          <img class="diagram-image" src="" alt="Architecture diagram">
        </div>
      </div>
      <div class="diagram-modal-footer">
        <span class="diagram-hint">Use scroll wheel or +/- keys to zoom. Drag to pan. Press Escape to close.</span>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // State
  let currentZoom = 1;
  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 3;
  const ZOOM_STEP = 0.25;

  // Elements
  const backdrop = modal.querySelector('.diagram-modal-backdrop');
  const content = modal.querySelector('.diagram-modal-content');
  const image = modal.querySelector('.diagram-image');
  const zoomLevel = modal.querySelector('.diagram-zoom-level');
  const container = modal.querySelector('.diagram-container');

  // Helper functions
  const updateZoomDisplay = () => {
    zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
    image.style.transform = `scale(${currentZoom})`;
  };

  const openModal = (src, alt) => {
    currentZoom = 1;
    image.src = src;
    image.alt = alt || 'Architecture diagram';
    updateZoomDisplay();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    // Focus the close button for accessibility
    modal.querySelector('[data-close]').focus();
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    image.src = '';
  };

  const zoom = (direction) => {
    if (direction === 'in' && currentZoom < MAX_ZOOM) {
      currentZoom = Math.min(MAX_ZOOM, currentZoom + ZOOM_STEP);
    } else if (direction === 'out' && currentZoom > MIN_ZOOM) {
      currentZoom = Math.max(MIN_ZOOM, currentZoom - ZOOM_STEP);
    } else if (direction === 'reset') {
      currentZoom = 1;
    }
    updateZoomDisplay();
  };

  // Event listeners - click on diagram to open
  diagrams.forEach((wrapper) => {
    const img = wrapper.querySelector('img');
    if (img) {
      wrapper.addEventListener('click', () => {
        openModal(img.src, img.alt);
      });
    }
  });

  // Close on backdrop click
  backdrop.addEventListener('click', closeModal);

  // Close button
  modal.querySelector('[data-close]').addEventListener('click', closeModal);

  // Zoom buttons
  modal.querySelectorAll('[data-zoom]').forEach((btn) => {
    btn.addEventListener('click', () => zoom(btn.dataset.zoom));
  });

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('hidden')) return;

    switch (e.key) {
      case 'Escape':
        closeModal();
        break;
      case '+':
      case '=':
        zoom('in');
        break;
      case '-':
      case '_':
        zoom('out');
        break;
      case '0':
        zoom('reset');
        break;
    }
  });

  // Mouse wheel zoom
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoom('in');
    } else {
      zoom('out');
    }
  }, { passive: false });

  // Drag to pan
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    container.style.cursor = 'grabbing';
    startX = e.pageX - container.offsetLeft;
    startY = e.pageY - container.offsetTop;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
  });

  container.addEventListener('mouseleave', () => {
    isDragging = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const y = e.pageY - container.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    container.scrollLeft = scrollLeft - walkX;
    container.scrollTop = scrollTop - walkY;
  });

  // Touch support for mobile
  let touchStartX, touchStartY;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) return; // Ignore pinch
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const walkX = touchStartX - touchX;
    const walkY = touchStartY - touchY;
    container.scrollLeft = scrollLeft + walkX;
    container.scrollTop = scrollTop + walkY;
  }, { passive: true });
}

// Social share functionality - handles Twitter, LinkedIn, and native Web Share API
function initSocialShare() {
  // Show native share button if Web Share API is available
  const nativeShareBtn = document.querySelector('[data-share-native]');
  if (nativeShareBtn && navigator.share) {
    nativeShareBtn.classList.remove('hidden');
  }

  // Event delegation for all share buttons
  document.addEventListener('click', async (e) => {
    // Twitter share
    const twitterBtn = e.target.closest('[data-share-twitter]');
    if (twitterBtn) {
      const url = encodeURIComponent(window.location.origin + twitterBtn.dataset.shareUrl);
      const title = encodeURIComponent(twitterBtn.dataset.shareTitle);
      const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      const popup = window.open(shareUrl, 'share-twitter', 'width=550,height=450');
      // Fallback if popup blocked - navigate in current window
      if (!popup || popup.closed) {
        window.location.href = shareUrl;
      }
      return;
    }

    // LinkedIn share (using current share-offsite API)
    const linkedinBtn = e.target.closest('[data-share-linkedin]');
    if (linkedinBtn) {
      const url = encodeURIComponent(window.location.origin + linkedinBtn.dataset.shareUrl);
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      const popup = window.open(shareUrl, 'share-linkedin', 'width=600,height=600');
      // Fallback if popup blocked - navigate in current window
      if (!popup || popup.closed) {
        window.location.href = shareUrl;
      }
      return;
    }

    // Native share (Web Share API)
    const nativeBtn = e.target.closest('[data-share-native]');
    if (nativeBtn && navigator.share) {
      try {
        await navigator.share({
          title: nativeBtn.dataset.shareTitle,
          url: window.location.origin + nativeBtn.dataset.shareUrl
        });
      } catch (err) {
        // User cancelled or error - ignore silently
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    }
  });
}

// Resume print functionality - triggers window.print() for CV download
function initResumePrint() {
  const printBtn = document.querySelector('[data-print-resume]');
  if (!printBtn) return;

  // Click handler for print
  printBtn.addEventListener('click', () => {
    window.print();
  });

  // Press effects for React parity (mousedown/mouseup shadow change)
  printBtn.addEventListener('mousedown', () => {
    printBtn.style.boxShadow = '2px 2px 0 #000';
  });
  printBtn.addEventListener('mouseup', () => {
    printBtn.style.boxShadow = '4px 4px 0 #000';
  });
  printBtn.addEventListener('mouseleave', () => {
    printBtn.style.boxShadow = '4px 4px 0 #000';
  });
}
