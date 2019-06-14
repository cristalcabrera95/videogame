function Pacman(x, y) {
  this.x = x;
  this.y = y;
  this.frame = 0;
  this.direction = 0;
  this.radius = 16;

  this.show = function() {
    image(
      pacmanImg,
      this.x,
      this.y,
      32,
      32,
      32 * this.frame++,
      32 * this.direction,
      32,
      32
    );
    this.frame = this.frame === 5 ? 0 : this.frame;
  };
  this.move = function(d) {
    this.direction = d;
    if (this.direction === 0) {
      this.x += 32;
    }
    if (this.direction === 1) {
      this.y += 32;
    }
    if (this.direction === 2) {
      this.x -= 32;
    }
    if (this.direction === 3) {
      this.y -= 32;
    }
    if (this.x < 0) this.x = width - 32;
    if (this.x >= width) this.x = 0;
  };
  this.eat = function(comida) {
    let dis = dist(this.x, this.y, comida.x, comida.y);
    if (dis < this.radius + comida.radius) return true;
    return false;
  };
  this.colission = function(enemy) {
    let dis = dist(this.x, this.y, enemy.x, enemy.y);
    if (dis < this.radius + enemy.radius) return true;
    return false;
  };
}
