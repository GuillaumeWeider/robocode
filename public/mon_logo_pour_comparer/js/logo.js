  class Brush {

    constructor() {
      this.buttonPressed = false;
    }

    buttonDown(x,y) {
      this.buttonPressed = true;
      draw(ctxlogo,x,y);
    }

    buttonRelease(x,y) {
      this.buttonPressed = false;
    }

    mouseMove(x,y) {
      ctxcal.clearRect(0 ,0, 500, 500);
      if(this.buttonPressed == true){
	       draw(ctxlogo,x,y);
      }
      draw(ctxcal,x,y);
    }

    mouseOut() {
      this.buttonPressed = false;
      ctxcal.clearRect(0 ,0, 500, 500);
    }

  }

  class Rubber {

    constructor() {
      this.buttonPressed = false;
    }

    buttonDown(x,y) {
      this.buttonPressed = true;
      clear(ctxlogo,x,y);
    }

    buttonRelease(x,y) {
      this.buttonPressed = false;
    }

    mouseMove(x,y) {
      ctxcal.clearRect(0 ,0, 500, 500);
      if(this.buttonPressed == true){
	       clear(ctxlogo,x,y);
      }
      rubberCursor(ctxcal,x,y);
    }

    mouseOut() {
      this.buttonPressed = false;
      ctxcal.clearRect(0 ,0, 500, 500);
    }

  }

  class Line {

    constructor() {
      this.buttonPressed = false;
    }

    buttonDown(x,y) {
      this.buttonPressed = true;
      this.out = false;
      this.x_from = x;
      this.y_from = y;
    }

    buttonRelease(x,y) {
      this.buttonPressed = false;
      if(this.out == false){
        trait(ctxlogo,this.x_from,this.y_from,x,y);
      }
    }

    mouseMove(x,y) {
      ctxcal.clearRect(0 ,0, 500, 500);
      if(this.buttonPressed == true){
        trait(ctxcal, this.x_from, this.y_from, x, y);
      }
      draw(ctxcal,x,y);
    }

    mouseOut() {
      this.buttonPressed = false;
      this.out = true;
      ctxcal.clearRect(0 ,0, 500, 500);
    }

  }

  class Rectangle {

    constructor() {
      this.buttonPressed = false;
    }

    buttonDown(x,y) {
      this.buttonPressed = true;
      this.out = false;
      this.x_from = x;
      this.y_from = y;
    }

    buttonRelease(x,y) {
      this.buttonPressed = false;
      if(this.out == false){
        rctgl(ctxlogo,this.x_from,this.y_from,x,y);
      }
    }

    mouseMove(x,y) {
      ctxcal.clearRect(0 ,0, 500, 500);
      if(this.buttonPressed == true){
        rctgl(ctxcal, this.x_from, this.y_from, x, y);
      } else {
        ctxcal.beginPath();
        ctxcal.fillStyle = "#FFFFFF";
        ctxcal.fillRect(x,y,15,15);
      }
    }

    mouseOut() {
      this.buttonPressed = false;
      this.out = true;
      ctxcal.clearRect(0 ,0, 500, 500);
    }

  }

  var brush = new Brush();
  var rubber = new Rubber();
  var line = new Line();
  var rectangle = new Rectangle();

  var l = document.getElementById("logo");
  var ctxlogo = l.getContext("2d");
  var c = document.getElementById("calque");
  var ctxcal = c.getContext("2d");
  var size = 15;
  var tool = brush;
  var radioValue = '1';


function draw(ctx,x,y){
  ctx.beginPath();
  ctx.fillStyle = "#FFFFFF";
  ctx.arc(x,y,size,0,2*Math.PI);
  ctx.fill();
}

function clear(ctx,x,y){
  ctx.clearRect(x-size ,y-size ,size*2 ,size*2);
}

function rubberCursor(ctx,x,y){
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#C0C0C0";
  ctx.rect(x-size,y-size,size*2,size*2);
  ctx.stroke();
}

function trait(ctx,x_from,y_from,x_to,y_to){
  ctx.beginPath();
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineCap = "round";
  ctx.lineWidth = size*2;
  ctx.moveTo(x_from,y_from);
  ctx.lineTo(x_to,y_to);
  ctx.stroke();
}

function rctgl(ctx,x_from,y_from,x_to,y_to){
  ctx.beginPath();
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(x_from,y_from,x_to-x_from,y_to-y_from);
}

document.getElementById("new").onclick = function () { ctxlogo.clearRect(0 ,0, 500, 500); };

document.getElementById("save").onclick = function () {
  var nomImage = prompt("Donnez un nom à l'image");
  if (nomImage != null ||nomImage != ""){
    localStorage.setItem(nomImage, l.toDataURL());
  }
};

document.getElementById("load").onclick = function () {
  for (var i = 0; i < localStorage.length; i++) {
    var clef = localStorage.key(i);
    document.getElementById("listeEnregistre").innerHTML += "<li><input type=\"button\" id=\""+clef+"\" onclick=\"chargerImage('"+clef+"')\"><label for=\""+clef+"\">"+clef+"</label><input type=\"button\" id=\"delete"+clef+"\" onclick=\"supprimerImage('"+clef+"')\"><label for=\"delete"+clef+"\" id=\"supprimer\"></label></li>";
  }
  document.getElementById("conteneurListe").style.display = "block";
};

function fermerListe(){
  document.getElementById("conteneurListe").style.display = "none";
  document.getElementById("listeEnregistre").innerHTML = "";
}

function chargerImage(key){
  ctxlogo.clearRect(0 ,0, 500, 500);
  document.getElementById("conteneurListe").style.display = "none";
  document.getElementById("listeEnregistre").innerHTML = "";
  var dataURL = localStorage.getItem(key);
  var img = new Image;
  img.src = dataURL;
  img.onload = function () { ctxlogo.drawImage(img, 0, 0); };
}

function supprimerImage(key){
  document.getElementById("conteneurListe").style.display = "none";
  document.getElementById("listeEnregistre").innerHTML = "";
  localStorage.removeItem(key);
}


$('input[type=range]').on('change', function() {
  size = $('input[name=size]').val();
})

$('input[type=radio]').on('change', function() {
  radioValue = $('input[name=outil]:checked').val();

switch (radioValue) {
    case '1':
      tool = brush;
      break;
    case '2':
      tool = rubber;
      break;
    case '3':
      tool = line;
      break;
    case '4':
      tool = rectangle;
      break;
    default:
      tool = brush;
  }

})


c.addEventListener("mousedown", function(e) {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  tool.buttonDown(x,y);
});

c.addEventListener("mousemove", function(e) {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  tool.mouseMove(x,y);
});

c.addEventListener("mouseup", function(e) {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  tool.buttonRelease(x,y);
});

c.addEventListener("mouseout", function(e) {
  tool.mouseOut();
});
