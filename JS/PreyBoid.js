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
    // Check if the vision cone should be drawn
    if (settings.drawVisionCone) {
      this.preyDrawVisionCone();
    }
    // Check if the avoidance cone should be drawn
    if (settings.drawavoidanceCone) {
      this.preyDrawAvoidanceCone();
    }
    // Check if the force vectors should be drawn
    if (settings.drawForceVector) {
      this.preyDrawForceVectors();
    }
  
    // Calculate the color values based on speed
    let redValue = Math.min(255, this.speed * 255 / maxSpeed);
    let greenValue = Math.min(255, 255 - redValue);
  
    // Set the fill style based on settings and boid index
    if (settings.highlightBoid) {
      if (this == preyArray[0]) {
        // Highlight the first boid with red color
        c.fillStyle = `rgba(255, 0, 0, 1)`;
      } else {
        // Set the fill style based on speed for other boids
        c.fillStyle = `rgb(${greenValue}, ${redValue}, 0, 0.2)`;
      }
    } else {
      // Set the fill style based on speed for all boids without highlighting
      c.fillStyle = `rgb(${greenValue},${redValue},0)`;
    }
  
    // Draw the boid triangle
    c.beginPath();
    c.moveTo(this.pos.x + Math.cos(this.angle) * this.size, this.pos.y + Math.sin(this.angle) * this.size);
    c.lineTo(this.pos.x + Math.cos(this.angle - (Math.PI * 2 / 3)) * this.size, this.pos.y + Math.sin(this.angle - (Math.PI * 2 / 3)) * this.size);
    c.lineTo(this.pos.x + Math.cos(this.angle + (Math.PI * 2 / 3)) * this.size, this.pos.y + Math.sin(this.angle + (Math.PI * 2 / 3)) * this.size);
    c.closePath();
    c.fill();
  }

  preyDrawForceVectors() {
    // Check if the current boid is the first one in the array
    if (this == preyArray[0]) {
      // Set the stroke style to white for the first boid
      c.strokeStyle = "rgb(255, 255, 255)";
      // Draw a line representing the x-component of the velocity vector
      c.beginPath();
      c.moveTo(this.pos.x, this.pos.y);
      c.lineTo(this.pos.x + this.velocity.dx * 20, this.pos.y);
      // Draw a line representing the y-component of the velocity vector
      c.moveTo(this.pos.x, this.pos.y);
      c.lineTo(this.pos.x, this.pos.y + this.velocity.dy * 20);
      c.closePath();
      c.stroke();
    }
  }

  preyDrawVisionCone() {
    // Check if the current boid is the first one in the array
    if (this == preyArray[0]) {
      // Set the fill style for the vision cone with a low opacity white color
      c.fillStyle = "rgba(255, 255, 255, 0.1)";
      // Draw the main vision cone
      c.beginPath();
      c.moveTo(this.pos.x, this.pos.y);
      c.arc(this.pos.x, this.pos.y, visRadius, this.angle - (Math.PI * 2 / 2), this.angle + (Math.PI * 2 / 2));
      c.lineTo(this.pos.x, this.pos.y);
      c.closePath();
      c.fill();
  
      // Set the fill style for the avoidance cone with a low opacity black color
      c.fillStyle = "rgba(0, 0, 0, 0.2)";
      // Draw the avoidance cone
      c.beginPath();
      c.moveTo(this.pos.x, this.pos.y);
      c.arc(this.pos.x, this.pos.y, avoidRadius, this.angle - (avoidRadius / 2), this.angle + (avoidRadius / 2));
      c.lineTo(this.pos.x, this.pos.y);
      c.closePath();
      c.fill();
    }
  }

  preyDrawAvoidanceCone() {
    // Check if the current boid is the first one in the array
    if (this == preyArray[0]) {
      // Set the fill style for the avoidance cone with a low opacity white color
      c.fillStyle = "rgba(255, 255, 255, 0.1)";
      // Draw the avoidance cone
      c.beginPath();
      c.moveTo(this.pos.x, this.pos.y);
      c.arc(this.pos.x, this.pos.y, avoidRadius, this.angle - (Math.PI * 2 / 2), this.angle + (Math.PI * 2 / 2));
      c.lineTo(this.pos.x, this.pos.y);
      c.closePath();
      c.fill();
    }
  }

  drawLineToVis() {
    // Check if the current boid is the first one in the array
    if (this == preyArray[0]) {
      // Set the stroke style for the line with a semi-transparent yellow color
      c.strokeStyle = "rgba(255, 255, 0, 0.5)";
      // Draw the line from the boid's position to the calculated target position
      c.beginPath();
      c.moveTo(this.pos.x, this.pos.y);
      c.lineTo(this.pos.x + this.distX, this.pos.y + this.distY);
      c.closePath();
      c.stroke();
    }
  }

  drawLineToavoidance() {
    // Check if the current boid is the first one in the array
    if (this == preyArray[0]) {
      // Set the stroke style for the line with a semi-transparent red color
      c.strokeStyle = "rgba(255, 0, 0, 0.5)";
      // Draw the line from the boid's position to the calculated target position
      c.beginPath();
      c.moveTo(this.pos.x, this.pos.y);
      c.lineTo(this.pos.x + this.distX, this.pos.y + this.distY);
      c.closePath();
      c.stroke();
    }
  }

  preySeperate() {
    // Loop through the boids that are too close to the current boid
    for (var i = 0; i < this.boidsTooClose.length; i++) {
      // Calculate the avoidance vector based on the positions of the boids
      this.avoidanceVector = {
        x: this.pos.x - this.boidsTooClose[i].pos.x,
        y: this.pos.y - this.boidsTooClose[i].pos.y
      }
      // Adjust the velocity of the boid based on the avoidance vector and separation value
      this.velocity.dx += this.avoidanceVector.x * seperationValue;
      this.velocity.dy += this.avoidanceVector.y * seperationValue;
    }
  }

  preyAlign() {
    // Initialize the MeanVelocity
    this.MeanVelocity = {
      dx: 0,
      dy: 0
    }
    // Check if there are other boids spotted by the current boid
    if (this.boidsSpotted.length > 0) {
      // Calculate the mean velocity of the spotted boids
      for (var i = 0; i < this.boidsSpotted.length; i++) {
        this.MeanVelocity.dx += this.boidsSpotted[i].velocity.dx;
        this.MeanVelocity.dy += this.boidsSpotted[i].velocity.dy;
      }
      this.MeanVelocity.dx /= this.boidsSpotted.length;
      this.MeanVelocity.dy /= this.boidsSpotted.length;
  
      // Adjust the velocity of the boid based on the mean velocity and alignment value
      this.velocity.dx += (this.MeanVelocity.dx - this.velocity.dx) * alignmentValue;
      this.velocity.dy += (this.MeanVelocity.dy - this.velocity.dy) * alignmentValue;
    }
  }

  preyCohere() {
    // Initialize the MeanPosition
    this.MeanPosition = {
      x: 0,
      y: 0
    }
    // Check if there are other boids spotted by the current boid
    if (this.boidsSpotted.length > 0) {
      // Calculate the mean position of the spotted boids
      for (var i = 0; i < this.boidsSpotted.length; i++) {
        this.MeanPosition.x += this.boidsSpotted[i].pos.x;
        this.MeanPosition.y += this.boidsSpotted[i].pos.y;
      }
      this.MeanPosition.x /= this.boidsSpotted.length;
      this.MeanPosition.y /= this.boidsSpotted.length;
  
      // Adjust the velocity of the boid based on the mean position and cohesion value
      this.velocity.dx += (this.MeanPosition.x - this.pos.x) * cohesionValue;
      this.velocity.dy += (this.MeanPosition.y - this.pos.y) * cohesionValue;
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
    // Loop through all the prey boids
    for (var i = 0; i < preyArray.length; i++) {
      // Calculate the distance between the current boid and the prey
      this.distX = preyArray[i].pos.x - this.pos.x;
      this.distY = preyArray[i].pos.y - this.pos.y;
      this.distBetween = Math.sqrt(this.distX ** 2 + this.distY ** 2);
      this.angleBetween = Math.atan2(this.distY, this.distX);
  
      // Check if the prey is within the visibility radius and not too close
      if (this.distBetween <= visRadius && this.distBetween >= avoidRadius && this !== preyArray[i]) {
        // Add the prey to the spotted boids array
        this.boidsSpotted.push(preyArray[i]);
        // Draw line to the spotted prey if enabled
        if (settings.drawLineTo) {
          this.drawLineToVis();
        }
      }
      // Check if the prey is too close
      if (this.distBetween < avoidRadius && this !== preyArray[i]) {
        // Add the prey to the too close boids array
        this.boidsTooClose.push(preyArray[i]);
        // Draw line to avoid the too close prey if enabled
        if (settings.drawLineTo) {
          this.drawLineToavoidance();
        }
      }
    }
    // Resolve the behaviors (separation, alignment, cohesion) after sighting prey
    this.preyResolve();
  }

  preyEdgeHandling() {
    // Check if wall avoidance is enabled
    if (settings.avoidWalls) {
      // Left wall avoidance
      if (this.pos.x < 0 + visRadius) {
        this.velocity.dx += Number(wallAvoidance);
      }
      // Right wall avoidance
      if (this.pos.x > canvas.width - visRadius) {
        this.velocity.dx -= Number(wallAvoidance);  
      }
      // Top wall avoidance
      if (this.pos.y < 0 + visRadius) {
        this.velocity.dy += Number(wallAvoidance);
      }
      // Bottom wall avoidance
      if (this.pos.y > canvas.height - visRadius) {
        this.velocity.dy -= Number(wallAvoidance);
      }
    }
    // If wall avoidance is not enabled, wrap around the canvas
    else {
      this.pos.x = (this.pos.x + canvas.width) % canvas.width;
      this.pos.y = (this.pos.y + canvas.height) % canvas.height;
    }
  }

  preyMinMaxVelocity() {
    // Adjust velocity if current speed exceeds maximum speed
    if (this.speed > maxSpeed) {
      this.velocity.dx = (this.velocity.dx / this.speed) * maxSpeed;
      this.velocity.dy = (this.velocity.dy / this.speed) * maxSpeed;
    }
    // Adjust velocity if current speed is below minimum speed
    if (this.speed < minSpeed) {
      this.velocity.dx = (this.velocity.dx / this.speed) * minSpeed;
      this.velocity.dy = (this.velocity.dy / this.speed) * minSpeed;
    }
  }

  preyTakeStep() {
    // Calculate speed and angle based on current velocity
    this.speed = Math.sqrt(this.velocity.dx**2 + this.velocity.dy**2);
    this.angle = Math.atan2(this.velocity.dy, this.velocity.dx);
  
    // Adjust velocity if it exceeds maximum or falls below minimum speed
    this.preyMinMaxVelocity();
  
    // Handle edge behavior based on canvas and wall avoidance settings
    this.preyEdgeHandling();
  
    // Check if it's time to update boid's perception and resolve interactions
    if (this.stut > this.Frame_Buffer){
      this.preySight();
    }
    else {
      this.stut++;
    }
  
    // Update boid's position based on its velocity
    this.pos.x += this.velocity.dx;
    this.pos.y += this.velocity.dy;
  
    // Draw the boid on the canvas
    this.preyDrawBoid();
  }
}

export { PreyBoid };