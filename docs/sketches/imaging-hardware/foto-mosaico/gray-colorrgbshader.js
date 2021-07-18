let grayShader;
let shaderTexture;

let img;
let smaller;

let colors_img = [];
let colors_avg_img = [];
let size_avg_img = 173;

let scale_img = 8;
let create_img = false;

function preload() {
  img = loadImage('/vc/docs/sketches/imaging-hardware/foto-mosaico/lenna.jpg');
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

    if(create_img){
        createImagesAverageColor();
    }
    loadAvgImg();
    noLoop();
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
    //background(0);
    print(colors_avg_img,colors_avg_img.length)
    let reduce = 1.0;
    // print('img width 2',img.width)
    let w = img.width/scale_img/reduce;
    let h = img.height/scale_img/reduce;

    smaller = createImage(w,h,RGB);
    smaller.copy(img,0,0,img.width,img.height,0,0,w,h);

    //small image to take the pixels of that are going to be changed for an image
    //smaller.loadPixels();

    let to_show = createImage(width,height);
    for(let i=0;i<w;i++){
        for(let j=0;j<h;j++){
            pxcol = smaller.get(i,j);

            //fill(pxcol);noStroke();rect(i*scale/2,j*scale/2,scale/2,scale/2);

            let load_closer = loadImageCloser(pxcol);
            //image(load_closer,-width/2+i*scale,-height/2+j*scale,scale,scale)
            //f.copy(img,0,0,width,height,0,0,width/2,height/2);
            to_show.copy(load_closer,0,0,load_closer.width,load_closer.height,i*scale_img,j*scale_img,scale_img,scale_img)
            //to_show.set(load_closer,-width/2+i*scale,-height/2+j*scale,scale,scale)
            //to_show.set(i,j,color(0,90,102));
        }
    }
    
    shaderTexture.shader(grayShader);
    scale(1.0,-1.0);
    grayShader.setUniform('u_img', to_show);
    grayShader.setUniform('u_resolution', [float(width),float(height)]);

    texture(shaderTexture);
    shaderTexture.rect(0,0,512,512);
    rect(-256,-256,512,512);

    noLoop();
    print('END')
}

function loadImageCloser(col){
    let min = Number.MAX_VALUE;
    let pos = -1;
    for(let i in colors_avg_img){
        let de = deltaE(col,colors_avg_img[i]);
        // print('DE',de)
        if(min>de){
            min = de;
            pos = i;
        }
    }
    return colors_img[pos];
}

function deltaE(col1,col2){
    let acum = 0;
    for(let i=0;i<3;i++){
        let temp = col1[i] - col2[i];
        acum += temp*temp;
    }
    return Math.sqrt(acum)
}