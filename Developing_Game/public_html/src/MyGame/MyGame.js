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
    
    this.kClickButton = "assets/AudioTest/NFF-finger-snap.wav";
    this.kOnButton = "assets/AudioTest/NFF-glued.wav";
    this.kBgClip = "assets/AudioTest/BGClip.mp3";
    // The camera to view the scene
    
    this.mCamera = null;
    this.PlaySceneButton = null;
    this.UITitle = null;
    this.generalUI = null;
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    // loads the audios
    gEngine.AudioClips.loadAudio(this.kClickButton);
    gEngine.AudioClips.loadAudio(this.kOnButton);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.Textures.loadTexture(this.kUIButton);
};

MyGame.prototype.unloadScene = function () {
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();
    
    // unload the loaded resources
    gEngine.AudioClips.unloadAudio(this.kOnButton);
    gEngine.AudioClips.unloadAudio(this.kClickButton);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    
    gEngine.Textures.unloadTexture(this.kUIButton);
    if(this.LevelSelect==="PlayScene"){
        gEngine.Core.startScene(new PlayScene());
    }
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(-15.5, -10), // position of the camera
        140,                     // width of camera
        [10, 10, 975, 585]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1,234/255,167/255, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.PlaySceneButton = new UIButton(this.PlaySceneSelect,this,[475,300],[300,50],"start game",6);
    this.UITitle = new UIText("Haha & Coco (alpha)",[475,450],8,1,0,[0,0,0,1]);
    this.generalUI = new GeneralUI(this.kOnButton,this.mCamera);
    this.generalUI.initialize();
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();    
    this.generalUI.draw(this.mCamera);
    this.PlaySceneButton.draw(this.mCamera); 
    this.UITitle.draw(this.mCamera);
};

MyGame.prototype.update = function () {
    
    this.PlaySceneButton.update();
    this.generalUI.update();
};

MyGame.prototype.PlaySceneSelect = function(){
    this.LevelSelect="PlayScene";
    this.clickAudio(this.PlaySceneButton);
    gEngine.GameLoop.stop();
};

MyGame.prototype.clickAudio = function (button) {
    //console.log('play click');
     gEngine.AudioClips.playACue(this.kClickButton,40);
     button.mPlayClickButtonAudio = false;
};