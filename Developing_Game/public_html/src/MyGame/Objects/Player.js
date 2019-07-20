/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Player(spriteTexture,camera,fireManager,audio_EatIceCream) {
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
    this.DeathEnum = {
        NOTDEAD:0,
        TRAP:1,
        FLYING_ICE_CREAM:2,
        FALL:3
    };
    this.deathReason = this.DeathEnum.NOTDEAD;
    this.kPictureArray = new Array(6);//这个以后搞
    
    this.kHeight = 6.5;
    this.kWidth = 6.5;
    this.kGravityAcceleration = 1;
    this.kspriteTexture = spriteTexture;
    this.kincTemperatureCountMax = 60;//平均120帧主角上升1°
    this.kTimeToVictory = 120;//10秒之后存活成功
    this.kAudio_EatIceCream = audio_EatIceCream;
    
    this.eatIceCreamCount = 0;
    
    this.kSpeedUpSpeed = 0.4;
    this.kOriginSpeed = 0.2;
    this.kSpeedUpTime = 5;//for the speed up buff
    
    this.kSprayFireTime = 5;//喷火

    this.isSpeedUp = false;
    this._SpeedUpFrameCount = 0;
    
    this.kFireManager = fireManager;
    this.kCamera = camera;
    this.isSprayFire = false;
    this._SprayFireFrameCount = 0;//for init fire
    
    this._incTemperatureFrameCount = 0;
    
    this.mXindex = 0;
    this.mYindex = 0;//to get its position
    
    this.mLastXpos = 0;
    this.mLastYpos = 0;//stores the last index of grass which the player stays
    this.mIsDead = false;
    this.mIsDeathCountStart = false;
    this.mCountFrameDeath = 0;//for the death part
    
    this.speed = this.kOriginSpeed;
    this.temperature = 50;//初始温度, range is [0, 100]
    this.direction=this.DirectionEnum.RIGHT;
    
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
    this.p_isJumping = false;
    this.waitFrameCount = 0;
    this.hasFrameOut = true;
    this.canEatIceCream = true;
    this.shouldWaitFrame = false;
    
    this.t_pre_isDead = false;
    
    this.mPlayer = new SpriteRenderable(spriteTexture);
    this.mPlayer.setColor([0.8, 0.6, 0.2, 0]);
    this.mPlayer.getXform().setPosition(-47, -47);
    this.mPlayer.getXform().setSize(this.kWidth,this.kHeight);
    this.pleft=1536;
    this.pright=1867;
    this.pbottom=448;
    this.ptop=739;
    this.mPlayer.setElementPixelPositions(this.pleft,this.pright,this.pbottom,this.ptop);
        
    this.shakingCount = 0;
    GameObject.call(this, this.mPlayer);
}
gEngine.Core.inheritPrototype(Player, GameObject);

Player.prototype.initialize = function(){
    this.kPictureArray[0] = [0,331,1790,2048];
    this.kPictureArray[1] = [];
};

Player.prototype.update = function (mIceCreamArray,mapManager,mPlayUI) {
    if(!this.mIsDead){
        this.mPlayer.setElementPixelPositions(this.pleft,this.pright,this.pbottom,this.ptop);
        this._walk(mPlayUI);
        this._jump();
        this._eatIceCream(mIceCreamArray,mapManager);
        this._increaseTempterature();
        if(this.mIsDead === true){
            this.t_pre_isDead = true;
        }
        if(this.isSpeedUp){
            this._speedUp();
        }
        if(this.isSprayFire){
            this._sprayFire();
        }
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.G)){
            this.isSprayFire = true;
            console.log("sprayFire: " + this.isSprayFire);
        }
        
    }else{
        this._death();
    }

};



