
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PlayUI(spriteTexture,camera,playscene,displayTimeLast) {
    this.kDisplayTimeLast = displayTimeLast;
    this.kspriteTexture=spriteTexture;
    this.mCamera=camera;
    this.kPlayscene=playscene;
    this.thermometer = null;
    this.thermometerPointer =null;
    this.countdown = null;
    this.pauseButton = new UIButton(this.pauseSelect,this,[120,500],[150,40],"Pause",4);
    this.joystickground = null;
    this.joystick = null;
    this.jumpButton = null;
    this.fireButton = null;
    
    this.mHover = null;
    this.mClick = false;
    this.DirectionEnum={
        RIGHT: 0,
        TOPRIGHT: 1,
        TOP: 2,
        TOPLEFT: 3,
        LEFT: 4,
        BOTTOMLEFT: 5,
        BOTTOM: 6,
        BOTTOMRIGHT: 7
    };
    this.mJoystickDirection=this.DirectionEnum.RIGHT;
    this.isWalking = false;
    this.mJumpHover = false;
    this.mFireHover = false;
    this.mJumpClick = false;
    this.mFireClick = false;
    this.isAccumulating = false;
    this.isFire = false;
}

PlayUI.prototype.update = function(){
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                gEngine.Input.getMousePosY());
    mousePos[0]=(mousePos[0]-500)/(1000/140)-15.5;
    mousePos[1]=(mousePos[1]-300)/(600/84)-10;
    //document.getElementById("st1").innerHTML=mousePos[0]+" "+mousePos[1];

    this.mHover = mousePos[0]>-80&&mousePos[0]<-60&&mousePos[1]>-45&&mousePos[1]<-25;
    this.mJumpHover = (mousePos[0]-35)*(mousePos[0]-35)+(mousePos[1]+40)*(mousePos[1]+40)<64;
    this.mFireHover = (mousePos[0]-45)*(mousePos[0]-45)+(mousePos[1]+27)*(mousePos[1]+27)<49;
    if(this.mHover){
    }
    //start simple, just do callback when clicked
    var thisTimeFireClick=false;
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(this.mHover){
            this.mClick = true;
        }
        if(this.mJumpHover){
            this.mJumpClick=true;
        }
        if(this.mFireHover){
            console.log("fire hover");
            this.mFireClick=true;
            thisTimeFireClick=true;
        }
    }
    if(gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)){
        if(this.mClick) {
            if((mousePos[0]+70)*(mousePos[0]+70)+(mousePos[1]+35)*(mousePos[1]+35)>16){
                var theta=Math.acos((mousePos[0]+70)/Math.sqrt((mousePos[1]+35)*(mousePos[1]+35)+(mousePos[0]+70)*(mousePos[0]+70)));
                theta=mousePos[1]<-35?-theta+2*Math.PI:theta;
                if(theta<Math.PI/8||theta>Math.PI*15/8){
                    this.mJoystickDirection=0;
                }else if(theta<Math.PI*3/8){
                    this.mJoystickDirection=1;
                }else if(theta<Math.PI*5/8){
                    this.mJoystickDirection=2;
                }else if(theta<Math.PI*7/8){
                    this.mJoystickDirection=3;
                }else if(theta<Math.PI*9/8){
                    this.mJoystickDirection=4;
                }else if(theta<Math.PI*11/8){
                    this.mJoystickDirection=5;
                }else if(theta<Math.PI*13/8){
                    this.mJoystickDirection=6;
                }else if(theta<Math.PI*15/8){
                    this.mJoystickDirection=7;
                }
                theta=this.mJoystickDirection*(Math.PI/4);
                //document.getElementById("st3").innerHTML=theta;
                this.joystick.getXform().setPosition(-70+8*Math.cos(theta),-35+8*Math.sin(theta));
                this.isWalking=true;
            }else{
                this.joystick.getXform().setPosition(mousePos[0],mousePos[1]);
                this.isWalking=false;
            }
        }
        if(this.mJumpClick){
            //alert("heelo");
            this.jumpButton.setColor([0,0,0,1]);
            console.log("jump");
            this.isAccumulating=true;
        }
        if(this.mFireClick&&!thisTimeFireClick){
            this.mFireClick=false;
        }
    }
    if(gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)){
        this.mHover=false;
        this.isWalking=false;
        this.mClick=false;
        this.mFireClick=false;
        this.mJumpClick=false;
        console.log("left mouse key released");
        this.isAccumulating=false;
        this.isFire=false;
        this.fireButton.setColor([0,0,0,0.2]);
        this.fireButton.setColor([0,0,0,0.2]);

        this.joystick.getXform().setPosition(-70,-35);
    }
    
    
    this.thermometer.update();
    this.thermometerPointer.update(this.kPlayscene.mPlayer.temperature);
    var secondLeft = null;
    if(!this.kDisplayTimeLast){
        secondLeft = this.kPlayscene.timeLastFrameCount;
        
    }else{
        secondLeft=this.kPlayscene._VictoryFrameLast;
    }
    var minuteLeft=Math.floor(secondLeft/60);
    secondLeft=Math.floor(secondLeft%60);
    this.countdown.setText(minuteLeft+":"+(secondLeft<10?"0":"")+secondLeft);
    
    this.pauseButton.update();
};

