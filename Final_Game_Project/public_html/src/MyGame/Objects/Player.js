/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Player(spriteTexture) {
    this.t = 0;
    
    this.kHeight = 16;
    this.kWidth = 8;

    this.walkingSpeed = 1;
    this.comaTime = 0; // 0 for not in coma yet
    this.flamming = 0; // 0 for no flamming buff
    this.temperature = 50; // range is [0, 100]
    this.accumulateValue = 0; // 0 for no accumulating
    this.normalYPos = 0;
    this.normalXPos = 0;
    this.Direction={
        RIGHT: 0,
        TOPRIGHT: 1,
        TOP: 2,
        TOPLEFT: 3,
        LEFT: 4,
        BOTTOMLEFT: 5,
        BOTTOM: 6,
        BOTTOMRIGHT: 7
    };
    this.direction=this.Direction.RIGHT;
    this.jumping = false;
    this.theta = Math.PI/3;
    this.magnitude = 0;
    this.originalX = 0;
    this.originalY = 0;
    this.originalZ = 0;
    this.speedY = 0;
    this.speedX = 0;
    this.speedZ = 0;
    this.mPlayer = new SpriteRenderable(spriteTexture);
    this.mPlayer.setColor([0.2, 0.5, 0.8, 1]);
    this.mPlayer.getXform().setPosition(10, 25);
    this.mPlayer.getXform().setSize(this.kWidth,this.kHeight);
    this.mPlayer.setElementPixelPositions(510, 595, 23, 153);
    
    GameObject.call(this, this.mPlayer);
}
gEngine.Core.inheritPrototype(Player, GameObject);

Player.prototype.update = function () {
    var xform = this.getXform();
    if(this.jumping){
        this.originalX+=this.speedX;
        this.originalY+=this.speedY;
        this.originalZ+=this.speedZ;
        this.speedZ-=1;
        xform.setXPos(this.originalX);
        xform.setYPos(this.originalY+this.originalZ);
        if(this.originalZ<=0){
            this.jumping=false;
            this.originalZ=0;
        }
        //alert("jumping");
    }

    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        this.direction=this.Direction.LEFT;
        xform.incXPosBy(-this.walkingSpeed);
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
        this.direction=this.Direction.RIGHT;
        xform.incXPosBy(this.walkingSpeed);
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
        this.direction=this.Direction.TOP;
        xform.incYPosBy(this.walkingSpeed);
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        this.direction=this.Direction.BOTTOM;
        xform.incYPosBy(-this.walkingSpeed);
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
        this.direction=this.Direction.TOPLEFT;
        xform.incXPosBy(this.walkingSpeed*(1-Math.cos(Math.PI/4)));
        xform.incYPosBy(-this.walkingSpeed*(1-Math.cos(Math.PI/4)));
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        this.direction=this.Direction.BOTTOMLEFT;
        xform.incXPosBy(this.walkingSpeed*(1-Math.cos(Math.PI/4)));
        xform.incYPosBy(this.walkingSpeed*(1-Math.cos(Math.PI/4)));
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
        this.direction=this.Direction.TOPRIGHT;
        xform.incXPosBy(-this.walkingSpeed*(1-Math.cos(Math.PI/4)));
        xform.incYPosBy(-this.walkingSpeed*(1-Math.cos(Math.PI/4)));
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        this.direction=this.Direction.BOTTOMRIGHT;
        xform.incXPosBy(-this.walkingSpeed*(1-Math.cos(Math.PI/4)));
        xform.incYPosBy(this.walkingSpeed*(1-Math.cos(Math.PI/4)));
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)&&!this.jumping){
        this.accumulateValue+=0.1;
        var deltaH = -xform.getHeight()/200;
        xform.incHeightBy(deltaH);
        xform.incYPosBy(deltaH/2);
    }
    if((!gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))&&this.accumulateValue!=0&&!this.jumping){
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
        this.jumping=true;
        //alert(this.speedZ);
    }

};