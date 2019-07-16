/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Player(spriteTexture,camera) {
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
    this.mXpos = -30;
    this.mYpos = -30;
    
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
    this.mPlayer.getXform().setPosition(this.mXpos, this.mYpos);
    this.mPlayer.getXform().setSize(this.kWidth,this.kHeight);
    this.mPlayer.setElementPixelPositions(510, 595, 23, 153);
    
    GameObject.call(this, this.mPlayer);
}
gEngine.Core.inheritPrototype(Player, GameObject);


Player.prototype.update = function () {
    
    this.walk();
    this.jump();
};

Player.prototype.walk = function(){
    var xform = this.getXform();
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        this._changeDir(this.DirectionEnum.LEFT);
        this.mXpos -= this.walkingSpeed;
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
        this._changeDir(this.DirectionEnum.RIGHT);
        this.mXpos += this.walkingSpeed;
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
        this._changeDir(this.DirectionEnum.TOP);
        this.mYpos += this.walkingSpeed;
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        this._changeDir(this.DirectionEnum.BOTTOM);
        this.mYpos -= this.walkingSpeed;
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
        this._changeDir(this.DirectionEnum.TOPLEFT);
        this.mXpos += this.walkingSpeed*(1-Math.cos(Math.PI/4));
        this.mYpos -= this.walkingSpeed*(1-Math.cos(Math.PI/4));
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        this._changeDir(this.DirectionEnum.BOTTOMLEFT);
        this.mXpos += this.walkingSpeed*(1-Math.cos(Math.PI/4));
        this.mYpos += this.walkingSpeed*(1-Math.cos(Math.PI/4));
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
        this._changeDir(this.DirectionEnum.TOPRIGHT);
        this.mXpos -= this.walkingSpeed*(1-Math.cos(Math.PI/4));
        this.mYpos -= this.walkingSpeed*(1-Math.cos(Math.PI/4));
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        this._changeDir(this.DirectionEnum.BOTTOMRIGHT);
        this.mXpos -= this.walkingSpeed*(1-Math.cos(Math.PI/4));
        this.mYpos += this.walkingSpeed*(1-Math.cos(Math.PI/4));
    }
    xform.setXPos(this.mXpos);
    xform.setYPos(this.mYpos);
};

Player.prototype.jump = function(){
    var xform = this.getXform();
    if(this.isJumping){
        this.originalX+=this.speedX;
        this.originalY+=this.speedY;
        this.originalZ+=this.speedZ;
        this.speedZ-=this.kGravityAcceleration;
        this.mXpos = this.originalX;
        this.mYpos = this.originalY + this.originalZ;
        xform.setXPos(this.mXpos);
        xform.setYPos(this.mYpos);
        if(this.originalZ<=0){
            //xform.setXPos(this.expectedX);
            xform.setYPos(this.expectedY);
            this.isJumping=false;
            this.originalZ=0;
        }
        //alert("jumping");
    }
    
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)&&!this.isJumping){//蓄力的状态
        this.accumulateValue+=0.1;
        var deltaH = -xform.getHeight()/200;
    }
    if((!gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) && this.accumulateValue !== 0 && !this.isJumping){
        //xform.incXPosBy(this.accumulateValue);  
        var deltaH = this.kHeight-xform.getHeight();
        xform.incYPosBy(deltaH/2);
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
