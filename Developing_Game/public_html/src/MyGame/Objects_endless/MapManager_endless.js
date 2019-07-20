/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MapManager_endless(spriteTexture,camera) {
    this.kCamera = camera;
    this.kspriteTexture = spriteTexture;
    this.kWidth = 10;
    this.kHeight = 10;
    this.MapArray = new Array();//这个是二维数组
    this.mMapDesign = [//长10宽10
        [1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
        [0, 1, 1, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [1, 1, 0, 0, 1, 1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0, 0, 1, 1, 0, 1]
    ];
//    this.mMapDesign = [//长11，宽11
//        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//        [1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1],
//        [1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
//        [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
//        [1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1],
//        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
//        [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
//        [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
//        [1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1],
//        [1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1]
//    ];
    this.mDrawLine = false;
    
}

MapManager_endless.prototype.update = function(){
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.X)){
        this.mDrawLine = !this.mDrawLine;
    }
};

MapManager_endless.prototype.initialize = function(){
    var i,j,l;
    for(i=0;i<this.kWidth;i++){
         this.MapArray[i] = new Array(this.kHeight);
    }
    for(i=0;i<this.kHeight;i++){
        for(j=0;j<this.kWidth;j++){
            var temp;
            if(this.mMapDesign[i][j]===1){
                temp = new Grass_endless(this.kspriteTexture,j,this.kHeight - 1 - i,this.kCamera);
                temp.initialize();
            }else if(this.mMapDesign[i][j]===0){
                temp = new Sand_endless(this.kspriteTexture,j,this.kHeight - 1 - i);
            }
            this.MapArray[j][this.kHeight - 1 - i]=temp;
        }
    }

};

MapManager_endless.prototype.draw = function () {
    var i,j,l;
    for(i=0;i<this.kHeight;i++){
        for(j=0;j<this.kWidth;j++){
            l = this.MapArray[i][j];
            l.draw(this.kCamera);
            if(l.kTag === "Grass" && this.mDrawLine){
                l.drawLine();
            }
            
        }
    }
};