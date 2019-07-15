/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MapManager(spriteTexture) {
    this.kspriteTexture = spriteTexture;
    this.kwidth = 10;
    this.kheight = 10;
    this.kMapArray = new Array();//这个是二维数组
    
}

MapManager.prototype.initialize = function(){
    var i,j,l;
    for(i=0;i<this.kheight;i++){
        this.kMapArray[i] = new Array(this.kwidth);
        for(j=0;j<this.kwidth;j++){
            var tmp;
//            if(i === 0 && j === 0){
//                tmp = new Grass(this.kspriteTexture,i,j);
//            }
            if(i % 2 === 0){
                if(j % 2 === 0){
                    tmp = new Grass(this.kspriteTexture,i,j);
                }else{
                    tmp = new Sand(this.kspriteTexture,i,j);
                }
            }else{
                if(j % 2 === 0){
                    tmp = new Sand(this.kspriteTexture,i,j);
                }else{
                    tmp = new Grass(this.kspriteTexture,i,j);
                }
            }
            
            this.kMapArray[i][j] = tmp;
        }
    }

};

MapManager.prototype.draw = function (mCamera) {
    var i,j,l;
    for(i=0;i<this.kheight;i++){
        for(j=0;j<this.kwidth;j++){
            l = this.kMapArray[i][j];
            l.draw(mCamera);
        }
    }
};