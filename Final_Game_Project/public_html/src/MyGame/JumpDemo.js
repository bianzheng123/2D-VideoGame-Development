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

function JumpDemo() {
    this.kUIButton = "assets/UI/button.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kWhite = "assets/white.png";

    
    // The camera to view the scene
    this.mCamera = null;
    this.BackButton = null;
    this.UIText = null;
    
    this.mHaha = null;
    this.mBlock1 = null;
    this.mBock2 = null;
    this.mBock3 = null;
    this.mBock4 = null;
    
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(JumpDemo, Scene);


JumpDemo.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kWhite);
};

JumpDemo.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kWhite);
    if(this.LevelSelect==="back"){
        gEngine.Core.startScene(new MyGame());
    }
};

JumpDemo.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.BackButton = new UIButton(this.BackSelect,this,[70,450],[100,50],"back",4);
    this.UIText = new UIText("Jump Demo",[370,500],8,1,0,[0,0,0,1],8);
    
    this.mHaha = new Player(this.kWhite);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
JumpDemo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.BackButton.draw(this.mCamera);
    this.UIText.draw(this.mCamera);
    this.mHaha.draw(this.mCamera);
};

JumpDemo.prototype.update = function () {
    this.BackButton.update();
    this.mHaha.update();
};

JumpDemo.prototype.BackSelect = function(){
    this.LevelSelect="back";
    gEngine.GameLoop.stop();
};
