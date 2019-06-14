let rocaImg;
let weak;
let roca;
let comidaImg;
let powerImg;
let pacmanImg;
let plat;
let rocas = [];
let comidas = [];
let powerUps = [];
let ghosts = [];
let activeGhost = [];
let redGhostImg;
let greenGhostImg;
let pinkGhostImg;
let purpleGhostImg;
//fantasmas
let redGhost;
let greenGhost;
let pinkGhost;
let purpleGhost;

let pacman;
function preload() {
  rocaImg = loadImage("images/roca.bmp");
  comidaImg = loadImage("images/food.png");
  powerImg = loadImage("images/grape.png");
  pacmanImg = loadImage("images/pac.png");
  redGhostImg = loadImage("images/red.png");
  greenGhostImg = loadImage("images/green.png");
  pinkGhostImg = loadImage("images/pink.png");
  purpleGhostImg = loadImage("images/purple.png");
  weak = loadImage("images/weak.png");
}

function setup() {
  createCanvas(800, 670);
  roca = new Roca(200, 300);
  plat = new Plataforma();
  for (let i = 0; i < plat.filas; i++)
    for (let j = 0; j < plat.columnas; j++) {
      if (plat.Plataforma[i][j] === "*") rocas.push(new Roca(j * 32, i * 32));
      if (plat.Plataforma[i][j] === "-")
        comidas.push(new Comida(j * 32, i * 32));
      if (plat.Plataforma[i][j] === "o")
        powerUps.push(new PowerUp(j * 32, i * 32));
      if (plat.Plataforma[i][j] === "p") pacman = new Pacman(j * 32, i * 32);
      if (plat.Plataforma[i][j] === "r")
        ghosts.push(new Fantasma(j * 32, i * 32, redGhostImg));
      if (plat.Plataforma[i][j] === "g")
        ghosts.push(new Fantasma(j * 32, i * 32, greenGhostImg));
      if (plat.Plataforma[i][j] === "u")
        ghosts.push(new Fantasma(j * 32, i * 32, purpleGhostImg));
      if (plat.Plataforma[i][j] === "i")
        ghosts.push(new Fantasma(j * 32, i * 32, pinkGhostImg));
    }
  sacarFantasmas();
}

function draw() {
  background(0);
  for (let i = 0; i < rocas.length; i++) rocas[i].show();
  for (let i = 0; i < comidas.length; i++) comidas[i].show();
  for (let i = 0; i < powerUps.length; i++) powerUps[i].show();
  for (let i = 0; i < ghosts.length; i++) ghosts[i].show();
  for (let i = 0; i < activeGhost.length; i++) {
    frameRate(10);
    activeGhost[i].show();
    activeGhost[i].move(rocas);
    if (pacman.colission(activeGhost[i])) {
      if (activeGhost[i].isweak === true) {
        activeGhost[i].isweak = false;
        ghosts.push(new Fantasma(32*12, 32*10, activeGhost[i].img));
        activeGhost.splice(i, 1);
        makeGhostStrong();
      }else{
        alert("GAME OVER");
      window.location.reload();
      }
      
    }
  }
  for (let i = 0; i < powerUps.length; i++) {
    if (pacman.eat(powerUps[i])) {
      makeWeak();
      powerUps.splice(i, 1);
    }
  }

  pacman.show();
  for (let i = 0; i < comidas.length; i++) {
    if (pacman.eat(comidas[i])) {
      comidas.splice(i, 1);
    }
  }
  if (comidas.length <= 0){
    alert("YOU WIN");
      window.location.reload();
  }
}

function sacarFantasmas() {
  if (ghosts.length > 0) {
    let g = ghosts.pop();
    g.salir(plat);
    activeGhost.push(g);
  }
  setTimeout(sacarFantasmas, 7000);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    if (plat.Plataforma[pacman.y / 32][pacman.x / 32 + 1] !== "*")
      pacman.move(0);
  }
  if (keyCode === DOWN_ARROW) {
    if (plat.Plataforma[pacman.y / 32 + 1][pacman.x / 32] !== "*")
      pacman.move(1);
  }
  if (keyCode === LEFT_ARROW) {
    if (plat.Plataforma[pacman.y / 32][pacman.x / 32 - 1] !== "*")
      pacman.move(2);
  }
  if (keyCode === UP_ARROW) {
    if (plat.Plataforma[pacman.y / 32 - 1][pacman.x / 32] !== "*")
      pacman.move(3);
  }
}
function makeGhostStrong() {
  for (let i = 0; i < activeGhost.length; i++) activeGhost[i].isweak = false;
}

function makeWeak() {
  for (let i = 0; i < activeGhost.length; i++) activeGhost[i].isweak = true;
}
