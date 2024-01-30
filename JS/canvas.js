import { PreyBoid } from './PreyBoid.js'; 

var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

let settings = {
  pause : false,
  highlightBoid : false,
  avoidWalls : false,
  drawLineTo : false,
  drawVisionCone : false,
  drawavoidanceCone : false,
  drawForceVector : false
};

//Buttons
document.getElementById("pauseButton").addEventListener('click', function() {
  settings.pause = !settings.pause;
});
document.getElementById("highlightBoidButton").addEventListener('click', function() {
  settings.highlightBoid = !settings.highlightBoid;
});
document.getElementById("avoidWallsButton").addEventListener('click', function() {
  settings.avoidWalls = !settings.avoidWalls;
});
document.getElementById("drawLineButton").addEventListener('click', function() {
  settings.drawLineTo = !settings.drawLineTo;
});
document.getElementById("visionConeButton").addEventListener('click', function() {
  settings.drawVisionCone = !settings.drawVisionCone;
});
document.getElementById("avoidanceConeButton").addEventListener('click', function() {
  settings.drawavoidanceCone = !settings.drawavoidanceCone;
});
document.getElementById("forceVectorButton").addEventListener('click', function() {
  settings.drawForceVector = !settings.drawForceVector;
});

var preyArray = [];
var numPrey = document.getElementById("numBoidsInput").value;

var seperationValue = document.getElementById("seperationInput").value;
var cohesionValue = document.getElementById("cohesionInput").value;
var alignmentValue = document.getElementById("alignmentInput").value;

var visRadius = document.getElementById("visRadiusInput").value;
var avoidRadius = document.getElementById("avoidRadiusInput").value;
var wallAvoidance = document.getElementById("wallAvoidanceInput").value;
var minSpeed = document.getElementById("minSpeedInput").value;
var maxSpeed = document.getElementById("maxSpeedInput").value;

// Define preyArray globally
var preyArray = [];

// Define load function to populate preyArray
function load() {
  var numPrey = document.getElementById("numBoidsInput").value;
  for (var i = 0; i < numPrey; i++) {
    var obj = new PreyBoid();
    preyArray.push(obj);
  }
}

// Update function to handle animation and dynamic boid count
function update() {
  requestAnimationFrame(update);
  if (!settings.pause){
    numPrey = document.getElementById("numBoidsInput").value;

    // Check for changes in numPrey and update preyArray
    if (numPrey !== preyArray.length) {
      if (numPrey > preyArray.length) {
        var numToAdd = numPrey - preyArray.length;
        for (var i = 0; i < numToAdd; i++) {
          var obj = new PreyBoid();
          preyArray.push(obj);
        }
      } else {
        preyArray.splice(numPrey); // Remove excess boids
      }
    }

    seperationValue = document.getElementById("seperationInput").value;
    cohesionValue = document.getElementById("cohesionInput").value; 
    alignmentValue = document.getElementById("alignmentInput").value;

    visRadius = document.getElementById("visRadiusInput").value;
    avoidRadius = document.getElementById("avoidRadiusInput").value;
    wallAvoidance = document.getElementById("wallAvoidanceInput").value;
    minSpeed = document.getElementById("minSpeedInput").value;
    maxSpeed = document.getElementById("maxSpeedInput").value;


    c.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < preyArray.length; i++) {
      preyArray[i].preyTakeStep();
    }
  }
}
//////////////////////

load();
update();
export {c, canvas, preyArray, settings, seperationValue, cohesionValue, alignmentValue, visRadius, avoidRadius, wallAvoidance, maxSpeed, minSpeed};