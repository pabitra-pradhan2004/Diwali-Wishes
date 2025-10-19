
const btn = document.getElementById('surpriseBtn');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
const bgMusic = document.getElementById('bgMusic');

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
});

class Particle {
    constructor(x, y, color, velX, velY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velX = velX;
        this.velY = velY;
        this.alpha = 1;
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
        this.velY += 0.02;
        this.alpha -= 0.01;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

let particles = [];

function createFirework(x, y) {
    const colors = ['#ff0040', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#ff00ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        const velX = Math.cos(angle) * speed;
        const velY = Math.sin(angle) * speed;
        particles.push(new Particle(x, y, color, velX, velY));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, w, h);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(index, 1);
    });
}

btn.addEventListener('click', () => {
    btn.style.display = 'none';
    document.querySelector('h1').style.display = 'block';
    document.querySelector('p').style.display = 'block';
    document.querySelector('.diya').style.display = 'block';
    canvas.style.display = 'block';

    bgMusic.play(); // 🎵 Start music

    setInterval(() => {
        const x = Math.random() * w;
        const y = Math.random() * h * 0.5;
        createFirework(x, y);
    }, 500);

    animate();
});
