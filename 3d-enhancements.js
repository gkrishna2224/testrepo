// Advanced 3D Portfolio Enhancement Script
// This file contains cutting-edge 3D animations and WebGL-like effects

// Initialize 3D Portfolio System
class Modern3DPortfolio {
    constructor() {
        this.initializeSystem();
        this.create3DEnvironment();
        this.setupAdvancedAnimations();
        this.initializeParticleSystem();
        this.setupMouseTracking();
    }

    initializeSystem() {
        // Inject modern 3D CSS if not already present
        if (!document.querySelector('link[href="modern-3d.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'modern-3d.css';
            document.head.appendChild(link);
        }

        // Set up 3D perspective for the entire page
        document.body.style.perspective = '2000px';
        document.body.style.transformStyle = 'preserve-3d';
        
        // Create floating particles background
        this.createFloatingParticles();
    }

    create3DEnvironment() {
        // Add 3D transforms to major sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.transformStyle = 'preserve-3d';
            section.style.transform = `translateZ(${index * 20}px)`;
        });

        // Enhanced navigation with 3D effects
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
            navbar.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            navbar.style.transform = 'translateZ(100px)';
        }

        // 3D hero image enhancements
        this.enhance3DHeroImage();
    }

    enhance3DHeroImage() {
        const heroImage = document.querySelector('.image-placeholder');
        if (heroImage) {
            // Change icon to astronaut for 3D theme
            const icon = heroImage.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-user-astronaut';
            }

            // Add orbital rings
            this.createOrbitalRings(heroImage);
            
            // Enhanced animation
            heroImage.style.animation = `
                profileFloat 8s ease-in-out infinite,
                profileRotate 30s linear infinite,
                profilePulse 4s ease-in-out infinite
            `;
        }
    }

    createOrbitalRings(parent) {
        for (let i = 1; i <= 3; i++) {
            const ring = document.createElement('div');
            ring.className = `orbital-ring ring-${i}`;
            ring.style.cssText = `
                position: absolute;
                width: ${120 + (i * 30)}%;
                height: ${120 + (i * 30)}%;
                border: ${3 - i}px solid rgba(255, 255, 255, ${0.3 - i * 0.1});
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) translateZ(-${i * 10}px);
                animation: orbit${i} ${15 + i * 5}s linear infinite;
                pointer-events: none;
                box-shadow: 0 0 ${20 + i * 10}px rgba(102, 126, 234, 0.${5 - i});
            `;
            parent.appendChild(ring);
        }
    }

    createFloatingParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = '3d-particles-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;

        for (let i = 0; i < 150; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            const size = Math.random() * 4 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const z = Math.random() * 500 - 250;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 10;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.4));
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                transform: translateZ(${z}px);
                animation: 
                    floatParticle3D ${duration}s linear infinite,
                    particleRotate3D ${duration * 0.7}s linear infinite,
                    particlePulse3D ${duration * 0.3}s ease-in-out infinite;
                animation-delay: ${delay}s;
                box-shadow: 0 0 ${size * 3}px rgba(102, 126, 234, 0.6);
            `;
            
            particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
    }

    setupAdvancedAnimations() {
        // Enhanced intersection observer for 3D effects
        const observerOptions = {
            threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const ratio = entry.intersectionRatio;
                
                if (entry.isIntersecting) {
                    element.classList.add('animate');
                    this.apply3DTransformation(element, ratio);
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.skill-category, .project-card, .stat, .section-title').forEach(el => {
            observer.observe(el);
        });
    }

    apply3DTransformation(element, ratio) {
        if (element.classList.contains('skill-category')) {
            element.style.transform = `
                translateY(0) 
                rotateX(0) 
                translateZ(${30 + ratio * 20}px)
            `;
            
            // Animate skill tags
            const skillTags = element.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = `translateZ(${5 + index * 2}px) rotateY(${Math.random() * 10 - 5}deg)`;
                    tag.style.opacity = '1';
                }, index * 100);
            });
        }
        
        if (element.classList.contains('project-card')) {
            element.style.transform = `
                translateY(0) 
                scale(1) 
                rotateX(0) 
                translateZ(${30 + ratio * 20}px)
            `;
        }
        
        if (element.classList.contains('stat')) {
            this.animateCounter(element);
        }
    }

    animateCounter(statElement) {
        const counterElement = statElement.querySelector('h3');
        if (!counterElement) return;
        
        const targetNumber = parseInt(counterElement.textContent.replace('+', ''));
        let currentNumber = 0;
        const increment = targetNumber / 60;
        const suffix = counterElement.textContent.includes('+') ? '+' : '';
        
        const updateCounter = () => {
            if (currentNumber < targetNumber) {
                currentNumber += increment;
                const displayNumber = Math.ceil(currentNumber);
                counterElement.textContent = displayNumber + suffix;
                counterElement.style.transform = `
                    translateZ(${displayNumber / 5}px) 
                    scale(${1 + displayNumber / 1000})
                `;
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.textContent = targetNumber + suffix;
                counterElement.style.transform = `
                    translateZ(${targetNumber / 5}px) 
                    scale(${1 + targetNumber / 1000})
                `;
            }
        };
        
        setTimeout(updateCounter, 300);
    }

    initializeParticleSystem() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Create interactive particle field
        const particleField = document.createElement('canvas');
        particleField.className = '3d-particle-canvas';
        particleField.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        hero.appendChild(particleField);
        
        // Simple canvas-based particle system
        this.setupCanvasParticles(particleField);
    }

    setupCanvasParticles(canvas) {
        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 100;
        
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * 500,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                vz: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.8 + 0.2
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.z += particle.vz;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.z < -250) particle.z = 250;
                if (particle.z > 250) particle.z = -250;
                
                // Calculate 3D projection
                const perspective = 500;
                const scale = perspective / (perspective + particle.z);
                const x2d = particle.x * scale;
                const y2d = particle.y * scale;
                const size2d = particle.size * scale;
                
                // Draw particle
                ctx.save();
                ctx.globalAlpha = particle.opacity * scale;
                ctx.fillStyle = `hsl(${240 + particle.z * 0.1}, 70%, 60%)`;
                ctx.beginPath();
                ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    setupMouseTracking() {
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        });
        
        const animate3DElements = () => {
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;
            
            // Apply 3D transforms based on mouse position
            const heroImage = document.querySelector('.image-placeholder');
            if (heroImage) {
                heroImage.style.transform = `
                    translateZ(50px) 
                    rotateX(${targetY * 8}deg) 
                    rotateY(${targetX * 8}deg) 
                    translateX(${targetX * 15}px) 
                    translateY(${targetY * 15}px)
                `;
            }
            
            // Apply parallax to skill categories
            document.querySelectorAll('.skill-category').forEach((category, index) => {
                const factor = (index + 1) * 0.1;
                category.style.transform = `
                    translateZ(${30 + index * 5}px) 
                    rotateY(${targetX * factor * 3}deg) 
                    rotateX(${targetY * factor * 2}deg)
                `;
            });
            
            // Apply parallax to project cards
            document.querySelectorAll('.project-card').forEach((card, index) => {
                const factor = (index + 1) * 0.08;
                card.style.transform = `
                    translateZ(${30 + index * 5}px) 
                    rotateY(${targetX * factor * 4}deg) 
                    rotateX(${targetY * factor * 3}deg)
                `;
            });
            
            requestAnimationFrame(animate3DElements);
        };
        
        animate3DElements();
    }
}

// Enhanced Dark Mode Toggle with 3D Effects
function createAdvanced3DDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = `
        <div class="toggle-sphere">
            <div class="toggle-icon">🌙</div>
        </div>
    `;
    toggle.className = 'dark-mode-toggle-3d';
    toggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 70px;
        height: 70px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
        cursor: pointer;
        z-index: 1000;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 
            0 15px 35px rgba(102, 126, 234, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transform: perspective(500px) translateZ(30px);
        transform-style: preserve-3d;
    `;
    
    const sphere = toggle.querySelector('.toggle-sphere');
    sphere.style.cssText = `
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform-style: preserve-3d;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    const icon = toggle.querySelector('.toggle-icon');
    icon.style.cssText = `
        font-size: 1.8rem;
        transform: translateZ(10px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // 3D rotation animation
        sphere.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
            icon.innerHTML = isDark ? '☀️' : '🌙';
            sphere.style.transform = 'rotateY(360deg)';
        }, 200);
        
        setTimeout(() => {
            sphere.style.transform = 'rotateY(0deg)';
        }, 400);
        
        localStorage.setItem('darkMode', isDark);
    });
    
    toggle.addEventListener('mouseenter', () => {
        toggle.style.transform = `
            perspective(500px) 
            translateZ(40px) 
            scale(1.1) 
            rotateY(10deg) 
            rotateX(10deg)
        `;
    });
    
    toggle.addEventListener('mouseleave', () => {
        toggle.style.transform = 'perspective(500px) translateZ(30px) scale(1)';
    });
    
    document.body.appendChild(toggle);
    
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        icon.innerHTML = '☀️';
    }
}