PlayUI.prototype.initialize = function(){
    this.thermometer=new Thermometer(this.kspriteTexture,this.mCamera);
    this.thermometerPointer=new ThermometerPointer(this.kspriteTexture,this.mCamera);
    if(this.kDisplayTimeLast){
        this.countdown = new FontRenderable("3:00");
        
    }else{
        this.countdown = new FontRenderable("0:00");
    }
    this.countdown.setColor([0, 0, 0, 1]);
    this.countdown.getXform().setPosition(5,25);
    this.countdown.setTextHeight(6);
    
    this.joystickground=new SpriteRenderable(this.kspriteTexture);
    this.joystickground.setColor([1, 0.7, 0.1, 0]);
    this.joystickground.getXform().setPosition(-70,-35);
    this.joystickground.getXform().setSize(25,25);
    this.joystickground.setElementPixelPositions(514, 768, 0, 256);    
    this.joystick=new SpriteRenderable(this.kspriteTexture);
    this.joystick.setColor([0,0,0,0.2]);
    this.joystick.getXform().setPosition(-70,-35);
    this.joystick.getXform().setSize(12,12);
    this.joystick.setElementPixelPositions(514, 768, 0, 256);    
    
    this.jumpButton=new SpriteRenderable(this.kspriteTexture);
    this.jumpButton.setColor([1,1,1,0]);
    this.jumpButton.getXform().setPosition(35,-40);
    this.jumpButton.getXform().setSize(16,16);
    this.jumpButton.setElementPixelPositions(514, 768, 0, 256); 
    this.fireButton=new SpriteRenderable(this.kspriteTexture);
    this.fireButton.setColor([0,0,0,0.2]);
    this.fireButton.getXform().setPosition(45,-27);
    this.fireButton.getXform().setSize(14,14);
    this.fireButton.setElementPixelPositions(514, 768, 0, 256);
};

PlayUI.prototype.draw = function () {
    this.thermometer.draw(this.mCamera);
    this.thermometerPointer.draw(this.mCamera);
    this.countdown.draw(this.mCamera);
    this.pauseButton.draw(this.mCamera);
    this.joystickground.draw(this.mCamera);
    this.joystick.draw(this.mCamera);
    this.jumpButton.draw(this.mCamera);
    this.fireButton.draw(this.mCamera);
};
PlayUI.prototype.pauseSelect = function(){
    this.kPlayscene.stopUpdating=!this.kPlayscene.stopUpdating;
    }
