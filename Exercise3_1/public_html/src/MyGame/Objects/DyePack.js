/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DyePack(spriteTexture) {
    this.kRefWidth = 80;
    this.kRefHeight = 130;
    this.kDelta = 2;
    this.kSlowDelta = 0.1;
    
    this.speed = this.kDelta;
    this.isDesSpeed = false;
    this.canDelete = false;
    
    this.isOscillates = false; 
    this.countOscillation = 0;
    this.xPos = 0;
    this.yPos = 0;
    this.XPosOffset = 0;
    this.YPosOffset = 0;
    
    this.available=true;
    this.mDyePack = new SpriteRenderable(spriteTexture);
    this.mDyePack.setColor([1, 1, 1, 0.1]);
  //  this.mDyePack.getXform().setPosition(35, 50);
    this.mDyePack.getXform().incRotationByDegree(90);
    this.mDyePack.getXform().setSize(this.kRefWidth / 50, this.kRefHeight / 50);
    this.mDyePack.setElementPixelPositions(510, 595, 23, 153);
    
    this.mDyePackShake = new ShakePosition(4,0.2,20,300);
    
    this.lb=this.mDyePack.getXform().getXPos()-(this.kRefWidth / 100);//left bound
    this.rb=this.lb+(this.kRefWidth / 50);//right bound
    this.bb=this.mDyePack.getXform().getYPos()-(this.kRefHeight / 100);//bottom bound
    this.tb=this.bb+(this.kRefHeight / 50);//top bound
    GameObject.call(this, this.mDyePack);
}
gEngine.Core.inheritPrototype(DyePack, GameObject);

DyePack.prototype.update = function () {
    var xform = this.getXform();

    if(xform.getXPos() > 90){
        this.speed = this.kSlowDelta;
    }else{
        if(this.isDesSpeed){
            this.speed -= 0.1;
        }else{
            this.speed = this.kDelta;
        }
    }
    
    if(this.isOscillates){
        if(this.countOscillation === 500){
            this.isOscillates = false;
            this.countOscillation = 0;
            this.canDelete = true;
        }

        this.XPosOffset = 4 * Math.sin(this.countOscillation);
        this.YPosOffset = 0.2 * Math.sin(this.countOscillation);
        xform.setXPos(this.xPos + this.XPosOffset);
        xform.setYPos(this.yPos + this.YPosOffset);
        this.countOscillation++;
        console.log(this.XPosOffset);
    }else{
        this.xPos = xform.getXPos();
        this.yPos = xform.getYPos();
    }
    
    
    if(this.speed < 0.001 || this.getXform().getXPos() > 110){
        this.canDelete = true;
    }
    xform.incXPosBy(this.speed);
    
    this.lb=this.mDyePack.getXform().getXPos()-(this.kRefWidth / 100);//left bound
    this.rb=this.lb+(this.kRefWidth / 50);//right bound
    this.bb=this.mDyePack.getXform().getYPos()-(this.kRefHeight / 100);//bottom bound
    this.tb=this.bb+(this.kRefHeight / 50);//top bound
};
DyePack.prototype.in=function(lb,rb,bb,tb,x,y){
    if(x>=lb&&x<=rb&&y>=bb&&y<=tb){
        return true;
    }
    return false;
};
DyePack.prototype.collide=function(lb,rb,bb,tb){
    return(this.in(lb,rb,bb,tb,this.lb,this.bb)||
           this.in(lb,rb,bb,tb,this.lb,this.tb)||
           this.in(lb,rb,bb,tb,this.rb,this.bb)||
           this.in(lb,rb,bb,tb,this.rb,this.tb) 
           );
};

DyePack.prototype.setDecSpeed = function(){
    this.isDesSpeed = true;
};
DyePack.prototype.getCanDelete = function(){
    return this.canDelete;
};