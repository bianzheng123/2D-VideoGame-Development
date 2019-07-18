
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FinishUI(spriteTexture,camera,playscene) {
    this.kPlayscene=playscene;
    this.kspriteTexture=spriteTexture;
    this.mCamera=camera;
    this.UIText = new UIText("text",[500,200],4,1,0,[0,0,0,1]);
    this.ReplayButton = new UIButton(this.replaySelect,this,[500,130],[200,40],"Replay",4);
    this.MainMenuButton = new UIButton(this.replayMainMenu,this,[500,80],[200,40],"Main Menu",4);
    this.winScene=null;
    this.lostScene=null;
}
FinishUI.prototype.initialize=function(){    
    this.winScene = new SpriteRenderable(this.kspriteTexture);
    this.winScene.setColor([0.8, 0.6, 0.2, 1]);
    this.winScene.getXform().setPosition(-15.5, 0);
    this.winScene.getXform().setSize(40,40);
    this.winScene.setElementPixelPositions(0, 500, 0, 500);    
    this.lostScene = new SpriteRenderable(this.kspriteTexture);
    this.lostScene.setColor([0, 0.6, 0.8, 1]);
    this.lostScene.getXform().setPosition(-15.5, 0);
    this.lostScene.getXform().setSize(40,40);
    this.lostScene.setElementPixelPositions(0, 500, 0, 500);
};
FinishUI.prototype.update = function(iceCreamEatCount){
    this.ReplayButton.update();
    this.MainMenuButton.update();
    this.UIText.setText("Icecream you ate: " + iceCreamEatCount);
};

FinishUI.prototype.draw = function () {
    if(this.kPlayscene.isVictory||this.kPlayscene.isLost){
        this.ReplayButton.draw(this.mCamera);
        this.MainMenuButton.draw(this.mCamera); 
        this.UIText.draw(this.mCamera);
    }      
    if(this.kPlayscene.isVictory){
        this.winScene.draw(this.mCamera);
    }    
    if(this.kPlayscene.isLost){
        this.lostScene.draw(this.mCamera);
    }
    

};
FinishUI.prototype.replaySelect=function(){
    gEngine.Core.startScene(new PlayScene());
}
FinishUI.prototype.replayMainMenu=function(){
    gEngine.Core.startScene(new MyGame());
}