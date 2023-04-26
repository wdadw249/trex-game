var cloud_img;
var trex ,trex_running;
var ground, ground_image;
var invisible_ground;
var obstacle1_img, obstacle2_img, obstacle3_img, obstacle4_img, obstacle5_img, obstacle6_img;
var obstacle;
var name="Dawud";
var score=0;
var PLAY=1;
var END=0;
var gameState=1;
var obstaclesG, cloudsG;
var gameover, gameover_img
var restart, restart_img;
// it creates the variable for the sprites to work. We put it before function preload




function preload(){

  cloud_img = loadImage ("cloud.png");
  // fucntion preload is the thing that will happen before the game starts.
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");  
  // it creates the image and animation for the trex running.
  ground_image = loadImage("ground2.png");
  obstacle1_img = loadImage("obstacle1.png");
  obstacle2_img = loadImage("obstacle2.png");
  obstacle3_img = loadImage("obstacle3.png");
  obstacle4_img = loadImage("obstacle4.png");
  obstacle5_img = loadImage("obstacle5.png");
  obstacle6_img = loadImage("obstacle6.png");
  // it creates the image for the ground.
  gameover_img = loadImage("gameOver.png");
  restart_img = loadIMage("restart.png")
}





function setup(){

  createCanvas(600,200);
  //crate canvas screen
  trex = createSprite(50, 100, 20, 20);
  trex.addAnimation("running", trex_running);
  // you can apply the running animation here
  trex.scale = .6;
  // you can choose your trex size.

  ground = createSprite(300, 180, 600, 20);
  // you can create the ground sprite here.
  ground.addImage("ground", ground_image);
  // you can add the image of the ground.
  ground.x = ground.width/2;
  // Make the ground infinite
  

  invisible_ground = createSprite(300, 190, 600, 10);
  invisible_ground.visible = false;
  //remove the visibility of the ground
  obstaclesG = createGroup()
  cloudsG = createGroup();
  
  //concatatination 
  //console.log ("hello "+name)

}





function draw(){
  background(190);

  text ("Score : "+score, 30, 30)
  //create score text

  if (gameState === PLAY){
    score += Math.round(frameCount/60);
    //rounds the number to 0

    if (trex.isTouching (obstaclesG)){
      gameState = END
    }
    ground.velocityX =-8;
    //makes the ground move

    if (keyDown ("space") && trex.y >140){
      trex.velocityY =-10;
    }
    if (ground.x <= 0){
      ground.x = ground.width/2;
    }

    trex.velocityY +=.8;
    trex.collide(invisible_ground);

    spawnClouds();
    spawnObstacles();
    //mention the function in funtion draw for it to visible

  }else if (gameState === END){
    trex.velocityY = 0
    ground.velocityX = 0
    obstaclesG.setVelocityXEach(0);
    cloudsG.setVelocityXEach(0);
    trex.addImage("Death_LLL", trexDeath);
  }
  //=======================================================================================================



drawSprites();
// you can draw all the sprites on the canvas with this.
}

function spawnClouds(){

  if (frameCount%60 === 0 ){
    var cloud = createSprite (600, 20, 20, 20);
    cloud.velocityX =-3;
    cloud.addImage ("Clouds", cloud_img);
    cloud.scale =.5;
    cloud.y = Math.round (random(30,100));
    // math round rounds the number from a decimal
    cloud.depth = trex.depth;
    trex.depth +=1;
    // every time first crete the the sprite then add +1 depth
      cloud.lifetime =210;
    // lifetime is a property so the clouds gets destoryed after 210
    cloudsG.add(cloud)
    //creates the group for cloud so the taken all at once
    }

  }
function spawnObstacles(){
  if (frameCount%120 === 0){
    var obstacle = createSprite (600, 160, 20, 20);
    obstacle.velocityX =-8;
    var rand = Math.round (random(1, 6))
    obstacle.scale =.6
    switch (rand){
        case 1: obstacle.addImage (obstacle1_img);
        break;
        case 2: obstacle.addImage (obstacle2_img);
        break;
        case 3: obstacle.addImage (obstacle3_img);
        break;
        case 4: obstacle.addImage (obstacle4_img);
        break;
        case 5: obstacle.addImage (obstacle5_img);
        break;
        case 6: obstacle.addImage (obstacle6_img);
        break;
      }
      
    obstacle.lifetime =210;
    //creates the lifetime for the things
    obstaclesG.add(obstacle)
    //creates obstacle group for it

    }

  }
