const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const phrases = [
  "Te Amo mi amor", "Eres la más preciosa", "Mi Mar  linda", "Amor de mi vida", "Me encantas mucho",
  "Mi cielito", "Eres mi todo", "Mi princesa hermosa", "Mi universo", "Contigo todo"
];

class Phrase {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = (Math.random() - 0.5) * canvas.width * 2;
    this.y = (Math.random() - 0.5) * canvas.height * 2;
    this.z = Math.random() * canvas.width;
    this.text = phrases[Math.floor(Math.random() * phrases.length)];
    this.size = 40; // letra más grande
  }

  update() {
    this.z -= 7; // más velocidad
    if (this.z < 0.1) this.reset();
  }

  draw() {
    const scale = canvas.width / (canvas.width + this.z);
    const x2d = canvas.width / 2 + this.x * scale;
    const y2d = canvas.height / 2 + this.y * scale;
    const fontSize = this.size * scale;

    ctx.font = `${fontSize}px Indie Flower`;
    ctx.fillStyle = `rgba(255,255,255,${scale})`;
    ctx.fillText(this.text, x2d, y2d);
  }
}

const stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: Math.random()
  });
}

const shootingStars = [];
function createShootingStar() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const length = Math.random() * 80 + 50;
  shootingStars.push({ x, y, length, speed: 8, alpha: 1 });
}

setInterval(createShootingStar, 1000);

const phrasesFlying = [];
for (let i = 0; i < 60; i++) {
  phrasesFlying.push(new Phrase());
}

function drawStars() {
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();
  }
}

function drawShootingStars() {
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.length, s.y + s.length);
    ctx.strokeStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    s.x += s.speed;
    s.y -= s.speed;
    s.alpha -= 0.02;
    if (s.alpha <= 0) shootingStars.splice(i, 1);
  }
}

function animate() {
  ctx.fillStyle = "#0d0029";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawStars();
  drawShootingStars();

  for (let phrase of phrasesFlying) {
    phrase.update();
    phrase.draw();
  }

  requestAnimationFrame(animate);
}

animate();
