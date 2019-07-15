/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Player(spriteTexture) {
    this.kHeight = 16;
    this.kWidth = 8;

    this.walkingSpeed = 0; // 0 for no speedup
    this.comaTime = 0; // 0 for not in coma yet
    this.flamming = 0; // 0 for no flamming buff
    this.temperature = 50; // range is [0, 100]
    this.accumulateValue = 0; // 0 for no accumulating
    
    this.jumping = false;
    this.theta = Math.PI/3;
    this.magnitude = 0;
    this.speedY = 0;
    this.speedX = 0;
    
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
        xform.incXPosBy(this.speedX);
        xform.incYPosBy(this.speedY);
        this.speedY-=1;
        if(-this.speedY>this.magnitude*Math.sin(this.theta)){
            this.jumping=false;
        }
        //alert("jumping");
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)){
        this.accumulateValue+=0.1;
        var deltaH = -xform.getHeight()/200;
        xform.incHeightBy(deltaH);
        xform.incYPosBy(deltaH/2);
    }
    if((!gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))&&this.accumulateValue!=0){
        xform.incXPosBy(this.accumulateValue);  
        var deltaH = this.kHeight-xform.getHeight();
        xform.incYPosBy(deltaH/2);
        xform.setSize(this.kWidth,this.kHeight);
        this.magnitude=this.accumulateValue;
        this.accumulateValue=0;
        this.speedX = this.magnitude*Math.cos(this.theta);
        this.speedY = this.magnitude*Math.sin(this.theta);
        //alert(this.magnitude+" "+this.speedX+" "+this.speedY);
        this.jumping=true;
    }

};