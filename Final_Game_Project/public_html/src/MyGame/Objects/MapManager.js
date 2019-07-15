/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MapManager() {
    this.kMapArray = new Array;
}

//gEngine.Core.inheritPrototype(MapManager, GameObject);

MapManager.prototype.initialize = function(spriteTexture){
//    this.kMapArray.push(map1);
};

MapManager.prototype.update = function () {
    
    
    
};

MapManager.prototype.draw = function (mCamera) {
    var i,l;
    for(i=0;i<this.kMapArray.length;i++){
        l = this.kMapArray[i];
        l.draw(mCamera);
    }
    
};