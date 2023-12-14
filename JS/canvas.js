var canvas = document.querySelector("canvas");
canvas.width = (window.innerWidth / 1.3);
canvas.height = (window.innerHeight / 1.2);

var c = canvas.getContext("2d");

class PreyBoid {
    constructor() {
        this.radius = 9;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
        this.dx = (Math.random() - 0.5) * 10;
        this.dy = (Math.random() - 0.5) * 10;
    }

    drawPreyBoid() {
        c.strokeStyle = "black";
        c.fillStyle = "green";
//Triangle
        c.beginPath();
        // Calculate the angle of the normalized direction vector
        let angle = Math.atan2(this.dy, this.dx);
        // Draw the triangle
        c.moveTo(this.x + this.radius * Math.cos(angle), this.y + this.radius * Math.sin(angle));
        c.lineTo(this.x + this.radius * Math.cos(angle - (3 * Math.PI / 4)), this.y + this.radius * Math.sin(angle - (3 * Math.PI / 4)));
        c.lineTo(this.x + this.radius * Math.cos(angle + (3 * Math.PI / 4)), this.y + this.radius * Math.sin(angle + (3 * Math.PI / 4)));
        c.closePath();
        c.stroke();
        c.fill();
    }

    takeStep() {
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

var PreyArray = [];
var numPrey = 20;

for (var i = 0; i < numPrey; i++) {
    var boid = new PreyBoid();
    PreyArray.push(boid);
}

function update() {
    requestAnimationFrame(update);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < PreyArray.length; i++) {
        PreyArray[i].takeStep();
        PreyArray[i].drawPreyBoid();
    }
}
update();