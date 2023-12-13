var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

class PreyBoid {
    constructor() {
        this.rad = 30;
        this.x = Math.random() * (canvas.width - this.rad * 2) + this.rad;
        this.y = Math.random() * (canvas.height - this.rad * 2) + this.rad;
        this.dx = 5;
        this.dy = 5;
    }

    drawPreyBoid() {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        c.stroke();
    }

    moveForward() {
        if ((this.x + 30) > canvas.width || (this.x - this.rad) < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;

        if ((this.y + 30) > canvas.height || (this.y - this.rad) < 0) {
            this.dy = -this.dy;
        }
        this.y += this.dy;
    }
}

var CircleArray = [];
var numBoids = 2;

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