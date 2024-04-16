const canvas = document.querySelector('canvas'),
      context = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const STAR_COLOR = '#fff'; // Warna bintang putih
const STAR_SIZE = 2;
const STAR_MIN_SCALE = 0.1;
const STAR_MAX_SCALE = 2;
const STAR_COUNT = 150;
const STAR_SPEED = 0.002; // Kecepatan pergerakan bintang

let stars = [];

function generateStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * width - width / 2,
            y: Math.random() * height - height / 2,
            z: Math.random() * STAR_MAX_SCALE
        });
    }
}

function updateStars() {
    stars.forEach(star => {
        star.z -= STAR_SPEED;
        if (star.z <= STAR_MIN_SCALE || Math.abs(star.x / star.z) > width / 2 || Math.abs(star.y / star.z) > height / 2) {
            star.z = STAR_MAX_SCALE;
            star.x = Math.random() * width - width / 2;
            star.y = Math.random() * height - height / 2;
        }
    });
}

function renderStars() {
    context.clearRect(0, 0, width, height);
    context.translate(width / 2, height / 2);
    stars.forEach(star => {
        let scale = STAR_SIZE * (1 - star.z / STAR_MAX_SCALE);
        context.beginPath();
        context.arc(star.x / star.z, star.y / star.z, scale, 0, Math.PI * 2);
        context.fillStyle = STAR_COLOR;
        context.fill();
    });
    context.translate(-width / 2, -height / 2);
}

function renderStars() {
    context.clearRect(0, 0, width, height);
    context.translate(width / 2, height / 2);
    stars.forEach(star => {
        let scale = STAR_SIZE * (1 - star.z / STAR_MAX_SCALE);
        context.beginPath();
        context.arc(star.x / star.z, star.y / star.z, scale, 0, Math.PI * 2);
        context.fillStyle = STAR_COLOR;
        context.fill();
    });
    context.translate(-width / 2, -height / 2);
}

function step() {
    updateStars();
    renderStars();
    requestAnimationFrame(step);
}

window.onresize = function() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    generateStars();
};

generateStars();
step();