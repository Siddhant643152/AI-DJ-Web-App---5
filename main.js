var song1 = "";
var song2 = "";
rightWrist_X = 0;
rightWrist_Y = 0;
leftWrist_X = 0;
leftWrist_Y = 0;
leftWrist_score = 0;
rightWrist_score = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    modal = ml5.poseNet(video, modalLoaded);
    modal.on('pose', results);
}
function draw(){
    image(video, 0, 0, 600, 500);
    song1status =  song1.isPlaying();
    song2status =  song2.isPlaying();
    fill("red");
    stroke("red");

    if(leftWrist_score > 0.2) {

        circle(leftWrist_X,leftWrist_Y,20);
        song2.stop();
        if(song1status == false) {
            song1.play();
        }
    }
    if(rightWrist_score > 0.2) {
        circle(rightWrist_X,rightWrist_Y,20);
        song1.stop();
        if(song2status == false) {
            song2.play();
        }
    }
}
function modalLoaded() {
    console.log("Modal Loaded");
}
function results(answers) {
if(answers.length > 0){
console.log(answers);
rightWrist_X = answers[0].pose.rightWrist.x;
rightWrist_Y = answers[0].pose.rightWrist.y;
leftWrist_X = answers[0].pose.leftWrist.x;
leftWrist_Y = answers[0].pose.leftWrist.y;
leftWrist_score = answers[0].pose.keypoints[9].score;
rightWrist_score = answers[0].pose.keypoints[10].score;
console.log(leftWrist_score);
}
}