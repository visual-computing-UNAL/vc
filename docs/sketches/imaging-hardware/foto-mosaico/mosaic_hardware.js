let grayShader;
let shaderTexture;

let img;
let smaller;

//imagen con todas las piezas
let images;

//arreglo de las piezas
let colors_img = [];
//arreglos con el color promedio de cada pieza
let colors_avg_img = [];
let colors_avg_img2 = [];
//cantidad de piezas
let size_avg_img = 173;

//tamaño de cada pieza
let scale_img = 15;

//pre procesamientos
let create_img = false;
let create_new_img = false;

let date;

function preload() {
    img = loadImage('/vc/docs/sketches/imaging-hardware/foto-mosaico/lenna.jpg');
    images = loadImage('/vc/docs/sketches/imaging-hardware/foto-mosaico/images.png')
    grayShader = loadShader('/vc/docs/sketches/imaging-hardware/foto-mosaico/mosaic_hardware.vert', '/vc/docs/sketches/imaging-hardware/foto-mosaico/mosaic_hardware.frag');
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

    //pre procesamiento
    if(create_new_img){
        create_long_img();
    }

    //pre procesamiento
    if(create_img){
        createImagesAverageColor();
    }
    loadAvgImg();
    noLoop();
    create_colors_avg_img2();
}

//Creamos todos los valores del color promedio en un arreglo, sin separalo para cada imagen
function create_colors_avg_img2(){
    for(let curr of colors_avg_img){
        for(const temp of curr){
            colors_avg_img2.push(float(temp-0));
        }
    }
}

//Se crea la imagen larga que va a tener todas las piezas 
function create_long_img(){
    let to_show = createImage(scale_img*colors_img.length,scale_img);
    for(let i=0;i<colors_img.length;i++){
            let load_closer = colors_img[i];
            to_show.copy(load_closer,0,0,load_closer.width,load_closer.height,i*scale_img,0,scale_img,scale_img);
    }
    to_show.save('images','png')
}

//pre procesamiento crear imagen con color promedio
function createImagesAverageColor(){
    let img_vrg_col = [];
    for(let im=0; im<colors_img.length; im++){
        let curr_img = colors_img[im];
        let h = curr_img.height;
        let w = curr_img.width;

        let sum = [0,0,0];

        //print(h,w);

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
        //print('img '+im+' was created')
    }
    saveStrings(img_vrg_col,'img_vrg_col.txt')
}

//cargar informacion del color promedio de las imagenes en rgb
function preloadAverageImg(){
    let dir_txt = '/vc/docs/sketches/imaging/foto-mosaico/images/img_vrg_col.txt'
    colors_avg_img = loadStrings(dir_txt);
}


function loadAvgImg(){
    //print(colors_avg_img,colors_avg_img.length)
    for(let i=0;i<colors_avg_img.length-1;i++){
        let img = colors_avg_img[i];
        colors_avg_img[i] = img.split(' ')
    }
    colors_avg_img.pop();
}

function draw() {
    date = Date.now();
    //en caso de que se quisiera reducir el tamaño de la imagen
    let reduce = 1.0;
    //nuevo tamaño de la imagen despues de reducirla y decidir cual va a hacer el tamaño de las piezas
    let w = img.width/scale_img/reduce;
    let h = img.height/scale_img/reduce;
    
    //imagen pequeña a la que se le van a remplazar los pixeles por piezas para crear el mosaico
    smaller = createImage(w,h,RGB);
    smaller.copy(img,0,0,img.width,img.height,0,0,w,h);
    
    smaller.loadPixels();
    
    shaderTexture.shader(grayShader);
    scale(1.0,-1.0);
    //imagen pequeña a la que se le van a remplazar los pixeles por piezas para crear el mosaico
    grayShader.setUniform('u_img', smaller);
    grayShader.setUniform('u_res_sm',[float(smaller.width),float(smaller.height)])
    //imagen que contiene todas las piezas
    grayShader.setUniform('images',images);
    //arreglo con el color promedio de cada pieza
    grayShader.setUniform('colors_avg_img',colors_avg_img2);
    //width y height de la imagen que contiene todas las piezas
    grayShader.setUniform('images_resolution', [float(scale_img*colors_img.length),float(scale_img)]);
    grayShader.setUniform('u_resolution', [float(width),float(height)]);
    grayShader.setUniform('scale_img', int(scale_img));
    
    texture(shaderTexture);
    shaderTexture.rect(0,0,512,512);
    rect(-256,-256,512,512);
    
    //imagen para pequeña para tomar de referencia
    temp = createImage(w*3,h*3,RGB);
    temp.copy(img,0,0,img.width,img.height,0,0,w*3,h*3);
    temp.loadPixels();
    
    scale(1.0,-1.0);
    image(temp,-256,-256);
    
    noLoop();
    print("TIME HARDWARE: ",Date.now()-date)
    //print('END')
}