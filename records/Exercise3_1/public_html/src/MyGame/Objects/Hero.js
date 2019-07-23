/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!



function Hero(spriteTexture) {
    this.kDelta = 0.3;
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1,1,1,0]);
    this.mDye.getXform().setPosition(35, 50);
    this.mDye.getXform().setSize(9, 12);
    this.mDye.setElementPixelPositions(0, 100, 0, 150);
    GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function (mouseWCX,mouseWCY) {
    var xform = this.mDye.getXform();
    if(xform.getXPos() !== mouseWCX){
        xform.setXPos(xform.getXPos() + (mouseWCX - xform.getXPos()) / 60);
    }
    
    if(xform.getYPos !== mouseWCY){
        xform.setYPos(xform.getYPos() + (mouseWCY - xform.getYPos()) / 60);
    }

    

};