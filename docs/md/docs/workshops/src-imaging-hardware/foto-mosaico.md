# Conversión de la imagen a un foto-mosaico por Hardware.

> [Volver](/docs/workshops/imaging-hardware)

## Idea general

La idea basica se basa de 2 pasos principalmente, un preprocesamiento de las imagenes y la creacion de la imagen. 

En el pre procesamiento lo que se hace es crear una nueva imagen larga que contiene todas las imagenes que van a representar los colores. 

En el proceso de creacion de imagen se toma el color que le correspondia a cada pixel y se busca la pieza que tiene el color promedio mas cercano al color de ese pixel y posteriormente se dibuja la pieza (imagen) que contiene ese pixel.

## Pre procesamineto

Lo primero que se hace es crear una imagen que se va encargar de tener todas las imagenes del tamaño de las piezas que va a estar creado el mosaico, para esto lo primero que se hace es que se cargan todas las imagenes y se hace un proceso muy parecido para la version sin hardware, se cargan todas las imagenes se calcula el valor promedio de cada imagen en caso de ser necesario y se guarda en un archivo esa informacion, pero a differencia de la version sin hardware ahora se crea una imagen que va a estar compuesta por todas las imagenes pero del tamaño de la pieza, es decir si la imagen era por ejemplo de tamaño 100x80 y el tamaño de la pieza del mosaico es de 10x10 entonces esa imagenes de 100x80 se reajusta a un tamaño de 10x10 y se agrega a la imagen que va a contener todas las imagenes, como se puede ver acontinuacion.

> :P5 sketch=/docs/sketches/imaging-hardware/foto-mosaico/imagesp5.js, height=60

Esto se hace ya que todos estos procesos son muy demorados pero independientes de la imagen que se va a representar en la imagen del mosaico, entonces se puede aprovechar ese hecho para hacer el pre calculo y luego poder utilizar esa informacion para crear diferentes mosaicos.

## Creacion del mosaico

Para crear el mosaico la idea basica es cargar todas las imagenes, luego se re dimenciona la imagen para ajustarla a la resolucion que se desea y a la cual cada pixel se le va a cambiar por una pieza(imagen) de las calculadas en el pre procesamiento, para realizar el proceso de cargar la imagen se hace uso del archivo .frag en donde se aprovecha el hecho de que se puede realizar en paralelo ya que un  pixel siempre va a corresponder al mismo color y misma posicion de la imagen sin importar el orden en el que se haga siempre sera el mismo.

Despues haciendo uso de la funcion delta E se calcula la pieza que tiene un color promedio mas cercano al del pixel que va a representar haciendo uso de matematica se calcula la posicion del pixel en la imagen que se calculo en el pre procesamiento y se dibuja.

Para entender mejor como se calculan y dibujan las piezas hagamos un ejemplo. Supongamos que estamos dibujando el pixel en la posicion (10,12) con un tamaño de pieza de 8 y  que el color promedio corresponde a la imagen numero 13 en el listado de imagenes.

Entonces para calcular ese pixel sabemos que debe estar en la imagen 13 entonces multiplicamos 13 * tamaño de la pieza, en este caso 8, entonces tenemos 13 * 8 = 104.

ahora estamos ubicados en la posicion exacta donde empieza esta imagen en pixeles, pero la posicion del pixel que vamos a dibujar es (10,12) entonces esta desplazado un poco, para calcula ese desplazamiento sacamos modulo de la posicion de la pieza, en este caso (10 mod 8, 12 mod 8) = (2,4), ahora lo unico que nos falta es sumarle la coordenada x para quedar en la posicion exacta de la pieza, en este caso le sumariamos (2+13 * 8,4) = (106,4) y listo ahora ya tenemos la posicion del pixel que queremos dibujar, lo unico que faltaria es dibujarlo.