Player.prototype._walk = function(mPlayUI){
    var xform = this.getXform();
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)||(mPlayUI.mJoystickDirection===this.DirectionEnum.LEFT&&mPlayUI.isWalking)){
        this.changeImageDirection(this.DirectionEnum.LEFT);
        this._changeDir(this.DirectionEnum.LEFT);
        xform.incXPosBy(-this.speed);
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)||(mPlayUI.mJoystickDirection===this.DirectionEnum.RIGHT&&mPlayUI.isWalking)){
        this.changeImageDirection(this.DirectionEnum.RIGHT);
        this._changeDir(this.DirectionEnum.RIGHT);
        xform.incXPosBy(this.speed);
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W)||(mPlayUI.mJoystickDirection===this.DirectionEnum.TOP&&mPlayUI.isWalking)){
        this._changeDir(this.DirectionEnum.TOP);
        xform.incYPosBy(this.speed);
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S)||(mPlayUI.mJoystickDirection===this.DirectionEnum.BOTTOM&&mPlayUI.isWalking)){
        this._changeDir(this.DirectionEnum.BOTTOM);
        xform.incYPosBy(-this.speed);
    }
    if((gEngine.Input.isKeyPressed(gEngine.Input.keys.A)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.W))||(mPlayUI.mJoystickDirection===this.DirectionEnum.TOPLEFT&&mPlayUI.isWalking)){
        this.changeImageDirection(this.DirectionEnum.LEFT);
        this._changeDir(this.DirectionEnum.TOPLEFT);
        xform.incXPosBy(this.speed*(1-Math.cos(Math.PI/4)));
        xform.incYPosBy(-this.speed*(1-Math.cos(Math.PI/4)));

    }
    if((gEngine.Input.isKeyPressed(gEngine.Input.keys.A)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.S))||(mPlayUI.mJoystickDirection===this.DirectionEnum.BOTTOMLEFT&&mPlayUI.isWalking)){
        this.changeImageDirection(this.DirectionEnum.LEFT);
        this._changeDir(this.DirectionEnum.BOTTOMLEFT);
        xform.incXPosBy(this.speed*(1-Math.cos(Math.PI/4)));
        xform.incYPosBy(this.speed*(1-Math.cos(Math.PI/4)));
    }
    if((gEngine.Input.isKeyPressed(gEngine.Input.keys.D)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.W))||(mPlayUI.mJoystickDirection===this.DirectionEnum.TOPRIGHT&&mPlayUI.isWalking)){        
        this.changeImageDirection(this.DirectionEnum.RIGHT);
        this._changeDir(this.DirectionEnum.TOPRIGHT);
        xform.incXPosBy(-this.speed*(1-Math.cos(Math.PI/4)));
        xform.incYPosBy(-this.speed*(1-Math.cos(Math.PI/4)));
    }
    if((gEngine.Input.isKeyPressed(gEngine.Input.keys.D)&&gEngine.Input.isKeyPressed(gEngine.Input.keys.S))||(mPlayUI.mJoystickDirection===this.DirectionEnum.BOTTOMRIGHT&&mPlayUI.isWalking)){        
        this.changeImageDirection(this.DirectionEnum.RIGHT);
        this._changeDir(this.DirectionEnum.BOTTOMRIGHT);
        xform.incXPosBy(-this.speed*(1-Math.cos(Math.PI/4)));
        xform.incYPosBy(this.speed*(1-Math.cos(Math.PI/4)));
    }
    if(!this.isJumping){
        this.originalX = xform.getXPos();
        this.originalY = xform.getYPos();
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
            xform.setYPos(this.expectedY);
            this.isJumping=false;
            this.originalZ=0;
        };
    }
    
    if(this.isJumping === false && this.p_isJumping === true){
        this.canEatIceCream = false;
        this.shouldWaitFrame = true;
    }//防止死亡后仍然吃到冰淇凌
    if(this.shouldWaitFrame){
        this._waitFrame();
    }
    this.p_isJumping = this.isJumping;
    
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)&&!this.isJumping){
        this.accumulateValue+=0.1;
        var deltaH = -xform.getHeight()/200;
        var color=this.mPlayer.getColor();
        color[3]+=0.003;
        this.shakingCount++;
        var shakingMagnitude=this.accumulateValue/2;
        var xShift=(Math.random()>0.5?1:(-1))*Math.sin(this.shakingCount/2)*shakingMagnitude;
        var yShift=(Math.random()>0.5?1:(-1))*Math.sin(this.shakingCount/2)*shakingMagnitude;
//        document.getElementById("st7").innerHTML="xShift:"+xShift+"<br /> shakingCount:"+this.shakingCount+"<br /> accumulateValue:"+this.accumulateValue;
        this.mPlayer.setElementPixelPositions(this.pleft-xShift,this.pright-xShift,this.pbottom-yShift,this.ptop-yShift);
    }
    if((!gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))&&this.accumulateValue!=0&&!this.isJumping){
        //xform.incXPosBy(this.accumulateValue);  
        var deltaH = this.kHeight-xform.getHeight();
        xform.incYPosBy(deltaH/2);
        xform.setSize(this.kWidth,this.kHeight);
        this.normalYPos=xform.getYPos();
        this.normalXPos=xform.getXPos();
        this.magnitude=this.accumulateValue/2;
        this.accumulateValue=0;
        this.speedX = this.magnitude*Math.cos(this.theta)*Math.cos(Math.PI*this.direction/4);
        this.speedY = this.magnitude*Math.cos(this.theta)*Math.sin(Math.PI*this.direction/4);
        this.speedZ = this.magnitude*Math.sin(this.theta);
        this.originalZ = 0;
        var expectedDist = (this.magnitude*this.magnitude*Math.sin(2*this.theta)) /this.kGravityAcceleration;
        this.expectedX=this.originalX+expectedDist*Math.cos(Math.PI*this.direction/4);
        this.expectedY=this.originalY+expectedDist*Math.sin(Math.PI*this.direction/4);
        this.isJumping=true;
        this.mPlayer.setColor([0.8, 0.6, 0.2, 0]);
        this.mPlayer.setElementPixelPositions(this.pleft,this.pright,this.pbottom,this.ptop);
    } 
};

