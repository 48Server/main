const canvas = document.querySelector('canvas'),
      context = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const STAR_COLOR = '#fff';
const STAR_SIZE = 0.5;
const STAR_MIN_SCALE = 0.1;
const STAR_MAX_SCALE = 5;
const STAR_COUNT = 1000;
const STAR_SPEED = 0.01;
const BLACK_HOLE_RADIUS = 50; // Radius black hole
const BLACK_HOLE_PULL = 0.02; // Kekuatan tarikan black hole

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
        // Menambahkan efek gravitasi black hole
        let dx = star.x * BLACK_HOLE_PULL;
        let dy = star.y * BLACK_HOLE_PULL;
        star.x -= dx;
        star.y -= dy;
        star.z -= STAR_SPEED;
        if (star.z <= STAR_MIN_SCALE || Math.sqrt(star.x * star.x + star.y * star.y) < BLACK_HOLE_RADIUS) {
            star.z = STAR_MAX_SCALE;
            star.x = Math.random() * width - width / 2;
            star.y = Math.random() * height - height / 2;
        }
    });
}

function renderStars() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    // Menggambar black hole
    context.beginPath();
    context.arc(width / 2, height / 2, BLACK_HOLE_RADIUS, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
    context.strokeStyle = 'white';
    context.stroke();
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