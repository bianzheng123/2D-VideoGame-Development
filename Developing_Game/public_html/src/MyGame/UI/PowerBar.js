"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PowerBar(spriteTexture,camera) {
    this.kCamera = camera;
    this.mPowerBar = new SpriteRenderable(spriteTexture);
    this.mPowerBar.setColor([1, 0.7, 0.1, 1]);
    this.mPowerBar.getXform().setPosition(15,-10);
    this.mPowerBar.getXform().setSize(50,3);
    this.mPowerBar.getXform().setRotationInDegree(90);
    this.mPowerBar.setElementPixelPositions(0, 1790, 1658, 1757);
   GameObject.call(this, this.mPowerBar);
}
gEngine.Core.inheritPrototype(PowerBar, GameObject);