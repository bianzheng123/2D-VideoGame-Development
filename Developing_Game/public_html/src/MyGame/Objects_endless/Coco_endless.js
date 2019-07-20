/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Coco_endless(spriteTexture,IceCream) {
    this.kStateEnum = {
        BRINGING: 0,
        NOTBRINGING: 1
    };
    this.kSpeed = 1;
    this.kHeight = 6;
    this.kWidth = 8;
    this.kYposDiff = 3;
    this.kXposDiff = 3;
    this.kXOriginalPos = 200;
    
    this.mState = this.kStateEnum.BRINGING;
    this.mIceCream = IceCream;
    this.shadow = null;
    this.kBringingVelocity = this.mIceCream.kFlyingVelocity;
    this.kNotBringingVelocity = this.mIceCream.kFlyingVelocity * 3;
    this.kFlyingTheta = 45;
    
    
    this.targetXpos = this.mIceCream.mTargetPositionX + this.mIceCream.failingDistanceX;
    this.targetYpos = this.mIceCream.mTargetPositionY + this.mIceCream.failingDistanceY;
    
    this.mCoco = new SpriteRenderable(spriteTexture);
    this.mCoco.getXform().setPosition(this.kXOriginalPos - this.kXposDiff,this.targetYpos + this.kYposDiff);
    this.mCoco.getXform().setSize(this.kWidth, this.kHeight);
    this.mCoco.setColor([1, 0, 0, 0]);
    this.mCoco.setElementPixelPositions(448, 0, 1338, 1658);
    GameObject.call(this,this.mCoco);
    
}
gEngine.Core.inheritPrototype(Coco_endless, GameObject);

Coco_endless.prototype.update = function(){
    switch(this.mState){
        case this.kStateEnum.BRINGING:
            this._bringing();   break;
        case this.kStateEnum.NOTBRINGING:
            this._notBringing();  break;
    }
    
    
};

Coco_endless.prototype._bringing = function(){
    var xform = this.mIceCream.getXform();
    if(this.mIceCream.mState === this.mIceCream.kStateEnum.FLYING){
        this.mCoco.getXform().setXPos(xform.getXPos() - this.kXposDiff);
        this.mCoco.getXform().setYPos(xform.getYPos() + this.kYposDiff);
    }else{
        this.mState = this.kStateEnum.NOTBRINGING;
    }
};
Coco_endless.prototype._notBringing = function(){
    var xform = this.mCoco.getXform();
    xform.incXPosBy(-this.kNotBringingVelocity * Math.cos(this.kFlyingTheta));
    xform.incYPosBy(this.kNotBringingVelocity * Math.sin(this.kFlyingTheta));
};



