// Main client-side JavaScript
// Mobile menu toggle with accessibility support

document.addEventListener('DOMContentLoaded', () => {
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
