function Fantasma(x, y, img) {
  this.x = x;
  this.y = y;
  this.img = img;
  this.direction = 0;
  this.radius = 16;
  this.movement = true;
  this.isweak = false;

  this.show = function() {
    if(this.isweak === false)
    image(img, this.x, this.y, 32, 32, 0, 0, 32, 32)
    else{
      image(weak, this.x, this.y, 32, 32, 0, 0, 32, 32 )
    }
  };

  this.move = function(bricks) {
    if (this.movement === false) {
      let d = floor(random(4));
      this.direction = d;
    }
    let lastx = this.x;
    let lasty = this.y;
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
    for (let i = 0; i < bricks.length; i++) {
      if (this.colission(bricks[i])) {
        this.x = lastx;
        this.y = lasty;
        this.movement = false;
        this.move(bricks);
      } else {
        this.movement = true;
      }
    }

    if (this.x < 0) this.x = width - 32;
    if (this.x >= width) this.x = 0;
  };

  this.colission = function(roca) {
    let dis = dist(this.x, this.y, roca.x, roca.y);
    if (dis < this.radius + roca.radius) return true;
    return false;
  };

  this.salir = function(p) {
    if (p.Plataforma[this.y / 32 - 2][this.x / 32] === "d") this.y -= 64;
    if (p.Plataforma[this.y / 32 - 3][this.x / 32] === "d") this.y -= 96;
  };
}
