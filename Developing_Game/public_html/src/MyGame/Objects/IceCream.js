/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function IceCream(spriteTexture,Xindex,Yindex,buffEnum) {
    this.kXindex = Xindex;
    this.kYindex = Yindex;
    this.kHeight = 5;
    this.kWidth = 5;
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
    
    this.mBuff = buffEnum; 
    this.mState = this.kStateEnum.DROPING;
    this.mFrameCount = 0;
    
    this.mTargetPositionX = Xindex * 7 - 47;
    this.mTargetPositionY = Yindex * 7 - 47;
    
    this.kfailingTime = 2;
    
    this.canBeKnocked = false;
    this.failingDistanceX = 20;
    this.failingDistanceY = 20;//在两秒之内完成降落
    
    this.failingFrameCount = 0;
    
    this.velocityX = this.failingDistanceX / (this.kfailingTime * 60);
    this.accerlateY = 2 * this.failingDistanceY / (this.kfailingTime * 60 * 60 * this.kfailingTime);
    
    this.mIceCream = new SpriteRenderable(spriteTexture);
    this.mIceCream.getXform().setPosition(this.mTargetPositionX + this.failingDistanceX,this.mTargetPositionY + this.failingDistanceY);
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
    
}
gEngine.Core.inheritPrototype(IceCream, GameObject);


IceCream.prototype.update = function () {
    if(this.mState === this.kStateEnum.DROPING){
        this._drop();
    }else{
        this._melt();
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
        case 120:
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
            
        case 240:
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
