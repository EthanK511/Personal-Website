// ====== CANVAS ANIMATION ======
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let time = 0;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 2 + 0.5;
        this.color = ['rgba(0, 217, 255, ', 'rgba(255, 0, 110, ', 'rgba(131, 56, 236, '][
            Math.floor(Math.random() * 3)
        ];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        const opacity = 0.6 + 0.4 * Math.sin(time * 0.01 + this.x);
        ctx.fillStyle = this.color + opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function drawConnections() {
    const maxDistance = 150;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                const opacity = (1 - distance / maxDistance) * 0.3;
                ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    drawConnections();
    time++;
    requestAnimationFrame(animateCanvas);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initParticles();
animateCanvas();

// ====== SCROLL ANIMATIONS ======
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Observe elements for scroll animations
    document.querySelectorAll('.project-card, .skill-card').forEach(el => {
        observer.observe(el);
    });
});

// Add in-view styles dynamically
const style = document.createElement('style');
style.textContent = `
    .project-card, .skill-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .project-card.in-view, .skill-card.in-view {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ====== SMOOTH SCROLL FOR NAVIGATION ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            closeMenu();
        }
    });
});

// ====== HAMBURGER MENU ======
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

function closeMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// ====== PARALLAX EFFECT ======
let scrollY = window.scrollY;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.transform = `translateY(${scrollY * (0.3 + index * 0.1)}px)`;
    });
});

// ====== CURSOR EFFECT ======
const createCursorFollower = () => {
    const style = document.createElement('style');
    style.textContent = `
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 30px;
            height: 30px;
            background: radial-gradient(circle, rgba(0, 217, 255, 0.5) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            filter: blur(8px);
        }

        body::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 10px;
            height: 10px;
            background: rgba(0, 217, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX - 15;
        const y = e.clientY - 15;
        
        document.body.style.setProperty('--cursor-x', x + 'px');
        document.body.style.setProperty('--cursor-y', y + 'px');
        
        const before = document.createElement('div');
        const pseudoElements = document.querySelectorAll('*');
    });
};

// ====== DYNAMIC BACKGROUND ======
const updateBackgroundGradient = () => {
    const time = Date.now() * 0.0001;
    const x = Math.sin(time) * 50 + 50;
    const y = Math.cos(time * 0.7) * 50 + 50;
    
    // Add subtle gradient shift if needed
};

setInterval(updateBackgroundGradient, 50);

// ====== TEXT ANIMATION ======
const animateTitle = () => {
    const titleElement = document.querySelector('.hero-title');
    const words = titleElement.querySelectorAll('.word');
    
    let wordIndex = 0;
    
    const animateWords = () => {
        words.forEach((word, index) => {
            word.style.opacity = index === wordIndex % words.length ? '1' : '0.7';
        });
        wordIndex++;
    };
    
    setInterval(animateWords, 3000);
    animateWords();
};

document.addEventListener('DOMContentLoaded', animateTitle);

// ====== VIEWPORT HEIGHT FIX FOR MOBILE ======
const setVH = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
};

setVH();
window.addEventListener('resize', setVH);

// ====== ADD INTERACTIVITY TO PROJECT LINKS ======
const projectLinks = document.querySelectorAll('.project-link');
projectLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = '#ffbe0b';
        this.parentElement.parentElement.style.borderColor = '#ffbe0b';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.color = '#00d9ff';
        this.parentElement.parentElement.style.borderColor = 'rgba(0, 217, 255, 0.1)';
    });
});

// ====== PERFORMANCE: Use requestAnimationFrame for smooth animations ======
const handleScroll = () => {
    // Smooth scroll handler
};

window.addEventListener('scroll', handleScroll, { passive: true });

console.log('🚀 Welcome to Ethan\'s creative coding portfolio!');
