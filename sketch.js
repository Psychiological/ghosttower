var tower, backgroundMoving;
var door, doorImage;
var doorsGroup;
var climbers, climberImage, climberGroup;
var ghost, ghostImage, ghostImage2;
var creep, creepGroup;
var gameState = "play";


function preload() {
backgroundMoving = loadImage("tower.png");
doorImage = loadImage("door.png");
climberImage = loadImage("climber.png");
ghostImage = loadImage("ghost-standing.png");
ghostImage2 = loadImage("ghost-jumping.png");

}





function setup() {
createCanvas(400,600);
tower = createSprite(200,300);

doorsGroup = new Group();  
climberGroup = new Group();  
ghost = createSprite(200,200,10,10);  
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
  creepGroup = new Group();


  
}






function draw() {
  if(gameState === "play") {
  ghost.velocityY = ghost.velocityY + 0.5;
  if(tower.y > 600) {
  tower.y = 300;
  }
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x -4;
  }
  if(keyDown("right_arrow")) {
    ghost.x = ghost.x+4;
  }
  if(keyDown("space")) {
    ghost.velocityY = -4;
    ghost.addImage(ghostImage2);
  }
  if(keyWentUp("space")) {
     ghost.addImage(ghostImage);
     }  
  if(climberGroup.isTouching(ghost)) {
  ghost.velocityX = 0;
    ghost.velocityY = 0;
  
  }
  
  if(creepGroup.isTouching(ghost) || ghost.y > 600) {
  ghost.destroy();
  gameState = "end";
    
  }
tower.addImage(backgroundMoving);
tower.velocityY = 2;
  
  
  
  
  
  spawnDoors();
  drawSprites();
  }

  if(gameState === "end") {
     background("black");
    textSize(20);
    stroke(255);
  text("Game Over", 150,200);
  }

       }
function spawnDoors() {
if(frameCount % 220 === 0) {
var door = createSprite(200,-50);
  door.addImage(doorImage);
  door.x = Math.round(random(120,300));
  door.velocityY = 2;
  door.lifetime = 300;
  doorsGroup.add(door);
  ghost.depth = door.depth;
  ghost.depth = ghost.depth + 1;
  
  var climber = createSprite(200,10);
  climber.addImage(climberImage);
  climber.x = door.x;
  climber.velocityY = 2;
  climber.lifetime = 300;
  climberGroup.add(climber);
  
  var creep = createSprite(200,15);
  creep.width = climber.width;
  creep.height = 2;
  creep.x = door.x;
  creep.velocityY = door.velocityY;
  creep.lifetime = 300;
  creep.debug = true;
  creepGroup.add(creep);
  
  
  
  
  
  
  
}
  }
