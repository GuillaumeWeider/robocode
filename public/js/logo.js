document.addEventListener("DOMContentLoaded", function(event) {

  class Pinceau {
    constructor() {
      this.button_pressed = false;
    }

    buttonDown(x, y) {
      this.button_pressed = true;
      dessinPoint(x, y, ctxDessin);
    }

    buttonRelease(x, y) {
      this.button_pressed = false;
    }

    mouseMove(x, y) {
      clear(ctxSouris);
      if (this.button_pressed) {
        dessinPoint(x, y, ctxDessin);
      }
      dessinPoint(x, y, ctxSouris);
    }

    mouseOut() {
      this.button_pressed = false;
      clear(ctxSouris);
    }
  }

  class Gomme {
    constructor() {
      this.button_pressed = false;
    }

    buttonDown(x, y) {
      this.button_pressed = true;
      ctxDessin.clearRect(x - taille, y - taille, taille * 2, taille * 2);
    }

    buttonRelease(x, y) {
      this.button_pressed = false;
    }

    mouseMove(x, y) {
      clear(ctxSouris);
      if (this.button_pressed) {
        this.buttonDown(x, y);
      }
      ctxSouris.fillStyle = "#444444";
      ctxSouris.beginPath();
      ctxSouris.rect(x - taille, y - taille, taille * 2, taille * 2);
      ctxSouris.fill();
    }

    mouseOut() {
      this.button_pressed = false;
      clear(ctxSouris);
    }
  }

  class Ligne {
    constructor() {
      this.button_pressed = false;
      this.x = 0;
      this.y = 0;
    }

    buttonDown(x, y) {
      this.button_pressed = true;
      this.x = x;
      this.y = y;
    }

    buttonRelease(x, y) {
      this.button_pressed = false;
      dessinLigne(this.x, this.y, x, y, ctxDessin);
    }

    mouseMove(x, y) {
      clear(ctxSouris);
      if (this.button_pressed) {
        dessinLigne(this.x, this.y, x, y, ctxSouris);
      }
      dessinPoint(x, y, ctxSouris);
    }

    mouseOut() {
      this.button_pressed = false;
      clear(ctxSouris);
    }
  }

  class Rectangle {
    constructor() {
      this.button_pressed = false;
      this.x = 0;
      this.y = 0;
    }

    buttonDown(x, y) {
      this.button_pressed = true;
      this.x = x;
      this.y = y;
    }

    buttonRelease(x, y) {
      this.button_pressed = false;
      dessinRectangle(this.x, this.y, x - this.x, y - this.y, ctxDessin);
    }

    mouseMove(x, y) {
      if (this.button_pressed) {
        dessinRectangle(this.x, this.y, x - this.x, y - this.y, ctxSouris);
      }
    }

    mouseOut() {
      this.button_pressed = false;
      clear(ctxSouris);
    }
  }

  var pinceau = new Pinceau();
  var gomme = new Gomme();
  var ligne = new Ligne();
  var rectangle = new Rectangle();

  var monOutil = pinceau;
  var taille = 15;

  $('input[type=radio]').on('change', function() {
    outil = $('input[name=outil]:checked').val();

    switch (outil) {
      case 'pinceau':
        monOutil = pinceau;
        document.getElementById('canvasSouris').style.cursor = "none";
        break;
      case 'gomme':
        monOutil = gomme;
        document.getElementById('canvasSouris').style.cursor = "none";
        break;
      case 'ligne':
        monOutil = ligne;
        document.getElementById('canvasSouris').style.cursor = "none";
        break;
      case 'rectangle':
        monOutil = rectangle;
        document.getElementById('canvasSouris').style.cursor = "crosshair";
        break;
    }
  })

  $('input[type=range]').on('change', function() {
    taille = $('input[name=taille]').val();
  })

  var cvsDessin = document.getElementById('canvasDessin');
  var ctxDessin = cvsDessin.getContext("2d");
  cvsDessin.width = 500;
  cvsDessin.height = 500;

  var cvsSouris = document.getElementById('canvasSouris');
  var ctxSouris = cvsSouris.getContext("2d");
  cvsSouris.width = cvsDessin.width;
  cvsSouris.height = cvsDessin.height;

  function positionSouris(event) {
    var rect = event.target.getBoundingClientRect();
    var posX = event.clientX - rect.left;
    var posY = event.clientY - rect.top;
    return {
      posX: posX,
      posY: posY
    };
  }

  function dessinPoint(x, y, ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, taille, 0, 2 * Math.PI);
    ctx.fill();
  }

  function dessinLigne(from_x, from_y, to_x, to_y, ctx) {
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.lineWidth = taille * 2;
    ctx.moveTo(from_x, from_y);
    ctx.lineTo(to_x, to_y);
    ctx.stroke();
  }

  function dessinRectangle(x, y, taille_x, taille_y, ctx) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(x, y, taille_x, taille_y);
    ctx.fill();
  }

  function clear(ctx) {
    ctx.clearRect(0, 0, cvsDessin.width, cvsDessin.height);
  }

  function openImg(name) {
    clear(ctxDessin);
    var dataURL = localStorage.getItem(name);
    var img = new Image;
    img.src = dataURL;
    img.onload = function() {
      ctxDessin.drawImage(img, 0, 0);
    };
  }

  canvasSouris.addEventListener("mousedown", function(event) {
    var position = positionSouris(event);
    monOutil.buttonDown(position.posX, position.posY);
  })

  canvasSouris.addEventListener("mouseup", function(event) {
    var position = positionSouris(event);
    monOutil.buttonRelease(position.posX, position.posY);
  })

  canvasSouris.addEventListener("mousemove", function(event) {
    var position = positionSouris(event);
    monOutil.mouseMove(position.posX, position.posY);
  })

  canvasSouris.addEventListener("mouseout", function(event) {
    var position = positionSouris(event);
    monOutil.mouseOut();
  })

  nouveau.addEventListener("click", function(event) {
    document.getElementById('fenetre_ouverture').style.display = "none";
    document.getElementById('fenetre_enregistrement').style.display = "none";
    clear(ctxDessin);
  })

  function loadNewImage(id, key) {
    document.getElementById(id).addEventListener('click', function() {
      document.getElementById('fenetre_ouverture').style.display = "none";
      openImg(key);
    });
  }

  function deleteImage(id, key) {
    document.getElementById(id).addEventListener('click', function() {
      document.getElementById('fenetre_ouverture').style.display = "none";
      localStorage.removeItem(key);
    });
  }

  ouvrir.addEventListener("click", function(event) {
    var ul = document.getElementById("images");
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    document.getElementById('fenetre_enregistrement').style.display = "none";
    document.getElementById('fenetre_ouverture').style.display = "block";
    var typeofKey = null;
    var counter1 = 0;
    for (var key in localStorage) {
      typeofKey = (typeof localStorage[key]);

      if (typeofKey == "string") {
        // liste des images du localStorage
        var link = "link" + counter1;
        var link2 = "delete" + counter1;
        var liste = document.createElement("li");
        var text = document.createElement("span");
        var deleteImg = document.createElement("img")
        var name = document.createTextNode(key);

        text.setAttribute("id", link);
        deleteImg.setAttribute("src", "../images/icone-supprimer.png");
        deleteImg.setAttribute("id", link2);
        deleteImg.setAttribute("width", 15);
        deleteImg.setAttribute("height", 15);

        text.appendChild(name);
        liste.appendChild(text);
        liste.appendChild(deleteImg);

        document.getElementById("images").appendChild(liste);

        loadNewImage(link, key);
        deleteImage(link2, key);

        counter1++;
      }
    }
  })

  enregistrer.addEventListener("click", function(event) {
    document.getElementById('fenetre_ouverture').style.display = "none";
    document.getElementById('fenetre_enregistrement').style.display = "block";
  })

  ok.addEventListener("click", function(event) {
    document.getElementById('fenetre_enregistrement').style.display = "none";
    var nom = document.getElementById('nom').value;
    localStorage.setItem(nom, canvasDessin.toDataURL());
  })

  annulerEnregistrement.addEventListener("click", function(event) {
    document.getElementById('fenetre_enregistrement').style.display = "none";
  })

  annulerOuverture.addEventListener("click", function(event) {
    document.getElementById('fenetre_ouverture').style.display = "none";
  })

});
