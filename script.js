// Professional Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    initializeSkillBars();
    initializeTypingEffect();
    initializeMobileMenu();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + navbar.offsetHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Scroll-triggered animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animation classes to elements
    document.querySelectorAll('.app-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('slide-in-left');
        } else {
            item.classList.add('slide-in-right');
        }
        item.style.animationDelay = `${index * 0.3}s`;
    });
    
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.classList.add('fade-in');
        category.style.animationDelay = `${index * 0.2}s`;
    });
    
    document.querySelectorAll('.award-item').forEach((award, index) => {
        award.classList.add('fade-in');
        award.style.animationDelay = `${index * 0.1}s`;
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 500);
                });
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skills').forEach(section => {
        skillObserver.observe(section);
    });
}

// Typing effect for hero section
function initializeTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    const texts = [
        'Data Scientist & iOS Developer',
        'MBA at Hitotsubashi University',
        'MEXT YLP Scholar',
        'Technology Professional'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500; // Pause before next text
        }
        
        setTimeout(typeWriter, speed);
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Scroll effects and parallax
function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add scroll indicator
    createScrollIndicator();
}

// Create scroll progress indicator
function createScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollIndicator.style.width = scrolled + '%';
    });
}

// Smooth reveal animations for sections
function initializeScrollReveal() {
    const sections = document.querySelectorAll('section');
    
    const revealSection = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}

// Add interactive hover effects for app cards
function initializeAppCardEffects() {
    const appCards = document.querySelectorAll('.app-card');
    
    appCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize contact form functionality (if needed)
function initializeContactForm() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add analytics tracking or other functionality here
            console.log('Contact link clicked:', this.textContent.trim());
        });
    });
}

// Add custom cursor effect (optional enhancement)
function initializeCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--primary-color);
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.15s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    // Scale cursor on hover for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .app-card, .contact-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Performance optimization: Lazy loading for images (when added)
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Add dynamic year to footer
function updateFooterYear() {
    const footerYear = document.querySelector('.footer p');
    if (footerYear && footerYear.textContent.includes('2025')) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
    }
}

// Initialize app icon loading with fallback
function initializeAppIcons() {
    const appIcons = document.querySelectorAll('.app-icon-image');
    
    appIcons.forEach(icon => {
        icon.addEventListener('error', function() {
            // Create fallback icon element
            const fallbackIcon = document.createElement('i');
            fallbackIcon.className = 'fas fa-mobile-alt';
            fallbackIcon.style.fontSize = '3rem';
            fallbackIcon.style.marginBottom = 'var(--spacing-md)';
            fallbackIcon.style.color = 'white';
            
            // Replace failed image with fallback
            this.parentNode.replaceChild(fallbackIcon, this);
        });
        
        // Add loading animation
        icon.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        icon.style.opacity = '0';
        icon.style.transition = 'opacity 0.3s ease';
    });
}

// Call additional initialization functions
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollReveal();
    initializeAppCardEffects();
    initializeContactForm();
    initializeAppIcons();
    updateFooterYear();
    
    // Optional: Enable custom cursor on desktop only
    if (window.innerWidth > 768) {
        // initializeCustomCursor(); // Uncomment to enable
    }
});

// Add CSS classes for enhanced mobile navigation
const additionalCSS = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-top: 1px solid var(--border-color);
        padding: var(--spacing-lg);
        gap: var(--spacing-md);
    }
    
    .nav-menu a.active {
        color: var(--primary-color);
        font-weight: 600;
    }
    
    .section-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Add smooth page load animation (disabled to prevent flashing)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Loading animation disabled to prevent content flashing
    // const loadingCSS = `
    //     body {
    //         opacity: 0;
    //         transition: opacity 0.5s ease;
    //     }
    //     
    //     body.loaded {
    //         opacity: 1;
    //     }
    // `;
    
    // const loadingStyleSheet = document.createElement('style');
    // loadingStyleSheet.textContent = loadingCSS;
    // document.head.appendChild(loadingStyleSheet);
});