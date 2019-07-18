/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function IceCream(spriteTexture,Xindex,Yindex,buffNum) {
    this.kXindex = Xindex;
    this.kYindex = Yindex;
    this.kHeight = 5;
    this.kWidth = 5;
    this.kHalfMeltTime = 10;
    this.kFullMeltTime = 20;
    this.kBuffEnum = {
        NO_BUFF:0,
        SPEED_UP_BUFF:1,
        FIRE_BUFF:2
    };
    this.kStateEnum = {
        NOT_MELT: 0,
        HALF_MELT: 1,
        FULL_MELT: 2,
        DROPING: 3,
        FLYING: 4
    };
    this.kDecTemperatureEnum = {
        NOT_MELT: 5,
        HALF_MELT: 3,
        FULL_MELT: -1
    };
    this.mBuff = buffNum; 
    this.mState = this.kStateEnum.FLYING;
    this.mFrameCount = 0;
    
    this.mInitialPositionX = 60;
    this.kFlyingVelocity = 0;//正确的速度在下面
    
    this.kfailingTime = 2;
    
    this.canBeKnocked = false;
    this.failingDistanceX = 20;
    this.failingDistanceY = 20;//在两秒之内完成降落
    this.failingFrameCount = 0;
    this.velocityX = this.failingDistanceX / (this.kfailingTime * 60);
    this.accerlateY = 2 * this.failingDistanceY / (this.kfailingTime * 60 * 60 * this.kfailingTime);
    
    this.kFlyingVelocity = this.velocityX;//飞行的真实速度
    
    this.mTargetPositionX = Xindex * 7 - 47;
    this.mTargetPositionY = Yindex * 7 - 47;
    
    
    this.mIceCream = new SpriteRenderable(spriteTexture);
    this.mIceCream.getXform().setPosition(this.mInitialPositionX ,this.mTargetPositionY + this.failingDistanceY);
    this.mIceCream.getXform().setSize(this.kWidth, this.kHeight);
    
    switch(this.mBuff){
        case this.kBuffEnum.NO_BUFF:
            this.mIceCream.setColor([0, 0, 0.7, 1]);    break;
        case this.kBuffEnum.SPEED_UP_BUFF:
            this.mIceCream.setColor([0,0.3,0.7,1]); break;
        case this.kBuffEnum.FIRE_BUFF:
            this.mIceCream.setColor([0.3,0.3,0.7,1]);   break;
        
    }
    this.mIceCream.setElementPixelPositions(510, 595, 23, 153);
    GameObject.call(this,this.mIceCream);
    
    this.icecream = null;
    this.shadowYPos = null;
}
gEngine.Core.inheritPrototype(IceCream, GameObject);


IceCream.prototype.update = function () {
    switch(this.mState){
        case this.kStateEnum.FLYING:
            this._fly();    break;
        case this.kStateEnum.DROPING:
            this._drop();   break;
        default:
            this._melt();   break;
    }
    
};

IceCream.prototype._fly = function(){
    //this.mTargetPositionX + this.failingDistanceX
    var xform = this.mIceCream.getXform();
    var targetXPos = this.mTargetPositionX + this.failingDistanceX;
    if(targetXPos - 0.1 <= xform.getXPos() && xform.getXPos() <= targetXPos + 0.1){
        xform.setXPos(targetXPos);
        this.mState = this.kStateEnum.DROPING;
    }else{
        xform.incXPosBy(-this.kFlyingVelocity);
    }
    
};

IceCream.prototype._drop = function(){
    var pos = this.mIceCream.getXform().getPosition();
    if(this.failingFrameCount >= this.kfailingTime * 60){
        pos[0] = this.mTargetPositionX;
        pos[1] = this.mTargetPositionY;
        this.mState = this.kStateEnum.NOT_MELT;
        this.canBeKnocked = false;
    }else{
        this.failingFrameCount++;
        if(this.failingFrameCount >= this.kfailingTime * 2 / 3 * 60){
            this.canBeKnocked = true;
        }
        var xform = this.mIceCream.getXform();
        xform.incXPosBy(-this.velocityX);
        xform.incYPosBy(-this.accerlateY * this.failingFrameCount);
    }
};


IceCream.prototype._melt = function(){
    
    switch(this.mFrameCount){
        case this.kHalfMeltTime * 60:
            switch(this.mBuff){
                case this.kBuffEnum.NO_BUFF:
                    this.mIceCream.setColor([0, 0, 0.3, 1]);    break;
                case this.kBuffEnum.SPEED_UP_BUFF:
                    this.mIceCream.setColor([0,0.3,0.3,1]); break;
                case this.kBuffEnum.FIRE_BUFF:
                    this.mIceCream.setColor([0.3,0.3,0.3,1]);   break;
            }
                
            this.mState = this.kStateEnum.HALF_MELT;
            break;
            
        case this.kFullMeltTime * 60:
            switch(this.mBuff){
                case this.kBuffEnum.NO_BUFF:
                    this.mIceCream.setColor([0, 0, 0, 1]);    break;
                case this.kBuffEnum.SPEED_UP_BUFF:
                    this.mIceCream.setColor([0,0.3,0, 1]); break;
                case this.kBuffEnum.FIRE_BUFF:
                    this.mIceCream.setColor([0.3,0.3,0,1]);   break;
            }
            
            this.mState = this.kStateEnum.FULL_MELT;
            break;
    }
    
    this.mFrameCount++;
};
