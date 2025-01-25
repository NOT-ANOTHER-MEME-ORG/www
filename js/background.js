const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Größe des Canvas anpassen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Punkt und Linien-Parameter
const points = [];
const numPoints = 100; // Anzahl der Punkte
const maxDistance = 150; // Maximale Verbindungsdistanz zwischen Punkten

// Punktobjekt
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 2 - 1; // zufällige Bewegung in x-Richtung
        this.vy = Math.random() * 2 - 1; // zufällige Bewegung in y-Richtung
        this.size = Math.random() * 2 + 1; // Punktgröße
    }

    move() {
        // Bewegung der Punkte
        this.x += this.vx;
        this.y += this.vy;

        // Umkehr bei Randberührung
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
    }
}

// Punkte initialisieren
for (let i = 0; i < numPoints; i++) {
    points.push(new Point(Math.random() * canvas.width, Math.random() * canvas.height));
}

// Linien zeichnen
function drawLines() {
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

// Animation aktualisieren
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach(point => {
        point.move();
        point.draw();
    });

    drawLines();
    requestAnimationFrame(animate);
}

// Fenstergröße anpassen
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
