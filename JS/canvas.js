var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth / 1.3;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

class PreyBoid {
  constructor() {
    this.size = 9;
    this.x = Math.random() * (canvas.width - this.size * 2) + this.size;
    this.y = Math.random() * (canvas.height - this.size * 2) + this.size;
    this.speed = 5;
    this.angle = Math.random() * Math.PI * 2;
    this.visRadius = 150;
    this.visAngle = 4;
  }

  drawPreyVisionCone() {
    c.fillStyle = "rgba(255, 0, 0, 0.2)";
    // Circle Sector
     c.moveTo(this.x,this.y);
     c.arc(this.x,this.y,this.visRadius, this.angle - (this.visAngle / 2), this.angle + (this.visAngle / 2));
     c.lineTo(this.x,this.y);
     c.closePath();
     c.fill();
  }

  drawPreyBoid() {
    c.fillStyle = "green";
    // Triangle
    c.beginPath();
    c.moveTo(this.x + this.size * Math.cos(this.angle), this.y + this.size * Math.sin(this.angle));
    c.lineTo(this.x + this.size * Math.cos(this.angle - (3 * Math.PI / 4)), this.y + this.size * Math.sin(this.angle - (3 * Math.PI / 4)));
    c.lineTo(this.x + this.size * Math.cos(this.angle + (3 * Math.PI / 4)), this.y + this.size * Math.sin(this.angle + (3 * Math.PI / 4)));
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
    for (var i = 0; i < PreyArray.length; i++) {
      let dY = Math.abs(this.y - PreyArray[i].y)
      let dX = Math.abs(this.x - PreyArray[i].x)
      let angleTo = Math.atan2(dY,dX)
      if (PreyArray[i] != this && Math.sqrt(dX**2 + dY**2) < this.visRadius && y == 2) {
        console.log(this,"spotted", PreyArray[i])
      }
    }
  }

  takeStep() {
    if (this == PreyArray[0]) {
      this.edgeCollision()
      this.PreySeperation()

      // Update the position based on the angle and speed
      this.x += this.speed * Math.cos(this.angle);
      this.y += this.speed * Math.sin(this.angle);
      this.angle += (Math.random() - 0.5) / 2
    }
    else {
      this.x = window.innerWidth/2;
      this.y = window.innerHeight/2;
      this.angle = 0;
    }
  }
}

var PreyArray = [];
var numPrey = 2;

for (var i = 0; i < numPrey; i++) {
  var boid = new PreyBoid();
  PreyArray.push(boid);
}

function update() {
  document.onkeypress = function (e) {
    e = e || window.event;
    requestAnimationFrame(update);
  };
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < PreyArray.length; i++) {
    PreyArray[i].takeStep();
    PreyArray[i].drawPreyBoid();
  }
}

update();