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
    this.kBuffEnum = {
        NO_BUFF:0,
        SPEED_UP_BUFF:1,
        FIRE_BUFF:2
    };
    this.kStateEnum = {
        NOT_MELT: 0,
        HALF_MELT: 1,
        FULL_MELT: 2
    };
    
    this.mBuff = buffEnum; 
    this.mState = this.kStateEnum.NOT_MELT;
    this.mFrameCount = 0;
    
    this.mIceCream = new SpriteRenderable(spriteTexture);
    this.mIceCream.getXform().setPosition(Xindex * 7 - 47,Yindex * 7 - 47);
    this.mIceCream.getXform().setSize(5, 5);
    
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
//    console.log("melt");
    this._melt();
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
