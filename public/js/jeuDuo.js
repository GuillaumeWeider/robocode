document.addEventListener("DOMContentLoaded", function(event) {

  const GRID_SIZE = 9;
  const NB_ACTION = 5;
  const NB_FLAG_TEAM = 4;

  var topPositionArray = ["03", "04", "05", "14"];
  var bottomPositionArray = ["74", "83", "84", "85"];
  var leftPositionArray = ["30", "40", "50", "41"];
  var rightPositionArray = ["47", "38", "48", "58"];

  var turn = 1;
  //Actions rouges
  var redActionArray = [];
  var redIndex = 0;
  //Actions bleus
  var blueActionArray = [];
  var blueIndex = 0;

  var redFlag = [];
  var blueFlag = [];

  var game;
  var command;
  var redRobot;
  var blueRobot;

  class Game {
    constructor() {
      this.finish = false;
    }

    start() {
      spawnFlag(topPositionArray, 0);
      spawnFlag(bottomPositionArray, 2)
      spawnRobot(leftPositionArray, "red");
      spawnRobot(rightPositionArray, "blue");
    }

    play(turnStarter) {
      if(turnStarter == "red"){
        for (i = 0 ; i < NB_ACTION ; i++) {
          this.playAction(redRobot, redActionArray[i]);
          redRobot.refresh();
          this.playAction(blueRobot, blueActionArray[i]);
          blueRobot.refresh();
        }
      }
      else{
        for (i = 0 ; i < NB_ACTION ; i++) {
          this.playAction(blueRobot, blueActionArray[i]);
          blueRobot.refresh();
          this.playAction(redRobot, redActionArray[i]);
          redRobot.refresh();
        }
      }
      restartRedAction();
      clearRedAction();
      restartBlueAction();
      clearBlueAction();
      turn++;
    }

    playAction(robot, action) {
      switch(action){
        case 'North':
          command.north(robot);
        break;
        case 'South':
          command.south(robot);
        break;
        case 'East':
          command.east(robot);
        break;
        case 'West':
          command.west(robot);
        break;
        case 'EastX2':
          command.eastX2(robot);
        break;
        case 'WestX2':
          command.westX2(robot);
        break;
        case 'Repel':
          if(robot.color = "red") {
            command.repel(blueRobot);
          }
          else {
            command.repel(redRobot);
          }
        break;
        case 'Pause':
          command.sleep(robot);
        break;
        case 'Take':
          command.take(robot);
        break;
        case 'Drop':
          command.drop(robot);
        break;
        case 'Cancel':
          command.cancel(robot);
        break;
      }

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

    orientate(direction) {
      this.direction = direction
    }

    refresh() {
      // a modifier pour ne bouger que l'entiter html robot
      document.getElementById(this.y + '' + this.x).innerHTML = "<div id=\"robot-" + this.color + "\"><div class=\"wheel\"></div><div class=\"wheel\"></div><div class=\"body " + this.color + "\"></div></div>";
      switch (this.direction) {
        case 'north':
          document.getElementById("robot-" + this.color).style.transform = "rotate(-90deg)";
          break;
        case 'east':
          document.getElementById("robot-" + this.color).style.transform = "rotate(0deg)";
          break;
        case 'south':
          document.getElementById("robot-" + this.color).style.transform = "rotate(90deg)";
          break;
        case 'west':
          document.getElementById("robot-" + this.color).style.transform = "rotate(180deg)";
          break;
      }
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

    eastX2(robot) {
      robot.orientate("east");
      robot.moveForward();
      robot.moveForward();
    }

    westX2(robot) {
      robot.orientate("west");
      robot.moveForward();
      robot.moveForward();
    }

    repel(opponent_robot) {

      if (opponent_robot.team == 'red') {
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

    sleep(robot) {

    }

    take(robot) {

    }

    drop(robot) {

    }

    cancel() {

    }

  }

  class Flag {
    constructor(color, x, y) {
      this.color = color;
      this.x = x;
      this.y = y;
    }

  }

  function restartBlueAction(){
    for (i = 0 ; i < NB_ACTION ; i++){
      blueActionArray[i] = "";
    }
    blueIndex = 0;
  }

  function restartRedAction(){
    for (i = 0 ; i < NB_ACTION ; i++){
      redActionArray[i] = "";
    }
    redIndex = 0;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function spawnFlag(position, flagArrayIndex) {
    var nbRedFlag = flagArrayIndex;
    var nbBlueFlag = flagArrayIndex;
    var limit = flagArrayIndex + NB_FLAG_TEAM /2;

    for (i = 0; i < NB_FLAG_TEAM; i++) {
      var x = Number(position[i].substr(1, 1));
      var y = Number(position[i].substr(0, 1));

      if (nbRedFlag < limit && nbBlueFlag < limit) {
        var randomInt = getRandomInt(2);
        if (randomInt == 0) {
          document.getElementById(position[i]).innerHTML = "<div class=\"redFlag\"></div>";
          redFlag[nbRedFlag] = new Flag('red', x, y);
          nbRedFlag++;
        } else {
          document.getElementById(position[i]).innerHTML = "<div class=\"blueFlag\"></div>";
          blueFlag[nbBlueFlag] = new Flag('blue', x, y);
          nbBlueFlag++;
        }
      } else if (limit <= nbRedFlag) {
        document.getElementById(position[i]).innerHTML = "<div class=\"blueFlag\"></div>";
        blueFlag[nbBlueFlag] = new Flag('blue', x, y);
        nbBlueFlag++;
      } else {
        document.getElementById(position[i]).innerHTML = "<div class=\"redFlag\"></div>";
        redFlag[nbRedFlag] = new Flag('red', x, y);
        nbRedFlag++;
      }
    }
  }

  function spawnRobot(positionArray, color) {
    var randomInt = getRandomInt(4);
    document.getElementById(positionArray[randomInt]).innerHTML = "<div id=\"robot-" + color + "\"><div class=\"wheel\"></div><div class=\"wheel\"></div><div class=\"body " + color + "\"></div></div>";
    var x = Number(positionArray[randomInt].substr(1, 1));
    var y = Number(positionArray[randomInt].substr(0, 1));
    if (color == 'red') {
      redRobot = new Robot('red', x, y, 'east');
    } else if (color == 'blue') {
      blueRobot = new Robot('blue', x, y, 'west');
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
    document.getElementById("box0Red").innerHTML = "1";
    document.getElementById("box1Red").innerHTML = "2";
    document.getElementById("box2Red").innerHTML = "3";
    document.getElementById("box3Red").innerHTML = "4";
    document.getElementById("box4Red").innerHTML = "5";
    document.getElementById("box0Red").style.backgroundImage = "url('../images/block-vide-rouge.png')";
    document.getElementById("box1Red").style.backgroundImage = "url('../images/block-vide-rouge.png')";
    document.getElementById("box2Red").style.backgroundImage = "url('../images/block-vide-rouge.png')";
    document.getElementById("box3Red").style.backgroundImage = "url('../images/block-vide-rouge.png')";
    document.getElementById("box4Red").style.backgroundImage = "url('../images/block-vide-rouge.png')";
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
    document.getElementById("box0Blue").innerHTML = "1";
    document.getElementById("box1Blue").innerHTML = "2";
    document.getElementById("box2Blue").innerHTML = "3";
    document.getElementById("box3Blue").innerHTML = "4";
    document.getElementById("box4Blue").innerHTML = "5";
    document.getElementById("box0Blue").style.backgroundImage = "url('../images/block-vide-bleu.png')";
    document.getElementById("box1Blue").style.backgroundImage = "url('../images/block-vide-bleu.png')";
    document.getElementById("box2Blue").style.backgroundImage = "url('../images/block-vide-bleu.png')";
    document.getElementById("box3Blue").style.backgroundImage = "url('../images/block-vide-bleu.png')";
    document.getElementById("box4Blue").style.backgroundImage = "url('../images/block-vide-bleu.png')";
  }

  $(document).ready(function() {
    $(".btnStart").click(function() {
      document.getElementById("start").style.display = "none";
      $("#redAction").css("display", "flex").hide().fadeIn();
      $("#redChoice").css("display", "flex").hide().fadeIn();
      $("#infoStart").css("display", "none").hide().fadeOut();
      $("#infoAction").css("display", "inline").hide().fadeIn();
      document.getElementById("info").style.background = "#e66465";
      game = new Game();
      command = new Command();
      game.start();
    });

    $(".btnClearRed").click(function() {
      restartRedAction();
      clearRedAction();
    });

    $(".btnValidRed").click(function() { //Check les turn pair et impair pour savoir qui a la main
      if (redIndex < NB_ACTION) {
        alert("Vous devez choisir vos 5 actions !");
      } else {
        if (turn % 2 == 0) {
          //turn pair
          clearRedAction();
          alert("Début des hostilités");
          game.play("blue");
        } else {
          //turn impair
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
      restartBlueAction();
      clearBlueAction();
    });

    $(".btnValidBlue").click(function() {
      if (blueIndex < NB_ACTION) {
        alert("Vous devez choisir vos 5 actions !");
      } else {
        if (turn % 2 == 0) {
          //turn pair
          $("#blueAction").css("display", "none").hide().fadeOut();
          $("#blueChoice").css("display", "none").hide().fadeOut();
          $("#redAction").css("display", "flex").hide().fadeIn();
          $("#redChoice").css("display", "flex").hide().fadeIn();
          document.getElementById("info").style.background = "#e66465";
          clearBlueAction();
        } else {
          //turn impair
          clearBlueAction();
          alert("Début des hostilités");
          game.play("red");
        }

      }
    });

  });

  document.getElementById("boxNorthRed").onclick = function() {
    if (redIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'North') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + redIndex + "Red").innerHTML = "";
        document.getElementById("box" + redIndex + "Red").style.backgroundImage = "url('../images/nord-rouge.png')";
        redActionArray[redIndex] = 'North';
        document.getElementById("boxNorthRed").style.backgroundImage = "none";
        redIndex++;
      }
    }
  }

  document.getElementById("boxSouthRed").onclick = function() {
    if (redIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'South') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + redIndex + "Red").innerHTML = "";
        document.getElementById("box" + redIndex + "Red").style.backgroundImage = "url('../images/sud-rouge.png')";
        redActionArray[redIndex] = 'South';
        document.getElementById("boxSouthRed").style.backgroundImage = "none";
        redIndex++;
      }
    }
  }

  document.getElementById("boxWestRed").onclick = function() {
    if (redIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'West') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + redIndex + "Red").innerHTML = "";
        document.getElementById("box" + redIndex + "Red").style.backgroundImage = "url('../images/ouest-rouge.png')";
        redActionArray[redIndex] = 'West';
        document.getElementById("boxWestRed").style.backgroundImage = "none";
        redIndex++;
      }
    }
  }

  document.getElementById("boxEastRed").onclick = function() {
    if (redIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'East') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + redIndex + "Red").innerHTML = "";
        document.getElementById("box" + redIndex + "Red").style.backgroundImage = "url('../images/est-rouge.png')";
        redActionArray[redIndex] = 'East';
        document.getElementById("boxEastRed").style.backgroundImage = "none";
        redIndex++;
      }
    }
  }

  document.getElementById("boxEastX2Red").onclick = function() {
    if (redIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'EastX2') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + redIndex + "Red").innerHTML = "";
        document.getElementById("box" + redIndex + "Red").style.backgroundImage = "url('../images/est-x2-rouge.png')";
        redActionArray[redIndex] = 'EastX2';
        document.getElementById("boxEastX2Red").style.backgroundImage = "none";
        redIndex++;
      }
    }
  }

  document.getElementById("boxTakeRed").onclick = function() {
    if (redIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'Take') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + redIndex + "Red").innerHTML = "";
        document.getElementById("box" + redIndex + "Red").style.backgroundImage = "url('../images/prendre-rouge.png')";
        redActionArray[redIndex] = 'Take';
        document.getElementById("boxTakeRed").style.backgroundImage = "none";
        redIndex++;
      }
    }
  }

  document.getElementById("boxDropRed").onclick = function() {
    if (redIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'Drop') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + redIndex + "Red").innerHTML = "";
        document.getElementById("box" + redIndex + "Red").style.backgroundImage = "url('../images/deposer-rouge.png')";
        redActionArray[redIndex] = 'Drop';
        document.getElementById("boxDropRed").style.backgroundImage = "none";
        redIndex++;
      }
    }
  }

  document.getElementById("boxRepelRed").onclick = function() {
    if (redIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'Repel') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + redIndex + "Red").innerHTML = "";
        document.getElementById("box" + redIndex + "Red").style.backgroundImage = "url('../images/repousser-rouge.png')";
        redActionArray[redIndex] = 'Repel';
        document.getElementById("boxRepelRed").style.backgroundImage = "none";
        redIndex++;
      }
    }
  }

  document.getElementById("boxCancelRed").onclick = function() {
    if (redIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'Cancel') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + redIndex + "Red").innerHTML = "";
        document.getElementById("box" + redIndex + "Red").style.backgroundImage = "url('../images/annuler-rouge.png')";
        redActionArray[redIndex] = 'Cancel';
        document.getElementById("boxCancelRed").style.backgroundImage = "none";
        redIndex++;
      }
    }
  }

  document.getElementById("boxRepeatRed").onclick = function() {
    if (redIndex < NB_ACTION && redIndex != 0) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'Repeat') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + redIndex + "Red").innerHTML = "";
        document.getElementById("box" + redIndex + "Red").style.backgroundImage = "url('../images/x2-rouge.png')";
        redActionArray[redIndex] = redActionArray[redIndex - 1];
        document.getElementById("boxRepeatRed").style.backgroundImage = "none";
        redIndex++;
      }
    }
  }

  document.getElementById("boxPauseRed").onclick = function() {
    if (redIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < redActionArray.length; i++) {
        if (redActionArray[i] == 'Pause') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + redIndex + "Red").innerHTML = "";
        document.getElementById("box" + redIndex + "Red").style.backgroundImage = "url('../images/pause-rouge.png')";
        redActionArray[redIndex] = 'Pause';
        document.getElementById("boxPauseRed").style.backgroundImage = "none";
        redIndex++;
      }
    }
  }

  document.getElementById("boxNorthBlue").onclick = function() {
    if (blueIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'North') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + blueIndex + "Blue").innerHTML = "";
        document.getElementById("box" + blueIndex + "Blue").style.backgroundImage = "url('../images/nord-bleu.png')";
        blueActionArray[blueIndex] = 'North';
        document.getElementById("boxNorthBlue").style.backgroundImage = "none";
        blueIndex++;
      }
    }
  }

  document.getElementById("boxSouthBlue").onclick = function() {
    if (blueIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'South') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + blueIndex + "Blue").innerHTML = "";
        document.getElementById("box" + blueIndex + "Blue").style.backgroundImage = "url('../images/sud-bleu.png')";
        blueActionArray[blueIndex] = 'South';
        document.getElementById("boxSouthBlue").style.backgroundImage = "none";
        blueIndex++;
      }
    }
  }

  document.getElementById("boxWestBlue").onclick = function() {
    if (blueIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'West') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + blueIndex + "Blue").innerHTML = "";
        document.getElementById("box" + blueIndex + "Blue").style.backgroundImage = "url('../images/ouest-bleu.png')";
        blueActionArray[blueIndex] = 'West';
        document.getElementById("boxWestBlue").style.backgroundImage = "none";
        blueIndex++;
      }
    }
  }

  document.getElementById("boxEastBlue").onclick = function() {
    if (blueIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'East') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + blueIndex + "Blue").innerHTML = "";
        document.getElementById("box" + blueIndex + "Blue").style.backgroundImage = "url('../images/est-bleu.png')";
        blueActionArray[blueIndex] = 'East';
        document.getElementById("boxEastBlue").style.backgroundImage = "none";
        blueIndex++;
      }
    }
  }

  document.getElementById("boxWestX2Blue").onclick = function() {
    if (blueIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'WestX2') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + blueIndex + "Blue").innerHTML = "";
        document.getElementById("box" + blueIndex + "Blue").style.backgroundImage = "url('../images/ouest-x2-bleu.png')";
        blueActionArray[blueIndex] = 'WestX2';
        document.getElementById("boxWestX2Blue").style.backgroundImage = "none";
        blueIndex++;
      }
    }
  }

  document.getElementById("boxTakeBlue").onclick = function() {
    if (blueIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'Take') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + blueIndex + "Blue").innerHTML = "";
        document.getElementById("box" + blueIndex + "Blue").style.backgroundImage = "url('../images/prendre-bleu.png')";
        blueActionArray[blueIndex] = 'Take';
        document.getElementById("boxTakeBlue").style.backgroundImage = "none";
        blueIndex++;
      }
    }
  }

  document.getElementById("boxDropBlue").onclick = function() {
    if (blueIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'Drop') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + blueIndex + "Blue").innerHTML = "";
        document.getElementById("box" + blueIndex + "Blue").style.backgroundImage = "url('../images/deposer-bleu.png')";
        blueActionArray[blueIndex] = 'Drop';
        document.getElementById("boxDropBlue").style.backgroundImage = "none";
        blueIndex++;
      }
    }
  }

  document.getElementById("boxRepelBlue").onclick = function() {
    if (blueIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'Repel') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + blueIndex + "Blue").innerHTML = "";
        document.getElementById("box" + blueIndex + "Blue").style.backgroundImage = "url('../images/repousser-bleu.png')";
        blueActionArray[blueIndex] = 'Repel';
        document.getElementById("boxRepelBlue").style.backgroundImage = "none";
        blueIndex++;
      }
    }
  }

  document.getElementById("boxCancelBlue").onclick = function() {
    if (blueIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'Cancel') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + blueIndex + "Blue").innerHTML = "";
        document.getElementById("box" + blueIndex + "Blue").style.backgroundImage = "url('../images/annuler-bleu.png')";
        blueActionArray[blueIndex] = 'Cancel';
        document.getElementById("boxCancelBlue").style.backgroundImage = "none";
        blueIndex++;
      }
    }
  }

  document.getElementById("boxRepeatBlue").onclick = function() {
    if (blueIndex < NB_ACTION && blueIndex != 0) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'Repeat') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + blueIndex + "Blue").innerHTML = "";
        document.getElementById("box" + blueIndex + "Blue").style.backgroundImage = "url('../images/x2-bleu.png')";
        blueActionArray[blueIndex] = blueActionArray[blueIndex - 1];
        document.getElementById("boxRepeatBlue").style.backgroundImage = "none";
        blueIndex++;
      }
    }
  }

  document.getElementById("boxPauseBlue").onclick = function() {
    if (blueIndex < NB_ACTION) {
      var found = false;
      for (i = 0; i < blueActionArray.length; i++) {
        if (blueActionArray[i] == 'Pause') {
          found = true;
        }
      }
      if (found == false) {
        document.getElementById("box" + blueIndex + "Blue").innerHTML = "";
        document.getElementById("box" + blueIndex + "Blue").style.backgroundImage = "url('../images/pause-bleu.png')";
        blueActionArray[blueIndex] = 'Pause';
        document.getElementById("boxPauseBlue").style.backgroundImage = "none";
        blueIndex++;
      }
    }
  }

});
