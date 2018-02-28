  var GRID_SIZE = 9;
  var NB_ACTION = 5;

  //command.nomCommand(robot);
  //Classe joueur pour récup son pseudo ? les commandes ? le logo ?
  class Game {
    constructor() {
      this.finish = false;
    }

    start() {
      spawnFlag(topPositionArray);
      spawnFlag(bottomPositionArray);
      spawnRobot(leftPositionArray, "red");
      spawnRobot(rightPositionArray, "blue");
    }
  }

  class Robot {
    constructor(color, x, y, direction) {
      this.color = color;
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.action = new Array();
      this.flag = null;
    }

    moveForward() {
      switch (this.direction) {
        case 'north':
          this.y--;
          if (this.y < 0) {
            this.y = 0;
          }
          break;
        case 'east':
          this.x++;
          if (GRID_SIZE <= this.x) {
            this.x = GRID_SIZE - 1;
          }
          break;
        case 'south':
          this.y++;
          if (GRID_SIZE <= this.y) {
            this.y = GRID_SIZE - 1;
          }
          break;
        case 'west':
          this.x--;
          if (this.x < 0) {
            this.x = 0;
          }
          break;
      }
    }

    oritentate(direction) {
      this.direction = direction
    }

  }

  class Command {

    north(robot) {
      robot.orientate("north");
      robot.moveForward();
    }

    south(robot) {
      robot.orientate("south");
      robot.moveForward();
    }

    east(robot) {
      robot.orientate("east");
      robot.moveForward();
    }

    west(robot) {
      robot.orientate("west");
      robot.moveForward();
    }

    pause(robot) {

    }

    eastX2(robot) {
      east(robot);
      robot.moveForward();
    }

    westX2(robot) {
      west(robot);
      robot.moveForward();
    }

    repel(opponent_robot) {

      if (opponent_robot.team == 'blue') {
        opponent_robot.x--;
        if (opponent_robot.x < 0) {
          opponent_robot.x = 0;
        }
      } else {
        opponent_robot.x++;
        if (GRID_SIZE <= opponent_robot.x) {
          opponent_robot.x = GRID_SIZE - 1;
        }
      }
    }

    take(robot) {

    }

  }

  class Flag {
    constructor(color, x, y) {
      this.color = color;
      this.x = x;
      this.y = y;
    }

  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  var topPositionArray = [3, 4, 5, 14];
  var bottomPositionArray = [74, 83, 84, 85];
  var leftPositionArray = [30, 40, 50, 41];
  var rightPositionArray = [47, 38, 48, 58];

  function spawnFlag(positionArray) {
    var nbRedFlag = 0;
    var nbBlueFlag = 0;

    //Premier drapeau
    var randomInt = getRandomInt(2);
    if (randomInt == 0) {
      nbRedFlag++;
      document.getElementById(positionArray[0]).innerHTML = "<div class=\"redFlag\"></div>";
    } else {
      nbBlueFlag++;
      document.getElementById(positionArray[0]).innerHTML = "<div class=\"blueFlag\"></div>";
    }

    //Deuxième drapreau
    randomInt = getRandomInt(2);
    if (randomInt == 0) {
      nbRedFlag++;
      document.getElementById(positionArray[1]).innerHTML = "<div class=\"redFlag\"></div>";
    } else {
      nbBlueFlag++;
      document.getElementById(positionArray[1]).innerHTML = "<div class=\"blueFlag\"></div>";
    }

    //Troisième drapeau
    if (nbRedFlag == 2 || nbBlueFlag == 2) {
      if (nbRedFlag == 2) {
        nbBlueFlag++;
        document.getElementById(positionArray[2]).innerHTML = "<div class=\"blueFlag\"></div>";
      } else if (nbBlueFlag == 2) {
        nbRedFlag++;
        document.getElementById(positionArray[2]).innerHTML = "<div class=\"redFlag\"></div>";
      }
    } else {
      randomInt = getRandomInt(2);
      if (randomInt == 0) {
        nbRedFlag++;
        document.getElementById(positionArray[2]).innerHTML = "<div class=\"redFlag\"></div>";
      } else {
        nbBlueFlag++;
        document.getElementById(positionArray[2]).innerHTML = "<div class=\"blueFlag\"></div>";
      }
    }

    //Quatrième position
    if (nbRedFlag == 2) {
      nbBlueFlag++;
      document.getElementById(positionArray[3]).innerHTML = "<div class=\"blueFlag\"></div>";
    } else if (nbBlueFlag == 2) {
      nbRedFlag++;
      document.getElementById(positionArray[3]).innerHTML = "<div class=\"redFlag\"></div>";
    }

  }

  function spawnRobot(positionArray, color) {
    var randomInt = getRandomInt(4);
    document.getElementById(positionArray[randomInt]).innerHTML = "<div class=\"robot\"><div class=\"wheel\"></div><div class=\"wheel\"></div><div class=\"body " + color + "\"></div></div>";
    if (color == 'red') {
      red_robot = new Robot('red', positionArray[randomInt], 'East');
    } else if (color == 'blue') {
      blue_robot = new Robot('blue', positionArray[randomInt], 'West');
    }
  }


  function clearRedAction() {
    //Remettre les images dans la liste d'actions
    document.getElementById("boxNorthRed").style.backgroundImage = "url('../images/nord-rouge.png')";
    document.getElementById("boxSouthRed").style.backgroundImage = "url('../images/sud-rouge.png')";
    document.getElementById("boxWestRed").style.backgroundImage = "url('../images/ouest-rouge.png')";
    document.getElementById("boxEastRed").style.backgroundImage = "url('../images/est-rouge.png')";
    document.getElementById("boxEastX2Red").style.backgroundImage = "url('../images/est-x2-rouge.png')";
    document.getElementById("boxTakeRed").style.backgroundImage = "url('../images/prendre-rouge.png')";
    document.getElementById("boxDropRed").style.backgroundImage = "url('../images/deposer-rouge.png')";
    document.getElementById("boxRepelRed").style.backgroundImage = "url('../images/repousser-rouge.png')";
    document.getElementById("boxCancelRed").style.backgroundImage = "url('../images/annuler-rouge.png')";
    document.getElementById("boxRepeatRed").style.backgroundImage = "url('../images/x2-rouge.png')";
    document.getElementById("boxPauseRed").style.backgroundImage = "url('../images/pause-rouge.png')";

    //Remettre les nums et changer les images
    document.getElementById("box1Red").innerHTML = "1";
    document.getElementById("box2Red").innerHTML = "2";
    document.getElementById("box3Red").innerHTML = "3";
    document.getElementById("box4Red").innerHTML = "4";
    document.getElementById("box5Red").innerHTML = "5";
    document.getElementById("box1Red").style.backgroundImage = "url('../images/block-vide-rouge.png')";
    document.getElementById("box2Red").style.backgroundImage = "url('../images/block-vide-rouge.png')";
    document.getElementById("box3Red").style.backgroundImage = "url('../images/block-vide-rouge.png')";
    document.getElementById("box4Red").style.backgroundImage = "url('../images/block-vide-rouge.png')";
    document.getElementById("box5Red").style.backgroundImage = "url('../images/block-vide-rouge.png')";
  }

  function clearBlueAction() {
    //Remettre les images dans la liste d'actions
    document.getElementById("boxNorthBlue").style.backgroundImage = "url('../images/nord-bleu.png')";
    document.getElementById("boxSouthBlue").style.backgroundImage = "url('../images/sud-bleu.png')";
    document.getElementById("boxWestBlue").style.backgroundImage = "url('../images/ouest-bleu.png')";
    document.getElementById("boxEastBlue").style.backgroundImage = "url('../images/est-bleu.png')";
    document.getElementById("boxWestX2Blue").style.backgroundImage = "url('../images/ouest-x2-bleu.png')";
    document.getElementById("boxTakeBlue").style.backgroundImage = "url('../images/prendre-bleu.png')";
    document.getElementById("boxDropBlue").style.backgroundImage = "url('../images/deposer-bleu.png')";
    document.getElementById("boxRepelBlue").style.backgroundImage = "url('../images/repousser-bleu.png')";
    document.getElementById("boxCancelBlue").style.backgroundImage = "url('../images/annuler-bleu.png')";
    document.getElementById("boxRepeatBlue").style.backgroundImage = "url('../images/x2-bleu.png')";
    document.getElementById("boxPauseBlue").style.backgroundImage = "url('../images/pause-bleu.png')";

    //Remettre les nums et changer les images
    document.getElementById("box1Blue").innerHTML = "1";
    document.getElementById("box2Blue").innerHTML = "2";
    document.getElementById("box3Blue").innerHTML = "3";
    document.getElementById("box4Blue").innerHTML = "4";
    document.getElementById("box5Blue").innerHTML = "5";
    document.getElementById("box1Blue").style.backgroundImage = "url('../images/block-vide-bleu.png')";
    document.getElementById("box2Blue").style.backgroundImage = "url('../images/block-vide-bleu.png')";
    document.getElementById("box3Blue").style.backgroundImage = "url('../images/block-vide-bleu.png')";
    document.getElementById("box4Blue").style.backgroundImage = "url('../images/block-vide-bleu.png')";
    document.getElementById("box5Blue").style.backgroundImage = "url('../images/block-vide-bleu.png')";
  }

  var tour = 1;

  $(document).ready(function() {
    $(".btnStart").click(function() {
      document.getElementById("start").style.display = "none";
      $("#redAction").css("display", "flex").hide().fadeIn();
      $("#redChoice").css("display", "flex").hide().fadeIn();
      $("#infoStart").css("display", "none").hide().fadeOut();
      $("#infoAction").css("display", "inline").hide().fadeIn();
      document.getElementById("info").style.background = "#e66465";
      var game = new Game();
      game.start();
    });

    $(".btnClearRed").click(function() {
      redActionArray = [];
      clearRedAction();
    });

    $(".btnValidRed").click(function() { //Check les tour pair et impair pour savoir qui a la main
      if (redActionArray.length < 5) {
        alert("Vous devez choisir vos 5 actions !");
      } else {
        if (tour % 2 == 0) {
          //tour pair
          alert("Début des hostilités");
          clearBlueAction();
          tour++;
        } else {
          //tour impair
          $("#redAction").css("display", "none").hide().fadeOut();
          $("#redChoice").css("display", "none").hide().fadeOut();
          $("#blueAction").css("display", "flex").hide().fadeIn();
          $("#blueChoice").css("display", "flex").hide().fadeIn();
          document.getElementById("info").style.background = "#74b9ff";
          clearRedAction();
        }
      }
    });

    $(".btnClearBlue").click(function() {
      blueActionArray = [];
      clearBlueAction();
    });

    $(".btnValidBlue").click(function() {
      if (blueActionArray.length < 5) {
        alert("Vous devez choisir vos 5 actions !");
      } else {
        if (tour % 2 == 0) {
          //tour pair
          $("#blueAction").css("display", "none").hide().fadeOut();
          $("#blueChoice").css("display", "none").hide().fadeOut();
          $("#redAction").css("display", "flex").hide().fadeIn();
          $("#redChoice").css("display", "flex").hide().fadeIn();
          document.getElementById("info").style.background = "#e66465";
          clearRedAction();
        } else {
          //tour impair
          alert("Début des hostilités");
          clearBlueAction();
          tour++;
        }

      }
    });

  });


  //Actions rouges
  var redActionArray = [];

  document.getElementById("boxNorthRed").onclick = function() {
    if (redActionArray.length < 5) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'North') {
          found = true;
        }
      }
      if (found == false) {
        var index = redActionArray.length + 1;
        document.getElementById("box" + index + "Red").innerHTML = "";
        document.getElementById("box" + index + "Red").style.backgroundImage = "url('../images/nord-rouge.png')";
        redActionArray.push('North');
        document.getElementById("boxNorthRed").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxSouthRed").onclick = function() {
    if (redActionArray.length < 5) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'South') {
          found = true;
        }
      }
      if (found == false) {
        var index = redActionArray.length + 1;
        document.getElementById("box" + index + "Red").innerHTML = "";
        document.getElementById("box" + index + "Red").style.backgroundImage = "url('../images/sud-rouge.png')";
        redActionArray.push('South');
        document.getElementById("boxSouthRed").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxWestRed").onclick = function() {
    if (redActionArray.length < 5) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'West') {
          found = true;
        }
      }
      if (found == false) {
        var index = redActionArray.length + 1;
        document.getElementById("box" + index + "Red").innerHTML = "";
        document.getElementById("box" + index + "Red").style.backgroundImage = "url('../images/ouest-rouge.png')";
        redActionArray.push('West');
        document.getElementById("boxWestRed").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxEastRed").onclick = function() {
    if (redActionArray.length < 5) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'East') {
          found = true;
        }
      }
      if (found == false) {
        var index = redActionArray.length + 1;
        document.getElementById("box" + index + "Red").innerHTML = "";
        document.getElementById("box" + index + "Red").style.backgroundImage = "url('../images/est-rouge.png')";
        redActionArray.push('East');
        document.getElementById("boxEastRed").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxEastX2Red").onclick = function() {
    if (redActionArray.length < 5) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'EastX2') {
          found = true;
        }
      }
      if (found == false) {
        var index = redActionArray.length + 1;
        document.getElementById("box" + index + "Red").innerHTML = "";
        document.getElementById("box" + index + "Red").style.backgroundImage = "url('../images/est-x2-rouge.png')";
        redActionArray.push('EastX2');
        document.getElementById("boxEastX2Red").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxTakeRed").onclick = function() {
    if (redActionArray.length < 5) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'Take') {
          found = true;
        }
      }
      if (found == false) {
        var index = redActionArray.length + 1;
        document.getElementById("box" + index + "Red").innerHTML = "";
        document.getElementById("box" + index + "Red").style.backgroundImage = "url('../images/prendre-rouge.png')";
        redActionArray.push('Take');
        document.getElementById("boxTakeRed").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxDropRed").onclick = function() {
    if (redActionArray.length < 5) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'Drop') {
          found = true;
        }
      }
      if (found == false) {
        var index = redActionArray.length + 1;
        document.getElementById("box" + index + "Red").innerHTML = "";
        document.getElementById("box" + index + "Red").style.backgroundImage = "url('../images/deposer-rouge.png')";
        redActionArray.push('Drop');
        document.getElementById("boxDropRed").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxRepelRed").onclick = function() {
    if (redActionArray.length < 5) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'Repel') {
          found = true;
        }
      }
      if (found == false) {
        var index = redActionArray.length + 1;
        document.getElementById("box" + index + "Red").innerHTML = "";
        document.getElementById("box" + index + "Red").style.backgroundImage = "url('../images/repousser-rouge.png')";
        redActionArray.push('Repel');
        document.getElementById("boxRepelRed").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxCancelRed").onclick = function() {
    if (redActionArray.length < 5) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'Cancel') {
          found = true;
        }
      }
      if (found == false) {
        var index = redActionArray.length + 1;
        document.getElementById("box" + index + "Red").innerHTML = "";
        document.getElementById("box" + index + "Red").style.backgroundImage = "url('../images/annuler-rouge.png')";
        redActionArray.push('Cancel');
        document.getElementById("boxCancelRed").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxRepeatRed").onclick = function() {
    if (redActionArray.length < 5 && redActionArray.length != 0) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'Repeat') {
          found = true;
        }
      }
      if (found == false) {
        var index = redActionArray.length + 1;
        document.getElementById("box" + index + "Red").innerHTML = "";
        document.getElementById("box" + index + "Red").style.backgroundImage = "url('../images/x2-rouge.png')";
        redActionArray.push(redActionArray[redActionArray.length - 1]);
        document.getElementById("boxRepeatRed").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxPauseRed").onclick = function() {
    if (redActionArray.length < 5) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'Pause') {
          found = true;
        }
      }
      if (found == false) {
        var index = redActionArray.length + 1;
        document.getElementById("box" + index + "Red").innerHTML = "";
        document.getElementById("box" + index + "Red").style.backgroundImage = "url('../images/pause-rouge.png')";
        redActionArray.push('Pause');
        document.getElementById("boxPauseRed").style.backgroundImage = "none";
      }
    }
  }

  //Actions bleus
  var blueActionArray = [];

  document.getElementById("boxNorthBlue").onclick = function() {
    if (blueActionArray.length < 5) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'North') {
          found = true;
        }
      }
      if (found == false) {
        var index = blueActionArray.length + 1;
        document.getElementById("box" + index + "Blue").innerHTML = "";
        document.getElementById("box" + index + "Blue").style.backgroundImage = "url('../images/nord-bleu.png')";
        blueActionArray.push('North');
        document.getElementById("boxNorthBlue").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxSouthBlue").onclick = function() {
    if (blueActionArray.length < 5) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'South') {
          found = true;
        }
      }
      if (found == false) {
        var index = blueActionArray.length + 1;
        document.getElementById("box" + index + "Blue").innerHTML = "";
        document.getElementById("box" + index + "Blue").style.backgroundImage = "url('../images/sud-bleu.png')";
        blueActionArray.push('South');
        document.getElementById("boxSouthBlue").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxWestBlue").onclick = function() {
    if (blueActionArray.length < 5) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'West') {
          found = true;
        }
      }
      if (found == false) {
        var index = blueActionArray.length + 1;
        document.getElementById("box" + index + "Blue").innerHTML = "";
        document.getElementById("box" + index + "Blue").style.backgroundImage = "url('../images/ouest-bleu.png')";
        blueActionArray.push('West');
        document.getElementById("boxWestBlue").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxEastBlue").onclick = function() {
    if (blueActionArray.length < 5) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'East') {
          found = true;
        }
      }
      if (found == false) {
        var index = blueActionArray.length + 1;
        document.getElementById("box" + index + "Blue").innerHTML = "";
        document.getElementById("box" + index + "Blue").style.backgroundImage = "url('../images/est-bleu.png')";
        blueActionArray.push('East');
        document.getElementById("boxEastBlue").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxWestX2Blue").onclick = function() {
    if (blueActionArray.length < 5) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'boxWestX2Blue') {
          found = true;
        }
      }
      if (found == false) {
        var index = blueActionArray.length + 1;
        document.getElementById("box" + index + "Blue").innerHTML = "";
        document.getElementById("box" + index + "Blue").style.backgroundImage = "url('../images/ouest-x2-bleu.png')";
        blueActionArray.push('EastX2');
        document.getElementById("boxWestX2Blue").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxTakeBlue").onclick = function() {
    if (blueActionArray.length < 5) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'Take') {
          found = true;
        }
      }
      if (found == false) {
        var index = blueActionArray.length + 1;
        document.getElementById("box" + index + "Blue").innerHTML = "";
        document.getElementById("box" + index + "Blue").style.backgroundImage = "url('../images/prendre-bleu.png')";
        blueActionArray.push('Take');
        document.getElementById("boxTakeBlue").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxDropBlue").onclick = function() {
    if (blueActionArray.length < 5) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'Drop') {
          found = true;
        }
      }
      if (found == false) {
        var index = blueActionArray.length + 1;
        document.getElementById("box" + index + "Blue").innerHTML = "";
        document.getElementById("box" + index + "Blue").style.backgroundImage = "url('../images/deposer-bleu.png')";
        blueActionArray.push('Drop');
        document.getElementById("boxDropBlue").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxRepelBlue").onclick = function() {
    if (blueActionArray.length < 5) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'Repel') {
          found = true;
        }
      }
      if (found == false) {
        var index = blueActionArray.length + 1;
        document.getElementById("box" + index + "Blue").innerHTML = "";
        document.getElementById("box" + index + "Blue").style.backgroundImage = "url('../images/repousser-bleu.png')";
        blueActionArray.push('Repel');
        document.getElementById("boxRepelBlue").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxCancelBlue").onclick = function() {
    if (blueActionArray.length < 5) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'Cancel') {
          found = true;
        }
      }
      if (found == false) {
        var index = blueActionArray.length + 1;
        document.getElementById("box" + index + "Blue").innerHTML = "";
        document.getElementById("box" + index + "Blue").style.backgroundImage = "url('../images/annuler-bleu.png')";
        blueActionArray.push('Cancel');
        document.getElementById("boxCancelBlue").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxRepeatBlue").onclick = function() {
    if (blueActionArray.length < 5 && blueActionArray.length != 0) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'Repeat') {
          found = true;
        }
      }
      if (found == false) {
        var index = blueActionArray.length + 1;
        document.getElementById("box" + index + "Blue").innerHTML = "";
        document.getElementById("box" + index + "Blue").style.backgroundImage = "url('../images/x2-bleu.png')";
        blueActionArray.push(blueActionArray[blueActionArray.length - 1]);
        document.getElementById("boxRepeatBlue").style.backgroundImage = "none";
      }
    }
  }

  document.getElementById("boxPauseBlue").onclick = function() {
    if (blueActionArray.length < 5) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'Pause') {
          found = true;
        }
      }
      if (found == false) {
        var index = blueActionArray.length + 1;
        document.getElementById("box" + index + "Blue").innerHTML = "";
        document.getElementById("box" + index + "Blue").style.backgroundImage = "url('../images/pause-bleu.png')";
        blueActionArray.push('Pause');
        document.getElementById("boxPauseBlue").style.backgroundImage = "none";
      }
    }
  }


  //setInterval(afficherMessage(), 1000);
