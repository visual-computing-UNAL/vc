let grayShader;
let shaderTexture;

let img;
let smaller;

let images;

let colors_img = [];
let colors_avg_img = [];
let colors_avg_img2 = [];
let size_avg_img = 173;

let scale_img = 15;
let create_img = false;

let create_new_img = false;

function preload() {
  img = loadImage('/vc/docs/sketches/imaging-hardware/foto-mosaico/lenna.jpg');
  images = loadImage('/vc/docs/sketches/imaging-hardware/foto-mosaico/images.png')
  grayShader = loadShader('/vc/docs/sketches/imaging-hardware/foto-mosaico/gray_rgb.vert', '/vc/docs/sketches/imaging-hardware/foto-mosaico/gray_rgb.frag');
  preloadFilesColors();
  preloadAverageImg();
}

function preloadFilesColors(){
    let dir_img = '/vc/docs/sketches/imaging/foto-mosaico/images/colors/'
    for(let i=1;i<=size_avg_img;i++){
        let curr_img = loadImage(dir_img+i+'.jpg');
        colors_img.push(curr_img);
    }
}

function setup() {
    createCanvas(512, 512, WEBGL);
    shaderTexture = createGraphics(512, 512, WEBGL);
    shaderTexture.noStroke();

    if(create_new_img){
        create_long_img();
    }

    if(create_img){
        createImagesAverageColor();
    }
    loadAvgImg();
    noLoop();
    create_colors_avg_img2();
}

function create_colors_avg_img2(){
    for(let curr of colors_avg_img){
        for(const temp of curr){
            colors_avg_img2.push(float(temp-0));
        }
    }
}

function create_long_img(){
    let to_show = createImage(scale_img*colors_img.length,scale_img);
    for(let i=0;i<colors_img.length;i++){
            let load_closer = colors_img[i];
            to_show.copy(load_closer,0,0,load_closer.width,load_closer.height,i*scale_img,0,scale_img,scale_img);
    }
    to_show.save('images','png')
}

function createImagesAverageColor(){
    let img_vrg_col = [];
    for(let im=0; im<colors_img.length; im++){
        let curr_img = colors_img[im];
        let h = curr_img.height;
        let w = curr_img.width;

        let sum = [0,0,0];

        print(h,w);

        for(let i=0;i<w;i++){
            for(let j=0;j<h;j++){
                let curr = curr_img.get(i,j);
                sum[0] += curr[0];
                sum[1] += curr[1];
                sum[2] += curr[2];
            }
        }
        let total = w*h;
        let avrg = [Math.round(sum[0]/total),Math.round(sum[1]/total),Math.round(sum[2]/total)];
        // print('sum',sum)
        // print('avrg',avrg)
        img_vrg_col.push(avrg[0]+' '+avrg[1]+' '+avrg[2])
        print('img '+im+' was created')
    }
    saveStrings(img_vrg_col,'img_vrg_col.txt')
}

function preloadAverageImg(){
    let dir_txt = '/vc/docs/sketches/imaging/foto-mosaico/images/img_vrg_col.txt'
    colors_avg_img = loadStrings(dir_txt);
}

function loadAvgImg(){
    print(colors_avg_img,colors_avg_img.length)
    for(let i=0;i<colors_avg_img.length-1;i++){
        let img = colors_avg_img[i];
        colors_avg_img[i] = img.split(' ')
    }
    colors_avg_img.pop();
}

function draw() {
    let reduce = 1.0;
    let w = img.width/scale_img/reduce;
    let h = img.height/scale_img/reduce;

    smaller = createImage(w,h,RGB);
    smaller.copy(img,0,0,img.width,img.height,0,0,w,h);

    smaller.loadPixels();

    shaderTexture.shader(grayShader);
    scale(1.0,-1.0);
    grayShader.setUniform('u_img', smaller);
    grayShader.setUniform('u_res_sm',[float(smaller.width),float(smaller.height)])
    grayShader.setUniform('images',images);
    grayShader.setUniform('colors_avg_img',colors_avg_img2);
    grayShader.setUniform('images_resolution', [float(scale_img*colors_img.length),float(scale_img)]);
    grayShader.setUniform('u_resolution', [float(width),float(height)]);

    texture(shaderTexture);
    shaderTexture.rect(0,0,512,512);
    rect(-256,-256,512,512);

    temp = createImage(w*3,h*3,RGB);
    temp.copy(img,0,0,img.width,img.height,0,0,w*3,h*3);
    temp.loadPixels();

    scale(1.0,-1.0);
    image(temp,-256,-256);

    noLoop();
    print('END')
}