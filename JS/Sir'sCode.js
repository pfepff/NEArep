var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
class Class_ {
    constructor() {
        this.visRadius = 250;
        this.visAngle = 2;
        this.angle = 90;
        this.h = 230;
        this.v = 250;
        this.size = 9;
        this.pointPos = {
            x: 230,
            y: 250
        };
        this.sightPos = {
            x: 100,
            y: 100
        }
    }

    main() {

        // draw visual cone
        let startSectorAngle = this.angle - this.visAngle / 2;
        let endSectorAngle = this.angle + this.visAngle / 2;
    
        let sectorStartVector = {
            x: this.sightPos.x + (this.visRadius * Math.cos(startSectorAngle)),
            y: this.sightPos.y + (this.visRadius * Math.sin(startSectorAngle))
        };
    
        let sectorEndVector = {
            x: this.sightPos.x + (this.visRadius * Math.cos(endSectorAngle)),
            y: this.sightPos.y + (this.visRadius * Math.sin(endSectorAngle))
        };
    
        console.log(sectorStartVector);
        console.log(sectorEndVector);
        console.log(this.pointPos);
    
        //Point
        c.fillStyle = "Red"
        c.beginPath();
        c.arc(this.pointPos.x, this.pointPos.y, 5, 0, 2 * Math.PI);
        c.closePath();
        c.fill();
    
        //VisualCone
        c.fillStyle = "rgba(255, 0, 0, 0.2)";
        c.beginPath();
        c.moveTo(this.sightPos.x, this.sightPos.y);
        c.arc(this.sightPos.x, this.sightPos.y, this.visRadius, this.angle - (this.visAngle / 2), this.angle + (this.visAngle / 2));
        c.lineTo(this.sightPos.x, this.sightPos.y);
        c.closePath();
        c.fill();
    
        if (-sectorStartVector.x * this.pointPos.y + sectorStartVector.y * this.pointPos.x > 0 && -sectorEndVector.x * this.pointPos.y + sectorEndVector.y * this.pointPos.x > 0) {
            console.log("inside");
        }
        else {
            console.log("Outside");
        }

        this.angle += 1 * Math.PI / 180;
    }
}

var Array = [];

var obj = new Class_();
Array.push(obj);


function update() {
    document.onkeypress = function (e) {
      e = e || window.event;
      requestAnimationFrame(update);
    };
    c.clearRect(0, 0, canvas.width, canvas.height);
  
    obj.main();
}

update()