/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ThermometerPointer(spriteTexture,camera) {
    this.kCamera = camera;
    this.mThermometerPointer = new SpriteRenderable(spriteTexture);
    this.mThermometerPointer.setColor([1, 1, 1, 0]);
    this.mThermometerPointer.getXform().setPosition(-25,22);
    this.mThermometerPointer.getXform().setSize(2,5);
    this.mThermometerPointer.setElementPixelPositions(975, 1000, 0, 64);
   GameObject.call(this, this.mThermometerPointer);
}
gEngine.Core.inheritPrototype(ThermometerPointer, GameObject);

ThermometerPointer.prototype.update=function(temperature){
    this.mThermometerPointer.getXform().setPosition((temperature-50)/2-25,22.5);
}