prediction_1="" ;
prediction_2= "";

Webcam.set({
    width:350,
    height:300,
    image_format:'jpg',
    jpg_quality:90
});
var camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("capturedimage").innerHTML="<img id='snapshot' src='"+data_uri+"'>";

    })
}
console.log("ml5",ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Tvbb83Csr/model.json',modelloaded);
function modelloaded(){
    console.log("model loaded successfully");
    
}
function speak(){
    synth= window.speechSynthesis;
    speakdata1="The first prediction is"+ prediction_1;
    speakdata2="The second prediction is"+ prediction_2;
    utterThis= new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    synth.speak(utterThis);
}
function check(){
    img= document.getElementById("snapshot");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if (error){
        console.log(error);

    }
    else{
        console.log(results);
        document.getElementById("result1").innerHTML= results[0].label;
        document.getElementById("result2").innerHTML= results[1].label;
        prediction_1= results[0].label;
        prediction_2= results[1].label;
        speak();
        if(results[0].label== "Happy"){
            document.getElementById("resultemoji1").innerHTML= "&#128512;";
        }
        if(results[0].label== "Sad"){
            document.getElementById("resultemoji1").innerHTML= "&#128532;";
        }
        if(results[0].label== "Crying"){
            document.getElementById("resultemoji1").innerHTML= "&#128546;";
        }
        if(results[0].label== "Angry"){
            document.getElementById("resultemoji1").innerHTML= "&#128545;";
        }

        if(results[1].label== "Happy"){
            document.getElementById("resultemoji2").innerHTML= "&#128512;";
        }
        if(results[1].label== "Sad"){
            document.getElementById("resultemoji2").innerHTML= "&#128532;";
        }
        if(results[1].label== "Crying"){
            document.getElementById("resultemoji2").innerHTML= "&#128546;";
        }
        if(results[1].label== "Angry"){
            document.getElementById("resultemoji2").innerHTML= "&#128545;";
        }

    }

}