/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Sand(spriteTexture,Xindex,Yindex) {
    this.kTag = "Sand";
    
    this.mSand = new SpriteRenderable(spriteTexture);
    this.mSand.setColor([1, 0.91, 0.65, 0.1]);
    this.mSand.getXform().setPosition(Xindex,Yindex);
    this.mSand.getXform().setSize(20, 20);
    this.mSand.setElementPixelPositions(510, 595, 23, 153);
   GameObject.call(this, this.mSand);
}
gEngine.Core.inheritPrototype(Sand, GameObject);
