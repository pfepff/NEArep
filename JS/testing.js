var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth / 1.3;
canvas.height = window.innerHeight / 1.2;

var c = canvas.getContext("2d");

this.radius = 9;
this.x = canvas.width/2;
this.y = canvas.height/2;
this.speed = 20; // Set the speed
this.angle = 0; // Set the angle
this.visRadius = 50;
this.visAngle = 2;

//
c.fillStyle = "green";
c.beginPath();
c.moveTo(this.x + this.radius * Math.cos(this.angle), this.y + this.radius * Math.sin(this.angle));
c.lineTo(this.x + this.radius * Math.cos(this.angle - (3 * Math.PI / 4)), this.y + this.radius * Math.sin(this.angle - (3 * Math.PI / 4)));
c.lineTo(this.x + this.radius * Math.cos(this.angle + (3 * Math.PI / 4)), this.y + this.radius * Math.sin(this.angle + (3 * Math.PI / 4)));
c.closePath();
c.fill();
//


c.fillStyle = "red"
c.moveTo(this.x,this.y);
c.arc(this.x,this.y,this.visRadius, this.angle - this.visAngle, this.angle + this.visAngle);
c.lineTo(this.x,this.y);
c.fill();