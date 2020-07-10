const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var particle;
var plinkos = [];
var divisions = [];
var score = 0;
var gameState = "play";
var turn = 0;

var divisionHeight=300;
var score =0;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


  for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50){
      plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50){
      plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50){
      plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50){
      plinkos.push(new Plinko(j,375));
  }   
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);
  text("Turns: " + turn + "/5",700,30);

  text("500",22,560);
  text("500",102,560);
  text("500",182,560);
  text("500",262,560);

  text("100",342,560);
  text("100",422,560);
  text("100",502,560);

  text("200",582,560);
  text("200",662,560);
  text("200",742,560);


  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   /*if(frameCount%60===0){
     particles.push(new Particle(random(width/2-80, width/2+80), 10,10));
     score++;
   }*/
 
  /*for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }*/
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
  if (particle != null){
    particle.display();
    //500 score
    if (particle.body.position.x < 325 && particle.body.position.x > 0 && particle.body.position.y > 475){

      if (particle.body.position.y >= 780){
        score = score + 500;
      }
      if (particle.body.position.y >= 780){
        fill(particle.color);
        ellipse(particle.body.position.x,particle.body.position.y,10,10);
        particle = null;
      }

      if (turn>=5){
        gameState = "end";
      }
    }
    //100 score
    else if (particle.body.position.x > 325 && particle.body.position.x < 565 && particle.body.position.y > 475){

      if (particle.body.position.y >= 780){
        score = score + 100;
      }

      if (particle.body.position.y >= 780){
        fill(particle.color);
        ellipse(particle.body.position.x,particle.body.position.y,10,10);
        particle = null;
      } 
      
      if (turn>=5){
        gameState = "end";
      }
    }
    //200 score
    else if(particle.body.position.x > 565 && particle.body.position.x < 800 && particle.body.position.y > 475){

      if (particle.body.position.y >= 780){
        score = score + 200;
      }

      if (particle.body.position.y >= 780){
        fill(particle.color);
        ellipse(particle.body.position.x,particle.body.position.y,10,10);
        particle = null;
      }
    }
    if (turn>=5){
      gameState = "end";
    }
    if (gameState === "end"){
      textSize(30);
      text("GAME OVER",350,320);
    }
  }
  console.log(particle);
}

function mousePressed(){
  if (gameState !== "end"){
    turn++;
    particle = new Particle(mouseX,10,10);
  }
}