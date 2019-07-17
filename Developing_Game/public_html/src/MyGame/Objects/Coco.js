/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Coco(spriteTexture,targetXpos,targetYpos) {
    this.kSpeed = 1;
    this.kHeight = 3;
    this.kWidth = 3;
    this.kYposDiff = 5;
    this.kXposDiff = 5;
    this.kXpos = 200;
    
    this.targetXpos = targetXpos;
    this.targetYpos = targetYpos;
    
    this.mCoco = new SpriteRenderable(spriteTexture);
    this.mCoco.getXform().setPosition(this.kXpos - this.kXposDiff,this.targetYpos + this.kYposDiff);
    this.mCoco.getXform().setSize(this.kWidth, this.kHeight);
    this.mCoco.setColor([1, 0, 0, 1]);
    this.mCoco.setElementPixelPositions(510, 595, 23, 153);
    GameObject.call(this,this.mCoco);
    
}
gEngine.Core.inheritPrototype(Coco, GameObject);

//Coco.prototyp

