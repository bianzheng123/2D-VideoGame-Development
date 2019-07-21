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
    this.kSprite = "assets/sprite.png";
    this.kMapNames = "assets/mapNames.png";
    
    this.kClickButton = "assets/AudioTest/NFF-finger-snap.wav";
    this.kOnButton = "assets/AudioTest/NFF-glued.wav";
    this.kBgClip = "assets/AudioTest/BGClip.mp3";
    
    this.kMyGameBgm = "assets/AudioTest/MyGameBackGround.mp3";
    // The camera to view the scene
    
    this.mCamera = null;
    this.PlaySceneButton = null;
    this.UITitle = null;
    this.generalUI = null;
    this.selectUI = null;
    this.isSelecting = false;
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    // loads the audios
    gEngine.AudioClips.loadAudio(this.kClickButton);
    gEngine.AudioClips.loadAudio(this.kOnButton);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kMyGameBgm);
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kSprite);
    gEngine.Textures.loadTexture(this.kMapNames);
};

MyGame.prototype.unloadScene = function () {
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();
    
    // unload the loaded resources
    gEngine.AudioClips.unloadAudio(this.kOnButton);
    gEngine.AudioClips.unloadAudio(this.kClickButton);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kMyGameBgm);
    
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kSprite);
    gEngine.Textures.unloadTexture(this.kMapNames);
    if(this.LevelSelect<10&&this.LevelSelect>=0){
        gEngine.Core.startScene(new PlayScene(this.LevelSelect));
    }else if(this.LevelSelect>=10&&this.LevelSelect<20){
        gEngine.Core.startScene(new EndlessPlayingScene(this.LevelSelect-10));
    }
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(-15.5, -10), // position of the camera
        140,                     // width of camera
        [0, 0, 999, 599]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1,234/255,167/255, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.PlaySceneButton = new UIButton(this.PlaySceneSelect,this,[475,250],[400,50],"Start Game",6);
    this.UITitle = new UIText("Haha & Coco (beta)",[475,450],8,1,0,[0,0,0,1]);
    this.generalUI = new GeneralUI(this.kOnButton,this.mCamera);
    this.generalUI.initialize();
    this.selectUI = new SelectUI(this.kSprite,this.mCamera,this.kMapNames,this);
    this.selectUI.initialize();
    gEngine.AudioClips.playBackgroundAudio(this.kMyGameBgm);
    gEngine.AudioClips.setCueVolume(30);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();   
    this.generalUI.draw(this.mCamera);
    if(!this.selectUI.display){
        this.PlaySceneButton.draw(this.mCamera); 
        this.UITitle.draw(this.mCamera);
    }else{
        this.selectUI.draw(this.mCamera);
    }
};

MyGame.prototype.update = function () {
    if(!this.selectUI.display){
        this.PlaySceneButton.update();
    }else{
        this.selectUI.update();
    }
    this.generalUI.update();
    //this.EndlessPlayingSceneButton.update();
    //this.InstructionSceneButton.update();
};

MyGame.prototype.PlaySceneSelect = function(){
    this.selectUI.display=true;
//    this.LevelSelect="PlayScene";    
//    this.clickAudio(this.PlaySceneButton);
//    gEngine.AudioClips.stopBackgroundAudio();
//    gEngine.GameLoop.stop();
};

MyGame.prototype.clickAudio = function (button) {
    //console.log('play click');
     gEngine.AudioClips.playACue(this.kClickButton,40);
     button.mPlayClickButtonAudio = false;
};