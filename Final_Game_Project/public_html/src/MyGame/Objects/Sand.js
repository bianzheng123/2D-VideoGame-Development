/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Sand(spriteTexture,Xindex,Yindex,camera) {
    this.kXindex = Xindex;
    this.kYindex = Yindex;
    this.kTag = "Sand";
    this.kCamera = camera;
    
    this.kLeft = Xindex * 7 - 47 - 3.5;
    this.kRight = Xindex * 7 - 47 + 3.5;
    this.kTop = Yindex * 7 - 47 + 3.5;
    this.kBottom = Yindex * 7 - 47 -3.5;
    this.kLeftLine = null;
    this.kRightLine = null;
    this.kTopLine = null;
    this.kBottomLine = null;
    
    this.mSand = new SpriteRenderable(spriteTexture);
    this.mSand.setColor([1, 0.91, 0.65, 0.1]);
    this.mSand.getXform().setPosition(Xindex * 7 - 47,Yindex * 7 - 47);
    this.mSand.getXform().setSize(7, 7);
    this.mSand.setElementPixelPositions(510, 595, 23, 153);

    GameObject.call(this, this.mSand);
}
gEngine.Core.inheritPrototype(Sand, GameObject);

Sand.prototype.initialize = function(){
    this.kLeftLine = new LineRenderable();
    this.kLeftLine.setFirstVertex(this.kLeft, this.kBottom);
    this.kLeftLine.setSecondVertex(this.kLeft, this.kTop);
    
    this.kRightLine = new LineRenderable();
    this.kRightLine.setFirstVertex(this.kRight, this.kBottom);
    this.kRightLine.setSecondVertex(this.kRight, this.kTop);
    
    this.kTopLine = new LineRenderable();
    this.kTopLine.setFirstVertex(this.kLeft, this.kTop);
    this.kTopLine.setSecondVertex(this.kRight, this.kTop);
    
    this.kBottomLine = new LineRenderable();
    this.kBottomLine.setFirstVertex(this.kLeft, this.kBottom);
    this.kBottomLine.setSecondVertex(this.kRight, this.kBottom);
    
};

Sand.prototype.drawLine = function(){
    this.kBottomLine.draw(this.kCamera);
    this.kTopLine.draw(this.kCamera);
    this.kLeftLine.draw(this.kCamera);
    this.kRightLine.draw(this.kCamera);
};
