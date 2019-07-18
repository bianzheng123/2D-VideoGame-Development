
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PlayUI(spriteTexture,camera,kThermometer,playscene) {
    this.kspriteTexture=spriteTexture;
    this.mCamera=camera;
    this.kThermometer=kThermometer;
    this.kPlayscene=playscene;
    this.thermometer = null;
    this.thermometerPointer =null;
    this.countdown = null;
    this.pauseButton = new UIButton(this.pauseSelect,this,[120,500],[150,40],"Pause",4);
}

PlayUI.prototype.update = function(){
    this.thermometer.update();
    this.thermometerPointer.update(this.kPlayscene.mPlayer.temperature);
    var secondLeft=this.kPlayscene._VictoryFrameLast/60;
    var minuteLeft=Math.floor(secondLeft/60);
    secondLeft=Math.floor(secondLeft%60);
    if(!this.kPlayscene.stopUpdating){
        this.countdown.setText(minuteLeft+":"+(secondLeft<10?"0":"")+secondLeft);
    }
    this.pauseButton.update();
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
    this.pauseButton.draw(this.mCamera);
};
PlayUI.prototype.pauseSelect = function(){
    this.kPlayscene.stopUpdating=!this.kPlayscene.stopUpdating;
}