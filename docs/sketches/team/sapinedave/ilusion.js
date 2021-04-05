let ilussion, hiddenAnimal;

function preload(){
    ilussion = loadImage('/vc/docs/sketches/team/sapinedave/illusion.jpg');
    hiddenAnimal = loadImage('/vc/docs/sketches/team/sapinedave/hiddenAnimal.jpg');
}

function setup() {
    createCanvas(800, 800);
    noLoop();
}

function mousePressed(){
    image(hiddenAnimal,0,0,800,800)
}

function draw() {
    image(ilussion,0,0,800,800);
}
