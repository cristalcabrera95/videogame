function PowerUp(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 16;

  this.show = function() {
    image(powerImg, this.x, this.y);
  };
}
