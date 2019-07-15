/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Grass(spriteTexture,Xindex,Yindex) {
    this.kXindex = Xindex;
    this.kYindex = Yindex;
    this.kTag = "Grass";
    
    this.mGrass = new SpriteRenderable(spriteTexture);
    this.mGrass.setColor([0, 0.4, 0, 0.1]);
    this.mGrass.getXform().setPosition(Xindex * 7 - 47,Yindex * 7 - 47);
    this.mGrass.getXform().setSize(7, 7);
    this.mGrass.setElementPixelPositions(510, 595, 23, 153);
    this.mHasIceCream = false;
   GameObject.call(this, this.mGrass);
}
gEngine.Core.inheritPrototype(Grass, GameObject);
