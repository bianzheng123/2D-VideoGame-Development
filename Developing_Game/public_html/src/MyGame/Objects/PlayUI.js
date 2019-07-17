
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PlayUI(spriteTexture,camera) {
    this.kspriteTexture=spriteTexture;
    this.mCamera=camera;
    this.thermometer = null;
    this.thermometerPointer =null;
}

PlayUI.prototype.update = function(playscene){
    this.thermometer.update();
    this.thermometerPointer.update(playscene.mPlayer.temperature);
};

PlayUI.prototype.initialize = function(){
    this.thermometer=new Thermometer(this.kspriteTexture,this.mCamera);
    this.thermometerPointer=new ThermometerPointer(this.kspriteTexture,this.mCamera);
};

PlayUI.prototype.draw = function () {
    this.thermometer.draw(this.mCamera);
    this.thermometerPointer.draw(this.mCamera);
};