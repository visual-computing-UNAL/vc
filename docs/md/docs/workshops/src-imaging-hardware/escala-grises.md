# Conversión a escala de grises por Hardware.

> [Volver](/docs/workshops/imaging-hardware)

## Filtros Simples

### Idea general

Para poder realizar los filtros más simples los cuales son la escala de grises por promedio y la inversión de colores por hardware fue necesario el uso de un shader, para el caso de la escala de grises y el promedio ambos utilizan el mismo archivo . vert, pero ya en el caso del archivo .frag este si fue diferente para cada uno.

Para este caso la foto original, la escala de grises con promedio, y el inverso de los colores se hicieron en un mismo skect, y a continuación estan los codigos que se comparten:

> :Tabs
> > :Tab title=P5 Code
> > 
> > ```js | filter_rgb_shader.js
> > let gray_rgb_shader
> > let inverse_rgb_shader
> > let graphics_space
> > 
> > function preload() {
> >   image = loadImage('/vc/docs/sketches/imaging-hardware/gray-scale/image/image-test.jpg')
> >   video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm'])
> >   gray_rgb_shader = loadShader(
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/gray_rgb_shader.frag'
> >   );
> >   inverse_rgb_shader = loadShader(
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/inverse_rgb_shader.frag'
> >   )
> >   video.hide()
> > }
> > 
> > function setup() {
> >   createCanvas(900, 600, WEBGL)
> >   graphics_space = createGraphics(900, 600, WEBGL)
> >   graphics_space.noStroke()
> >   video.loop()
> >   noStroke()
> > }
> > 
> > function draw() {
> > 
> >   texture(image)
> >   rect(-450, -300, 300, 300)
> > 
> >   texture(video)
> >   rect(-450, 0, 300, 300)
> > 
> >   graphics_space.shader( gray_rgb_shader)
> > 
> >   gray_rgb_shader.setUniform('content', image)
> >   texture(graphics_space)
> >   graphics_space.rect()
> >   rect(-150, -300, 300, 300)
> > 
> >  gray_rgb_shader.setUniform('content', video)
> >   texture(graphics_space)
> >   graphics_space.rect()
> >   rect(-150, 0, 300, 300)
> > 
> >   graphics_space.shader(inverse_rgb_shader)
> > 
> >   inverse_rgb_shader.setUniform('content', image)
> >   texture(graphics_space)
> >   graphics_space.rect()
> >   rect(150, -300, 300, 300)
> > 
> >   inverse_rgb_shader.setUniform('content', video)
> >   texture(graphics_space)
> >   graphics_space.rect()
> >   rect(150, 0, 300, 300)
> > }
>
> > :Tab title=Vertex Shader
> >
> > 
> > ```js | filters.vert
> > #ifdef GL_ES
> > precision mediump float;
> > #endif
> > 
> > // Geometry position attribute
> > attribute vec3 aPosition;
> > // Geometry texture coordinate
> > attribute vec2 aTexCoord;
> > 
> > // vertex texcoord
> > varying vec2 vTexCoord;
> > 
> > void main() {
> >   // copy / interpolate texcoords
> >   vTexCoord = aTexCoord;
> >   // vertex projection into clipspace
> >  vec4 positionVec4 = vec4(aPosition, 1.0);
> >   positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
> >   gl_Position = positionVec4;
> > }
> > 
> > ```

### Escala de Grises con Promedio

Para el caso de las escala de grises con promedio lo primero que se hace es obtener la coordenada del pixel con vTexCoord, ya con este valor lo siguiente es corregir la inversión ya que las coordenadas por defecto vienen invertidas en el eje y, luego sacamos los colores de este píxel, y promediamos los valores del rgb, para ya finalmente reemplazar en el gl_FragColor el nuevo valor.


### Inversión de Colores

Para el caso de la inversión de colores lo primero que se hace es obtener la coordenada del pixel con vTexCoord, ya con este valor lo siguiente es corregir la inversión ya que las coordenadas por defecto vienen invertidas en el eje y, luego sacamos los colores de este píxel, como los colores no vienen en la escala de 0 a 255 sino que vienen en una escala de 0 a 1 lo que hacemos es restarle a 1 los valores del rgb para de esta manera poder obtener el complemento o el inverso, para ya finalmente reemplazar en el gl_FragColor el nuevo valor.

Archivos de los fragment shaders correspondientes:

> :Tabs
> > :Tab title=Gray Scale Fragment Shader
> > 
> > ```js | gray_rgb_shader.frag
> >#ifdef GL_ES
> >precision mediump float;
> >#endif
> >
> >varying vec2 vTexCoord;
> >
> >uniform sampler2D content;
> >
> >void main() {
> >  vec2 cordinates = vTexCoord;
> >  cordinates.y = 1.0 - cordinates.y;
> >  vec4 current = texture2D(content, cordinates);
> >  float average = dot(current.rgb, vec3(1.0/3.0, 1.0/3.0, 1.0/3.0));
> >  gl_FragColor = vec4(average,average,average,1.0);
> >}
>
> > :Tab title=Inverse Fragment Shader
> >
> > 
> > ```js | inverse_rgb_shader.frag
> >#ifdef GL_ES
> >precision mediump float;
> >#endif
> >
> >varying vec2 vTexCoord;
> >
> >uniform sampler2D content;
> >
> >void main() {
> >  vec2 cordinates = vTexCoord;
> >  cordinates.y = 1.0 - cordinates.y;
> >  vec4 current = texture2D(content, cordinates);
> >  current.rgb = 1.0 - current.rgb;
> >  gl_FragColor = current;
> >}
> > 
> > ```

