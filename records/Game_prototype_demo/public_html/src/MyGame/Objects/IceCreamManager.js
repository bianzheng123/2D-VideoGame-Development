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
    this.kp_no_buff = 0.8;//the probability of no buff;
    this.kp_speed_up_buff = 0.9;
    this.kp_fire_buff = 1;
    this.kCreateIceCreamCountMax = 120;//每两秒出现一个冰淇凌
    
    this.createIceCreamCount = 0;
    this.isAutoCreate = true;
}

IceCreamManager.prototype.update = function (mapManager) {
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)){
        this.createIceCream(mapManager);
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.C)){
        this.isAutoCreate = !this.isAutoCreate;
        console.log("isAutoCreateIceCream: " + this.isAutoCreate);
    }
    
    if(this.isAutoCreate){
        this.autoCreateIceCream(mapManager);
    }
    
    var i,l;
    for(i=0;i<this.mIceCreamArray.length;i++){
        l = this.mIceCreamArray[i];
        if(l !== null){
            l.update();
        }
       
    }
};

IceCreamManager.prototype.autoCreateIceCream = function(mapManager){
    if(this.createIceCreamCount >= this.kCreateIceCreamCountMax){
        this.createIceCream(mapManager);
        this.createIceCreamCount = 0;
    }else{
        this.createIceCreamCount++;
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

    var buff = this.getBuff();

    var index = Math.floor(Math.random() * tmp_arr.length);
    
    if(tmp_arr.length !== 0){
        l = tmp_arr[index];
//        console.log(tmp_arr.length);

        l.mHasIceCream = true;
        var iceCream = new IceCream(this.kspriteTexture,l.kXindex,l.kYindex,buff);
        this.mIceCreamArray.push(iceCream);
    }
    
};

IceCreamManager.prototype.getBuff = function(){
    var ran = Math.random();
    if(0 <= ran && ran <= this.kp_no_buff){
        return 0;
    }else if(this.kp_no_buff <= ran && ran <= this.kp_speed_up_buff){
        return 1;
    }else if(this.kp_speed_up_buff <= ran && ran <= this.kp_fire_buff){
        return 2;
    }
};

IceCreamManager.prototype.draw = function(){
    var i,l;
    for(i=0;i<this.mIceCreamArray.length;i++){
        l = this.mIceCreamArray[i];
        if(l !== null){
            l.draw(this.kCamera);
        }
        
    }
    
};




