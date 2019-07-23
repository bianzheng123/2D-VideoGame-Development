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

function InstructionScene() {
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kBackGround = "assets/Instruction.png";
    
    this.kClickButton = "assets/AudioTest/NFF-finger-snap.wav";
    this.kOnButton = "assets/AudioTest/NFF-glued.wav";
    this.kBgClip = "assets/AudioTest/BGClip.mp3";
    
    this.kMyGameBgm = "assets/AudioTest/MyGameBackGround.mp3";
    // The camera to view the scene
    
    this.mCamera = null;
    this.generalUI = null;
    this.mbg = null;
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(InstructionScene, Scene);


InstructionScene.prototype.loadScene = function () {
    // loads the audios
    gEngine.AudioClips.loadAudio(this.kClickButton);
    gEngine.AudioClips.loadAudio(this.kOnButton);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kMyGameBgm);
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBackGround);
};

InstructionScene.prototype.unloadScene = function () {
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();
    
    // unload the loaded resources
    gEngine.AudioClips.unloadAudio(this.kOnButton);
    gEngine.AudioClips.unloadAudio(this.kClickButton);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kMyGameBgm);
    
    gEngine.Textures.unloadTexture(this.kBackGround);
    gEngine.Textures.unloadTexture(this.kUIButton);
    if(this.LevelSelect === "MyGame"){
        gEngine.Core.startScene(new MyGame());
    }
};

InstructionScene.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(-15.5, -10), // position of the camera
        140,                     // width of camera
        [10, 10, 975, 585]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1,234/255,167/255, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mbg = new SpriteRenderable(this.kBackGround);
    this.mbg.setColor([0, 0, 0, 0]);
    this.mbg.getXform().setPosition(-15.5,-10);
    this.mbg.getXform().setSize(140, 84);
    this.mbg.setElementPixelPositions(0, 2047, 0, 1180);
    
    gEngine.AudioClips.playBackgroundAudio(this.kMyGameBgm);
    gEngine.AudioClips.setCueVolume(30);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
InstructionScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();    
    this.mbg.draw(this.mCamera);
    
};

InstructionScene.prototype.update = function () {
    if(gEngine.Input.isAnyKeyClicked()){
        this.MyGameSelect();
    }
};

InstructionScene.prototype.MyGameSelect = function(){
    this.LevelSelect="MyGame";
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.GameLoop.stop();
};

InstructionScene.prototype.clickAudio = function (button) {
    //console.log('play click');
     gEngine.AudioClips.playACue(this.kClickButton,40);
     button.mPlayClickButtonAudio = false;
};