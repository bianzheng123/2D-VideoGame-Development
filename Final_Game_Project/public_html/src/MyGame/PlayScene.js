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

function PlayScene() {
    this.kUIButton = "assets/UI/button.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kCue = "assets/AudioTest/BlueLevel_cue.wav";
    
    // The camera to view the scene
    this.mCamera = null;
    this.ParticleButton = null;
    this.PhysicsButton = null;
    this.UIButton = null;
    this.UIText = null;
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(PlayScene, Scene);


PlayScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.AudioClips.loadAudio(this.kCue);
};

PlayScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    if(this.LevelSelect==="Particle"){
        gEngine.Core.startScene(new ParticleLevel());
    }
    else if(this.LevelSelect==="Physics"){
        gEngine.Core.startScene(new RigidShapeDemo());
    }
    else if(this.LevelSelect==="UI"){
        gEngine.Core.startScene(new UIDemo());
    }
    gEngine.AudioClips.unloadAudio(this.kCue);
};

PlayScene.prototype.initialize = function () {
    // Step A: set up the cameras
    console.log("PlayScene");
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.ParticleButton = new UIButton(this.particleSelect,this,[400,400],[600,100],"Particle Demos",8);
    this.PhysicsButton = new UIButton(this.physicsSelect,this,[400,300],[500,100],"Physics Demo",8);
    this.UIButton =  new UIButton(this.uiSelect,this,[400,200],[320,100],"UI Demo",8);
    this.UIText = new UIText("Game Engine Tech Demo",[400,600],8,1,0,[0,0,0,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
PlayScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();
    this.ParticleButton.draw(this.mCamera);
    this.PhysicsButton.draw(this.mCamera);
    this.UIButton.draw(this.mCamera);
    this.UIText.draw(this.mCamera);
};

PlayScene.prototype.update = function () {
    this.ParticleButton.update();
    this.PhysicsButton.update();
    this.UIButton.update();
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        gEngine.AudioClips.playACue(this.kCue, 0.1);
    }
};

PlayScene.prototype.particleSelect = function(){
    this.LevelSelect="Particle";
    gEngine.GameLoop.stop();
};

PlayScene.prototype.physicsSelect = function(){
    this.LevelSelect="Physics";
    gEngine.GameLoop.stop();
};

PlayScene.prototype.uiSelect= function(){
    this.LevelSelect="UI";
    gEngine.GameLoop.stop();
};