
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ShadowManager(spriteTexture,camera) {
    this.kCamera = camera;
    this.kspriteTexture = spriteTexture;
    this.shadowDisplay = true;
    this.hahaShadow = null;
    this.cocoShadow = null;
    this.icecreamShadow = null;
}

ShadowManager.prototype.update = function(hahaPos,cocoPos,icecreamPos){
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Zero)){
        this.shadowDisplay = !this.shadowDisplay;
    }
    this.hahaShadow.update(hahaPos[0],hahaPos[1]-3);
    this.cocoShadow.update(cocoPos[0],cocoPos[1]-10);
    this.icecreamShadow.update(icecreamPos[0],icecreamPos[1]-2);
};

ShadowManager.prototype.initialize = function(){
    this.hahaShadow = new Shadow(this.kspriteTexture,[-47,-47,6,2]);
    this.cocoShadow = new Shadow(this.kspriteTexture,[-100,-20,1,1]);
    this.icecreamShadow = new Shadow(this.kspriteTexture,[-100,-20,1,1]);
};

ShadowManager.prototype.draw = function () {
    this.hahaShadow.draw(this.kCamera);
    this.cocoShadow.draw(this.kCamera);
    this.icecreamShadow.draw(this.kCamera);
};