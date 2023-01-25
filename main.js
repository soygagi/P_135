object = [];
video = "";
status = "";
function preload() {
     video = createVideo('video.mp4');
     video.hide();
}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}
function draw(){
    image(video, 0,0,480.380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for (var i=0;i<object.length;i++){
            document.getElementById("status").innerHTML = "Estado: objetos detectados";
            document.getElementById("numero_de_objetos").innerHTML = "Numero de objetos detectados"+object.length;
            fill("#8A0868")
            percent = floor(object[i].confidence*100);
            text(object[i].label+""+percent+"%",object[1].x+15, object[i].y+15);
            nofill();
            stroke("white");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }    
    }
}
function star(){
    objectDetector = ml5.objectDetector('cocossd' ,modelLoaded);
    document.getElementById("status").innerHTML = "Estado: Detectando Objetos"; 
}
function modelLoaded(){
    console.log("Modelo Cargado");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
}