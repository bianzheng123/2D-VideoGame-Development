function selfAdapt(){
    var ratio=10/9;
    var div=document.getElementById("LoadingIconParent");
    var canvas=document.getElementById("GLCanvas");
    var length=(window.innerHeight<window.innerWidth?window.innerHeight:window.innerWidth)/ratio;
    div.style.height=length+"px";
    div.style.width=length+"px";
    canvas.style.height=length+"px";
    canvas.style.width=length+"px";
    div.style.left=((window.innerWidth-length)/2)+"px";
}