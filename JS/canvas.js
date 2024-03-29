import { PreyBoid } from './PreyBoid.js'; 

// Selecting the canvas element and setting its width and height to match the window
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

// Initializing settings for the simulation
let settings = {
  pause : false,
  highlightBoid : false,
  avoidWalls : false,
  drawLineTo : false,
  drawVisionCone : false,
  drawavoidanceCone : false,
  drawForceVector : false
};

//Button logic
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

// Defines variables globally as they are used all over the code in multiple objects
  // Doesn't neccessarily need to be declared as global, but the variables are used all the time in multiple files and are constant, unless defined by the user
var preyArray = [];

var seperationValue = document.getElementById("seperationInput").value;
var cohesionValue = document.getElementById("cohesionInput").value;
var alignmentValue = document.getElementById("alignmentInput").value;

var size = document.getElementById("boidSizeInput").value;
var visRadius = document.getElementById("visRadiusInput").value;
var avoidRadius = document.getElementById("avoidRadiusInput").value;
var wallAvoidance = document.getElementById("wallAvoidanceInput").value;
var minSpeed = document.getElementById("minSpeedInput").value;
var maxSpeed = document.getElementById("maxSpeedInput").value;

var preyArray = [];

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

  // Resets boid positions
  document.getElementById("resetButton").addEventListener('click', function() {
    preyArray.length = 0;
    load();
  });

  if (!settings.pause){
    size = document.getElementById("boidSizeInput").value;
    seperationValue = document.getElementById("seperationInput").value;
    cohesionValue = document.getElementById("cohesionInput").value; 
    alignmentValue = document.getElementById("alignmentInput").value;

    visRadius = document.getElementById("visRadiusInput").value;
    avoidRadius = document.getElementById("avoidRadiusInput").value;
    wallAvoidance = document.getElementById("wallAvoidanceInput").value;
    minSpeed = document.getElementById("minSpeedInput").value;
    maxSpeed = document.getElementById("maxSpeedInput").value;

    // Clears entire canvas between frames
    c.clearRect(0, 0, canvas.width, canvas.height);
    // Starts logic and animation for every boid
    for (var i = 0; i < preyArray.length; i++) {
      preyArray[i].preyTakeStep();
    }
  }
}

// Calls initial load and update function
load();
update();
// Export all global variables that are used in other files
export {c, canvas, preyArray, settings, size, seperationValue, cohesionValue, alignmentValue, visRadius, avoidRadius, wallAvoidance, maxSpeed, minSpeed};