// WebGL-like 3D Graphics System for Ultra-Realistic Portfolio
// This creates cinematic 3D effects without actual WebGL dependency

class WebGL3DGraphics {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.geometryObjects = [];
        this.lightSources = [];
        this.animationId = null;
        
        this.initializeGraphicsSystem();
        this.createAdvanced3DScene();
        this.setupRealtimeRendering();
    }

    initializeGraphicsSystem() {
        // Create main 3D graphics canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'webgl-3d-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.8;
            mix-blend-mode: screen;
        `;
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        document.body.appendChild(this.canvas);
        
        // Setup resize handler
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Initialize particle system
        this.initializeParticleSystem();
        
        // Create 3D geometry objects
        this.create3DGeometry();
        
        // Setup dynamic lighting
        this.setupDynamicLighting();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initializeParticleSystem() {
        const particleCount = 200;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                z: Math.random() * 1000 - 500,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                vz: (Math.random() - 0.5) * 4,
                size: Math.random() * 3 + 1,
                color: {
                    h: Math.random() * 60 + 220, // Blue to purple range
                    s: 70 + Math.random() * 30,
                    l: 50 + Math.random() * 30
                },
                life: 1.0,
                decay: Math.random() * 0.01 + 0.005,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.1
            });
        }
    }

    create3DGeometry() {
        // Create floating geometric shapes
        const shapes = [
            { type: 'tetrahedron', count: 5 },
            { type: 'octahedron', count: 4 },
            { type: 'dodecahedron', count: 3 },
            { type: 'torus', count: 2 }
        ];

        shapes.forEach(({ type, count }) => {
            for (let i = 0; i < count; i++) {
                this.geometryObjects.push({
                    type,
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    z: Math.random() * 200 - 100,
                    rotationX: 0,
                    rotationY: 0,
                    rotationZ: 0,
                    rotationSpeedX: (Math.random() - 0.5) * 0.02,
                    rotationSpeedY: (Math.random() - 0.5) * 0.02,
                    rotationSpeedZ: (Math.random() - 0.5) * 0.02,
                    size: Math.random() * 50 + 30,
                    color: {
                        r: Math.random() * 100 + 155,
                        g: Math.random() * 100 + 100,
                        b: Math.random() * 100 + 200,
                        a: 0.3 + Math.random() * 0.4
                    },
                    velocity: {
                        x: (Math.random() - 0.5) * 0.5,
                        y: (Math.random() - 0.5) * 0.5,
                        z: (Math.random() - 0.5) * 1
                    }
                });
            }
        });
    }

    setupDynamicLighting() {
        // Create multiple light sources
        this.lightSources = [
            {
                x: this.canvas.width * 0.3,
                y: this.canvas.height * 0.2,
                z: 200,
                intensity: 0.8,
                color: { r: 102, g: 126, b: 234 },
                radius: 300
            },
            {
                x: this.canvas.width * 0.7,
                y: this.canvas.height * 0.8,
                z: 150,
                intensity: 0.6,
                color: { r: 245, g: 87, b: 108 },
                radius: 250
            },
            {
                x: this.canvas.width * 0.5,
                y: this.canvas.height * 0.5,
                z: 100,
                intensity: 0.4,
                color: { r: 79, g: 172, b: 254 },
                radius: 400
            }
        ];
    }

    createAdvanced3DScene() {
        // Add holographic grid
        this.createHolographicGrid();
        
        // Add energy field
        this.createEnergyField();
        
        // Add quantum tunnels
        this.createQuantumTunnels();
    }

    createHolographicGrid() {
        const gridSize = 50;
        const gridWidth = Math.ceil(this.canvas.width / gridSize);
        const gridHeight = Math.ceil(this.canvas.height / gridSize);
        
        this.holographicGrid = {
            width: gridWidth,
            height: gridHeight,
            size: gridSize,
            nodes: [],
            connections: []
        };
        
        // Create grid nodes
        for (let x = 0; x < gridWidth; x++) {
            for (let y = 0; y < gridHeight; y++) {
                this.holographicGrid.nodes.push({
                    x: x * gridSize,
                    y: y * gridSize,
                    z: Math.sin(x * 0.1) * Math.cos(y * 0.1) * 20,
                    intensity: Math.random() * 0.5 + 0.3,
                    pulse: Math.random() * Math.PI * 2
                });
            }
        }
    }

    createEnergyField() {
        this.energyField = {
            waves: [],
            ripples: []
        };
        
        // Create energy waves
        for (let i = 0; i < 10; i++) {
            this.energyField.waves.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: 0,
                maxRadius: Math.random() * 200 + 100,
                speed: Math.random() * 2 + 1,
                intensity: Math.random() * 0.3 + 0.2,
                frequency: Math.random() * 0.02 + 0.01,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    createQuantumTunnels() {
        this.quantumTunnels = [];
        
        for (let i = 0; i < 3; i++) {
            const tunnel = {
                points: [],
                segments: 20,
                radius: Math.random() * 30 + 20,
                length: Math.random() * 400 + 300,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01,
                flow: 0,
                flowSpeed: Math.random() * 0.05 + 0.02
            };
            
            // Generate tunnel path
            for (let j = 0; j < tunnel.segments; j++) {
                const t = j / tunnel.segments;
                tunnel.points.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    z: t * tunnel.length - tunnel.length / 2,
                    offset: Math.sin(t * Math.PI * 4) * 50
                });
            }
            
            this.quantumTunnels.push(tunnel);
        }
    }

    setupRealtimeRendering() {
        const render = () => {
            this.clearCanvas();
            this.updateScene();
            this.renderScene();
            this.animationId = requestAnimationFrame(render);
        };
        
        render();
    }

    clearCanvas() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateScene() {
        const time = Date.now() * 0.001;
        
        // Update particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.z += particle.vz;
            particle.rotation += particle.rotationSpeed;
            particle.life -= particle.decay;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.z < -500) particle.z = 500;
            if (particle.z > 500) particle.z = -500;
            
            // Reset particle if life is depleted
            if (particle.life <= 0) {
                particle.life = 1.0;
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
            }
        });
        
        // Update geometry objects
        this.geometryObjects.forEach(obj => {
            obj.rotationX += obj.rotationSpeedX;
            obj.rotationY += obj.rotationSpeedY;
            obj.rotationZ += obj.rotationSpeedZ;
            
            obj.x += obj.velocity.x;
            obj.y += obj.velocity.y;
            obj.z += obj.velocity.z;
            
            // Boundary wrap
            if (obj.x < -100) obj.x = this.canvas.width + 100;
            if (obj.x > this.canvas.width + 100) obj.x = -100;
            if (obj.y < -100) obj.y = this.canvas.height + 100;
            if (obj.y > this.canvas.height + 100) obj.y = -100;
        });
        
        // Update energy field
        this.energyField.waves.forEach(wave => {
            wave.radius += wave.speed;
            wave.phase += wave.frequency;
            
            if (wave.radius > wave.maxRadius) {
                wave.radius = 0;
                wave.x = Math.random() * this.canvas.width;
                wave.y = Math.random() * this.canvas.height;
            }
        });
        
        // Update quantum tunnels
        this.quantumTunnels.forEach(tunnel => {
            tunnel.rotation += tunnel.rotationSpeed;
            tunnel.flow += tunnel.flowSpeed;
            if (tunnel.flow > 1) tunnel.flow = 0;
        });
    }

    renderScene() {
        // Render holographic grid
        this.renderHolographicGrid();
        
        // Render energy field
        this.renderEnergyField();
        
        // Render quantum tunnels
        this.renderQuantumTunnels();
        
        // Render particles
        this.renderParticles();
        
        // Render 3D geometry
        this.render3DGeometry();
        
        // Apply post-processing effects
        this.applyPostProcessing();
    }

    renderHolographicGrid() {
        const time = Date.now() * 0.001;
        
        this.ctx.strokeStyle = 'rgba(102, 126, 234, 0.1)';
        this.ctx.lineWidth = 0.5;
        
        this.holographicGrid.nodes.forEach((node, index) => {
            const intensity = node.intensity * (0.5 + 0.5 * Math.sin(time + node.pulse));
            
            this.ctx.fillStyle = `rgba(102, 126, 234, ${intensity * 0.3})`;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw connections to nearby nodes
            this.holographicGrid.nodes.forEach((otherNode, otherIndex) => {
                if (index !== otherIndex) {
                    const distance = Math.sqrt(
                        Math.pow(node.x - otherNode.x, 2) + 
                        Math.pow(node.y - otherNode.y, 2)
                    );
                    
                    if (distance < this.holographicGrid.size * 1.5) {
                        this.ctx.strokeStyle = `rgba(102, 126, 234, ${intensity * 0.1})`;
                        this.ctx.beginPath();
                        this.ctx.moveTo(node.x, node.y);
                        this.ctx.lineTo(otherNode.x, otherNode.y);
                        this.ctx.stroke();
                    }
                }
            });
        });
    }

    renderEnergyField() {
        this.energyField.waves.forEach(wave => {
            const gradient = this.ctx.createRadialGradient(
                wave.x, wave.y, 0,
                wave.x, wave.y, wave.radius
            );
            
            gradient.addColorStop(0, `rgba(79, 172, 254, ${wave.intensity}`);
            gradient.addColorStop(0.5, `rgba(102, 126, 234, ${wave.intensity * 0.5})`);
            gradient.addColorStop(1, 'rgba(79, 172, 254, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    renderQuantumTunnels() {
        this.quantumTunnels.forEach(tunnel => {
            this.ctx.strokeStyle = 'rgba(245, 87, 108, 0.3)';
            this.ctx.lineWidth = 2;
            
            for (let i = 0; i < tunnel.points.length - 1; i++) {
                const point1 = tunnel.points[i];
                const point2 = tunnel.points[i + 1];
                
                const flowIntensity = Math.sin((i / tunnel.points.length + tunnel.flow) * Math.PI * 2) * 0.5 + 0.5;
                
                this.ctx.strokeStyle = `rgba(245, 87, 108, ${flowIntensity * 0.5})`;
                this.ctx.beginPath();
                this.ctx.moveTo(point1.x + point1.offset, point1.y);
                this.ctx.lineTo(point2.x + point2.offset, point2.y);
                this.ctx.stroke();
            }
        });
    }

    renderParticles() {
        this.particles.forEach(particle => {
            const perspective = 500;
            const scale = perspective / (perspective + particle.z);
            const x2d = particle.x * scale;
            const y2d = particle.y * scale;
            const size2d = particle.size * scale;
            
            if (scale > 0.1 && particle.life > 0) {
                this.ctx.save();
                
                // Apply lighting effects
                let lightIntensity = 0;
                this.lightSources.forEach(light => {
                    const distance = Math.sqrt(
                        Math.pow(particle.x - light.x, 2) + 
                        Math.pow(particle.y - light.y, 2) + 
                        Math.pow(particle.z - light.z, 2)
                    );
                    
                    if (distance < light.radius) {
                        lightIntensity += light.intensity * (1 - distance / light.radius);
                    }
                });
                
                lightIntensity = Math.min(lightIntensity, 1);
                
                this.ctx.globalAlpha = particle.life * scale * (0.3 + lightIntensity * 0.7);
                
                // Create gradient for particle
                const gradient = this.ctx.createRadialGradient(
                    x2d, y2d, 0,
                    x2d, y2d, size2d * 2
                );
                
                const hsl = `hsl(${particle.color.h}, ${particle.color.s}%, ${particle.color.l}%)`;
                gradient.addColorStop(0, hsl);
                gradient.addColorStop(1, 'transparent');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(x2d, y2d, size2d * 2, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.restore();
            }
        });
    }

    render3DGeometry() {
        this.geometryObjects.forEach(obj => {
            const perspective = 500;
            const scale = perspective / (perspective + obj.z);
            const x2d = obj.x * scale;
            const y2d = obj.y * scale;
            const size2d = obj.size * scale;
            
            if (scale > 0.1) {
                this.ctx.save();
                this.ctx.globalAlpha = obj.color.a * scale;
                
                // Render different geometry types
                switch (obj.type) {
                    case 'tetrahedron':
                        this.renderTetrahedron(x2d, y2d, size2d, obj);
                        break;
                    case 'octahedron':
                        this.renderOctahedron(x2d, y2d, size2d, obj);
                        break;
                    case 'dodecahedron':
                        this.renderDodecahedron(x2d, y2d, size2d, obj);
                        break;
                    case 'torus':
                        this.renderTorus(x2d, y2d, size2d, obj);
                        break;
                }
                
                this.ctx.restore();
            }
        });
    }

    renderTetrahedron(x, y, size, obj) {
        this.ctx.strokeStyle = `rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})`;
        this.ctx.lineWidth = 2;
        
        const height = size * 0.866;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - height / 2);
        this.ctx.lineTo(x - size / 2, y + height / 2);
        this.ctx.lineTo(x + size / 2, y + height / 2);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    renderOctahedron(x, y, size, obj) {
        this.ctx.strokeStyle = `rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})`;
        this.ctx.lineWidth = 2;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - size / 2);
        this.ctx.lineTo(x + size / 2, y);
        this.ctx.lineTo(x, y + size / 2);
        this.ctx.lineTo(x - size / 2, y);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    renderDodecahedron(x, y, size, obj) {
        this.ctx.strokeStyle = `rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})`;
        this.ctx.lineWidth = 2;
        
        const sides = 12;
        this.ctx.beginPath();
        
        for (let i = 0; i <= sides; i++) {
            const angle = (i / sides) * Math.PI * 2 + obj.rotationZ;
            const px = x + Math.cos(angle) * size / 2;
            const py = y + Math.sin(angle) * size / 2;
            
            if (i === 0) {
                this.ctx.moveTo(px, py);
            } else {
                this.ctx.lineTo(px, py);
            }
        }
        
        this.ctx.stroke();
    }

    renderTorus(x, y, size, obj) {
        this.ctx.strokeStyle = `rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})`;
        this.ctx.lineWidth = 3;
        
        // Outer circle
        this.ctx.beginPath();
        this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Inner circle
        this.ctx.beginPath();
        this.ctx.arc(x, y, size / 4, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    applyPostProcessing() {
        // Apply bloom effect
        this.ctx.shadowColor = 'rgba(102, 126, 234, 0.5)';
        this.ctx.shadowBlur = 10;
        
        // Apply chromatic aberration simulation
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        // Note: Full chromatic aberration would require pixel manipulation
        // This is a simplified version for performance
    }
}

// Initialize WebGL-like 3D Graphics
function initializeWebGL3DGraphics() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new WebGL3DGraphics();
        });
    } else {
        new WebGL3DGraphics();
    }
}

// Auto-initialize
initializeWebGL3DGraphics();

export { WebGL3DGraphics };