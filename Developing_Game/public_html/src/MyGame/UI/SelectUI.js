"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SelectUI(spriteTexture,camera,nameTexture,context) {
    this.mContext=context;
    this.spriteTexture=spriteTexture;
    this.mCamera=camera;
    this.nameTexture=nameTexture;
    this.display = false;
    this.modeBox = null;
    this.mapBox = null;
    this.modeButtons = [];
    this.mapButtons = [];
    this.modeSelected = 0;
    this.mapSelected = 0;
    this.backButton = null;
    this.startButton = null;
    this.modeText = null;
    this.mapText = null;
}
SelectUI.prototype.initialize=function(){
    var i;
    this.backButton = new UIButton(this.BackSelect,this,[350,50],[150,50],"Back",5);
    this.startButton = new UIButton(this.StartSelect,this,[650,50],[150,50],"Start",5);
    this.modeBox=new SpriteRenderable(this.spriteTexture);
    this.modeBox.setColor([0.9,0.9, 0.8,1]);
    this.modeBox.getXform().setPosition(-15.5,11);
    this.modeBox.getXform().setSize(100,20);
    this.modeBox.setElementPixelPositions(0,1,0,1);
    this.mapBox=new SpriteRenderable(this.spriteTexture);
    this.mapBox.setColor([0.9,0.9, 0.8,1]);
    this.mapBox.getXform().setPosition(-15.5,-20);
    this.mapBox.getXform().setSize(100,40);
    this.mapBox.setElementPixelPositions(0,1,0,1);

    var pixelPos=[
        [0,512+64,256*3,1023],
        [512+64,256*3+64*3,256*3,1023],
        [256*3+64*3,256*5+64,256*3,1023],
        [256*5+64,256*7,256*3,1023],
        [256*7,2047,256*3,1023],
        [0,256+128,512,512+256],
        [256+128,256*3+64,512,512+256],
        [256*3+64,256*5-64,512,512+256],
        [256*5-64,256*6,512,512+256],
        [0,512+64,256,512]
    ];
    var px=-55;
    var py=-30;
    for(i=0;i<10;i++){
        var tempMapButton = new SpriteRenderable(this.nameTexture);
        tempMapButton.setColor([0.2,0.9,0.5,1]);
        tempMapButton.getXform().setPosition((i<5?i:i-5)*20+px,i<5?-20:-33);
        tempMapButton.getXform().setSize(18,12);
        tempMapButton.setElementPixelPositions(pixelPos[i][0],pixelPos[i][1],pixelPos[i][2],pixelPos[i][3]);
        this.mapButtons.push(tempMapButton);
    }
    this.modeButtons[0] = new SpriteRenderable(this.nameTexture);
    this.modeButtons[0].setColor([0.2,0.9,0.5,1]);
    this.modeButtons[0].getXform().setPosition(-35,7);
    this.modeButtons[0].getXform().setSize(27,9);
    this.modeButtons[0].setElementPixelPositions(0,256*3,0,256);
    this.modeButtons[1] = new SpriteRenderable(this.nameTexture);
    this.modeButtons[1].setColor([0.2,0.9,0.5,1]);
    this.modeButtons[1].getXform().setPosition(5,7);
    this.modeButtons[1].getXform().setSize(27,9);
    this.modeButtons[1].setElementPixelPositions(256*3,256*6,0,256);
    
    this.modeText = new FontRenderable("Select Mode");
    this.modeText.setColor([0,0,0,1]);
    this.modeText.getXform().setPosition(-30,17);
    this.modeText.setTextHeight(5);    
    this.mapText = new FontRenderable("Select Map");
    this.mapText.setColor([0,0,0,1]);
    this.mapText.getXform().setPosition(-29,-7);
    this.mapText.setTextHeight(5);
}
SelectUI.prototype.draw=function(){
    if(this.display){
        this.modeBox.draw(this.mCamera);
        this.mapBox.draw(this.mCamera);
        this.modeButtons[0].draw(this.mCamera);
        this.modeButtons[1].draw(this.mCamera);
        var i;
        for(i=0;i<10;i++){
            this.mapButtons[i].draw(this.mCamera);
        }
        this.modeText.draw(this.mCamera);
        this.mapText.draw(this.mCamera);
        this.backButton.draw(this.mCamera);
        this.startButton.draw(this.mCamera);
    }
}
SelectUI.prototype.update=function(){
    var i;
    var index=this.getMouseIndex();
    if(index!==-1){
        if(gEngine.Input.isButtonClicked(0)){
            if(index<10){
                this.mapSelected=index;
            }else{
                this.modeSelected=index-10;
            }
        }
    }
    for(i=0;i<10;i++){
        this.mapButtons[i].setColor([0.2,0.9,0.5,1]);
    }
    this.modeButtons[0].setColor([0.2,0.9,0.5,1]);
    this.modeButtons[1].setColor([0.2,0.9,0.5,1]);
    this.mapButtons[this.mapSelected].setColor([0.99,0.6,0.1,1]);
    this.modeButtons[this.modeSelected].setColor([0.99,0.6,0.1,1]);
    this.startButton.update();
    this.backButton.update();
    
}
SelectUI.prototype.getMouseIndex=function(){
    var mousePos=getMousePosInWC();
    var i;
    for(i=0;i<10;i++){
        if(this.mapButtons[i].getXform().isIn(mousePos[0],mousePos[1])){
            return i;
        }
    }
    if(this.modeButtons[0].getXform().isIn(mousePos[0],mousePos[1])){
        return 10;
    }
    if(this.modeButtons[1].getXform().isIn(mousePos[0],mousePos[1])){
        return 11;
    }
    return -1;
}
SelectUI.prototype.StartSelect=function(){
    this.mContext.LevelSelect=this.modeSelected*10+this.mapSelected;
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.GameLoop.stop();
}
SelectUI.prototype.BackSelect=function(){
    this.display=false;
}