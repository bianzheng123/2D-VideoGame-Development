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
    this.mCocoArray = [];
    this.kp_no_buff = 0.4;//the probability of no buff;
    this.kp_speed_up_buff = 0.7;
    this.kp_fire_buff = 1;
    this.kCreateIceCreamCountMax = 300;//每5秒出现一个冰淇凌
    
    this.createIceCreamCount = 0;
    this.isAutoCreate = true;
}

IceCreamManager.prototype.update = function (mapManager) {
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)){
        this.createIceCream(mapManager);
//        console.log("update");
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.C)){
        this.isAutoCreate = !this.isAutoCreate;
        console.log("isAutoCreateIceCream: " + this.isAutoCreate);
    }
    
    if(this.isAutoCreate){
        this.autoCreateIceCream(mapManager);
    }
    
    this._updateIceCream();
    this._updateCoco();
    this._optimization(this.mIceCreamArray);
    this._optimization(this.mCocoArray);
    
};

IceCreamManager.prototype._updateIceCream = function(){
    var i,l;
    for(i=0;i<this.mIceCreamArray.length;i++){
        l = this.mIceCreamArray[i];
        if(l !== null){
            l.update();
            l.shadow.update(l.mIceCream.getXform().getXPos(),l.mIceCream.getXform().getYPos() - 3.5);
        }
    }//update IceCream
};

IceCreamManager.prototype._updateCoco = function(){
    var i,l;
    for(i=0;i<this.mCocoArray.length;i++){
        if(this.mCocoArray[i] !== null && this.mCocoArray[i].mCoco.getXform().getYPos() > 200){
            this.mCocoArray[i].shadow = null;
            this.mCocoArray[i] = null;
        }
        l = this.mCocoArray[i];
        if(l !== null){
            l.update();
            l.shadow.update(l.mCoco.getXform().getXPos(),l.mCoco.getXform().getYPos()-25);
        }
    }//update Coco
};

IceCreamManager.prototype._optimization = function(array){
    var i = array.length - 1;
    while(array[i] === null){
        var temp = array.pop();
        temp = null;
        i--;
    }
    while(array[0] === null){
        var temp = array.shift();
        temp = null;
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
    //在这里实现coco

    var buff = this.getBuff();

    var index = Math.floor(Math.random() * tmp_arr.length);
    
    if(tmp_arr.length !== 0){
        l = tmp_arr[index];
        
        l.mHasIceCream = true;
        var iceCream = new IceCream(this.kspriteTexture,l.kXindex,l.kYindex,buff);
        var mIcecreamShadow = new Shadow(this.kspriteTexture,[iceCream.mIceCream.getXform()[0],iceCream.mIceCream.getXform().getYPos()-22,4,2]);
        //document.getElementById("st10").innerHTML=iceCream.mIceCream.getXform().getXPos();
        var mCoco = new Coco(this.kspriteTexture,iceCream);
        var mCocoShadow = new Shadow(this.kspriteTexture,[mCoco.getXform()[0],mCoco.getXform()[1]-20,6,2]);
        mCoco.shadow=mCocoShadow;
        mCocoShadow.mCoco=mCoco;
        iceCream.shadow=mIcecreamShadow;
        this.mCocoArray.push(mCoco);
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
    }else{
        return this.getBuff();
    }
};

IceCreamManager.prototype.draw = function(){
    var i,l;

    for(i=0;i<this.mIceCreamArray.length;i++){
        l = this.mIceCreamArray[i];
        if(l !== null){
            l.draw(this.kCamera);
            l.shadow.draw(this.kCamera);
        }
    }
    
    for(i=0;i<this.mCocoArray.length;i++){
        l = this.mCocoArray[i];
        if(l !== null){
            l.draw(this.kCamera);
            l.shadow.draw(this.kCamera);
        }
    }
};




