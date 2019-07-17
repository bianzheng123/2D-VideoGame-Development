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
    this.kincTemperatureCountMax = 120;//平均120帧主角上升1°
    this.kTimeToVictory = 10;//10秒之后存活成功
    
    this.walkingSpeed = 1;
    this.temperature = 50;//初始温度, range is [0, 100]
    this.direction=this.DirectionEnum.RIGHT;

 
    this._incTemperatureFrameCount = 0;
    
    this.mXindex = 0;
    this.mYindex = 0;//to get its position
    
    this.mLastXpos = 0;
    this.mLastYpos = 0;//stores the last index of grass which the player stays
    this.mIsDead = false;
    this.mIsDeathCountStart = false;
    this.mCountFrameDeath = 0;//for the death part
    
    this.comaTime = 0; // 0 for not in coma yet
    this.flamming = 0; // 0 for no flamming buff
    this.accumulateValue = 0; // 0 for no accumulating
    this.normalYPos = 0;
    this.normalXPos = 0;
    this.theta = Math.PI/3;
    this.magnitude = 0;//the speed when jumping
    this.originalX = 0;//expected 
    this.originalY = 0;
    this.originalZ = 0;
    this.speedY = 0;
    this.speedX = 0;
    this.speedZ = 0;
    this.expectedX = 0;
    this.expectedY = 0;//for the jump part
    this.isJumping = false;
    
    this.mPlayer = new SpriteRenderable(spriteTexture);
    this.mPlayer.setColor([0.2, 0.5, 0.8, 1]);
    this.mPlayer.getXform().setPosition(-47, -47);
    this.mPlayer.getXform().setSize(this.kWidth,this.kHeight);
    this.mPlayer.setElementPixelPositions(510, 595, 23, 153);
    
    GameObject.call(this, this.mPlayer);
}
gEngine.Core.inheritPrototype(Player, GameObject);


Player.prototype.update = function (mIceCreamArray,mapManager) {
    if(!this.mIsDead){
        this._walk();
        this._jump();
        this._eatIceCream(mIceCreamArray,mapManager);
        this._increaseTempterature();
    }else{
        this._death();
    }

};



Player.prototype._walk = function(){
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

Player.prototype._jump = function(){
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
            this.getXform().setPosition(this.mLastXpos,this.mLastYpos);//这里需要更改
            this.getXform().incRotationByDegree(-45);
            this.mCountFrameDeath = 0;
        }
        this.mCountFrameDeath++;
    }

};

Player.prototype._eatIceCream = function(mIceCreamArray,mapManager){
    var i,l;
    
    for(i=0;i<mIceCreamArray.length;i++){
//        console.log(mIceCreamArray.length);
        l = mIceCreamArray[i];
        if(l === null || this.isJumping)   continue;
        var ice_height = mIceCreamArray[i].kWidth;
        var ice_width = mIceCreamArray[i].kHeight;
        var this_pos = this.getXform().getPosition();
        var this_left = this_pos[0] - ice_width / 2;
        var this_right = this_pos[0] + ice_width / 2;
        var this_top = this_pos[1] + ice_height / 2;
        var this_bottom = this_pos[1] - ice_height / 2;
        
        var pos = l.getXform().getPosition();
        var ice_left = pos[0] - l.kWidth / 2;
        var ice_right = pos[0] + l.kWidth / 2;
        var ice_top = pos[1] + l.kHeight / 2;
        var ice_bottom = pos[1] - l.kHeight / 2;
        
        
        if(this_left <= ice_left && ice_left <= this_right && !(ice_top < this_bottom || ice_bottom > this_top)){
            this.temperature--;
            mapManager.MapArray[l.kYindex][l.kXindex].mHasIceCream = false;
            mIceCreamArray[i] = null;
        }else if(this_left <= ice_right && ice_right <= this_right && !(ice_top < this_bottom || ice_bottom > this_top)){
            this.temperature--;
            mapManager.MapArray[l.kYindex][l.kXindex].mHasIceCream = false;
            mIceCreamArray[i] = null;
        }else if(this_bottom <= ice_top && ice_top <= this_top && !(ice_right < this_left || ice_left > this_right)){
            this.temperature--;
            mapManager.MapArray[l.kYindex][l.kXindex].mHasIceCream = false;
            mIceCreamArray[i] = null;
        }else if(this_bottom <= ice_bottom && ice_bottom <= this_top && !(ice_right < this_left || ice_left > this_right)){
            this.temperature--;
            mapManager.MapArray[l.kYindex][l.kXindex].mHasIceCream = false;
            mIceCreamArray[i] = null;
        }
    }
};

Player.prototype._increaseTempterature = function(){
    if(this._incTemperatureFrameCount >= this.kincTemperatureCountMax){
        this.temperature++;
        this._incTemperatureFrameCount = 0;
    }else{
        this._incTemperatureFrameCount++;
    }
};
    


