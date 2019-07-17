
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PlayUI(spriteTexture,camera,kThermometer) {
    this.kspriteTexture=spriteTexture;
    this.mCamera=camera;
    this.kThermometer=kThermometer;
    this.thermometer = null;
    this.thermometerPointer =null;
    this.countdown = null;
}

PlayUI.prototype.update = function(playscene){
    this.thermometer.update();
    this.thermometerPointer.update(playscene.mPlayer.temperature);
    var secondLeft=playscene._VictoryFrameLast/60;
    var minuteLeft=Math.floor(secondLeft/60);
    secondLeft=Math.floor(secondLeft%60);
    this.countdown.setText(minuteLeft+":"+(secondLeft<10?"0":"")+secondLeft);
};

PlayUI.prototype.initialize = function(){
    this.thermometer=new Thermometer(this.kThermometer,this.mCamera);
    this.thermometerPointer=new ThermometerPointer(this.kThermometer,this.mCamera);
    this.countdown = new FontRenderable("3:00");
    this.countdown.setColor([0, 0, 0, 1]);
    this.countdown.getXform().setPosition(5,25);
    this.countdown.setTextHeight(6);
};

PlayUI.prototype.draw = function () {
    this.thermometer.draw(this.mCamera);
    this.thermometerPointer.draw(this.mCamera);
    this.countdown.draw(this.mCamera);
};