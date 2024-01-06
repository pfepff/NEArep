var canvas = document.querySelector("canvas");
<<<<<<< Updated upstream
canvas.width = window.innerWidth / 1.3;
canvas.height = window.innerHeight / 1.2;
=======
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
>>>>>>> Stashed changes

var c = canvas.getContext("2d");
class PreyBoid {
  constructor() {
<<<<<<< Updated upstream
    this.radius = 9;
    this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
    this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
    this.speed = 20; // Set the speed
    this.angle = Math.random() * Math.PI * 2; // Set the angle
    this.visRadius = 100;
    this.visAngle = 2;
  }

  drawPreyVisionCone() {
    c.fillStyle = "rgba(255, 0, 0, 0.2)";
    c.moveTo(this.x,this.y);
    c.arc(this.x,this.y,this.visRadius, this.angle - this.visAngle, this.angle + this.visAngle);
    c.lineTo(this.x,this.y);
    c.closePath();
    c.fill();
=======
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
>>>>>>> Stashed changes
  }

  drawPreyBoid() {
    this.drawPreyVisionCone();
  
    c.fillStyle = "green";
    c.beginPath();
<<<<<<< Updated upstream
    c.moveTo(this.x + this.radius * Math.cos(this.angle), this.y + this.radius * Math.sin(this.angle));
    c.lineTo(this.x + this.radius * Math.cos(this.angle - (3 * Math.PI / 4)), this.y + this.radius * Math.sin(this.angle - (3 * Math.PI / 4)));
    c.lineTo(this.x + this.radius * Math.cos(this.angle + (3 * Math.PI / 4)), this.y + this.radius * Math.sin(this.angle + (3 * Math.PI / 4)));
=======
    c.moveTo(this.pos.x + Math.cos(this.angle) * this.size, this.pos.y + Math.sin(this.angle) * this.size);
    c.lineTo(this.pos.x + Math.cos(this.angle - (Math.PI * 2 / 3)) * this.size, this.pos.y + Math.sin(this.angle - (Math.PI * 2 / 3)) * this.size);
    c.lineTo(this.pos.x + Math.cos(this.angle + (Math.PI * 2 / 3)) * this.size, this.pos.y + Math.sin(this.angle + (Math.PI * 2 / 3)) * this.size);
>>>>>>> Stashed changes
    c.closePath();
    c.fill();
  }

  edgeCollision() {
    this.pos.x = (this.pos.x + canvas.width) % canvas.width;
    this.pos.y = (this.pos.y + canvas.height) % canvas.height;
  }

<<<<<<< Updated upstream
  takeStep() {
    this.edgeCollision()
    this.PreyPercieve
    //seperate
    //allign
    //cohere

    // Update the position based on the angle and speed
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
=======
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
>>>>>>> Stashed changes
  }
}

var PreyArray = [];
var numPrey = 1;

for (var i = 0; i < numPrey; i++) {
  var boid = new PreyBoid();
  PreyArray.push(boid);
}

function update() {
<<<<<<< Updated upstream
//  document.onkeypress = function (e) {
//    e = e || window.event;
    requestAnimationFrame(update);
//  };
=======
  //document.onkeypress = function (e) {
  //  e = e || window.event;
    requestAnimationFrame(update);
  //};
>>>>>>> Stashed changes
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < PreyArray.length; i++) {
    PreyArray[i].takeStep();
    PreyArray[i].drawPreyBoid(); 
  }
}

update();