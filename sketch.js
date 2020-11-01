var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var ground;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var back, backImage;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 backImage = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(600,600);
  
  back = createSprite(250,250,50,50);
  back.addImage(backImage);
  back.scale = 1.3;
  back.velocityX = -5;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  monkey.debug = true;
  
  ground = createSprite(400,500,1200,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background(255);
  
  if(back.x < 0) {
    back.x = back.width/2;
  }
  
  ground.visible = false;
  
  if(gameState===PLAY) {
    
  
    
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  if(keyDown("space") && monkey.y >= 314.3) {
    monkey.velocityY = -12;
   }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    
    if(FoodGroup.isTouching(monkey)) {
      score = score+2;
      banana.destroy();
      monkey.scale = 0.1;
    }
        
  food();
  obstacles();
    
      drawSprites();
    
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,200,100);

  }
  
  if (gameState===END) {
    monkey.visible = false;
    ground.visible = false;
    back.velocityX = 0;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    survivalTime = 0;
  }
  
  if(obstacleGroup.isTouching(monkey)) {
    monkey.scale = 0.08;
  }

}

function food() {
  
  if(frameCount%80 === 0) {
    banana = createSprite(250,750,25,25);
    banana.addImage(bananaImage);
    banana.scale =0.1;
    banana.y = Math.round(random(350,375));
    banana.velocityX = -5;
    banana.lifetime = 100;
    FoodGroup.add(banana);
    monkey.depth = banana.depth;
    monkey.depth +=1;
  }
}


function obstacles(){
 if (frameCount%300===0){
   obstacle = createSprite(400,475,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -12;     
    obstacle.scale = 0.15;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
 }
}