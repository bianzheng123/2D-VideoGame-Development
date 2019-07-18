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
    this.kUIButton = "assets/UI/button.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kThermometer ="assets/thermometer.png";
    //need the wav file(to play audio)
    
    // The camera to view the scene
    this.mCamera = null;
    
    this.mBg = null;//background
    this.mMapManager = null;
    this.mIceCreamManager = null;
    this.mShadowManager = null;
    this.mPlayer = null;
    
    this.mUIManager = null;
    
    this.stopUpdating = false;
    this.isVictory = false;
    this.isLost = false;
    this._VictoryFrameLast = 100 * 60;//距离胜利还有多少帧
    
    
    //To change the Scene
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(PlayScene, Scene);


PlayScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kAtlas);
    gEngine.Textures.loadTexture(this.kThermometer);
    
};

PlayScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kAtlas);
    gEngine.Textures.loadTexture(this.kThermometer);
};

PlayScene.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(-15.5, -10), // position of the camera
        140,                     // width of camera
        [10, 10, 975, 585]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8,0.8,0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    //set background
    var bgR = new SpriteRenderable(this.kBG);
    bgR.setElementPixelPositions(0, 1023, 0, 1023);
    bgR.getXform().setSize(100, 100);
    bgR.getXform().setPosition(0, 0);
    this.mBg = new GameObject(bgR);
    
    this.mUIManager = new UIManager(this.kAtlas,this.mCamera,this.kThermometer);
    this.mUIManager.initialize();
    this.mMapManager = new MapManager(this.kAtlas,this.mCamera);
    this.mMapManager.initialize();
    this.mShadowManager = new ShadowManager(this.kAtlas,this.mCamera);
    this.mShadowManager.initialize();
    
    
    this.mIceCreamManager = new IceCreamManager(this.kAtlas,this.mCamera);
    
    this.mPlayer = new Player(this.kAtlas);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
PlayScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    //this.mBg.draw(this.mCamera);
    this.mMapManager.draw();
    this.mShadowManager.draw();
    this.mPlayer.draw(this.mCamera);
    this.mIceCreamManager.draw();
    this.mUIManager.draw(this.mCamera);
};

PlayScene.prototype.update = function () {
    if(!this.stopUpdating){
        this.mIceCreamManager.update(this.mMapManager);
        this.mMapManager.update();
        this._updatePlayerPositionByIndex();
//        console.log(this.mPlayer.canEatIceCream);
        if(this.mPlayer.t_pre_isDead === true && this.mPlayer.mIsDead === false){
            this.mPlayer.mIsDead = true;
        }
        this.mPlayer.update(this.mIceCreamManager.mIceCreamArray,this.mMapManager);
        //_updatePlayerPositionByIndex必须要在this.mPlayer.update前面
        
        this.mShadowManager.update([this.mPlayer.originalX,this.mPlayer.originalY],[-100,-20],[-100,-20]);
        //press z to create an iceCream
        
        this._approachVictory();
        if(this.isVictory){
            this.stopUpdating = true;
        }
        this._detectLost();
        if(this.isLost){
            this.stopUpdating = true;
        }
        
        this._setMsg();
        this.mUIManager.update(this);

    }

    
};

PlayScene.prototype._detectLost = function(){
    if(this.mPlayer.temperature >= 100){
        this.isLost = true;
    }
};

//means survive the fixed time to win the game
PlayScene.prototype._approachVictory = function(){
    if(this._VictoryFrameLast <= 0 || this.mPlayer.temperature <= 0){
        this.isVictory = true;
    }else{
        this._VictoryFrameLast--;
    }
};

PlayScene.prototype._setMsg = function(){
    var dir = null;
    var msg;
    switch(this.mPlayer.direction){
        case this.mPlayer.DirectionEnum.RIGHT:  dir = "right";  break;
        case this.mPlayer.DirectionEnum.TOPRIGHT:   dir = "topright";   break;
        case this.mPlayer.DirectionEnum.TOP:    dir = "top";    break;
        case this.mPlayer.DirectionEnum.TOPLEFT:    dir = "topleft";    break;
        case this.mPlayer.DirectionEnum.LEFT:   dir = "left";   break;
        case this.mPlayer.DirectionEnum.BOTTOMLEFT: dir = "bottomleft"; break;
        case this.mPlayer.DirectionEnum.BOTTOM: dir = "bottom"; break;
        case this.mPlayer.DirectionEnum.BOTTOMRIGHT:    dir = "bottomright";    break;
    }
    document.getElementById("st1").innerHTML="player direction: " + dir;
    
    var tmp = Number.parseFloat(this.mPlayer.accumulateValue).toFixed(1);
    msg = "Storing Force Val: " + tmp.toString(); 

    document.getElementById("st2").innerHTML=msg;
    
    msg = "Player position(index) X: " + this.mPlayer.mXindex + ",Y: " + this.mPlayer.mYindex;
    document.getElementById("st3").innerHTML=msg;
    
    msg = "Player temperature: " + this.mPlayer.temperature;
    document.getElementById("st4").innerHTML=msg;    
    
    if(this.isLost){
        msg = "Gaming State: Lost";
    }else if(this.isVictory){
        msg = "Gaming State: Victory";
    }else{
        msg = "Gaming State: Playing";
    }
    document.getElementById("st5").innerHTML=msg;
};

//判断主角是否死亡
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
                        l.kXpos - l.kXsize / 2 <= pos[0]  && pos[0] <= l.kXpos + l.kXsize / 2 &&
                        l.kYpos - l.kYsize / 2 <= pos[1] - this.mPlayer.kHeight / 3 && pos[1] - this.mPlayer.kHeight / 3  <= l.kYpos + l.kYsize / 2){
                    this.mPlayer.mXindex = l.kXindex;
                    this.mPlayer.mYindex = l.kYindex;
                    if(l.kTag === "Grass"){
                        this.mPlayer.mIsDead = false;
                        this.mPlayer.mLastXpos = l.kXpos;
                        this.mPlayer.mLastYpos = l.kYpos;
                    }else if(this.mPlayer.isJumping){
                        this.mPlayer.mIsDead = false;
                    }else{
                        this.mPlayer.mIsDead = true;
                    }
//                    console.log("whether the player is dead: " + this.mPlayer.mIsDead);
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

