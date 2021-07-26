# Aplicación de máscara de convolución sobre imagen y video por Hardware.
> [Volver](/docs/workshops/imaging-hardware)

## Descripción

Este ejercicio tiene como objetivo que por el proceso de convolución, cada elemento de la imagen sea evaluado por un kernel y de esta manera ciertas características de la imagen de entrada sean alteradas.
Para ver los cambios ocasionados por el uso del Kernel en el proceso de uso de máscaras de convolución sobre una imagen, proveemos su original para ser detallado previamente. 
## Imagen Original
> :P5 sketch=/docs/sketches/imaging-hardware/mascaras-convolucion/image/m-convolucion-imagenOriginal.js, width=400, height=400

## Proceso de Aplicación de máscara de convolución sobre una imagen

Una vez el color resultante del proceso de convolución, este debe aplicarse a cada cuadro de la imagen y el resultado es el siguiente: 
## Matrices de Detección de Bordes Utilizadas
> :P5 sketch=/docs/sketches/imaging-hardware/mascaras-convolucion/image/m-convolucion-EdgeMatrix.js, width=130, height=130

> :P5 sketch=/docs/sketches/imaging-hardware/mascaras-convolucion/image/oneMoreEdgeDetection.js, width=145, height=130

## Matriz de Sharpen Utilizada
> :P5 sketch=/docs/sketches/imaging-hardware/mascaras-convolucion/image/m-convolucion-SharpenMatrix.js, width=130, height=130
## Imagen con Máscara de Convolución

> :Tabs
> > :Tab title=Result
> >
> > > :P5 sketch=/docs/sketches/imaging-hardware/convolution-masks/mask.js, width=512, height=512
>
> > :Tab title=P5js
> > 
> > ```js | mask.js
> > let img;
> > function preload() {
> >   shader_ = loadShader('/vc/docs/sketches/imaging-hardware/convolution-masks/mask.vert', '/vc/docs/sketches/> > > > imaging-hardware/convolution-masks/mask.frag');
> >   img = loadImage('/vc/docs/sketches/imaging/mascaras-convolucion/image/image-test.jpg');
> > }
> >function shader_set(){
> >   shader(shader_);
> >   shader_.setUniform('texture', img);
> >   shader_.setUniform('texOffset',[1/img.width,1/img.height]);    
> >}
> >function setup() {
> >  createCanvas(640, 400, WEBGL);
> >  noStroke();
> >  textureMode(NORMAL); 
> >  shader_set();
> >}
> >function set_vertex(){
> >    vertex(-width / 2, height / 2, 0, 0, 1);
> >    vertex(width / 2, height / 2, 0, 1, 1);
> >    vertex(width / 2, -height / 2, 0, 1, 0);
> >    vertex(-width / 2, -height / 2, 0, 0, 0);
> >}
> >function draw() {
> >  background(0);
> >  beginShape() 
> >  set_vertex()
> >  shader_.setUniform('kernel', [-1, 0, 1, -2, 0, 2,-1, 0, 1]);
> >  endShape(CLOSE)
> >}
> > ```
>
> > :Tab title=.vert
> >
> > ```glsl | mask.vert
> >precision highp float;
> >attribute vec3 aPosition;
> >attribute vec2 aTexCoord;
> >attribute vec4 aVertexColor;
> >uniform mat4 uProjectionMatrix;
> >uniform mat4 uModelViewMatrix;
> >varying vec4 vVertexColor;
> >varying vec2 vTexCoord;
> >void main() {
> >  vVertexColor = aVertexColor;
> >  vTexCoord = aTexCoord;
> >  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
> >}
> > ```
>
> > :Tab title=.frag
> > ```glsl | mask.frag
> >precision mediump float;
> >uniform float kernel[9];
> >uniform sampler2D texture;
> >uniform vec2 texOffset;
> >vec2 tc[9];
> >varying vec2 vTexCoord;
> >vec4 col[9];
> >varying vec4 vVertexColor;
> >const vec4 lumcoeff = vec4(0.299, 0.587, 0.114, 0);
> >void set_texture(){
> >  for ( int i = 0; i < 9; i++){
> >    col[i] = texture2D( texture, tc[i] );
> >  }
> >}
> >void set_vtcoord(){
> >  tc[0] = vTexCoord + vec2(-texOffset.s, -texOffset.t);
> >  tc[1] = vTexCoord + vec2(         0.0, -texOffset.t);
> >  tc[2] = vTexCoord + vec2(+texOffset.s, -texOffset.t);
> >  tc[3] = vTexCoord + vec2(-texOffset.s,          0.0);
> >  tc[4] = vTexCoord + vec2(         0.0,          0.0);
> >  tc[5] = vTexCoord + vec2(+texOffset.s,          0.0);
> >  tc[6] = vTexCoord + vec2(-texOffset.s, +texOffset.t);
> >  tc[7] = vTexCoord + vec2(         0.0, +texOffset.t);
> >  tc[8] = vTexCoord + vec2(+texOffset.s, +texOffset.t);
> >}
> >void main() {
> >  set_vtcoord();
> >  set_texture();
> >  vec4 total = kernel[0] * col[0];
> >  for (int i = 1; i<9 ; i++){
> >    vec4 colour =  kernel[i] * col[i];
> >    total += colour;
> >  }
> >  gl_FragColor = vec4(vec3(total), 1.0) * vVertexColor;
> >}
> > ```

## Matriz de Bordes
> :P5 sketch=/docs/sketches/imaging-hardware/convolution-masks/mask.js, width=650, height=400
## Una más de Matriz de Detección de ordes
> :P5 sketch=/docs/sketches/imaging-hardware/convolution-masks/mask_edge_detection.js, width=650, height=400
## Matriz de Sharpen
> :P5 sketch=/docs/sketches/imaging-hardware/convolution-masks/mask_sharpen.js, width=650, height=400 
## Video
### (hacer click en los cuadros para correr los videos)
## Matriz de Bordes
Para este caso podemos observar el video original, el cual ha sido sujeto a la aplicación de una máscara de convolución y su resultado se encuentra abajo de este. 
> :P5 sketch=/docs/sketches/imaging-hardware/convolution-masks/mask_fingers.js, width=650, height= 400
## Uno más de Detección de Bordes
> :P5 sketch=/docs/sketches/imaging-hardware/convolution-masks/mask_fingers_edges.js, width=650, height=400
## Matriz de Sharpen
> :P5 sketch=/docs/sketches/imaging-hardware/convolution-masks/mask_fingers_sharpen.js, width=650, height=400