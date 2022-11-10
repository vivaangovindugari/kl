objects = [];
status ="";

function preload()
{
    video = createVideo('video.mp4');
}

function setup()
{
    canvas = createCanvas(480,300);
    canvas.center();
    video.hide()
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Object Detected";
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error,result)
{
if (error) {
    console.log(error);
}
console.log(result);
result = objects;
}



function draw()
{
    image(video,0,0,480,380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video , gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are" + objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y , objects[i].width , objects[i].height);
        }
    }
}
            
        



