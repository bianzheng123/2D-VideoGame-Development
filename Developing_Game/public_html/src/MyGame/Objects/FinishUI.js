
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FinishUI(spriteTexture,camera) {
    this.kspriteTexture=spriteTexture;
    this.mCamera=camera;
    this.ReplayButton = null;
}

FinishUI.prototype.update = function(){
    this.ReplayButton.update();
};

FinishUI.prototype.initialize = function(){
    this.ReplayButton = new UIButton(this.fullscreenSelect,this,[420,350],[200,40],"Replay",4);
};

FinishUI.prototype.draw = function () {
    this.ReplayButton.draw(this.mCamera);
};