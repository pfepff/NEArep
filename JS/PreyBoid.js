import {c, canvas, preyArray, settings, seperationValue, cohesionValue, alignmentValue, visRadius, avoidRadius, wallAvoidance, maxSpeed, minSpeed} from './canvas.js';

class PreyBoid{
  constructor() {
    this.Frame_Buffer = 1;
    this.stut = 0;

    this.size = 4;
    this.pos = {
      // x: canvas.width/2,
      // y: canvas.height/2
      x: Math.random() * (canvas.width - this.size * 2) + this.size,
      y:Math.random() * (canvas.height - this.size * 2) + this.size
    };
    this.velocity = {
      // dx: Math.random() - 0.5,
      // dy: Math.random() - 0.5
      dx: Math.random() < 0.5 ? -maxSpeed/2 : maxSpeed/2,
      dy: Math.random() < 0.5 ? -maxSpeed/2 : maxSpeed/2
    };

    this.boidsSpotted = [];
    this.boidsTooClose = [];
  }

  preyDrawBoid() {
    if (settings.drawVisionCone) {
      this.preyDrawVisionCone();
    }
    if (settings.drawavoidanceCone) {
      this.preyDrawAvoidanceCone();
    }
    if (settings.drawForceVector) {
      this.preyDrawForceVectors();
    }

    let redValue = Math.min(255, this.speed * 255 / maxSpeed);
    let greenValue = Math.min(255, 255 - redValue);

    if (settings.highlightBoid) {
      if (this == preyArray[0]){
        c.fillStyle = `rgba(255, 0, 0, 1)`;
      }
      else {
        c.fillStyle = `rgb(${greenValue}, ${redValue}, 0, 0.2)`;
      }
    }

    else {
      c.fillStyle = `rgb(${greenValue},${redValue},0)`;
    }

    c.beginPath();
    c.moveTo(this.pos.x + Math.cos(this.angle) * this.size, this.pos.y + Math.sin(this.angle) * this.size);
    c.lineTo(this.pos.x + Math.cos(this.angle - (Math.PI * 2 / 3)) * this.size, this.pos.y + Math.sin(this.angle - (Math.PI * 2 / 3)) * this.size);
    c.lineTo(this.pos.x + Math.cos(this.angle + (Math.PI * 2 / 3)) * this.size, this.pos.y + Math.sin(this.angle + (Math.PI * 2 / 3)) * this.size);
    c.closePath();
    c.fill();
  }

  preyDrawForceVectors() {
    if (this == preyArray[0]) {
      c.strokeStyle = "rgb(255, 255, 255)";
      c.beginPath();
      c.moveTo(this.pos.x,this.pos.y);
      c.lineTo(this.pos.x + this.velocity.dx * 20, this.pos.y);
      c.moveTo(this.pos.x,this.pos.y);
      c.lineTo(this.pos.x, this.pos.y + this.velocity.dy * 20);
      c.closePath();
      c.stroke();
    }
  }

  preyDrawVisionCone() {
    if (this == preyArray[0]) {
      c.fillStyle = "rgba(255, 255, 255, 0.1)";
      c.beginPath();
      c.moveTo(this.pos.x,this.pos.y);
      c.arc(this.pos.x, this.pos.y, visRadius, this.angle - (Math.PI*2 / 2), this.angle + (Math.PI*2 / 2));
      c.lineTo(this.pos.x,this.pos.y);
      c.closePath();
      c.fill();
      c.fillStyle = "rgba(0, 0, 0, 0.2)";
      c.beginPath();
      c.moveTo(this.pos.x,this.pos.y);
      c.arc(this.pos.x, this.pos.y, avoidRadius, this.angle - (avoidRadius / 2), this.angle + (avoidRadius / 2));
      c.lineTo(this.pos.x,this.pos.y);
      c.closePath();
      c.fill();
    }
  }

  preyDrawAvoidanceCone() {
    if (this == preyArray[0]) {
      c.fillStyle = "rgba(255, 255, 255, 0.1)";
      c.beginPath();
      c.moveTo(this.pos.x,this.pos.y);
      c.arc(this.pos.x, this.pos.y, avoidRadius, this.angle - (Math.PI*2 / 2), this.angle + (Math.PI*2 / 2));
      c.lineTo(this.pos.x,this.pos.y);
      c.closePath();
      c.fill();
    }
  }

  drawLineToVis() {
    if (this == preyArray[0]) {
      c.strokeStyle = "rgba(255, 255, 0, 0.5)";
      c.beginPath();
      c.moveTo(this.pos.x,this.pos.y);
      c.lineTo(this.pos.x + this.distX,this.pos.y + this.distY)
      c.closePath();
      c.stroke();
    }
  }

  drawLineToavoidance() {
    if (this == preyArray[0]) {
      c.strokeStyle = "rgba(255, 0, 0, 0.5)";
      c.beginPath();
      c.moveTo(this.pos.x,this.pos.y);
      c.lineTo(this.pos.x + this.distX,this.pos.y + this.distY)
      c.closePath();
      c.stroke();
    }
  }

