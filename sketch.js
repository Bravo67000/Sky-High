  //declaring sprite's name as variables
  var clouds , cloudImg , cloudsG
  var balloon , balloonImg
  var star , starImg , starsG
  var bird, birdImg, birdsG
  var bird1 , bird1Img , birds1G
  var gameState = "play"
  var score = 0 ,Points = 0
  var retry , retryImg
  var gameOver , GoImg
  var pointstakeoverSound , gameOverSound

    
    function preload(){
        //loading the images and sounds
        cloudImg = loadImage("cloud.png")
        balloonImg = loadImage("balloon.png")
        starImg = loadImage("star.webp")
        birdImg = loadImage("bird.png")
        bird1Img = loadImage("bird1.png")
        retryImg = loadImage("retry.png")
        GameOverImg = loadImage("Go.png")
        pointstakeoverSound = loadSound("checkpoint.mp3")
        gameOverSound = loadSound("die.mp3")
    }

   
    function setup()   {
    //creating canvas
    createCanvas(600,600)

    //creating balloon 
    balloon = createSprite(90,450,10,10)
    balloon.addImage(balloonImg)
    balloon.scale=0.35

    //creating retry 
    retry = createSprite(300,500)
    retry.addImage(retryImg)
    retry.visible = true
    retry.scale=0.4
    
    //creating gameover
    gameOver = createSprite(300,200)
    gameOver.addImage(GameOverImg)
    gameOver.visible = true
    gameOver.scale=0.09
    
    //making groups 
    cloudsG = new Group()
    starsG = new Group()
    birdsG = new Group()
    birds1G = new Group()
    
    //setting collider
    balloon.setCollider("rectangle",0,-130,150,140)
   
    }



    function draw(){

    //gving background
        background("lightBlue")
    //giving altitude
        textSize(15)
        fill("black")
        text("Altitude(metres):"+score,410,90)
    //giving points
        textSize(15)
        fill("black")
        text("Points: "+Points,30,90)

    //what should the output be , when the gameState is in play
    if(gameState ==="play"){

    
    retry.visible=false
    gameOver.visible=false
        
    score = score + Math.round(getFrameRate()/60)
    balloon.x = World.mouseX


    if(balloon.x<40){
        balloon.x=40
    }
    if(balloon.x>560){
        balloon.x=560
    }

    spawnClouds()
    spawnBirds()
    spawnBirds1()
    spawnStars()

    if(starsG.isTouching(balloon)){
        starsG.destroyEach()
        Points = Points + 2
        pointstakeoverSound.play()
    }


    if(balloon.isTouching(birds1G)){
        gameState ="end"
        gameOverSound.play()
    }
    if(balloon.isTouching(birdsG)){
        gameState ="end"
        gameOverSound.play()

    }

    }
    //what should the output be , when the gameState is in end
    if(gameState === "end"){
        
        retry.visible = true
    gameOver.visible = true

    cloudsG.destroyEach()
    starsG.destroyEach()
    birds1G.destroyEach()
    birdsG.destroyEach()
    balloon.visible=false

    score = 0
    Points = 0

    }
    // retrying the game after losing
    if(mousePressedOver(retry)){
        reset();
    }

    function reset(){
        gameState = "play"
        balloon.visible=true
        score = 0
        Points = 0

    }
   
    drawSprites()
    }

    // spawning clouds
    function spawnClouds(){
        if(frameCount%120==0){
            clouds = createSprite(Math.round(random(20,580)),0,10,10)
            clouds.addImage(cloudImg)
            clouds.velocityY = +(4+score/100)
            clouds.velocityX = +(1+score/200)
            clouds.lifetime = 160
            clouds.scale=0.25
            cloudsG.add(clouds)

            clouds.depth = balloon.depth
            balloon.depth = balloon.depth+1

        }
    }

    // spawning stars (points)
    function spawnStars(){
        if(frameCount%80==0){
            star = createSprite(Math.round(random(20,580)),0,10,10)
            star.addImage(starImg)
            star.velocityY = +(4+score/100)
            star.lifetime = 160
            star.scale=0.03
            starsG.add(star)
            
            

        }
    }

    // spawning blue birds
    function spawnBirds(){
        if(frameCount%130==0){
            bird = createSprite(Math.round(random(20,580)),0,10,10)
            bird.addImage(birdImg)
            bird.velocityY = +(4+score/100)
            bird.velocityX = +(1+score/200)
            bird.lifetime = 300
            bird.scale=0.03
            birdsG.add(bird)
            
            

        }
    }

    // spawning green birds
    function spawnBirds1(){
        if(frameCount%160==0){
            bird1 = createSprite(Math.round(random(20,580)),0,10,10)
            bird1.addImage(bird1Img)
            bird1.velocityY = +(4+score/100)
            bird1.velocityX = -(1+score/200)
            bird1.lifetime = 300
            bird1.scale=0.07
            birds1G.add(bird1)
            
            

        }
    }



































































































































