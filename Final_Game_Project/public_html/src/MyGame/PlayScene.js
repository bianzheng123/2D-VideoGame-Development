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
    this.mMsg2 = null;
    this.mMsg3 = null;
    
    
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
    
    this.mMsg2 = new FontRenderable("Status Message");
    this.mMsg2.setColor([0, 0, 0, 1]);
    this.mMsg2.getXform().setPosition(-45, -43);
    this.mMsg2.setTextHeight(3);
    
    this.mMsg3 = new FontRenderable("Status Message");
    this.mMsg3.setColor([0, 0, 0, 1]);
    this.mMsg3.getXform().setPosition(-45, -46);
    this.mMsg3.setTextHeight(3);
    
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
    this._drawMsg(this.mCamera);
};

PlayScene.prototype.update = function () {
    this.mIceCreamManager.update(this.mMapManager);
    this.mMapManager.update();
    this.mPlayer.update();
    //press z to create an iceCream
    this._updatePlayerPositionByIndex();
    this._setMsg();
};

PlayScene.prototype._drawMsg = function(Camera){
  this.mMsg1.draw(Camera);
  this.mMsg2.draw(Camera);
  this.mMsg3.draw(Camera);
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
    
    if(-0.01 <= this.mPlayer.accumulateValue && this.mPlayer.accumulateValue <= 0.01){
        msg = "Is storing force: false";
    }else{
        msg = "Is storing force: true";
    }
    this.mMsg2.setText(msg);
    
    msg = "Player position(index) X: " + this.mPlayer.mXindex + ",Y: " + this.mPlayer.mYindex;
    this.mMsg3.setText(msg);
};

PlayScene.prototype._updatePlayerPositionByIndex = function(){
    var mapArr = this.mMapManager.MapArray;
    var i,j,l;
    var hasIterateAll = false;
    var pos = this.mPlayer.getXform().getPosition();
    breakpoint:{
        for(i=0;i<this.mMapManager.kHeight;i++){
            for(j=0;j<this.mMapManager.kWidth;j++){
                l = mapArr[i][j];
                if((!this.mPlayer.isJumping) && 
                        l.kXpos - l.kXsize / 2 <= pos[0] && pos[0] <= l.kXpos + l.kXsize / 2 &&
                        l.kYpos - l.kYsize / 2 <= pos[1] && pos[1] <= l.kYpos + l.kYsize / 2){
                    this.mPlayer.mXindex = l.kXindex;
                    this.mPlayer.mYindex = l.kYindex;
                    if(l.kTag === "Grass"){
                        this.mPlayer.mIsDead = false;
                        this.mPlayer.mLastXpos = l.kXpos;
                        this.mPlayer.mLastYpos = l.kYpos;
                    }else if(this.mPlayer.isJumping){
                        this.mPlayer.mIsDead = false;
                        console.log("fsdfsd");
                    }else{
                        this.mPlayer.mIsDead = true;
                    }
                    console.log("whether the player is dead: " + this.mPlayer.mIsDead);
                    break breakpoint;
                }
                if(i === this.mMapManager.kHeight - 1 && j === this.mMapManager.kWidth - 1){
                    hasIterateAll = true;
                }
            }
        }
    }

    if(hasIterateAll && !this.mPlayer.isJumping){
        this.mPlayer.mXindex = null;
        this.mPlayer.mYindex = null;
        this.mPlayer.mIsDead = true;
    }
};
