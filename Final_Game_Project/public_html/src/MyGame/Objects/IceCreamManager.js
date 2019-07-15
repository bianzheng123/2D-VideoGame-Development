/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function IceCreamManager(spriteTexture,camera) {
    this.kspriteTexture = spriteTexture;
    this.kCamera = camera;
    this.mIceCreamArray = [];
    
}

IceCreamManager.prototype.update = function (mapManager) {
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)){
        this.createIceCream(mapManager);
    }
    
    var i,l;
        for(i=0;i<this.mIceCreamArray.length;i++){
            l = this.mIceCreamArray[i];
            l.update();

        }
};

IceCreamManager.prototype.createIceCream = function(mapManager){
    var tmp_arr = [];
    var i,j,l;
    for(i=0;i<mapManager.kWidth;i++){
        for(j=0;j<mapManager.kHeight;j++){
            l = mapManager.MapArray[i][j];
            if(l.kTag === "Grass" && l.mHasIceCream === false){
                tmp_arr.push(l);
            }
        }
    }
//    console.log(tmp_arr.length);
    var index = Math.floor(Math.random() * tmp_arr.length);
//    console.log(index);
    l = tmp_arr[index];
    l.mHasIceCream = true;
//    console.log(l.kXindex + " " + l.kYindex);
    var iceCream = new IceCream(this.kspriteTexture,l.kXindex,l.kYindex);
    this.mIceCreamArray.push(iceCream);
};

IceCreamManager.prototype.draw = function(){
    var i,l;
    for(i=0;i<this.mIceCreamArray.length;i++){
        l = this.mIceCreamArray[i];
        l.draw(this.kCamera);
        
    }
};