  preySeperate() {
    for (var i = 0; i < this.boidsTooClose.length; i++) {
      this.avoidanceVector = {
        x : this.pos.x - this.boidsTooClose[i].pos.x,
        y : this.pos.y - this.boidsTooClose[i].pos.y
      }
      this.velocity.dx += this.avoidanceVector.x * seperationValue;
      this.velocity.dy += this.avoidanceVector.y * seperationValue;
    }
  }

  preyAlign() {
    this.MeanVelocity = {
      dx : 0,
      dy : 0
    }
    if (this.boidsSpotted.length > 0) {
      for (var i = 0; i < this.boidsSpotted.length; i++) {
        this.MeanVelocity.dx += this.boidsSpotted[i].velocity.dx;
        this.MeanVelocity.dy += this.boidsSpotted[i].velocity.dy;
      }
      this.MeanVelocity.dx /= this.boidsSpotted.length;
      this.MeanVelocity.dy /= this.boidsSpotted.length;

      this.velocity.dx += (this.MeanVelocity.dx - this.velocity.dx) * alignmentValue;
      this.velocity.dy += (this.MeanVelocity.dy - this.velocity.dy) * alignmentValue;
    }
  }

  preyCohere() {
    this.MeanPosistion = {
      x : 0,
      y : 0
    }
    if (this.boidsSpotted.length > 0) {
      for (var i = 0; i < this.boidsSpotted.length; i++){
        this.MeanPosistion.x += this.boidsSpotted[i].pos.x;
        this.MeanPosistion.y += this.boidsSpotted[i].pos.y;
      }
      this.MeanPosistion.x /= this.boidsSpotted.length;
      this.MeanPosistion.y /= this.boidsSpotted.length;
      
      this.velocity.dx += (this.MeanPosistion.x - this.pos.x) * cohesionValue;
      this.velocity.dy += (this.MeanPosistion.y - this.pos.y)* cohesionValue;
    }
  }

  preyResolve() {
    this.preySeperate();
    this.preyAlign();
    this.preyCohere();
    this.boidsSpotted.length = 0;
    this.boidsTooClose.length = 0;
  }

  preySight() {
    for (var i = 0; i < preyArray.length; i++) {
      this.distX = preyArray[i].pos.x - this.pos.x;
      this.distY = preyArray[i].pos.y - this.pos.y;
      this.distBetween = Math.sqrt(this.distX ** 2 + this.distY ** 2);
      this.angleBetween = Math.atan2(this.distY, this.distX);

      /*cos(a) = (a0*b1 + b0*b1) / (|a0|*|b1| + |b0|*|b1|)#a = acos((a0*b1 + b0*b1) / (|a0|*|b1| + |b0|*|b1|))#a = [this.vecocity.dx, this.vecocity.dy]#a = [PreyArray[i].vecocity.dx, PreyArray[i].vecocity.dy]#if a = this, b = that:#a = acos((this.velocity.dx * preyArray[i].velocity.dy + preyArray[i].velocity.dx * this.velocity.dy) / |this.velocity.dx| * |preyArray[i].velocity.dy| + |preyArray[i].velocity.dx|)*/
      if (this.distBetween <= visRadius && this.distBetween >= avoidRadius && this !== preyArray[i]) {
        this.boidsSpotted.push(preyArray[i]);
        if (settings.drawLineTo) {
          this.drawLineToVis();
        }
      }
      if (this.distBetween < avoidRadius && this !== preyArray[i]) {
        this.boidsTooClose.push(preyArray[i]);
        if (settings.drawLineTo) {
          this.drawLineToavoidance();
        }
      }
    }
    this.preyResolve();
  }

  preyEdgeHandling() {
    if (settings.avoidWalls) {
// Left
      if (this.pos.x < 0 + visRadius) {
        this.velocity.dx += Number(wallAvoidance);
      }
// Right
      if (this.pos.x > canvas.width - visRadius) {
        this.velocity.dx -= Number(wallAvoidance);  
      }
// Top
      if (this.pos.y < 0 + visRadius) {
        this.velocity.dy += Number(wallAvoidance);
      }
// Bottom
      if (this.pos.y > canvas.height - visRadius) {
        this.velocity.dy -= Number(wallAvoidance);
      }
    }
    else {
      this.pos.x = (this.pos.x + canvas.width) % canvas.width;
      this.pos.y = (this.pos.y + canvas.height) % canvas.height;
    }
  }

  preyMinMaxVelocity() {
    if (this.speed > maxSpeed) {
    this.velocity.dx = (this.velocity.dx / this.speed) * maxSpeed;
    this.velocity.dy = (this.velocity.dy / this.speed) * maxSpeed;
    }
    if (this.speed < minSpeed) {
      this.velocity.dx = (this.velocity.dx / this.speed) * minSpeed;
      this.velocity.dy = (this.velocity.dy / this.speed) * minSpeed;
    }
  }

  preyTakeStep() {
    this.speed = Math.sqrt(this.velocity.dx**2 + this.velocity.dy**2);
    this.angle = Math.atan2(this.velocity.dy,this.velocity.dx);

    this.preyMinMaxVelocity();
    this.preyEdgeHandling();

    if (this.stut > this.Frame_Buffer){
      this.preySight();
    }
    else{
      this.stut ++;
    }

    this.pos.x += this.velocity.dx;
    this.pos.y += this.velocity.dy;
    this.preyDrawBoid();
  }
}

export { PreyBoid };