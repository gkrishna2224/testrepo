// Ultra-Realistic 3D Cursor System with Advanced Graphics
// This creates a cinematic cursor experience with 3D elements

class Ultra3DCursor {
    constructor() {
        this.cursorSystem = null;
        this.cursor = null;
        this.cursorRings = [];
        this.trailElements = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.isHovering = false;
        this.isClicking = false;
        this.isOverText = false;
        
        this.initializeCursorSystem();
        this.createFloating3DElements();
        this.createNeuralNetwork();
        this.setupEventListeners();
        this.startAnimation();
    }

    initializeCursorSystem() {
        // Create main cursor system container
        this.cursorSystem = document.createElement('div');
        this.cursorSystem.className = 'cursor-3d-system';
        
        // Create main 3D cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-3d';
        
        // Create 3D rings around cursor
        for (let i = 1; i <= 3; i++) {
            const ring = document.createElement('div');
            ring.className = `cursor-ring cursor-ring-${i}`;
            this.cursorRings.push(ring);
            this.cursor.appendChild(ring);
        }
        
        this.cursorSystem.appendChild(this.cursor);
        document.body.appendChild(this.cursorSystem);
        
        // Create trail system
        this.createTrailSystem();
    }

    createTrailSystem() {
        for (let i = 0; i < 10; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.opacity = (10 - i) / 10;
            trail.style.transform = `scale(${(10 - i) / 10})`;
            this.trailElements.push({
                element: trail,
                x: 0,
                y: 0,
                delay: i * 2
            });
            this.cursorSystem.appendChild(trail);
        }
    }

    createFloating3DElements() {
        const elementsToCreate = [
            { type: 'cube', count: 8 },
            { type: 'sphere', count: 6 },
            { type: 'pyramid', count: 4 }
        ];

        elementsToCreate.forEach(({ type, count }) => {
            for (let i = 0; i < count; i++) {
                this.createFloatingElement(type);
            }
        });
    }

    createFloatingElement(type) {
        const container = document.createElement('div');
        container.className = `floating-3d-element floating-${type}`;
        
        // Random positioning
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const z = Math.random() * 200 - 100;
        const delay = Math.random() * 10;
        
        container.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            transform: translateZ(${z}px);
            animation-delay: ${delay}s;
        `;

        if (type === 'cube') {
            this.createCube(container);
        } else if (type === 'sphere') {
            // Sphere is styled in CSS
        } else if (type === 'pyramid') {
            // Pyramid is styled in CSS
        }

        document.body.appendChild(container);
    }

    createCube(container) {
        const cube = document.createElement('div');
        cube.className = 'floating-cube';
        
        const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
        faces.forEach(face => {
            const faceElement = document.createElement('div');
            faceElement.className = `cube-face ${face}`;
            cube.appendChild(faceElement);
        });
        
        container.appendChild(cube);
    }

    createNeuralNetwork() {
        const networkContainer = document.createElement('div');
        networkContainer.className = 'neural-network';
        
        const nodeCount = 20;
        const nodes = [];
        
        // Create neural nodes
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const delay = Math.random() * 3;
            
            node.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                animation-delay: ${delay}s;
            `;
            
            nodes.push({ element: node, x, y });
            networkContainer.appendChild(node);
        }
        
        // Create connections between nearby nodes
        nodes.forEach((nodeA, i) => {
            nodes.forEach((nodeB, j) => {
                if (i !== j) {
                    const distance = Math.sqrt(
                        Math.pow(nodeA.x - nodeB.x, 2) + 
                        Math.pow(nodeA.y - nodeB.y, 2)
                    );
                    
                    if (distance < 200) {
                        const connection = document.createElement('div');
                        connection.className = 'neural-connection';
                        
                        const angle = Math.atan2(nodeB.y - nodeA.y, nodeB.x - nodeA.x);
                        const delay = Math.random() * 4;
                        
                        connection.style.cssText = `
                            left: ${nodeA.x}px;
                            top: ${nodeA.y}px;
                            width: ${distance}px;
                            transform: rotate(${angle}rad);
                            animation-delay: ${delay}s;
                        `;
                        
                        networkContainer.appendChild(connection);
                    }
                }
            });
        });
        
