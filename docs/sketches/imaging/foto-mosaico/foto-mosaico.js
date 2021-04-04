let img;
let smaller;

let colors_imgs = [];

let scale = 10;

function preload(){
    img = loadImage('/vc/docs/sketches/imaging/foto-mosaico/images/gaviota.jpg'); // Load the image
    let dir_img = '/vc/docs/sketches/imaging/foto-mosaico/images/colors/'
    // for(let i=0;i<2;i++){
    //     colors_imgs.push(loadImage(dir_img+i+'.jpg'))
    // }
}

function setup() {
    createCanvas(800, 800);
    noLoop();
}



function draw() {
    //background(0);

    let reduce = 1.5;

    let w = img.width/scale/reduce;
    let h = img.height/scale/reduce;

    smaller = createImage(w,h,RGB);
    smaller.copy(img,0,0,img.width,img.height,0,0,w,h);

    // image(img, 0, 0);
    
    smaller.loadPixels();
    for(let i=0;i<w;i++){
        for(let j=0;j<h;j++){
            pxcol = smaller.get(i,j);
            fill(pxcol);
            noStroke();
            rect(i*scale,j*scale,scale,scale);
        }
    }

    // smaller.updatePixels();
    image(smaller,0,0);
}