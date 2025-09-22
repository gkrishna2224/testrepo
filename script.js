// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple form validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Create mailto link
        const mailtoLink = `mailto:krishnamoorthyganesangks@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Thank you for your message! Your default email client should open now.', 'success');
        
        // Reset form with animation
        this.reset();
        animateFormReset();
    });
}

// Typing animation for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                // Handle HTML tags
                let tagEnd = text.indexOf('>', i);
                heroTitle.innerHTML += text.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                heroTitle.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(typeWriter, 100);
        } else {
            // Add blinking cursor effect
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            heroTitle.appendChild(cursor);
            
            // Remove cursor after 3 seconds
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.parentNode.removeChild(cursor);
                }
            }, 3000);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
}

// Advanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Special handling for different elements
            if (entry.target.classList.contains('skill-category')) {
                animateSkillTags(entry.target);
            }
            
            if (entry.target.classList.contains('stat')) {
                animateCounter(entry.target);
            }
            
            if (entry.target.classList.contains('contact-item')) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, delay);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section-title, .skill-category, .project-card, .about-stats .stat, .about-text p, .contact-info, .contact-form, .contact-item').forEach(el => {
    observer.observe(el);
});

// Animate skill tags with staggered delay
function animateSkillTags(skillCategory) {
    const skillTags = skillCategory.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.setProperty('--i', index);
        tag.style.animationDelay = `${index * 0.1}s`;
    });
}

// Animate counters
function animateCounter(statElement) {
    const counterElement = statElement.querySelector('h3');
    const targetNumber = parseInt(counterElement.textContent.replace('+', ''));
    let currentNumber = 0;
    const increment = targetNumber / 50;
    const suffix = counterElement.textContent.includes('+') ? '+' : '';
    
    const updateCounter = () => {
        if (currentNumber < targetNumber) {
            currentNumber += increment;
            counterElement.textContent = Math.ceil(currentNumber) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            counterElement.textContent = targetNumber + suffix;
        }
    };
    
    setTimeout(updateCounter, 300);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add entrance animations to elements
    setTimeout(() => {
        document.querySelectorAll('.loading').forEach(el => {
            el.classList.add('animate');
        });
    }, 100);
});

// Particle system for hero section
function createParticleSystem() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(particle);
    }
}

// Mouse trail effect
function createMouseTrail() {
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY, age: 0 });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        updateTrail();
    });
    
    function updateTrail() {
        // Remove existing trail elements
        document.querySelectorAll('.mouse-trail').forEach(el => el.remove());
        
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                width: ${10 - (index * 0.8)}px;
                height: ${10 - (index * 0.8)}px;
                background: rgba(102, 126, 234, ${1 - (index * 0.1)});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${point.x}px;
                top: ${point.y}px;
                transform: translate(-50%, -50%);
                transition: all 0.1s ease;
            `;
            document.body.appendChild(trailElement);
            
            // Remove after animation
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.parentNode.removeChild(trailElement);
                }
            }, 200);
        });
    }
}

// Parallax effect for sections
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before, .skills::before, .projects::after, .contact::before');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Text reveal animation on scroll
function initTextReveal() {
    const textElements = document.querySelectorAll('p, h1, h2, h3');
    
    textElements.forEach(element => {
        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.3s ease ${index * 0.1}s`;
            element.appendChild(span);
        });
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                }
            });
        });
        
        revealObserver.observe(element);
    });
}

// 3D tilt effect for project cards
function init3DTilt() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Form reset animation
function animateFormReset() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        setTimeout(() => {
            group.style.transform = 'scale(0.95)';
            group.style.opacity = '0.7';
            
            setTimeout(() => {
                group.style.transform = 'scale(1)';
                group.style.opacity = '1';
            }, 200);
        }, index * 100);
    });
}

// Dark mode toggle (enhanced)
function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.className = 'dark-mode-toggle';
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        toggle.innerHTML = isDark ? '☀️' : '🌙';
        
        // Add click animation
        toggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            toggle.style.transform = 'scale(1)';
        }, 150);
        
        // Save preference
        localStorage.setItem('darkMode', isDark);
    });
    
    toggle.addEventListener('mouseenter', () => {
        toggle.style.transform = 'scale(1.1) rotate(10deg)';
        toggle.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
    });
    
    toggle.addEventListener('mouseleave', () => {
        toggle.style.transform = 'scale(1) rotate(0deg)';
        toggle.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
    });
    
    document.body.appendChild(toggle);
    
    // Load saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggle.innerHTML = '☀️';
    }
}

// Add CSS for dark mode and additional animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .dark-mode {
        --bg-color: #1a202c;
        --text-color: #e2e8f0;
        --card-bg: #2d3748;
        --border-color: #4a5568;
    }
    
    .dark-mode body {
        background-color: var(--bg-color);
        color: var(--text-color);
    }
    
    .dark-mode .navbar {
        background: rgba(26, 32, 44, 0.95);
    }
    
    .dark-mode .nav-link {
        color: var(--text-color);
    }
    
    .dark-mode .hero {
        background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    }
    
    .dark-mode .skill-category,
    .dark-mode .project-card,
    .dark-mode .contact-form {
        background: var(--card-bg);
        color: var(--text-color);
    }
    
    .dark-mode .about {
        background: var(--bg-color);
    }
    
    .dark-mode .projects {
        background: var(--bg-color);
    }
    
    .dark-mode input,
    .dark-mode textarea {
        background: var(--card-bg);
        color: var(--text-color);
        border-color: var(--border-color);
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .notification {
        animation: slideInRight 0.3s ease;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .project-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .skill-tag {
        cursor: pointer;
    }
    
    .skill-tag:hover {
        animation: wiggle 0.3s ease-in-out;
    }
    
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
    }
`;

document.head.appendChild(additionalStyles);

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticleSystem();
    createMouseTrail();
    initParallax();
    init3DTilt();
    createDarkModeToggle();
});

// Console welcome message with ASCII art
console.log(`
    ┌─────────────────────────────────────────────────┐
    │      🚀 KRISHNAMOORTHI G - PORTFOLIO 🚀          │
    ├─────────────────────────────────────────────────┤
    │ 💻 Technologies: HTML5, CSS3, JavaScript         │
    │ 🌟 Features: Responsive, Animated, Modern      │
    │ 📧 Contact: krishnamoorthyganesangks@gmail.com  │
    │ 📍 Location: Salem, TN, India                   │
    └─────────────────────────────────────────────────┘
    
    🎉 Portfolio loaded successfully!
    🔍 Feel free to explore the code
    ✨ Animations and interactions are now active
`);

// Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    showNotification('🎉 Easter Egg Activated! Enjoy the rainbow mode!', 'success');
    
    document.body.style.animation = 'rainbow 2s infinite';
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    setTimeout(() => {
        document.body.style.animation = '';
        rainbowStyle.remove();
    }, 10000);
}