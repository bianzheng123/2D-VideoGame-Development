"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Shadow_endless(spriteTexture,xform) {
    this.kTag = "Shadow";
    
    this.mShadow = new SpriteRenderable(spriteTexture);
    this.mShadow.setColor([1,1,1, 0]);
    this.mShadow.getXform().setPosition(xform[0],xform[1]);
    this.mShadow.getXform().setSize(xform[2],xform[3]);
    this.mShadow.setElementPixelPositions(520, 768, 0, 256);
    GameObject.call(this, this.mShadow);
}
gEngine.Core.inheritPrototype(Shadow_endless, GameObject);

Shadow_endless.prototype.update = function (originalX,originalY) {
    this.mShadow.getXform().setPosition(originalX,originalY);
};