/**
 * MSM Coretech Website JavaScript
 * Contains all interactive functionality for the website
 */

/**
 * Industries Carousel Functionality
 * Handles smooth scrolling for the industries section carousel
 * @param {string} direction - 'left' or 'right' to determine scroll direction
 */
function scrollIndustries(direction) {
  const grid = document.getElementById('industriesGrid');
  const cardWidth = 300; // Width of each card + gap
  const scrollAmount = cardWidth * 2; // Scroll by 2 cards at a time
  
  if (direction === 'left') {
    grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

/**
 * Smooth scrolling for navigation links
 * Adds smooth scrolling behavior to all anchor links
 */
function initSmoothScrolling() {
  // Get all anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Form validation and submission
 * Handles contact form validation and submission
 */
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const fullName = formData.get('fullName');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const company = formData.get('company');
      const project = formData.get('project');
      
      // Basic validation
      if (!fullName || !email || !phone || !project) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Phone validation (basic)
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Please enter a valid phone number.');
        return;
      }
      
      // If validation passes, show success message
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }
}

/**
 * Floating button interactions
 * Handles floating contact button interactions
 */
function initFloatingButtons() {
  const floatingButtons = document.querySelectorAll('.float-btn, .floating-icon');
  
  floatingButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const title = this.getAttribute('title');
      
      switch(title) {
        case 'Chat':
          // Open chat widget or redirect to chat
          alert('Chat functionality would open here');
          break;
        case 'Email':
          // Open email client
          window.location.href = 'mailto:info@msmcoretech.com';
          break;
        case 'Call':
          // Open phone dialer
          window.location.href = 'tel:+1234567890';
          break;
        case 'WhatsApp':
          // Open WhatsApp
          window.open('https://wa.me/1234567890', '_blank');
          break;
        default:
          console.log('Button clicked:', title);
      }
    });
  });
}

/**
 * Scroll animations
 * Adds scroll-triggered animations to elements
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate on scroll
  const animatedElements = document.querySelectorAll('.service-card, .tech-card, .industry-card, .feature-box');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/**
 * Mobile menu toggle (if needed)
 * Handles mobile navigation menu toggle
 */
function initMobileMenu() {
  // This would be implemented if a mobile menu is added
  console.log('Mobile menu functionality ready');
}

/**
 * Initialize all JavaScript functionality
 * Called when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('MSM Coretech website loaded successfully');
  
  // Initialize all functionality
  initSmoothScrolling();
  initContactForm();
  initFloatingButtons();
  initScrollAnimations();
  initMobileMenu();
});

/**
 * Utility Functions
 */

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll events
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
