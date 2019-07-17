
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function UIManager(spriteTexture,camera) {
    this.kspriteTexture=spriteTexture;
    this.mCamera=camera;
    this.mGeneralUI = null;
    this.mPlayUI = null;
}

UIManager.prototype.update = function(playscene){
    this.mGeneralUI.update();
    this.mPlayUI.update(playscene);
};

UIManager.prototype.initialize = function(){
    this.mGeneralUI = new GeneralUI(this.kspriteTexture,this.mCamera);
    this.mGeneralUI.initialize();    
    this.mPlayUI = new PlayUI(this.kspriteTexture,this.mCamera);
    this.mPlayUI.initialize();
};

UIManager.prototype.draw = function () {
    this.mGeneralUI.draw(this.mCamera);
    this.mPlayUI.draw(this.mCamera);
};