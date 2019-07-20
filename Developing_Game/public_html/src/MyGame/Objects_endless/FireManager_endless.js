/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FireManager_endless(spriteTexture,camera,iceCreamManager,mapManager) {
    this.kmapManager = mapManager;
    this.kspriteTexture = spriteTexture;
    this.kIceCreamManager = iceCreamManager;
    this.kCamera = camera;
    this.mFireArray = [];
    
}

FireManager_endless.prototype.update = function(){
    this._fireUpdate();
    
    this._optimizationFire();
};

FireManager_endless.prototype._optimizationFire = function(){
    var i = this.mFireArray.length - 1;
    while(this.mFireArray[i] === null){
        var temp = this.mFireArray.pop();
        temp = null;
        i--;
    }
    while(this.mFireArray[0] === null){
        var temp = this.mFireArray.shift();
        temp = null;
    }
};

FireManager_endless.prototype._fireUpdate = function(){
    var i,l;
    for(i=0;i<this.mFireArray.length;i++){
        l = this.mFireArray[i];
        if(l !== null){
            if(l.isDead || l.mFire.getXform().getXPos() > 200 || l.mFire.getXform().getXPos() < -200){
                l = null;
                this.mFireArray[i] = null;
            }else{
                l.update();
            }
            
        }
    }
};

FireManager_endless.prototype.draw = function(){
    var i,l;
    for(i=0;i<this.mFireArray.length;i++){
        l = this.mFireArray[i];
        if(l !== null){
            l.draw(this.kCamera);
        }
    }
};

FireManager_endless.prototype.createFire = function(player){
    var fire = new Fire_endless(this.kspriteTexture,player,this.kIceCreamManager,this.kmapManager);
    this.mFireArray.push(fire);
};

