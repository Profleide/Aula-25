class Boat {
  constructor(x, y, width, height, boatPos) { // contrutor com posição x e y, e largura altura e largura
  
    this.body = Bodies.rectangle(x, y, width, height);
    this.width = width;
    this.height = height;

    this.image = loadImage("./assets/boat.png"); // colocamos a imagem 
    this.boatPosition = boatPos; //para obter posições aleatorias 
    World.add(world, this.body);
  }

  display() { // agulo e a posição do corpo
    var angle = this.body.angle;
    var pos = this.body.position;

    push(); // para salvar as configurações de estilo de desenho atual.
    translate(pos.x, pos.y); // função translação  posição x e y
    rotate(angle); // função ratação e passamos o agulo
    imageMode(CENTER);
    image(this.image, 0, this.boatPosition, this.width, this.height); // posição Y q muda
    pop(); // redefinir oos estilos de desenho
  }
}