## Imagen final del mosaico flamenco
> :Tabs
> > :Tab title=Result
> >
> > > :P5 sketch=/docs/sketches/imaging-hardware/foto-mosaico/mosaic_hardware.js, width=512, height=512
>
> > :Tab title=P5js
> > 
> > ```js | mosaic_hardware.js
> > let grayShader;
> > let shaderTexture;
> > 
> > let img;
> > let smaller;
> > 
> > //imagen con todas las piezas
> > let images;
> > 
> > //arreglo de las piezas
> > let colors_img = [];
> > //arreglos con el color promedio de cada pieza
> > let colors_avg_img = [];
> > let colors_avg_img2 = [];
> > //cantidad de piezas
> > let size_avg_img = 173;
> > 
> > //tamaño de cada pieza
> > let scale_img = 15;
> > 
> > //pre procesamientos
> > let create_img = false;
> > let create_new_img = false;
> > 
> > function preload() {
> >   img = loadImage('/vc/docs/sketches/imaging-hardware/foto-mosaico/lenna.jpg');
> >   images = loadImage('/vc/docs/sketches/imaging-hardware/foto-mosaico/images.png')
> >   grayShader = loadShader('/vc/docs/sketches/imaging-hardware/foto-mosaico/mosaic_hardware.vert', '/vc/docs/> > sketches/imaging-hardware/foto-mosaico/mosaic_hardware.frag');
> >   preloadFilesColors();
> >   preloadAverageImg();
> > }
> > 
> > function preloadFilesColors(){
> >     let dir_img = '/vc/docs/sketches/imaging/foto-mosaico/images/colors/'
> >     for(let i=1;i<=size_avg_img;i++){
> >         let curr_img = loadImage(dir_img+i+'.jpg');
> >         colors_img.push(curr_img);
> >     }
> > }
> > 
> > function setup() {
> >     createCanvas(512, 512, WEBGL);
> >     shaderTexture = createGraphics(512, 512, WEBGL);
> >     shaderTexture.noStroke();
> > 
> >     //pre procesamiento
> >     if(create_new_img){
> >         create_long_img();
> >     }
> > 
> >     //pre procesamiento
> >     if(create_img){
> >         createImagesAverageColor();
> >     }
> >     loadAvgImg();
> >     noLoop();
> >     create_colors_avg_img2();
> > }
> > 
> > //Creamos todos los valores del color promedio en un arreglo, sin separalo para cada imagen
> > function create_colors_avg_img2(){
> >     for(let curr of colors_avg_img){
> >         for(const temp of curr){
> >             colors_avg_img2.push(float(temp-0));
> >         }
> >     }
> > }
> > 
> > //Se crea la imagen larga que va a tener todas las piezas 
> > function create_long_img(){
> >     let to_show = createImage(scale_img*colors_img.length,scale_img);
> >     for(let i=0;i<colors_img.length;i++){
> >             let load_closer = colors_img[i];
> >             to_show.copy(load_closer,0,0,load_closer.width,load_closer.height,i*scale_img,0,scale_img,scale_img);
> >     }
> >     to_show.save('images','png')
> > }
> > 
> > //pre procesamiento crear imagen con color promedio
> > function createImagesAverageColor(){
> >     let img_vrg_col = [];
> >     for(let im=0; im<colors_img.length; im++){
> >         let curr_img = colors_img[im];
> >         let h = curr_img.height;
> >         let w = curr_img.width;
> > 
> >         let sum = [0,0,0];
> > 
> >         print(h,w);
> > 
> >         for(let i=0;i<w;i++){
> >             for(let j=0;j<h;j++){
> >                 let curr = curr_img.get(i,j);
> >                 sum[0] += curr[0];
> >                 sum[1] += curr[1];
> >                 sum[2] += curr[2];
> >             }
> >         }
> >         let total = w*h;
> >         let avrg = [Math.round(sum[0]/total),Math.round(sum[1]/total),Math.round(sum[2]/total)];
> >         // print('sum',sum)
> >         // print('avrg',avrg)
> >         img_vrg_col.push(avrg[0]+' '+avrg[1]+' '+avrg[2])
> >         print('img '+im+' was created')
> >     }
> >     saveStrings(img_vrg_col,'img_vrg_col.txt')
> > }
> > 
> > //cargar informacion del color promedio de las imagenes en rgb
> > function preloadAverageImg(){
> >     let dir_txt = '/vc/docs/sketches/imaging/foto-mosaico/images/img_vrg_col.txt'
> >     colors_avg_img = loadStrings(dir_txt);
> > }
> > 
> > 
> > function loadAvgImg(){
> >     //print(colors_avg_img,colors_avg_img.length)
> >     for(let i=0;i<colors_avg_img.length-1;i++){
> >         let img = colors_avg_img[i];
> >         colors_avg_img[i] = img.split(' ')
> >     }
> >     colors_avg_img.pop();
> > }
> > 
> > function draw() {
> >     //en caso de que se quisiera reducir el tamaño de la imagen
> >     let reduce = 1.0;
> >     //nuevo tamaño de la imagen despues de reducirla y decidir cual va a hacer el tamaño de las piezas
> >     let w = img.width/scale_img/reduce;
> >     let h = img.height/scale_img/reduce;
> > 
> >     //imagen pequeña a la que se le van a remplazar los pixeles por piezas para crear el mosaico
> >     smaller = createImage(w,h,RGB);
> >     smaller.copy(img,0,0,img.width,img.height,0,0,w,h);
> > 
> >     smaller.loadPixels();
> > 
> >     shaderTexture.shader(grayShader);
> >     scale(1.0,-1.0);
> >     //imagen pequeña a la que se le van a remplazar los pixeles por piezas para crear el mosaico
> >     grayShader.setUniform('u_img', smaller);
> >     grayShader.setUniform('u_res_sm',[float(smaller.width),float(smaller.height)])
> >     //imagen que contiene todas las piezas
> >     grayShader.setUniform('images',images);
> >     //arreglo con el color promedio de cada pieza
> >     grayShader.setUniform('colors_avg_img',colors_avg_img2);
> >     //width y height de la imagen que contiene todas las piezas
> >     grayShader.setUniform('images_resolution', [float(scale_img*colors_img.length),float(scale_img)]);
> >     grayShader.setUniform('u_resolution', [float(width),float(height)]);
> >     grayShader.setUniform('scale_img', int(scale_img));
> > 
> >     texture(shaderTexture);
> >     shaderTexture.rect(0,0,512,512);
> >     rect(-256,-256,512,512);
> > 
> >     //imagen para pequeña para tomar de referencia
> >     temp = createImage(w*3,h*3,RGB);
> >     temp.copy(img,0,0,img.width,img.height,0,0,w*3,h*3);
> >     temp.loadPixels();
> > 
> >     scale(1.0,-1.0);
> >     image(temp,-256,-256);
> > 
> >     noLoop();
> >     print('END')
> > }
> > ```
>
> > :Tab title=.vert
> >
> > ```glsl | mosaic_hardware.vert
> > #ifdef GL_ES
> > precision mediump float;
> > #endif
> > 
> > attribute vec3 aPosition;
> > attribute vec2 aTexCoord;
> > 
> > varying vec2 vTexCoord;
> > 
> > void main() {
> >   vTexCoord = aTexCoord;
> > 
> >   vec4 positionVec4 = vec4(aPosition, 1.0);
> >   positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
> > 
> >   gl_Position = positionVec4;
> > }
> > ```
>
> > :Tab title=.frag
> > ```glsl | mosaic_hardware.frag
> > #ifdef GL_ES
> > precision mediump float;
> > #endif
> > 
> > uniform sampler2D u_img;
> > uniform sampler2D images;
> > uniform sampler2D smaller;
> > 
> > uniform vec2 u_resolution;
> > uniform vec2 u_res_sm;
> > uniform vec2 images_resolution;
> > 
> > uniform vec3 colors_avg_img[173];
> > 
> > 
> > uniform int scale_img;
> > 
> > float divisions = 1.0;
> > 
> > //valor entre 0-1 que representa la posicion del pixel en la imange que contiene todas las piezas
> > vec2 pos_images(int pos,vec2 original){
> >     //calculo explicado en el articulo
> >     vec2 pos_pix = vec2(float(pos*scale_img)+mod(float(original.x),float(scale_img)),mod(float(original.y),float> > (scale_img)));
> >     return pos_pix/images_resolution;
> > }
> > 
> > float deltaE(vec3 col1,vec3 col2){
> >     float acum = 0.0;
> >     for(int i=0;i<3;i++){
> >         float temp = float(col1[i] - col2[i]);
> >         acum += temp*temp;
> >     }
> >     return acum;//sqrt(acum)
> > }
> > 
> > //Se encuentra la pieza que tiene el color mas cercano utilizando la funcion delta E
> > int loadImageCloser(vec3 col){
> >     float min = 1e8;
> >     int pos = -1;
> >     for(int i=0;i<173;i++){
> >         float de = deltaE(col*255.0,colors_avg_img[i]);
> >         if(min>de){
> >             min = de;
> >             pos = i;
> >         }
> >     }
> >     return pos;
> > }
> > 
> > vec4 get_px(int pos,vec2 original){
> > 	return vec4(texture2D(images,pos_images(pos,original)).rgb, 1);//calculo del color correspondiente, nos e usa > > transparencia
> > }
> > 
> > void main() {
> >     vec2 cord = vec2(int(gl_FragCoord.x)/scale_img,int(gl_FragCoord.y)/scale_img);//posicion a la que corresponde > > en la imagen pequeña
> >     vec2 position = cord/u_res_sm;//Valor entre 0 y 1
> >     vec4 texel = texture2D(u_img,position);//color en la imagen pequeña 
> >     vec3 rgb_val = vec3(texel[0],texel[1],texel[2]);
> >     int pxcol = loadImageCloser(rgb_val);//posicion de la pieza a la que corresponde
> > 
> >     gl_FragColor = get_px(pxcol,gl_FragCoord.xy);//color del pixel en la piza correspondiente
> > }
> > ```

## Imagen mas grande
> :P5 sketch=/docs/sketches/imaging-hardware/foto-mosaico/mosaic_hardware_big.js, width=768, height=768