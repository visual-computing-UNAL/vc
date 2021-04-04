let img;
let smaller;

let colors_img = [];
let colors_avg_img = [];
let size_avg_img = 173;

let scale = 15;
let create_img = false;

function preload(){
    img = loadImage('/vc/docs/sketches/imaging/foto-mosaico/images/panda.jpg'); // Load the image
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
    createCanvas(800, 500);
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
    let reduce = 1.3;
    // print('img width 2',img.width)
    let w = img.width/scale/reduce;
    let h = img.height/scale/reduce;

    smaller = createImage(w,h,RGB);
    smaller.copy(img,0,0,img.width,img.height,0,0,w,h);

    // image(img, 0, 0);

    smaller.loadPixels();
    for(let i=0;i<w;i++){
        for(let j=0;j<h;j++){
            pxcol = smaller.get(i,j);

            //fill(pxcol);noStroke();rect(i*scale/2,j*scale/2,scale/2,scale/2);

            let load_closer = loadImageCloser(pxcol);
            image(load_closer,i*scale,j*scale,scale,scale)
        }
    }
    // smaller.updatePixels();
    image(smaller,0,0);
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