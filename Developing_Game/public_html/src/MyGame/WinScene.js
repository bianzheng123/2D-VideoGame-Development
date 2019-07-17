/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Win() {
    //to Upload the background
    this.kBG = "assets/WinScene.png";
    this.kAtlas = "assets/white.png";
    
    //need the wav file(to play audio)
    
    // The camera to view the scene
    this.mCamera = null;
    
    this.mBg = null;//background
    this.mMapManager = null;
    this.mIceCreamManager = null;
    this.BackButton = null;
    this.RestartButton = null; /////// -tbc-
    
    //To change the Scene
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(Win, Scene);


Win.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kAtlas);
};

Win.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kAtlas);
     if(this.LevelSelect==="back"){
        gEngine.Core.startScene(new MyGame());
    }
    if(this.LevelSelect==="back"){
        gEngine.Core.startScene(new MyGame());
    }
    if(this.LevelSelect==="restart"){
        gEngine.Core.startScene(new PlayScene());
    }
};

Win.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(-15.5, -10), // position of the camera
        140,                     // width of camera
        [10, 10, 975, 585]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.BackButton = new UIButton(this.BackSelect,this,[70,450],[100,50],"back",4);
    this.RestartButton = new UIButton(this.RestartSelect,this,[90,350],[150,50],"Retart",4);
    
    //set background
    var bgR = new SpriteRenderable(this.kBG);
    bgR.setElementPixelPositions(0, 1023, 0, 1023);
    bgR.getXform().setSize(50, 50);
    bgR.getXform().setPosition(-10, 0);
    this.mBg = new GameObject(bgR);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Win.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.BackButton.draw(this.mCamera);
    this.RestartButton.draw(this.mCamera);
    
    
};

Win.prototype.update = function () {

    this.BackButton.update();
    this.RestartButton.update();
    //press z to create an iceCream
};

Win.prototype.BackSelect = function(){
    this.LevelSelect="back";
    gEngine.GameLoop.stop();
};

Win.prototype.RestartSelect = function(){
    this.LevelSelect="restart";
    gEngine.GameLoop.stop();
};