const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg,boat;
var canvas, angle, tower, ground, cannon;
var balls = []; // criando matriz para bolas // Aluno
var boats = []; // criando matriz para os barcos // Aluno

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
 
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);


  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();
  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  cannon.display();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
  }
}
// Função para vericar os barquinhos se (if) não tiver nenhum barco então começa a aparecer
function showBoats() {
  if (boats.length > 0) { // se for maior q 1 entao...
    if (
      boats[boats.length - 1] === undefined || // caso algo de indefino aconteça entra no se tb (evitar bogus)
      boats[boats.length - 1].body.position.x < width - 300 //width e usado para q o proximo navio tiver percorrido um espaço certo 0
    ) { // cria mais um a tras do outro nas posições e tamanhos epecificados a abaixo 
      var positions = [-40, -60, -70, -20]; // posição q os navios vao entrar na tela
      var position = random(positions); // barquinhos passam a nascer cada hora em um lugar (aleatoriamente)
      var boat = new Boat(width, height - 100, 170, 170, position); // ai nascem 

      boats.push(boat); // começa de novo
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, { // Velocidade do barcos 
          x: -0.9,
          y: 0
        });

        boats[i].display(); // mostrar os barcos em varias posições 
      } 
      
    }
  } else {// se não eke vai criar outros barquinhos
    var boat = new Boat(width, height - 60, 170, 170, -60);
    boats.push(boat);
  }
} // pronto agora os navio sera criado continuamente quando outro navio sair a tela

function keyReleased() { // td ver a q apertar pra baixo solta uma bola 
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}
