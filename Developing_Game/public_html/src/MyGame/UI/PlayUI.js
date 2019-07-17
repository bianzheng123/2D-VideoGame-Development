
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PlayUI(spriteTexture,camera,kThermometer) {
    this.kspriteTexture=spriteTexture;
    this.mCamera=camera;
    this.kThermometer=kThermometer;
    this.thermometer = null;
    this.thermometerPointer =null;
}

PlayUI.prototype.update = function(playscene){
    this.thermometer.update();
    this.thermometerPointer.update(playscene.mPlayer.temperature);
};

PlayUI.prototype.initialize = function(){
    this.thermometer=new Thermometer(this.kThermometer,this.mCamera);
    this.thermometerPointer=new ThermometerPointer(this.kThermometer,this.mCamera);
};

PlayUI.prototype.draw = function () {
    this.thermometer.draw(this.mCamera);
    this.thermometerPointer.draw(this.mCamera);
};