        document.body.appendChild(networkContainer);
    }

    setupEventListeners() {
        // Mouse movement tracking
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // Hover effects
        document.addEventListener('mouseover', (e) => {
            const target = e.target;
            
            if (this.isInteractiveElement(target)) {
                this.isHovering = true;
                this.cursor.classList.add('hover');
                this.createHoverExplosion();
            }
            
            if (this.isTextElement(target)) {
                this.isOverText = true;
                this.cursor.classList.add('text');
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            const target = e.target;
            
            if (this.isInteractiveElement(target)) {
                this.isHovering = false;
                this.cursor.classList.remove('hover');
            }
            
            if (this.isTextElement(target)) {
                this.isOverText = false;
                this.cursor.classList.remove('text');
            }
        });
        
        // Click effects
        document.addEventListener('mousedown', () => {
            this.isClicking = true;
            this.cursor.classList.add('click');
            this.createClickWave();
        });
        
        document.addEventListener('mouseup', () => {
            this.isClicking = false;
            this.cursor.classList.remove('click');
        });
        
        // Window resize handling
        window.addEventListener('resize', () => {
            this.repositionFloatingElements();
        });
    }

    isInteractiveElement(element) {
        const interactiveSelectors = [
            'a', 'button', 'input', 'textarea', 'select',
            '.btn', '.social-link', '.nav-link', '.project-link',
            '.skill-tag', '.project-card', '.contact-item'
        ];
        
        return interactiveSelectors.some(selector => {
            return element.matches ? element.matches(selector) : false;
        }) || element.closest && interactiveSelectors.some(selector => {
            return element.closest(selector);
        });
    }

    isTextElement(element) {
        const textSelectors = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div'];
        return textSelectors.includes(element.tagName?.toLowerCase());
    }

    createHoverExplosion() {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(245, 87, 108, 1), transparent);
                border-radius: 50%;
                left: ${this.mouseX}px;
                top: ${this.mouseY}px;
                pointer-events: none;
                z-index: 10001;
                animation: hoverExplosion 0.6s ease-out forwards;
                transform: rotate(${i * 45}deg) translateX(20px);
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    }

    createClickWave() {
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(102, 126, 234, 0.8);
            border-radius: 50%;
            left: ${this.mouseX - 10}px;
            top: ${this.mouseY - 10}px;
            pointer-events: none;
            z-index: 10001;
            animation: clickWave 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(wave);
        
        setTimeout(() => {
            wave.remove();
        }, 600);
    }

    repositionFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-3d-element');
        floatingElements.forEach(element => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        });
    }

    startAnimation() {
        const animate = () => {
            // Smooth cursor movement
            this.targetX += (this.mouseX - this.targetX) * 0.1;
            this.targetY += (this.mouseY - this.targetY) * 0.1;
            
            // Update cursor position
            this.cursor.style.left = `${this.targetX - 10}px`;
            this.cursor.style.top = `${this.targetY - 10}px`;
            
            // Update trail positions with delay
            this.trailElements.forEach((trail, index) => {
                trail.x += (this.targetX - trail.x) * (0.05 + index * 0.005);
                trail.y += (this.targetY - trail.y) * (0.05 + index * 0.005);
                
                trail.element.style.left = `${trail.x - 4}px`;
                trail.element.style.top = `${trail.y - 4}px`;
            });
            
            // Add rotation based on movement
            const velocity = Math.sqrt(
                Math.pow(this.mouseX - this.targetX, 2) + 
                Math.pow(this.mouseY - this.targetY, 2)
            );
            
            const rotation = velocity * 2;
            this.cursor.style.transform += ` rotateZ(${rotation}deg)`;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Advanced 3D Scene Manager
class Advanced3DSceneManager {
    constructor() {
        this.morphingShapes = [];
        this.glassElements = [];
        
        this.createMorphingShapes();
        this.enhanceExistingElements();
        this.createGlassRefractionEffects();
        this.setupAdvancedAnimations();
    }

    createMorphingShapes() {
        for (let i = 0; i < 6; i++) {
            const shape = document.createElement('div');
            shape.className = 'morphing-shape';
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const scale = 0.5 + Math.random() * 1;
            const delay = Math.random() * 20;
            
            shape.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                transform: scale(${scale});
                animation-delay: ${delay}s;
                z-index: -1;
            `;
            
            this.morphingShapes.push(shape);
            document.body.appendChild(shape);
        }
    }

    enhanceExistingElements() {
        // Add holographic effects to cards
        const cards = document.querySelectorAll('.project-card, .skill-category, .stat');
        cards.forEach(card => {
            card.classList.add('holographic-card');
        });
        
        // Add glass refraction to form elements
        const glassElements = document.querySelectorAll('.contact-form, .navbar');
        glassElements.forEach(element => {
            element.classList.add('glass-refraction');
        });
    }

    createGlassRefractionEffects() {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index % 2 === 0) {
                const glassOverlay = document.createElement('div');
                glassOverlay.className = 'glass-refraction-overlay';
                glassOverlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(1px);
                    pointer-events: none;
                    z-index: 1;
                `;
                
                section.style.position = 'relative';
                section.appendChild(glassOverlay);
            }
        });
    }

    setupAdvancedAnimations() {
        // Create dynamic lighting effects
        this.createDynamicLighting();
        
        // Setup parallax scrolling for 3D elements
        this.setupAdvancedParallax();
        
        // Create atmospheric effects
        this.createAtmosphericEffects();
    }

    createDynamicLighting() {
        const lightingOverlay = document.createElement('div');
        lightingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), 
                rgba(102, 126, 234, 0.1) 0%, 
                transparent 50%);
            pointer-events: none;
            z-index: 2;
            opacity: 0.3;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(lightingOverlay);
        
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            lightingOverlay.style.setProperty('--x', `${x}%`);
            lightingOverlay.style.setProperty('--y', `${y}%`);
        });
    }

    setupAdvancedParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            // Move floating elements based on scroll
            document.querySelectorAll('.floating-3d-element').forEach((element, index) => {
                const speed = 0.2 + (index % 3) * 0.1;
                const yOffset = scrolled * speed;
                const xOffset = Math.sin(scrolled * 0.001 + index) * 20;
                
                element.style.transform = `
                    translateX(${xOffset}px) 
                    translateY(${yOffset}px) 
                    translateZ(${Math.sin(scrolled * 0.002 + index) * 50}px)
                `;
            });
            
            // Move morphing shapes
            this.morphingShapes.forEach((shape, index) => {
                const speed = 0.1 + (index % 2) * 0.05;
                const offset = scrolled * speed;
                shape.style.transform += ` translateY(${offset}px)`;
            });
        });
    }

    createAtmosphericEffects() {
        // Create fog effect
        const fog = document.createElement('div');
        fog.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, 
                rgba(102, 126, 234, 0.05) 0%,
                transparent 30%,
                transparent 70%,
                rgba(118, 75, 162, 0.05) 100%);
            pointer-events: none;
            z-index: 1;
            animation: atmosphericFlow 30s ease-in-out infinite;
        `;
        
        document.body.appendChild(fog);
    }
}

// Inject additional animations
function injectAdvanced3DAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes hoverExplosion {
            0% {
                opacity: 1;
                transform: scale(1) translateX(0);
            }
            100% {
                opacity: 0;
                transform: scale(0.5) translateX(40px);
            }
        }
        
        @keyframes clickWave {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(8);
            }
        }
        
        @keyframes atmosphericFlow {
            0%, 100% {
                opacity: 0.3;
                transform: translateY(0);
            }
            50% {
                opacity: 0.6;
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize Ultra 3D Systems
function initializeUltra3DSystems() {
    // Inject CSS if not present
    if (!document.querySelector('link[href="ultra-3d-cursor.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'ultra-3d-cursor.css';
        document.head.appendChild(link);
    }
    
    injectAdvanced3DAnimations();
    
    // Initialize systems
    new Ultra3DCursor();
    new Advanced3DSceneManager();
    
    console.log(`
    ┌───────────────────────────────────────────────────────────┐
    │              🎆 ULTRA 3D CURSOR SYSTEM ACTIVE 🎆             │
    ├───────────────────────────────────────────────────────────┤
    │ 🔮 Custom 3D Cursor: ACTIVE                             │
    │ ✨ Holographic Effects: ENABLED                           │
    │ 🔶 Floating 3D Shapes: RENDERED                           │
    │ 🧠 Neural Network: CONNECTED                            │
    │ 🌊 Glass Refraction: APPLIED                            │
    │ 🌪️ Atmospheric Effects: FLOWING                           │
    └───────────────────────────────────────────────────────────┘
    
    🎉 Ultra-Realistic 3D Graphics System Initialized!
    `);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUltra3DSystems);
} else {
    initializeUltra3DSystems();
}

export { Ultra3DCursor, Advanced3DSceneManager };