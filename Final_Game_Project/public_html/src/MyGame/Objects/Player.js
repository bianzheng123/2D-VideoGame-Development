/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Player(spriteTexture) {
    this.kRefWidth = 80;
    this.kRefHeight = 130;
    this.kDelta = 2;
    this.kSlowDelta = 0.1;
    
    this.available=true;
    this.mPlayer = new SpriteRenderable(spriteTexture);
    this.mPlayer.setColor([1, 1, 1, 0.1]);
    this.mDyePack.getXform().setPosition(35, 50);
    this.mPlayer.getXform().setSize(this.kRefWidth / 50, this.kRefHeight / 50);
    this.mPlayer.setElementPixelPositions(510, 595, 23, 153);
    
    GameObject.call(this, this.mPlayer);
}
gEngine.Core.inheritPrototype(Player, GameObject);

Player.prototype.update = function () {
    var xform = this.getXform();

    if(xform.getXPos() > 90){
        this.speed = this.kSlowDelta;
    }else{
        if(this.isDesSpeed){
            this.speed -= 0.1;
        }else{
            this.speed = this.kDelta;
        }
    }
    
    
};