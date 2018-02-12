document.addEventListener("DOMContentLoaded", function(event) {

  var GRID_SIZE = 9;

  class robot {
    constructor(team, x, y, direction) {
      this.team = team;
      this.x = x;
      this.y = y;
      this.direction = direction;
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

    oritentate(direction) m{
      this.direction = direction
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

  }

});
