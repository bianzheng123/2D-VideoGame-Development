/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, DyePack, Hero, Minion, Brain,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {

    this.kMinionSprite = "assets/minion_sprite.png";
    this.kMinionPortal = "assets/minion_portal.png";
    this.kBG = "assets/galaxy.png";

    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;

    // the hero and the support objects
    this.mHero = null;
    
    this.isSpawning = true;
    this.count = 0;
    this.spawnTime = Math.random() * 60 + 120;

    this.mPortalHit = null;
    this.mHeroHit = null;

    this.mPortal = null;
    
    this.mBrain = null;
    this.mLMinion = null;
    this.mUMinion = null;

    this.mCollide = null;
    this.mChoice = 'H';
    
    this.mDyePackSet = [];
    
    this.mLMinionSet = [];
    this.mRMinionSet = [];
    this.mBrainSet = [];
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kMinionPortal);
    gEngine.Textures.loadTexture(this.kBG);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kMinionPortal);
    gEngine.Textures.unloadTexture(this.kBG);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5), // position of the camera
        100,                       // width of camera
        [10, 10, 780, 580]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
     //BG
    var bgR = new SpriteRenderable(this.kBG);
    bgR.setElementPixelPositions(0, 1023, 0, 1023);
    bgR.getXform().setSize(120, 100);
    bgR.getXform().setPosition(50, 37.5);
    this.mBg = new GameObject(bgR);
//    // Step D: Create the hero object with texture from the lower-left corner 
    this.mHero = new Hero(this.kMinionSprite);
//    this.mBrain = new Brain(this.kMinionSprite);
//    this.mUMinion = new Minion(this.kMinionSprite,this.mBrain.getXform().getXPos()+10,this.mBrain.getXform().getYPos()+6);
//    this.mLMinion = new Minion(this.kMinionSprite,this.mBrain.getXform().getXPos()+10,this.mBrain.getXform().getYPos()-6);
   
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mBg.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    
//    this.mBrain.draw(this.mCamera);
//    this.mUMinion.draw(this.mCamera);
//    this.mLMinion.draw(this.mCamera);
    
    var i,l;
    for(i=0;i<this.mDyePackSet.length;i++){
        l = this.mDyePackSet[i];
        l.draw(this.mCamera);
    }
    

    for(i=0;i<this.mLMinionSet.length;i++){
        l = this.mLMinionSet[i];
        l.draw(this.mCamera);
    }
    for(i=0;i<this.mRMinionSet.length;i++){
        l = this.mRMinionSet[i];
        l.draw(this.mCamera);
    }
    for(i=0;i<this.mBrainSet.length;i++){
        l = this.mBrainSet[i];
        l.draw(this.mCamera);
    }
    
    
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    //var msg = "L/R: Left or Right Minion; H: Dye; B: Brain]: ";

//   this.mBrain.update();
//   this.mUMinion.update(this.mBrain.getXform().getPosition(),false);
//   this.mLMinion.update(this.mBrain.getXform().getPosition(),true);
   if(this.isSpawning){
       if(this.count >= this.spawnTime){
            var mBrain = new Brain(this.kMinionSprite);
            var mLMinion1 = new Minion(this.kMinionSprite,mBrain.getXform().getXPos() + 10,mBrain.getXform().getYPos() - 6);
            var mRMinion1 = new Minion(this.kMinionSprite,mBrain.getXform().getXPos() + 10,mBrain.getXform().getYPos() + 6);

            this.mLMinionSet.push(mLMinion1);
            this.mRMinionSet.push(mRMinion1);
            this.mBrainSet.push(mBrain);
            
            this.count = 0;
            this.spawnTime = Math.random() * 60 + 120;
       }else{
           this.count++;
       }
   }
   
   
   var i,l,J;
    for(i=0;i<this.mDyePackSet.length;i++){
        l = this.mDyePackSet[i];
        l.update(); 
        
        if(l.getXform().getXPos() > 110){
            var de = this.mDyePackSet.shift();
            de = null;
        }
    }
    
    for(i=0;i<this.mBrainSet.length;i++){
        l = this.mBrainSet[i];
        l.update();
    }
    for(i=0;i<this.mLMinionSet.length;i++){
        l = this.mLMinionSet[i];
        J = this.mBrainSet[i];
        l.update(J.getXform().getPosition(),true);
    }
    for(i=0;i<this.mRMinionSet.length;i++){
        l = this.mRMinionSet[i];
        J = this.mBrainSet[i];
        l.update(J.getXform().getPosition(),false);
    }
    
   
   if (this.mCamera.isMouseInViewport()) {
       this.mHero.update(this.mCamera.mouseWCX(),this.mCamera.mouseWCY());
    }
    
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Space)) {
        var mDyePack = new DyePack(this.kMinionSprite);
        this.mDyePackSet.push(mDyePack);
        mDyePack.getXform().setPosition(this.mHero.getXform().getXPos(),this.mHero.getXform().getYPos());
    }
    
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.C)) {
        var mBrain = new Brain(this.kMinionSprite);
        var mLMinion1 = new Minion(this.kMinionSprite,mBrain.getXform().getXPos() + 10,mBrain.getXform().getYPos() - 6);
        var mRMinion1 = new Minion(this.kMinionSprite,mBrain.getXform().getXPos() + 10,mBrain.getXform().getYPos() + 6);

        this.mLMinionSet.push(mLMinion1);
        this.mRMinionSet.push(mRMinion1);
        this.mBrainSet.push(mBrain);
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.P)){
        this.count = 0;
        this.isSpawning = !this.isSpawning;
    }
};