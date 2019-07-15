/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Map(spriteTexture,Xpos,Ypos) {
    
    this.mMap = new SpriteRenderable(spriteTexture);
    this.mMap.setColor([0, 1, 0, 0.1]);
    this.mMap.getXform().setPosition(Xpos,Ypos);
    this.mMap.getXform().setSize(20, 20);
    this.mMap.setElementPixelPositions(510, 595, 23, 153);
   GameObject.call(this, this.mMap);
}
gEngine.Core.inheritPrototype(Map, GameObject);

Map.prototype.update = function () {
    
    
    
};