### Sketch con los filtros anteriormente mencionados (imagen y video):

> :P5 sketch=/docs/sketches/imaging-hardware/gray-scale/image/filter_rgb_shader.js, width=900, height=600

## Escala de Grises con Luma

### Idea general

Para poder hacer la escala de grises con Luma nosotros utilices los coeficientes Rec. 601 luma, para poder calcular los valores r’ g’ b’  o  gamma-compressed utilizamos la fórmula de abajo que depende de un valor Y y un valor A, nosotros tomamos siempre A = 1 y Definimos distintos valores para Y.  con lo anterior lo que se hizo fue por cada pixel calcular los valores gamma-compressed y reemplazarlos en la función.

> :P5 sketch=/docs/sketches/imaging-hardware/gray-scale/docs/form1.js, width=140, height=45

> :P5 sketch=/docs/sketches/imaging-hardware/gray-scale/docs/form2.js, width=320, height=45

Para poder realizar lo anterior lo que se hizo fue por medio de un shader, en el archivo .frag lo que se hizo fue primero fue obtener la coordenada del pixel con vTexCoord, ya con este valor lo siguiente es corregir la inversión ya que las coordenadas por defecto vienen invertidas en el eje y, luego sacamos los colores de este píxel, ya con los colores del pixel tenemos que calcular los valores gamma compressed de cada pixel, para lo cual elevamos el cada valor rgb por el valor del Y, ya con los  valores gamma compressed lo que hacemos es calcular el promedio de estos valores, para ya finalmente reemplazar en el gl_FragColor el nuevo valor.

A continuación se muestran los archivos correspondientes a esta implementación:

