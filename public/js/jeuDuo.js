document.addEventListener("DOMContentLoaded", function(event) {

  var GRID_SIZE = 9;
  var NB_ACTION = 5;

  class Game {
    constructor() {
      this.finish = false;
    }

    start() {
      this.init();
    }

    init() {
      red_robot = new Robot();
      blue_robot = new Robot();
    }
  }

  class Robot {
    constructor(team, x, y, direction, nb_action) {
      this.team = team;
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.action = new array(nb_action);
      this.flag = undefined;
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

    // ACTIONS

    take() {

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

    north() {
      this.orientate("north");
    }

    south() {
      this.orientate("south");
    }

    east() {
      this.orientate("east");
    }

    west() {
      this.orientate("west");
    }

  }

  class Flag {
    constructor(team, x, y) {
      this.team = team;
      this.x = x;
      this.y = y;
    }

    isValide() {

    }
  }

});
