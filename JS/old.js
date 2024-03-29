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
    this.visRadius = 200;
    this.visAngle = 1;
  }

  drawPreyVisionCone() {
    c.fillStyle = "rgba(255, 0, 0, 0.2)";
    c.moveTo(this.x,this.y);
    c.arc(this.x,this.y,this.visRadius, this.angle - this.visAngle, this.angle + this.visAngle);
    c.lineTo(this.x,this.y);
    c.closePath();
    c.fill();
  }

  drawPreyBoid() {
    c.fillStyle = "green";
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
    // Pacman
    this.x = (this.x + canvas.width) % canvas.width;
    this.y = (this.y + canvas.height) % canvas.height;
  }

  PreySeperation() {
    for (var i = 0; i < numPrey; i++) {
        var dx = PreyArray[i].x - this.x;
        var dy = PreyArray[i].y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.visRadius && Math.abs(Math.atan2(dy, dx) - this.angle) < this.visAngle) {
          console.log(this, "spotted", PreyArray[i])
        }
    }
  }

  takeStep() {
    this.edgeCollision()
    this.PreySeperation()

    // Update the position based on the angle and speed
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
  }
}

var PreyArray = [];
var numPrey = 2;

for (var i = 0; i < numPrey; i++) {
  var obj = new PreyBoid();
  PreyArray.push(obj);
}

function update() {
//  document.onkeypress = function (e) {
//    e = e || window.event;
    requestAnimationFrame(update);
//  };
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < PreyArray.length; i++) {
    PreyArray[i].takeStep();
    PreyArray[i].drawPreyBoid();
  }
}

update();