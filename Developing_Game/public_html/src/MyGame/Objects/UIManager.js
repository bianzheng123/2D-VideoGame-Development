
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function UIManager(spriteTexture,camera) {
    this.kspriteTexture=spriteTexture;
    this.mCamera=camera;
    this.fullscreenButton = null;
}

UIManager.prototype.update = function(){
    this.fullscreenButton.update();
};

UIManager.prototype.initialize = function(){
    this.fullscreenButton = new UIButton(this.fullscreenSelect,this,[120,550],[200,40],"Fullscreen",4);
};

UIManager.prototype.draw = function () {
    this.fullscreenButton.draw(this.mCamera);
};

UIManager.prototype.fullscreenSelect=function(){
    var element=document.documentElement;
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
};