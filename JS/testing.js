var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
class PreyBoid {
  constructor() {
    this.size = 9;
    this.pos = {
      x:canvas.width/2, //Math.random() * (canvas.width - this.size * 2) + this.size,
      y:canvas.height/2 //Math.random() * (canvas.height - this.size * 2) + this.size
    }
    this.speedVector = {
      dx: (Math.random() - 0.5) * 20,
      dy: (Math.random() - 0.5) * 20 
    };
    this.angle = Math.atan2(this.speedVector.dy,this.speedVector.dx);
    this.visRadius = 150;
    this.visAngle = 4;
  }

  drawPreyVisionCone() {
      c.fillStyle = "rgba(255, 0, 0, 0.2)";
       c.beginPath();
       c.moveTo(this.pos.x,this.pos.y);
       c.arc(this.pos.x,this.pos.y,this.visRadius, this.angle - (this.visAngle / 2), this.angle + (this.visAngle / 2));
       c.lineTo(this.pos.x,this.pos.y);
       c.closePath();
       c.fill();
  }

  drawPreyBoid() {
    this.drawPreyVisionCone();
  
    c.fillStyle = "green";
    c.beginPath();
    c.moveTo(this.pos.x + Math.cos(this.angle) * this.size, this.pos.y + Math.sin(this.angle) * this.size);
    c.lineTo(this.pos.x + Math.cos(this.angle - (Math.PI * 2 / 3)) * this.size, this.pos.y + Math.sin(this.angle - (Math.PI * 2 / 3)) * this.size);
    c.lineTo(this.pos.x + Math.cos(this.angle + (Math.PI * 2 / 3)) * this.size, this.pos.y + Math.sin(this.angle + (Math.PI * 2 / 3)) * this.size);
    c.closePath();
    c.fill();
  }

  edgeCollision() {
    this.pos.x = (this.pos.x + canvas.width) % canvas.width;
    this.pos.y = (this.pos.y + canvas.height) % canvas.height;
  }

  normalizeAngle(){
    this.angle = (this.angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  }

  preySeperation() {
    for (var i = 0; i < PreyArray.length; i++) {
      
    }
  }

  takeStep() {
    this.edgeCollision();
    this.normalizeAngle();
  
    this.pos.x += this.speedVector.dx; // Update the x position using dx
    this.pos.y += this.speedVector.dy; // Update the y position using dy
    this.angle = Math.atan2(this.speedVector.dy, this.speedVector.dx);
  }
}

var PreyArray = [];
var numPrey = 1;

for (var i = 0; i < numPrey; i++) {
  var boid = new PreyBoid();
  PreyArray.push(boid);
}

function update() {
  //document.onkeypress = function (e) {
  //  e = e || window.event;
    requestAnimationFrame(update);
  //};
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < PreyArray.length; i++) {
    PreyArray[i].takeStep();
    PreyArray[i].drawPreyBoid(); 
  }
}

update();