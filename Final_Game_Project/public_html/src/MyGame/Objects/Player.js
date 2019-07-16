/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Player(spriteTexture) {
    this.DirectionEnum={
        RIGHT: 0,
        TOPRIGHT: 1,
        TOP: 2,
        TOPLEFT: 3,
        LEFT: 4,
        BOTTOMLEFT: 5,
        BOTTOM: 6,
        BOTTOMRIGHT: 7
    };
    this.kHeight = 5;
    this.kWidth = 5;
    this.kGravityAcceleration = 1;
    
    this.mXindex = 0;
    this.mYindex = 0;
    this.mIsDead = false;
    this.mIsDeathCountStart = false;
    this.mCountFrameDeath = 0;
    
    this.walkingSpeed = 1;
    this.comaTime = 0; // 0 for not in coma yet
    this.flamming = 0; // 0 for no flamming buff
    this.temperature = 50; // range is [0, 100]
    this.accumulateValue = 0; // 0 for no accumulating
    this.normalYPos = 0;
    this.normalXPos = 0;
    
    this.direction=this.DirectionEnum.RIGHT;
    this.isJumping = false;
    this.theta = Math.PI/3;
    this.magnitude = 0;//the speed when jumping
    this.originalX = 0;//expected 
    this.originalY = 0;
    this.originalZ = 0;
    this.speedY = 0;
    this.speedX = 0;
    this.speedZ = 0;
    this.expectedX = 0;
    this.expectedY = 0;
    
    this.mPlayer = new SpriteRenderable(spriteTexture);
    this.mPlayer.setColor([0.2, 0.5, 0.8, 1]);
    this.mPlayer.getXform().setPosition(-30, -30);
    this.mPlayer.getXform().setSize(this.kWidth,this.kHeight);
    this.mPlayer.setElementPixelPositions(510, 595, 23, 153);
    
    GameObject.call(this, this.mPlayer);
}
gEngine.Core.inheritPrototype(Player, GameObject);


Player.prototype.update = function () {
    if(!this.mIsDead){
        this.walk();
        this.jump();
    }else{
        this._death();
        
    }
    
};

Player.prototype.walk = function(){
    var xform = this.getXform();
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        this._changeDir(this.DirectionEnum.LEFT);
        xform.incXPosBy(-this.walkingSpeed);
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
        this._changeDir(this.DirectionEnum.RIGHT);
        xform.incXPosBy(this.walkingSpeed);
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
        this._changeDir(this.DirectionEnum.TOP);
        xform.incYPosBy(this.walkingSpeed);
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        this._changeDir(this.DirectionEnum.BOTTOM);
        xform.incYPosBy(-this.walkingSpeed);
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
        this._changeDir(this.DirectionEnum.TOPLEFT);
        xform.incXPosBy(this.walkingSpeed*(1-Math.cos(Math.PI/4)));
        xform.incYPosBy(-this.walkingSpeed*(1-Math.cos(Math.PI/4)));
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        this._changeDir(this.DirectionEnum.BOTTOMLEFT);
        xform.incXPosBy(this.walkingSpeed*(1-Math.cos(Math.PI/4)));
        xform.incYPosBy(this.walkingSpeed*(1-Math.cos(Math.PI/4)));
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
        this._changeDir(this.DirectionEnum.TOPRIGHT);
        xform.incXPosBy(-this.walkingSpeed*(1-Math.cos(Math.PI/4)));
        xform.incYPosBy(-this.walkingSpeed*(1-Math.cos(Math.PI/4)));
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        this._changeDir(this.DirectionEnum.BOTTOMRIGHT);
        xform.incXPosBy(-this.walkingSpeed*(1-Math.cos(Math.PI/4)));
        xform.incYPosBy(this.walkingSpeed*(1-Math.cos(Math.PI/4)));
    }
};

Player.prototype.jump = function(){
    var xform = this.getXform();
    
    if(this.isJumping){
        this.originalX+=this.speedX;
        this.originalY+=this.speedY;
        this.originalZ+=this.speedZ;
        this.speedZ-=this.kGravityAcceleration;
        xform.setXPos(this.originalX);
        xform.setYPos(this.originalY+this.originalZ);
        if(this.originalZ<=0){
            //xform.setXPos(this.expectedX);
            xform.setYPos(this.expectedY);
            this.isJumping=false;
            this.originalZ=0;
        }
        //alert("jumping");
    }
    
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)&&!this.isJumping){
        this.accumulateValue+=0.1;
        var deltaH = -xform.getHeight()/200;
    }
    if((!gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))&&this.accumulateValue!=0&&!this.isJumping){
        //xform.incXPosBy(this.accumulateValue);  
        var deltaH = this.kHeight-xform.getHeight();
        xform.incYPosBy(deltaH/2);
        xform.setSize(this.kWidth,this.kHeight);
        this.normalYPos=xform.getYPos();
        this.normalXPos=xform.getXPos();
        this.magnitude=this.accumulateValue;
        this.accumulateValue=0;
        this.speedX = this.magnitude*Math.cos(this.theta)*Math.cos(Math.PI*this.direction/4);
        this.speedY = this.magnitude*Math.cos(this.theta)*Math.sin(Math.PI*this.direction/4);
        this.speedZ = this.magnitude*Math.sin(this.theta);
        this.originalX = xform.getXPos();
        this.originalY = xform.getYPos();
        this.originalZ = 0;
        //alert(this.magnitude+" "+this.speedX+" "+this.speedY);
        var expectedDist = (this.magnitude*this.magnitude*Math.sin(2*this.theta)) /this.kGravityAcceleration;
        this.expectedX=this.originalX+expectedDist*Math.cos(Math.PI*this.direction/4);
        this.expectedY=this.originalY+expectedDist*Math.sin(Math.PI*this.direction/4);
        this.isJumping=true;
        //alert(this.speedZ);
    }
};

Player.prototype._changeDir = function(directionState){
    this.direction = directionState;
};

Player.prototype._death = function(){
    if(!this.mIsDeathCountStart){
        this.getXform().incRotationByDegree(45);
        this.mIsDeathCountStart = true;
    }else{
        if(this.mCountFrameDeath >= 120){
            this.mIsDeathCountStart = false;
            this.mIsDead = false;
            this.getXform().setPosition(-47,-47);//这里需要更改
            this.mYindex = 0;
            this.getXform().incRotationByDegree(-45);
            this.mCountFrameDeath = 0;
        }
        this.mCountFrameDeath++;
    }
        
        
        
    
};
