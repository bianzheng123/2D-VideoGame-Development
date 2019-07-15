/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Grass(spriteTexture,Xindex,Yindex) {
    this.kTag = "Grass";
    
    this.mGrass = new SpriteRenderable(spriteTexture);
    this.mGrass.setColor([0.67, 0.84, 0.59, 0.1]);
    this.mGrass.getXform().setPosition(Xindex,Yindex);
    this.mGrass.getXform().setSize(20, 20);
    this.mGrass.setElementPixelPositions(510, 595, 23, 153);
   GameObject.call(this, this.mMap);
}
gEngine.Core.inheritPrototype(Grass, GameObject);
