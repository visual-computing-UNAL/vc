let dog,gray;

function preload(){
    dog = loadImage('/vc/docs/sketches/team/jestupinanb/images/dog.jpg');
    graydog = loadImage('/vc/docs/sketches/team/jestupinanb/images/dog-gray.jpg');
}

function setup() {
    createCanvas(800, 800);
    noLoop();
}

function mousePressed(){
    image(graydog,0,0,800,800)
}

function draw() {
    image(dog,0,0,800,800);
}
