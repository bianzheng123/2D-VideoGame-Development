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

    this.mDyePack = new SpriteRenderable(spriteTexture);
    this.mDyePack.setColor([1, 1, 1, 0.1]);
  //  this.mDyePack.getXform().setPosition(35, 50);
    this.mDyePack.getXform().incRotationByDegree(90);
    this.mDyePack.getXform().setSize(this.kRefWidth / 50, this.kRefHeight / 50);
    this.mDyePack.setElementPixelPositions(510, 595, 23, 153);
    this.lb=this.mDyePack.getXform().getXPos()-(this.kRefWidth / 100);//left bound
    this.rb=this.lb+(this.kRefWidth / 50);//right bound
    this.bb=this.mDyePack.getXform().getYPos()-(this.kRefHeight / 100);//bottom bound
    this.tb=this.bb+(this.kRefHeight / 50);//top bound
    GameObject.call(this, this.mDyePack);
}
gEngine.Core.inheritPrototype(DyePack, GameObject);

DyePack.prototype.update = function () {
    var xform = this.getXform();
    if(this.mDyePack.getXform().getXPos() > 90){
        xform.incXPosBy(this.kSlowDelta);
    }else{
        xform.incXPosBy(this.kDelta);
    }
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
}
DyePack.prototype.collide=function(lb,rb,bb,tb){
    return(this.in(lb,rb,bb,tb,this.lb,this.bb)||
           this.in(lb,rb,bb,tb,this.lb,this.tb)||
           this.in(lb,rb,bb,tb,this.rb,this.bb)||
           this.in(lb,rb,bb,tb,this.rb,this.tb) 
           );
}