import {c, canvas, preyArray} from './canvas.js';

class PreyBoid{
    constructor() {
      this.size = 9;
      this.pos = {
        x: Math.random() * (canvas.width - this.size * 2) + this.size,
        y: Math.random() * (canvas.height - this.size * 2) + this.size
      };
      this.velocity = {
        dx: (Math.random() - 0.5) * 20,
        dy: (Math.random() - 0.5) * 20 
      };
      this.visRadius = 250;
      this.visAngle = Math.PI * 2;

      this.seperationConstant = 0.01;
      this.cohesionConstant = 0.1;
      this.alignmentConstant = 0.1;

      this.maxVelocity = 1;
      this.minVeclocity = 1;
    }
  
    preyDrawBoid() {
      if (this == preyArray[0]) {
        this.preyDrawVisionCone();
      }
    
      // Calculate color based on speed
      let redValue = Math.min(255, this.speed * 20);
      let greenValue = Math.min(255, 255 - redValue);

      c.fillStyle = `rgb(${greenValue},${redValue},0)`;
      c.beginPath();
      c.moveTo(this.pos.x + Math.cos(this.angle) * this.size, this.pos.y + Math.sin(this.angle) * this.size);
      c.lineTo(this.pos.x + Math.cos(this.angle - (Math.PI * 2 / 3)) * this.size, this.pos.y + Math.sin(this.angle - (Math.PI * 2 / 3)) * this.size);
      c.lineTo(this.pos.x + Math.cos(this.angle + (Math.PI * 2 / 3)) * this.size, this.pos.y + Math.sin(this.angle + (Math.PI * 2 / 3)) * this.size);
      c.closePath();
      c.fill();
    }
  
    preyDrawVisionCone() {
      c.fillStyle = "rgba(255, 0, 0, 0.1)";
      c.beginPath();
      c.moveTo(this.pos.x,this.pos.y);
      c.arc(this.pos.x, this.pos.y, this.visRadius, this.angle - (this.visAngle / 2), this.angle + (this.visAngle / 2));
      c.lineTo(this.pos.x,this.pos.y);
      c.closePath();
      c.fill();
    }

    preySeperate() {
        this.velocity.dx -= Math.cos(this.angleBetween) * this.speed * this.seperationConstant;
        this.velocity.dy -= Math.sin(this.angleBetween) * this.speed * this.seperationConstant;
    }

    preyAlign() {
        // point towards mean of angle of boids around it, could speed up if its further away based on the dot product (might make them too snappy) 
    }

    preyCohere() {
        // travel toward centre of mass of closest boids
    }

    preyResolve() {
      this.preySeperate();
      this.preyAlign();
      this.preyCohere();
    }

    preySight() {
      for (var i = 0; i < preyArray.length; i++) {
        this.distX = preyArray[i].pos.x - this.pos.x;
        this.distY = preyArray[i].pos.y - this.pos.y;
        this.distBetween = Math.sqrt(this.distX ** 2 + this.distY ** 2);
        this.angleBetween = Math.atan2(this.distY, this.distX);

        /*
        cos(a) = (a0*b1 + b0*b1) / (|a0|*|b1| + |b0|*|b1|)

        a = acos((a0*b1 + b0*b1) / (|a0|*|b1| + |b0|*|b1|))

        a = [this.vecocity.dx, this.vecocity.dy]
        a = [PreyArray[i].vecocity.dx, PreyArray[i].vecocity.dy]

        if a = this, b = that:
          a = acos((this.velocity.dx * preyArray[i].velocity.dy + preyArray[i].velocity.dx * this.velocity.dy) / |this.velocity.dx| * |preyArray[i].velocity.dy| + |preyArray[i].velocity.dx|)

        */
//        if (this == preyArray[0]) {
          if (this.distBetween <= this.visRadius && this !== preyArray[i]) {
            this.preyResolve();
          }
//        }
      }
    }

    preyEdgeHandling() {
      this.pos.x = (this.pos.x + canvas.width) % canvas.width;
      this.pos.y = (this.pos.y + canvas.height) % canvas.height;
    }

    preyMinMaxVelocity() {
      if (this.speed > this.maxVelocity || this.speed < -this.maxVelocity) {
        while (1 == 1){
          this.velocity.dx = 0;
          console.log("caught")
        }
      }
      if (this.speed < this.minVeclocity && this.speed > -this.minVeclocity) {
        
      }
    }

    preyTakeStep() {
      this.speed = Math.sqrt(this.velocity.dx**2 + this.velocity.dy**2)
      this.angle = Math.atan2(this.velocity.dy,this.velocity.dx);

      this.preyMinMaxVelocity();
      this.preyEdgeHandling();
      this.preySight();

      this.pos.x += this.velocity.dx;
      this.pos.y += this.velocity.dy;
      this.preyDrawBoid();
    }
  }

export { PreyBoid };