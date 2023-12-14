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
        c.strokeStyle = "green";
        c.fillStyle = "green";
//Circle
        // c.beginPath();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.moveTo(this.x, this.y);
        // // Normalize the direction vector
        // let mag = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        // let normaldx = this.dx / mag;
        // let normaldy = this.dy / mag;
        // // Scale the normalized vector to the radius of the circle
        // c.lineTo(this.x + normaldx * this.radius, this.y + normaldy * this.radius);
        // c.stroke();
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