> :Tabs
> > :Tab title=P5 Code
> > 
> > ```js | luma_rgb_shader.js
> > let lumaShader1
> > let lumaShader2
> > let lumaShader3
> > let lumaShader4
> > let graphics_space
> > 
> > 
> > function preload() {
> >   image = loadImage('/vc/docs/sketches/lenna.png')
> >   video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm'])
> >   grayShader = loadShader(
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/gray_rgb_shader.frag'
> >   )
> >   lumaShader1 = loadShader(
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/luma_rgb_1.frag'
> >   )
> >   lumaShader2 = loadShader(
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/luma_rgb_2.frag'
> >   )
> >   lumaShader3 = loadShader(
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/luma_rgb_3.frag'
> >   )
> >   lumaShader4 = loadShader(
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
> >     '/vc/docs/sketches/imaging-hardware/gray-scale/image/luma_rgb_4.frag'
> >   )
> >   video.hide()
> > }
> > 
> > function setup() {
> >   createCanvas(800, 400, WEBGL);
> >   graphics_space = createGraphics(800, 400, WEBGL)
> >   graphics_space.noStroke()
> >   video.loop()
> >   noStroke()
> > }
> > 
> > function draw() {
> > 
> >   graphics_space.shader(lumaShader1)
> > 
> >   lumaShader1.setUniform('content', image)
> >   texture(graphics_space)
> >   graphics_space.rect()
> >   rect(-400, -200, 200, 200)
> > 
> >   lumaShader1.setUniform('content', video)
> >   texture(graphics_space);
> >   graphics_space.rect();
> >   rect(-400, 0, 200, 200)
> > 
> >   graphics_space.shader(lumaShader2)
> > 
> >   lumaShader2.setUniform('content', image)
> >   texture(graphics_space)
> >   graphics_space.rect()
> >   rect(-200, -200, 200, 200)
> > 
> >   lumaShader2.setUniform('content', video)
> >   texture(graphics_space)
> >   graphics_space.rect()
> >   rect(-200, 0, 200, 200)
> > 
> >   graphics_space.shader(lumaShader3)
> > 
> >   lumaShader3.setUniform('content', image)
> >   texture(graphics_space)
> >   graphics_space.rect()
> >   rect(0, -200, 200, 200)
> > 
> >   lumaShader3.setUniform('content', video)
> >   texture(graphics_space)
> >   graphics_space.rect()
> >   rect(0, 0, 200, 200)
> > 
> >   graphics_space.shader(lumaShader4)
> > 
> >   lumaShader4.setUniform('content', image)
> >   texture(graphics_space)
> >   graphics_space.rect()
> >  rect(200, -200, 200, 200)
> > 
> >   lumaShader4.setUniform('content', video)
> >   texture(graphics_space)
> >   graphics_space.rect()
> >   rect(200, 0, 200, 200)
> > }
> > 
>
> > :Tab title=Vertex Shader
> >
> > 
> > ```js | filters.vert
> >#ifdef GL_ES
> >precision mediump float;
> >#endif
> >
> >// Geometry position attribute
> >attribute vec3 aPosition;
> >// Geometry texture coordinate
> >attribute vec2 aTexCoord;
> >
> >// vertex texcoord
> >varying vec2 vTexCoord;
> >
> >void main() {
> >  // copy / interpolate texcoords
> >  vTexCoord = aTexCoord;
> >  // vertex projection into clipspace
> >  vec4 positionVec4 = vec4(aPosition, 1.0);
> >  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
> >  gl_Position = positionVec4;
> >}
> > 
> > ```
>
> > :Tab title=Fragment Shader
> >
> > 
> > ```js | luma_rgb.frag
> > #ifdef GL_ES
> > precision mediump float;
> > #endif
> > 
> > varying vec2 vTexCoord;
> > 
> > uniform sampler2D content;
> > 
> > float Y = 1.0/2.0;
> > 
> > void main() {
> >   vec2 cordinates = vTexCoord;
> >   cordinates.y = 1.0 - cordinates.y;
> >   vec4 current = texture2D(content, cordinates);
> >   float luma = dot(pow(current.rgb, vec3(Y, Y, Y)), vec3(0.599, 0.587, 0.114));
> >   gl_FragColor = vec4(luma,luma,luma,1.0);
> > }
> > 
> > ```

### Implementación de escala de grises con Luma:

#### Valores de Y utilizados:
- ½
- 1
- 2
- 4

> :P5 sketch=/docs/sketches/imaging-hardware/gray-scale/image/luma_rgb_shader.js, width=800, height=400