// Main client-side JavaScript
// Mobile menu toggle with accessibility support
// Code copy functionality with progressive enhancement

document.addEventListener('DOMContentLoaded', () => {
  // Initialize code copy functionality
  initCodeCopy();
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