// Inject additional 3D CSS animations
function inject3DAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle3D {
            0% {
                transform: translateY(100vh) translateZ(var(--z, 0px)) rotateX(0deg) rotateY(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateZ(var(--z, 0px)) rotateX(360deg) rotateY(180deg);
                opacity: 0;
            }
        }
        
        @keyframes particleRotate3D {
            from {
                transform: rotateY(0deg) rotateZ(0deg);
            }
            to {
                transform: rotateY(360deg) rotateZ(360deg);
            }
        }
        
        @keyframes particlePulse3D {
            0%, 100% {
                opacity: 0.8;
                transform: scale(1);
            }
            50% {
                opacity: 1;
                transform: scale(1.3);
            }
        }
        
        @keyframes profileFloat {
            0%, 100% {
                transform: translateY(0) translateZ(50px);
            }
            33% {
                transform: translateY(-30px) translateZ(60px);
            }
            66% {
                transform: translateY(-15px) translateZ(45px);
            }
        }
        
        @keyframes profileRotate {
            from {
                transform: rotateY(0deg);
            }
            to {
                transform: rotateY(360deg);
            }
        }
        
        @keyframes profilePulse {
            0%, 100% {
                box-shadow: 
                    0 40px 80px rgba(102, 126, 234, 0.5),
                    inset 0 2px 0 rgba(255, 255, 255, 0.3),
                    0 0 100px rgba(102, 126, 234, 0.3);
            }
            50% {
                box-shadow: 
                    0 50px 100px rgba(102, 126, 234, 0.8),
                    inset 0 2px 0 rgba(255, 255, 255, 0.5),
                    0 0 150px rgba(102, 126, 234, 0.6);
            }
        }
        
        @keyframes orbit1 {
            from {
                transform: translate(-50%, -50%) rotate(0deg) translateZ(-10px);
            }
            to {
                transform: translate(-50%, -50%) rotate(360deg) translateZ(-10px);
            }
        }
        
        @keyframes orbit2 {
            from {
                transform: translate(-50%, -50%) rotate(360deg) translateZ(-20px);
            }
            to {
                transform: translate(-50%, -50%) rotate(0deg) translateZ(-20px);
            }
        }
        
        @keyframes orbit3 {
            from {
                transform: translate(-50%, -50%) rotate(0deg) translateZ(-30px);
            }
            to {
                transform: translate(-50%, -50%) rotate(-360deg) translateZ(-30px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        inject3DAnimations();
        new Modern3DPortfolio();
        createAdvanced3DDarkModeToggle();
    });
} else {
    inject3DAnimations();
    new Modern3DPortfolio();
    createAdvanced3DDarkModeToggle();
}

console.log(`
    ┌────────────────────────────────────────────────────────────┐
    │              🎆 MODERN 3D PORTFOLIO SYSTEM 🎆                │
    ├────────────────────────────────────────────────────────────┤
    │ ✨ 3D Transforms: ACTIVE                                  │
    │ 🌌 Particle System: RUNNING                                │
    │ 🕰️ Mouse Tracking: ENABLED                                 │
    │ 🎭 WebGL Effects: SIMULATED                                │
    │ 🎨 Glassmorphism: APPLIED                                 │
    │ 🚀 Performance: OPTIMIZED                                 │
    └────────────────────────────────────────────────────────────┘
    
    🎉 Portfolio Enhanced with Cutting-Edge 3D Technology!
`);

export { Modern3DPortfolio };