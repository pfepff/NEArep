import { PreyBoid } from './PreyBoid.js'; 

var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

var preyArray = [];
var numPrey = 20;

function load() {
  for (var i = 0; i < numPrey; i++) {
    var obj = new PreyBoid();
    preyArray.push(obj);
  }
}

function update() {
//  document.onkeypress = function (e) {
//    e = e || window.event;
    requestAnimationFrame(update);
//  };
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < preyArray.length; i++) {
    preyArray[i].preyTakeStep();
  }
}

load();
export {c, canvas, preyArray};
update();