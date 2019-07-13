/* File: Brain.js 
 *
 * Creates and initializes a simple Brain object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
//导弹
function Brain(spriteTexture) {
    this.kDeltaDegree = 1;
    this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
    this.kDeltaSpeed = Math.random() * 0.083 + 0.083;
    this.theta = Math.random()*2*Math.PI;
    this.mBrain = new SpriteRenderable(spriteTexture);
    this.mBrain.setColor([1, 1, 1, 0]);
    this.mBrain.getXform().setPosition(Math.random() * 40 + 40, Math.random() * 5 + 10);
    this.mBrain.getXform().setSize(7.5, 7.5);
    this.mBrain.setElementPixelPositions(600, 700, 0, 180);

    GameObject.call(this, this.mBrain);

    //this.setSpeed(0.05);
}
gEngine.Core.inheritPrototype(Brain, GameObject);
//
Brain.prototype.update = function () {
   // GameObject.prototype.update.call(this);  // default moving forward
   if(!(this.mBrain.getXform().getXPos()>5&&this.mBrain.getXform().getXPos()<84&&this.mBrain.getXform().getYPos()>10&&this.mBrain.getXform().getYPos()<64)){
       this.theta-=Math.PI;
        var dx=this.kDeltaSpeed*Math.cos(this.theta);
        var dy=this.kDeltaSpeed*Math.sin(this.theta);
        this.mBrain.getXform().incXPosBy(dx);
        this.mBrain.getXform().incYPosBy(dy);
        this.theta=Math.random()*2*Math.PI;
    }
    var dx=this.kDeltaSpeed*Math.cos(this.theta);
    var dy=this.kDeltaSpeed*Math.sin(this.theta);
    this.mBrain.getXform().incXPosBy(dx);
    this.mBrain.getXform().incYPosBy(dy);
};