Player.prototype.changeImageDirection=function(walkingDirection){
    if(walkingDirection===this.DirectionEnum.LEFT){
        if(this.pleft<this.pright){
            var temp=this.pleft;
            this.pleft=this.pright;
            this.pright=temp;
        }
    }else{
        if(this.pleft>this.pright){
            var temp=this.pleft;
            this.pleft=this.pright;
            this.pright=temp;
        }
    }
};
Player.prototype._waitFrame = function(){
    if(this.waitFrameCount >= 2){
        this.canEatIceCream = true;
        this.waitFrameCount = 0;
        this.shouldWaitFrame = false;
    }else{
        this.waitFrameCount++;
    }
};

Player.prototype._changeDir = function(directionState){
    this.direction = directionState;
};

Player.prototype._death = function(){
    if(!this.mIsDeathCountStart){
        this.accumulateValue=0;
        this.mPlayer.setColor([0.8, 0.6, 0.2, 0]);
        switch(this.deathReason){
            case this.DeathEnum.FALL:
                if(this.direction === this.DirectionEnum.BOTTOM || 
                    this.direction === this.DirectionEnum.BOTTOMRIGHT ||
                    this.direction === this.DirectionEnum.RIGHT ||
                    this.direction === this.DirectionEnum.TOPRIGHT){
                    this.getXform().incRotationByDegree(-45);
                }else{
                    this.getXform().incRotationByDegree(45);
                }
                break;
            case this.DeathEnum.FLYING_ICE_CREAM:
                if(this.direction === this.DirectionEnum.BOTTOM || 
                    this.direction === this.DirectionEnum.BOTTOMRIGHT ||
                    this.direction === this.DirectionEnum.RIGHT ||
                    this.direction === this.DirectionEnum.TOPRIGHT){
                    this.getXform().incRotationByDegree(45);
                }else{
                    this.getXform().incRotationByDegree(-45);
                }
                break;
            case this.DeathEnum.TRAP:
                if(this.direction === this.DirectionEnum.BOTTOM || 
                    this.direction === this.DirectionEnum.BOTTOMRIGHT ||
                    this.direction === this.DirectionEnum.RIGHT ||
                    this.direction === this.DirectionEnum.TOPRIGHT){
                    this.getXform().incRotationByDegree(-45);
                }else{
                    this.getXform().incRotationByDegree(45);
                }
                break;
        }
        
        this.mIsDeathCountStart = true;
    }else{
        if(this.mCountFrameDeath >= 120){
            this.mIsDeathCountStart = false;
            this.mIsDead = false;
            this.getXform().setPosition(this.mLastXpos,this.mLastYpos);
            switch(this.deathReason){
                case this.DeathEnum.FALL:
                    if(this.direction === this.DirectionEnum.BOTTOM || 
                        this.direction === this.DirectionEnum.BOTTOMRIGHT ||
                        this.direction === this.DirectionEnum.RIGHT ||
                        this.direction === this.DirectionEnum.TOPRIGHT){
                        this.getXform().incRotationByDegree(45);
                    }else{
                        this.getXform().incRotationByDegree(-45);
                    }
                    break;
                case this.DeathEnum.FLYING_ICE_CREAM:
                    if(this.direction === this.DirectionEnum.BOTTOM || 
                        this.direction === this.DirectionEnum.BOTTOMRIGHT ||
                        this.direction === this.DirectionEnum.RIGHT ||
                        this.direction === this.DirectionEnum.TOPRIGHT){
                        this.getXform().incRotationByDegree(-45);
                    }else{
                        this.getXform().incRotationByDegree(45);
                    }
                    break;
                case this.DeathEnum.TRAP:
                    if(this.direction === this.DirectionEnum.BOTTOM || 
                        this.direction === this.DirectionEnum.BOTTOMRIGHT ||
                        this.direction === this.DirectionEnum.RIGHT ||
                        this.direction === this.DirectionEnum.TOPRIGHT){
                        this.getXform().incRotationByDegree(45);
                    }else{
                        this.getXform().incRotationByDegree(-45);
                    }
                    break;
            }
            this.mCountFrameDeath = 0;
            this.t_pre_isDead = false;
            this.canEatIceCream = true;
            this.deathReason = this.DeathEnum.NOTDEAD;
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
        var this_pos = this.getXform().getPosition();
        var this_left = this_pos[0] - this.kWidth / 2;
        var this_right = this_pos[0] + this.kWidth / 2;
        var this_top = this_pos[1] + this.kHeight / 2;
        var this_bottom = this_pos[1] - this.kHeight / 2;
        
        var pos = l.getXform().getPosition();
//        console.log("this_bottom: " + this_bottom + " ,this_top: " + this_top + " ,this_left: " + this_left + " ,this_right: " + this_right);
        var bound = 1;
        if(this_left <= pos[0] - bound && pos[0] + bound <= this_right && this_bottom <= pos[1] && pos[1] <= this_top ){
            this._eatOrKnocked(mapManager,l,mIceCreamArray,i);
        }else if(this_left <= pos[0] && pos[0] <= this_right && this_bottom <= pos[1] - bound && pos[1] + bound <= this_top){
            this._eatOrKnocked(mapManager,l,mIceCreamArray,i);
        }
        
    }
};

Player.prototype._eatOrKnocked = function(mapManager,l,mIceCreamArray,i){
    mapManager.MapArray[l.kYindex][l.kXindex].mHasIceCream = false;
    if(mIceCreamArray[i].canBeKnocked){//knocked
        this.temperature -= 1;
        this.mIsDead = true;
        this.deathReason = this.DeathEnum.FLYING_ICE_CREAM;
        mIceCreamArray[i] = null;
    }else if(mIceCreamArray[i].mState === mIceCreamArray[i].kStateEnum.NOT_MELT
            || mIceCreamArray[i].mState === mIceCreamArray[i].kStateEnum.HALF_MELT
            || mIceCreamArray[i].mState === mIceCreamArray[i].kStateEnum.FULL_MELT
            && this.canEatIceCream){
        gEngine.AudioClips.playACue(this.kAudio_EatIceCream,40);
        
        l = mIceCreamArray[i];

        switch(l.mState){
            case l.kStateEnum.NOT_MELT:
                this.temperature -= l.kDecTemperatureEnum.NOT_MELT; 
                this.eatIceCreamCount++;
                break;
            case l.kStateEnum.HALF_MELT:
                this.temperature -= l.kDecTemperatureEnum.HALF_MELT;
                this.eatIceCreamCount++;
                break;
            case l.kStateEnum.FULL_MELT:
                this.temperature -= l.kDecTemperatureEnum.FULL_MELT;    
                this.mIsDead = true;
                this.deathReason = this.DeathEnum.TRAP;
                break;
        }
        if(l.mState !== l.kStateEnum.FULL_MELT){
            switch(l.mBuff){
                case l.kBuffEnum.NO_BUFF:   
                    break;
                case l.kBuffEnum.SPEED_UP_BUFF: 
                    this.isSpeedUp = true;
                    break;
                case l.kBuffEnum.FIRE_BUFF: 
                    this.isSprayFire = true;
                    break;
            }
        }
        if(this.temperature<0){
            this.temperature=0;
        }        
        mIceCreamArray[i] = null;
        l = null;
    }
};

Player.prototype._sprayFire = function(){
    if(this._SprayFireFrameCount >= this.kSprayFireTime * 60){
        this._SprayFireFrameCount = 0;
        this.isSprayFire = false;
    }else{
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.J)){
            this.kFireManager.createFire(this);
        }
        this._SprayFireFrameCount++;
//        console.log(this._SprayFireFrameCount);
    }
};

Player.prototype._speedUp = function(){
    if(this._SpeedUpFrameCount >= this.kSpeedUpTime * 60){
        this._SpeedUpFrameCount = 0;
        this.speed = this.kOriginSpeed;
        this.isSpeedUp = false;
    }else{
        this.speed = this.kSpeedUpSpeed;
        this._SpeedUpFrameCount++;
    }
};


Player.prototype._increaseTempterature = function(){
    if(this._incTemperatureFrameCount >= this.kincTemperatureCountMax){
        this.temperature+=1.1;
        this._incTemperatureFrameCount = 0;
    }else{
        this._incTemperatureFrameCount++;
    }
};
    


