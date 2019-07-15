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
    
    this.mIceCreamManager = new IceCreamManager(this.kAtlas,this.mCamera);
    
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
    
    
    
};

PlayScene.prototype.update = function () {
    this.mIceCreamManager.update(this.mMapManager);
   
    //press z to create an iceCream
};