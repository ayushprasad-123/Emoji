var data_uri;
Webcam.set({
    width:350,
    height:300,
    image_format:"jpeg"
})
Webcam.attach("camera");
function take_pic(){
    Webcam.snap(
        function(data_uri){
            document.getElementById("pic").src=data_uri;
        }
    );
}
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/lUgz-9cun/model.json", modelLoaded);
function modelLoaded(){}
function gotResults(error, results){
    if(!error){
        p1=results[0].label;
        p2=results[2].label;
        var synth=window.speechSynthesis;
        var pr=new SpeechSynthesisUtterance("You're probably "+p1+". If you're not that, then you're probably "+p2);
        synth.speak(pr);
        getInner("p1")=p1;
        getInner("e1")=getEmoji(p1);
        getInner("p2")=p2;
        getInner("e2")=getEmoji(p2);
    }else{
        console.log("This code is trash!! "+error)
    }
}
function getResults(){
    img=document.getElementById("pic");
    classifier.classify(img,gotResults);
}
function getEmoji(emotion){
    if(emotion=="Happy"){
        return("&#1F600");
    }else if(emotion=="Sad"){
        return("&#1F613");
    }else{
        return("&#1F621");
    }
}
function getInner(id){
    return(document.getElementById(id).innerHTML);
}
