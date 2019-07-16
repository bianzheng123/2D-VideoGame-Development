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
    //to Upload the background
    this.kBG = "assets/background.png";
    this.kAtlas = "assets/white.png";
    
    //need the wav file(to play audio)
    
    // The camera to view the scene
    this.mCamera = null;
    
    this.mBg = null;//background
    this.mMapManager = null;
    this.mIceCreamManager = null;
    this.mPlayer = null;
    this.mMsg1 = null;//to show the direction of the player
    
    
    //To change the Scene
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(PlayScene, Scene);


PlayScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kAtlas);
};

PlayScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kAtlas);
};

PlayScene.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                     // width of camera
        [0, 0, 700, 700]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    //set background
    var bgR = new SpriteRenderable(this.kBG);
    bgR.setElementPixelPositions(0, 1023, 0, 1023);
    bgR.getXform().setSize(100, 100);
    bgR.getXform().setPosition(0, 0);
    this.mBg = new GameObject(bgR);
    
    this.mMapManager = new MapManager(this.kAtlas,this.mCamera);
    this.mMapManager.initialize();
    
    this.mMsg1 = new FontRenderable("Status Message");
    this.mMsg1.setColor([0, 0, 0, 1]);
    this.mMsg1.getXform().setPosition(-45, -40);
    this.mMsg1.setTextHeight(3);
    
    this.mIceCreamManager = new IceCreamManager(this.kAtlas,this.mCamera);
    
    this.mPlayer = new Player(this.kAtlas);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
PlayScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mMapManager.draw();
    this.mIceCreamManager.draw();
    
    this.mPlayer.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
};

PlayScene.prototype.update = function () {
    this.mIceCreamManager.update(this.mMapManager);
    this.mMapManager.update();
    this.mPlayer.update();
    //press z to create an iceCream
    this._setMsg();
};

PlayScene.prototype._setMsg = function(){
    var dir = null;
    switch(this.mPlayer.direction){
        case this.mPlayer.DirectionEnum.RIGHT:
            dir = "right";
            break;
        case this.mPlayer.DirectionEnum.TOPRIGHT:
            dir = "topright";
            break;
        case this.mPlayer.DirectionEnum.TOP:
            dir = "top";
            break;
        case this.mPlayer.DirectionEnum.TOPLEFT:
            dir = "topleft";
            break;
        case this.mPlayer.DirectionEnum.LEFT:
            dir = "left";
            break;
        case this.mPlayer.DirectionEnum.BOTTOMLEFT:
            dir = "bottomleft";
            break;
        case this.mPlayer.DirectionEnum.BOTTOM:
            dir = "bottom";
            break;
        case this.mPlayer.DirectionEnum.BOTTOMRIGHT:
            dir = "bottomright";
            break;
    }
    var msg = "now the player direction: " + dir;
    this.mMsg1.setText(msg);  
};
