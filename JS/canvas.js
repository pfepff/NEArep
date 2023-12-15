var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth / 1.3;
canvas.height = window.innerHeight / 1.2;

var c = canvas.getContext("2d");

class PreyBoid {
  constructor() {
    this.radius = 9;
    this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
    this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
    this.speed = 20; // Set the speed
    this.angle = Math.random() * Math.PI * 2; // Set the angle
    this.visRadius = 50;
    this.visAngle = 2;
  }

  drawPreyVisionCone() {
    c.fillStyle = ["green", "pink", "purple", "black"][Math.floor(4 * Math.random())];
    c.moveTo(this.x,this.y);
    c.arc(this.x,this.y,this.visRadius, this.angle - this.visAngle, this.angle + this.visAngle);
    c.lineTo(this.x,this.y);
    c.fill();
  }

  drawPreyBoid() {
    c.fillStyle = "red";
    // Triangle
    c.beginPath();
    c.moveTo(this.x + this.radius * Math.cos(this.angle), this.y + this.radius * Math.sin(this.angle));
    c.lineTo(this.x + this.radius * Math.cos(this.angle - (3 * Math.PI / 4)), this.y + this.radius * Math.sin(this.angle - (3 * Math.PI / 4)));
    c.lineTo(this.x + this.radius * Math.cos(this.angle + (3 * Math.PI / 4)), this.y + this.radius * Math.sin(this.angle + (3 * Math.PI / 4)));
    c.closePath();
    c.fill();
    this.drawPreyVisionCone()
  }

  edgeCollision() {
    //Edge collision
    // Bounce
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.angle = Math.PI - this.angle; // Reverse the angle
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.angle = -this.angle; // Reverse the angle
    }

    // // Pacman
    // if (this.x > canvas.width) {
    //   this.x = 0;
    // }
    // if (this.x < 0) {
    //   this. x = canvas.width;
    // }
    // if (this.y > canvas.height) {
    //   this.y = 0
    // }
    // if (this.y < 0) {
    //   this.y = canvas.height
    // }
  }


  takeStep() {
    this.edgeCollision()

    // Update the position based on the angle and speed
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
  }
}

var PreyArray = [];
var numPrey = 20;

for (var i = 0; i < numPrey; i++) {
  var boid = new PreyBoid();
  PreyArray.push(boid);
}

function update() {
//  document.onkeypress = function (e) {
//    e = e || window.event;
    requestAnimationFrame(update);
//  };
  // c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < PreyArray.length; i++) {
    PreyArray[i].takeStep();
    PreyArray[i].drawPreyBoid();
  }
}

update();