/**
 * Professional Printing Company Website
 * Pure JavaScript Implementation
 * Author: Creative Printing Co.
 * Date: 2024
 */

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const sections = document.querySelectorAll('section[id]');
const portfolioFilters = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const contactForm = document.getElementById('contactForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize all app functionality
 */
function initializeApp() {
    setupNavigation();
    setupScrollEffects();
    setupPortfolioFilter();
    setupLightbox();
    setupContactForm();
    setupScrollAnimations();
    setupSmoothScrolling();
}

/**
 * Navigation Menu Functionality
 */
function setupNavigation() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show-menu');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show-menu');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            navMenu.classList.remove('show-menu');
            navToggle.classList.remove('active');
        }
    });
}

/**
 * Scroll Effects (Header Background & Active Navigation)
 */
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        // Header scroll effect
        if (header) {
            if (window.scrollY >= 50) {
                header.classList.add('scroll-header');
            } else {
                header.classList.remove('scroll-header');
            }
        }

        // Active navigation highlighting
        highlightActiveNavigation();
    });
}

/**
 * Highlight active navigation based on scroll position
 */
function highlightActiveNavigation() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-link');
                }
            });
        }
    });
}

/**
 * Portfolio Filter Functionality
 */
function setupPortfolioFilter() {
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-filter');
            
            // Update active filter button
            portfolioFilters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            filterPortfolioItems(category);
        });
    });
}

/**
 * Filter portfolio items based on category
 * @param {string} category - The category to filter by
 */
function filterPortfolioItems(category) {
    portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.classList.remove('hide');
            
            // Add entrance animation
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.display = 'none';
                item.classList.add('hide');
            }, 300);
        }
    });
}

/**
 * Lightbox Gallery Functionality
 */
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-img');

    if (!lightbox) return;

    // Open lightbox when clicking on image
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            const portfolioItem = this.closest('.portfolio-item');
            const title = portfolioItem.querySelector('.portfolio-title');

            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightboxTitle.textContent = title.textContent;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Close button
    lightboxClose.addEventListener('click', closeLightbox);

    // Close when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/**
 * Contact Form Functionality
 */
function setupContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

/**
 * Handle form submission
 * @param {Event} event - The form submission event
 */
function handleFormSubmission(event) {
    event.preventDefault();
    
    // Validate all fields
    const isValid = validateForm();
    
    if (isValid) {
        // Simulate form submission
        submitForm();
    }
}

/**
 * Validate the entire form
 * @returns {boolean} - Whether the form is valid
 */
function validateForm() {
    let isValid = true;
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    const message = document.getElementById('message');
    
    // Validate name
    if (!validateField(name)) isValid = false;
    
    // Validate email
    if (!validateField(email)) isValid = false;
    
    // Validate phone
    if (!validateField(phone)) isValid = false;
    
    // Validate service selection
    if (!validateField(service)) isValid = false;
    
    // Validate message
    if (!validateField(message)) isValid = false;
    
    return isValid;
}

/**
 * Validate individual form field
 * @param {HTMLElement} field - The form field to validate
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const formGroup = field.closest('.form-group');
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error state
    formGroup.classList.remove('error');
    if (errorElement) errorElement.textContent = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !fieldValue) {
        isValid = false;
        errorMessage = 'هذا الحقل مطلوب';
    }
    
    // Specific field validations
    if (isValid && fieldValue) {
        switch (fieldName) {
            case 'name':
                if (fieldValue.length < 2) {
                    isValid = false;
                    errorMessage = 'الاسم يجب أن يكون أكثر من حرفين';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(fieldValue)) {
                    isValid = false;
                    errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
                }
                break;
                
            case 'phone':
                const phoneRegex = /^[+]?[\d\s\-\(\)]{8,}$/;
                if (!phoneRegex.test(fieldValue)) {
                    isValid = false;
                    errorMessage = 'يرجى إدخال رقم هاتف صحيح';
                }
                break;
                
            case 'message':
                if (fieldValue.length < 10) {
                    isValid = false;
                    errorMessage = 'الرسالة يجب أن تكون أكثر من 10 أحرف';
                }
                break;
        }
    }
    
    // Display error if field is invalid
    if (!isValid) {
        formGroup.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    }
    
    return isValid;
}

/**
 * Clear field error state
 * @param {HTMLElement} field - The form field
 */
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = document.getElementById(`${field.name}Error`);
    
    if (field.value.trim()) {
        formGroup.classList.remove('error');
        if (errorElement) errorElement.textContent = '';
    }
}

/**
 * Submit the form (simulation)
 */
function submitForm() {
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'جاري الإرسال...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
        
    }, 2000);
}

/**
 * Show form success message
 */
function showSuccessMessage() {
    const successElement = document.getElementById('formSuccess');
    if (successElement) {
        successElement.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successElement.classList.remove('show');
        }, 5000);
    }
}

/**
 * Setup scroll animations for elements
 */
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
    
    // Add scroll-animate class to elements
    animatedElements.forEach(element => {
        element.classList.add('scroll-animate');
    });
    
    // Setup Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animate');
        });
    }
    
    // إظهار العناصر المتحركة عند التمرير
    const animItems = document.querySelectorAll('.scroll-animate');
    const animateOnScroll = () => {
      animItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          item.classList.add('animate');
        }
      });
    };
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Utility Functions
 */

/**
 * Debounce function to limit function calls
 * @param {Function} func - The function to debounce
 * @param {number} wait - The wait time in milliseconds
 * @returns {Function} - The debounced function
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
 * Throttle function to limit function execution
 * @param {Function} func - The function to throttle
 * @param {number} limit - The limit in milliseconds
 * @returns {Function} - The throttled function
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

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - Whether the element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Performance optimizations
 */

// Optimize scroll events with throttling
const optimizedScrollHandler = throttle(function() {
    if (header) {
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    }
    highlightActiveNavigation();
}, 100);

// Replace the regular scroll event listener with optimized version
window.removeEventListener('scroll', setupScrollEffects);
window.addEventListener('scroll', optimizedScrollHandler);

/**
 * Accessibility Enhancements
 */

// Keyboard navigation for mobile menu
if (navToggle) {
    navToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.click();
        }
    });
}

// Focus management for modal/menu interactions
document.addEventListener('keydown', function(event) {
    // Close mobile menu with Escape key
    if (event.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        navToggle.classList.remove('active');
        navToggle.focus();
    }
});

/**
 * Error Handling
 */
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    // You can add error reporting here
});

/**
 * Progressive Enhancement
 */

// Check for required browser features
if (!document.querySelector) {
    console.warn('This browser does not support querySelector');
}

if (!window.addEventListener) {
    console.warn('This browser does not support addEventListener');
}

// Feature detection for smooth scrolling
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scrolling
    window.scrollTo = function(options) {
        if (typeof options === 'object') {
            const start = window.pageYOffset;
            const target = options.top;
            const distance = target - start;
            const duration = 500;
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                
                window.scrollTo(0, start + distance * easeInOutQuad(progress));
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }
    };
    
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
}

/**
 * Export functions for testing (if in a module environment)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        validateForm,
        debounce,
        throttle,
        isInViewport
    };
}

// Add loading animation to the body
document.body.classList.add('loading');

// Print friendly behavior
window.addEventListener('beforeprint', function() {
    // Ensure all sections are visible for printing
    portfolioItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
    });
});

console.log('مطبعة الإبداع - تم تحميل الموقع بنجاح ✓');
