document.addEventListener("DOMContentLoaded", function(event) {

  const GRID_SIZE = 9;
  const NB_ACTION = 5;
  const NB_FLAG_TEAM = 4;

  var topPositionArray = ["03", "04", "05", "14"];
  var bottomPositionArray = ["74", "83", "84", "85"];
  var leftPositionArray = ["30", "40", "50", "41"];
  var rightPositionArray = ["47", "38", "48", "58"];

  var cptr = 0;
  var turn = 1;
  var intrvl1;
  var intrvl2;
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
      command = new Command();
    }

    play(turnStarter, index) {
      for (i = 0 ; i < NB_ACTION ; i++){
        if(redActionArray[i] == "Cancel"){
          blueActionArray[i] = "";
        }
        if(blueActionArray[i] == "Cancel") {
          redActionArray[i] = "";
        }
      }

      if(turnStarter == "red"){
        redRobot.clean();
        blueRobot.clean();
        this.playAction(redRobot, redActionArray[index]);
        this.playAction(blueRobot, blueActionArray[index]);
        for ( i = 0 ; i < NB_FLAG_TEAM ; i++) {
          redFlag[i].refresh();
          blueFlag[i].refresh();
        }
        redRobot.refresh();
        blueRobot.refresh();
      }
      else{
        blueRobot.clean();
        redRobot.clean();
        this.playAction(blueRobot, blueActionArray[index]);
        this.playAction(redRobot, redActionArray[index]);
        for ( i = 0 ; i < NB_FLAG_TEAM ; i++) {
          blueFlag[i].refresh();
          redFlag[i].refresh();
        }
        blueRobot.refresh();
        redRobot.refresh();
      }
      cptr++;
      if(NB_ACTION <= cptr){
        clearInterval(intrvl1);
        clearInterval(intrvl2);
        cptr = 0;
        restartRedAction();
        clearRedAction();
        restartBlueAction();
        clearBlueAction();
        turn++;
      }
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
          command.repel(robot);
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
      this.flag = -1;
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
      if (this.flag != -1) {
        if (this.color == "red") {
          redFlag[this.flag].x = this.x;
          redFlag[this.flag].y = this.y;
        }
        else {
          blueFlag[this.flag].x = this.x;
          blueFlag[this.flag].y = this.y;
        }
      }
    }

    orientate(direction) {
      this.direction = direction;
    }

    refresh() {
      if (this.flag == -1){
        document.getElementById(this.y + '' + this.x).innerHTML = "<div id=\"robot-" + this.color + "\"><div class=\"wheel\"></div><div class=\"wheel\"></div><div id=\"inside-" + this.color + "\"  class=\"body " + this.color + "\"></div></div>";
      }
      else {
        document.getElementById(this.y + '' + this.x).innerHTML = "<div id=\"robot-" + this.color + "\"><div class=\"wheel\"></div><div class=\"wheel\"></div><div id=\"inside-" + this.color + "\"  class=\"body " + this.color + "\"><div class=\"" + this.color + "Flag\"></div></div></div>";
      }

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

    clean(){
      document.getElementById(this.y + '' + this.x).innerHTML = "";
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

    repel(robot) {

      if(robot.color == 'blue') {
        redRobot.x--;
        if (redRobot.x < 0) {
          redRobot.x = 0;
        }
      }
      else {
        blueRobot.x++;
        if (GRID_SIZE <= blueRobot.x) {
          blueRobot.x = GRID_SIZE - 1;
        }
      }
    }

    sleep(robot) {

    }

    take(robot) {
      if(robot.flag == -1){
        for (i = 0 ; i < NB_FLAG_TEAM ; i++){
            if (robot.color == "red" && redFlag[i].x == robot.x && redFlag[i].y == robot.y){
              redFlag[i].isOwned = true;
              robot.flag = i;
            }
            if (robot.color == "blue" && blueFlag[i].x == robot.x && blueFlag[i].y == robot.y){
              blueFlag[i].isOwned = true;
              robot.flag = i;
            }
          }
        }
      }

    drop(robot) {

    }

  }

  class Flag {
    constructor(color, x, y) {
      this.color = color;
      this.x = x;
      this.y = y;
      this.isOwned = false;
    }

    refresh(){
      if(this.isOwned == false && !(this.x == redRobot.x && this.y == redRobot.y) && !(this.x == blueRobot.x && this.y == blueRobot.y)){
        document.getElementById(this.y + '' + this.x).innerHTML = "<div class=\"" + this.color + "Flag\"></div>";
      }
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
    document.getElementById(positionArray[randomInt]).innerHTML = "<div id=\"robot-" + color + "\"><div class=\"wheel\"></div><div class=\"wheel\"></div><div id=\"inside-" + color + "\"  class=\"body " + color + "\"></div></div>";
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
      $("#infoChoice").css("display", "inline").hide().fadeIn();
      document.getElementById("info").style.background = "#e66465";
      game = new Game();
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
          $("#redAction").css("display", "none").hide().fadeOut();
          $("#redChoice").css("display", "none").hide().fadeOut();
          $("#infoChoice").css("display", "none").hide().fadeOut();
          $("#infoAction").css("display", "inline").hide().fadeIn();
          document.getElementById("info").style.background = "linear-gradient(to right, #74b9ff, #e66465)";

          clearRedAction();
          intrvl2 = setInterval(function(){ game.play("blue", cptr); }, 500);

          setTimeout(function(){
            $("#infoAction").css("display", "none").hide().fadeOut();
            $("#infoChoice").css("display", "inline").hide().fadeIn();
            document.getElementById("info").style.background = "#e66465";
            $("#redAction").css("display", "flex").hide().fadeIn();
            $("#redChoice").css("display", "flex").hide().fadeIn();
          }, 2500);

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
          $("#blueAction").css("display", "none").hide().fadeOut();
          $("#blueChoice").css("display", "none").hide().fadeOut();
          $("#infoChoice").css("display", "none").hide().fadeOut();
          $("#infoAction").css("display", "inline").hide().fadeIn();
          document.getElementById("info").style.background = "linear-gradient(to right, #74b9ff, #e66465)";

          clearBlueAction();
          intrvl1 = setInterval(function(){ game.play("red", cptr); }, 500);

          setTimeout(function(){
            $("#infoAction").css("display", "none").hide().fadeOut();
            $("#infoChoice").css("display", "inline").hide().fadeIn();
            document.getElementById("info").style.background = "#74b9ff";
            $("#blueAction").css("display", "flex").hide().fadeIn();
            $("#blueChoice").css("display", "flex").hide().fadeIn();
          }, 2500);

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
