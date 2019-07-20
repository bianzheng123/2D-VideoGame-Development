
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ShadowManager_endless(spriteTexture,camera) {
    this.kCamera = camera;
    this.kspriteTexture = spriteTexture;
    this.shadowDisplay = true;
    this.hahaShadow = new Shadow_endless(this.kspriteTexture,[-47,-47,6,2]);
    
}

ShadowManager_endless.prototype.HahaUpdate = function(hahaPos){
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Zero)){
        this.shadowDisplay = !this.shadowDisplay;
    }
    this.hahaShadow.update(hahaPos[0],hahaPos[1]-3);
};
ShadowManager_endless.prototype.icecreamUpdate = function(){
   
};



ShadowManager_endless.prototype.draw = function () {
    if(!this.shadowDisplay){
        return;
    }
    this.hahaShadow.draw(this.kCamera);
};