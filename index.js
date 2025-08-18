// ===== MODERN PORTFOLIO JAVASCRIPT =====

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggleButton = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const body = document.body;
const skillBars = document.querySelectorAll('.skill-progress');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 20; // Account for relative navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect - Removed since navbar is no longer fixed
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 100) {
//         navbar.classList.add('scrolled');
//     } else {
//         navbar.classList.remove('scrolled');
//     }
// });

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Theme Toggle with Enhanced Animation
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition effect
    body.style.transition = 'all 0.3s ease';
    
    if (newTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.removeAttribute('data-theme');
        localStorage.removeItem('theme');
    }
    
    updateThemeIcon(newTheme);
    
    // Remove transition after animation
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

themeToggleButton.addEventListener('click', toggleTheme);
if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
}

function updateThemeIcon(theme) {
    const icon = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    if (themeToggleButton) {
        themeToggleButton.innerHTML = icon;
    }
    if (themeToggleMobile) {
        themeToggleMobile.innerHTML = icon;
    }
}

// Skill Bars Animation
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        if (level) {
            setTimeout(() => {
                bar.style.width = `${level}%`;
            }, 500);
        }
    });
};

// Intersection Observer for Skill Bars
const skillSection = document.querySelector('.experience-section');
if (skillSection) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillObserver.observe(skillSection);
}

// Parallax Effect for Floating Shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Typing Animation for Hero Text
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.borderRight = '2px solid var(--accent-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                typingText.style.borderRight = 'none';
            }, 2000);
        }
    };
    
    // Start typing animation after page load
    setTimeout(typeWriter, 1000);
}

// Enhanced Button Hover Effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    button.addEventListener('click', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'translateY(0) scale(1)';
        }, 150);
    });
});

// Project Card Hover Effects with Enhanced Interactions
document.querySelectorAll('.project-card').forEach(card => {
    const overlay = card.querySelector('.project-overlay');
    const links = card.querySelectorAll('.project-link');
    
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        if (overlay) overlay.style.opacity = '1';
        
        // Stagger animation for project links
        links.forEach((link, index) => {
            setTimeout(() => {
                link.style.transform = 'scale(1.1) rotate(5deg)';
            }, index * 100);
        });
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        if (overlay) overlay.style.opacity = '0';
        
        links.forEach(link => {
            link.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Social Icon Hover Effects with Enhanced Animations
document.querySelectorAll('.social-icon-container').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-6px) scale(1.1) rotate(5deg)';
        this.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.3)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        this.style.boxShadow = 'none';
    });
    
    icon.addEventListener('click', function() {
        this.style.transform = 'translateY(-3px) scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(0) scale(1)';
        }, 150);
    });
});

// Scroll Progress Indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--accent-gradient);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};

createScrollProgress();

// Modern Section Navigation
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 20;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Scroll Dots Navigation
document.querySelectorAll('.scroll-dot').forEach(dot => {
    dot.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        scrollToSection(sectionId);
    });
});

// Update scroll dots based on current section
function updateScrollDots() {
    const sections = document.querySelectorAll('section[id]');
    const dots = document.querySelectorAll('.scroll-dot');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === currentSection) {
            dot.classList.add('active');
        }
    });
}

// Animate progress bars on scroll
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.nav-progress-bar');
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            bar.style.width = '100%';
        } else {
            bar.style.width = '0%';
        }
    });
}

// Particle Effect for Hero Section
const createParticles = () => {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--accent-color);
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
            animation: float-particle ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        heroSection.appendChild(particle);
    }
};

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.3; 
        }
        50% { 
            transform: translateY(-20px) translateX(10px); 
            opacity: 0.8; 
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles after page load
setTimeout(createParticles, 2000);

// Enhanced Contact Form Validation (if you add a contact form later)
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Smooth reveal animations for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
        revealObserver.observe(section);
    });
};

// Initialize reveal animations
revealSections();

// Performance optimization: Throttle scroll events
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
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations
    updateScrollDots();
    animateProgressBars();
}, 16)); // ~60fps

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const menu = document.querySelector('.menu-links');
        const icon = document.querySelector('.hamburger-icon');
        if (menu && menu.classList.contains('open')) {
            menu.classList.remove('open');
            icon.classList.remove('open');
        }
    }
});

// Enhanced accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Additional section visibility observer
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Console welcome message
console.log(`
%c🚀 Welcome to Nambi Raja's Portfolio! 🚀
%c
%cBuilt with modern web technologies and smooth animations.
%cFeel free to explore the code and get in touch!
%c
%cGitHub: https://github.com/NAMBIRAJA-M
%cLinkedIn: https://www.linkedin.com/in/nambi-raja/
`,
'color: #6366f1; font-size: 20px; font-weight: bold;',
'',
'color: #666; font-size: 14px;',
'color: #666; font-size: 14px;',
'',
'color: #6366f1; font-size: 12px;',
'color: #6366f1; font-size: 12px;'
);
