"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Shadow(spriteTexture,xform) {
    this.kTag = "Shadow";
    
    this.mShadow = new SpriteRenderable(spriteTexture);
    this.mShadow.setColor([0.5, 0.5, 0.5, 0.5]);
    this.mShadow.getXform().setPosition(xform[0],xform[1]);
    this.mShadow.getXform().setSize(xform[2],xform[3]);
    this.mShadow.setElementPixelPositions(510, 595, 23, 153);
    GameObject.call(this, this.mShadow);
}
gEngine.Core.inheritPrototype(Shadow, GameObject);

Shadow.prototype.update = function (originalX,originalY) {
    this.mShadow.getXform().setPosition(originalX,originalY);
};