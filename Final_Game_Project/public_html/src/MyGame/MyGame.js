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

function MyGame() {
    this.kUIButton = "assets/UI/button.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kCue = "assets/AudioTest/BlueLevel_cue.wav";
    
    // The camera to view the scene
    this.mCamera = null;
    this.PlaySceneButton = null;
    this.JumpButton = null;
    this.UIText = null;
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    if(this.LevelSelect==="PlayScene"){
        gEngine.Core.startScene(new PlayScene());
    }
    else if(this.LevelSelect==="Jump"){
        gEngine.Core.startScene(new JumpDemo());
    }
    else if(this.LevelSelect==="Win"){
        gEngine.Core.startScene(new Win());
    }
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.PlaySceneButton = new UIButton(this.PlaySceneSelect,this,[200,400],[300,50],"Playscene Demo",4);
    this.JumpButton = new UIButton(this.JumpSelect,this,[200,300],[200,50],"Jump Demo",4);
    this.WinButton = new UIButton(this.WinSelect,this,[200,200],[200,50],"Win",4);
    this.UIText = new UIText("Temp Start Scene",[400,600],8,1,0,[0,0,0,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.PlaySceneButton.draw(this.mCamera);
    this.JumpButton.draw(this.mCamera);
    this.WinButton.draw(this.mCamera);
    this.UIText.draw(this.mCamera);
};

MyGame.prototype.update = function () {
    this.PlaySceneButton.update();
    this.JumpButton.update();
    this.WinButton.update();
};

MyGame.prototype.PlaySceneSelect = function(){
    this.LevelSelect="PlayScene";
    gEngine.GameLoop.stop();
};

MyGame.prototype.JumpSelect = function(){
    this.LevelSelect="Jump";
    gEngine.GameLoop.stop();
};

MyGame.prototype.WinSelect = function(){
    this.LevelSelect="Win";
    gEngine.GameLoop.stop();
};