
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PlayUI(spriteTexture,camera,playscene) {
    this.kspriteTexture=spriteTexture;
    this.mCamera=camera;
    this.kPlayscene=playscene;
    this.thermometer = null;
    this.thermometerPointer =null;
    this.countdown = null;
    this.pauseButton = new UIButton(this.pauseSelect,this,[120,500],[150,40],"Pause",4);
    this.joystickground = null;
    this.joystick = null;
    this.mHover = null;
    this.mClick = false;
}

PlayUI.prototype.update = function(){
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                gEngine.Input.getMousePosY());
    mousePos[0]=(mousePos[0]-500)/(1000/140)-15.5;
    mousePos[1]=(mousePos[1]-300)/(600/84)-10;
    document.getElementById("st1").innerHTML=mousePos[0]+" "+mousePos[1];

    this.mHover = mousePos[0]>-74&&mousePos[0]<-66&&mousePos[1]>-39&&mousePos[1]<-31;
    if(this.mHover){
    }
    //start simple, just do callback when clicked
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(this.mHover){
            this.mClick = true;
        }
    }
    if(gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)){
        if(this.mClick) {
            this.joystick.getXform().setPosition(mousePos[0],mousePos[1]);
        }
    }
    if(gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)){
        this.mHover=false;
        this.mClick=false;
        this.joystick.getXform().setPosition(-70,-35);
    }
    
    
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
    this.thermometer=new Thermometer(this.kspriteTexture,this.mCamera);
    this.thermometerPointer=new ThermometerPointer(this.kspriteTexture,this.mCamera);
    this.countdown = new FontRenderable("3:00");
    this.countdown.setColor([0, 0, 0, 1]);
    this.countdown.getXform().setPosition(5,25);
    this.countdown.setTextHeight(6);
    this.joystickground=new SpriteRenderable(this.kspriteTexture);
    this.joystickground.setColor([1, 0.7, 0.1, 0]);
    this.joystickground.getXform().setPosition(-70,-35);
    this.joystickground.getXform().setSize(18,18);
    this.joystickground.setElementPixelPositions(514, 768, 0, 256);    
    this.joystick=new SpriteRenderable(this.kspriteTexture);
    this.joystick.setColor([0,0,0,0.2]);
    this.joystick.getXform().setPosition(-70,-35);
    this.joystick.getXform().setSize(8,8);
    this.joystick.setElementPixelPositions(514, 768, 0, 256);
};

PlayUI.prototype.draw = function () {
    this.thermometer.draw(this.mCamera);
    this.thermometerPointer.draw(this.mCamera);
    this.countdown.draw(this.mCamera);
    this.pauseButton.draw(this.mCamera);
    this.joystickground.draw(this.mCamera);
    this.joystick.draw(this.mCamera);
};
PlayUI.prototype.pauseSelect = function(){
    this.kPlayscene.stopUpdating=!this.kPlayscene.stopUpdating;
}