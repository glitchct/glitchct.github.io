// Modern JavaScript for enhanced interactivity

document.addEventListener('DOMContentLoaded', function() {
  initializeInteractions();
  initializeScrollAnimations();
  initializeNavigation();
});

// Initialize navigation highlighting
function initializeNavigation() {
  const navLinks = document.querySelectorAll('nav a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.style.color = '#f093fb';
    }
  });
}

// Enhanced scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideInUp 0.8s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe project cards and list items
  document.querySelectorAll('.project-card, .content-section li').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// Enhanced interaction handlers
function initializeInteractions() {
  // Add smooth click feedback to buttons
  const buttons = document.querySelectorAll('.cta-button, .project-card, .content-section a');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add cursor glow effect on mouse move (optional enhancement)
if (window.innerWidth > 768) {
  document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('body');
    cursor.style.setProperty('--cursor-x', e.clientX + 'px');
    cursor.style.setProperty('--cursor-y', e.clientY + 'px');
  });
}

// Lazy load images (future enhancement)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}
