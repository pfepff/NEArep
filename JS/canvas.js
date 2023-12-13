var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

class PreyBoid {
    constructor() {
        this.radius = 10;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
        this.dx = (Math.random() - 0.5) * 10;
        this.dy = (Math.random() - 0.5) * 10;
    }

    drawPreyBoid() {
        c.strokeStyle = "green"
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.moveTo(this.x, this.y);
        c.lineTo(this.x + this.dx * 2, this.y + this.dy * 2);
        c.stroke();
    }

    moveForward() {
//Edge collision and movement X
        if ((this.x + this.radius) > canvas.width || (this.x - this.radius) < 0) {
        this.dx = -this.dx;
        }
        this.x += this.dx;
//Edge collision and movement Y
        if ((this.y + this.radius) > canvas.height || (this.y - this.radius) < 0) {
            this.dy = -this.dy;
        }
        this.y += this.dy;
    }
}

var CircleArray = [];
var numBoids = 10;

for (var i = 0; i < numBoids; i++) {
    var boid = new PreyBoid();
    CircleArray.push(boid);
}

function update() {
    requestAnimationFrame(update);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < CircleArray.length; i++) {
        CircleArray[i].moveForward();
        CircleArray[i].drawPreyBoid();
    }
}
update();