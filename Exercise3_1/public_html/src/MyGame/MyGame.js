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
    this.mDyePack = null;
    this.mBrain = null;
    this.mPortalHit = null;
    this.mHeroHit = null;

    this.mPortal = null;
    this.mLMinion = null;
    this.mRMinion = null;

    this.mCollide = null;
    this.mChoice = 'H';
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
    bgR.getXform().setSize(150, 150);
    bgR.getXform().setPosition(50, 35);
    this.mBg = new GameObject(bgR);
//    // Step D: Create the hero object with texture from the lower-left corner 
    this.mHero = new Hero(this.kMinionSprite);
    this.mMinion = new Minion(this.kMinionSprite,30,30);
    this.mDyePack = new DyePack(this.kMinionSprite);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mBg.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    this.mMinion.draw(this.mCamera);
    this.mDyePack.draw(this.mCamera);
    //this.mHero.getXform().setPosition(12,15);
    //this.mHero.draw(this.mCamera);
    
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    var msg = "L/R: Left or Right Minion; H: Dye; B: Brain]: ";
//
//    this.mLMinion.update();
//    this.mRMinion.update();
//
    this.mMinion.update();
   this.mHero.update();
   
   if (this.mCamera.isMouseInViewport()) {
        this.mHero.getXform().setXPos(this.mCamera.mouseWCX());
        this.mHero.getXform().setYPos(this.mCamera.mouseWCY());
    }
//
//    this.mPortal.update(gEngine.Input.keys.Up, gEngine.Input.keys.Down,
//        gEngine.Input.keys.Left, gEngine.Input.keys.Right, gEngine.Input.keys.P);
//
//    var h = [];
//
//    // Portal intersects with which ever is selected
//    if (this.mPortal.pixelTouches(this.mCollide, h)) {
//        this.mPortalHit.setVisibility(true);
//        this.mPortalHit.getXform().setXPos(h[0]);
//        this.mPortalHit.getXform().setYPos(h[1]);
//    } else {
//        this.mPortalHit.setVisibility(false);
//    }
//
//    // hero always collide with Brain (Brain chases hero)
//    if (!this.mHero.pixelTouches(this.mBrain, h)) {
//        this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), 0.05);
//        GameObject.prototype.update.call(this.mBrain);
//        this.mHeroHit.setVisibility(false);
//    } else {
//        this.mHeroHit.setVisibility(true);
//        this.mHeroHit.getXform().setPosition(h[0], h[1]);
//    }
//
//    // decide which to collide
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
//        this.mCollide = this.mLMinion;
//        this.mChoice = 'L';
//    }
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
//        this.mCollide = this.mRMinion;
//        this.mChoice = 'R';
//    }
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
//        this.mCollide = this.mBrain;
//        this.mChoice = 'B';
//    }
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
//        this.mCollide = this.mHero;
//        this.mChoice = 'H';
//    }
//
//    this.mMsg.setText(msg + this.mChoice);
};