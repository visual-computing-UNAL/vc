# Conversión de la imagen a ascii art por Hardware.

> [Volver](/docs/workshops/imaging-hardware)

## Ascii Art

Para el desarrollo de la conversión a ascii art se partió del proyecto público de ShaderToy [Ascii Art by movAX13h](https://www.shadertoy.com/view/lssGDj?ref=dtf.ru) desde el cual se hicieron ajustes para convertir la imagen de prueba presentada posteriormente a un Ascii Art.

### Imagen Convertida a Ascii

> :P5 sketch=/docs/sketches/imaging-hardware/acii-art/ascii-art.js, width=800, height=800

* Segmentacion de la imagen en bloques de 8x8
* Se toma el píxel superior izquierdo de ese segmento y se extrae su nivel de brillo (con ese nivel de brillo podemos determinar qué carácter necesitamos usar dependiendo de la densidad del carácter)
* Codificacion del carácter por un número que representa un bit de tamaño 25 (5x5)
* Se itera píxel por píxel
* Se envian las coordenadas (x, y), el bloque y el número que codifica el carácter del bloque a una función que comprueba si la posición del píxel está codificada como 1 en el número de carácter
* Se devuelve el valor correspondiente para que la textura esperada se cree píxel a píxel en el vector gl_FragColor. 
* El resultado se usa luego como una textura de un plano 2D

> :Tabs
> > :Tab title=P5 Code
> > 
> > ```js | ascii-art.js
> > let asciiShader
> > let shaderTexture
> > 
> > function preload() {
> >   img = loadImage('/vc/docs/sketches/imaging-hardware/acii-art/image-test.jpg')
> >   asciiShader = loadShader('/vc/docs/sketches/imaging-hardware/acii-art/ascii-art.vert', '/vc/docs/sketches/imaging-hardware/acii-art/ascii-art.frag')
> > }
> > 
> > function setup() {
> >   createCanvas(800, 800, WEBGL)
> >   shaderTexture = createGraphics(800, 800, WEBGL)
> > }
> > 
> > function draw() {
> >   shaderTexture.shader(asciiShader)
> >   asciiShader.setUniform('tex', img)
> >   texture(shaderTexture)
> >   shaderTexture.rect(0,0,400,400)
> >   rect(-400,-400,800,800)
> > }
>
> > :Tab title=Vertex Shader
> >
> > 
> > ```js | filascii-art.vert
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
>
> > :Tab title=Fragment Shader
> >
> > 
> > ```js | filascii-art.vert
> > #ifdef GL_ES
> > precision mediump float;
> > #endif
> > 
> > uniform sampler2D tex;
> > 
> > attribute vec2 aTexCoord;
> > 
> > int getBit(int n, int a) {
> >   float value = float(n);
> >   for(float i = 27.0; i >= 0.0; i -= 1.0) {
> >   float val = pow(2.0,i*1.0);
> >     
> >     if (val <= value) {
> >       value -= val;
> >       if(i == float(a)) return 1;
> >     }
> >   }
> >   return 0;
> > }
> > 
> > float character(int n, vec2 p)
> > {
> > 	p = floor(p*vec2(4.0, -4.0) + 2.5);
> >     if (clamp(p.x, 0.0, 4.0) == p.x)
> > 	{
> >         if (clamp(p.y, 0.0, 4.0) == p.y)	
> > 		{
> >         	int a = int(floor(p.x+0.5) + 5.0 * floor(p.y+0.5));
> > 			if (getBit(n,a) == 1) return 1.0;
> > 		}	
> >     }
> > 	return 0.0;
> > }
> > 
> > 
> > void main() {
> > 	vec2 pix = gl_FragCoord.xy;
> > 	pix.y = 400.0*2.0 - pix.y;
> > 	vec2 resol = vec2(400.0*2.0, 400.0*2.0);
> > 	vec3 col = texture2D(tex, floor(pix/8.0)*8.0/resol).rgb;	
> > 
> > 	float gray = 0.3 * col.r + 0.59 * col.g + 0.11 * col.b;
> > 
> > 	int n =  4096;                // .
> > 	if (gray > 0.2) n = 65600;    // :
> > 	if (gray > 0.3) n = 332772;   // *
> > 	if (gray > 0.4) n = 15255086; // o 
> > 	if (gray > 0.5) n = 23385164; // &
> > 	if (gray > 0.6) n = 15252014; // 8
> > 	if (gray > 0.7) n = 13199452; // @
> > 	if (gray > 0.8) n = 11512810; // #
> > 
> > 	vec2 p = mod(pix/4.0, 2.0) - vec2(1.0);
> > 
> > 	col = vec3(character(n, p));
> > 
> > 	gl_FragColor = vec4(col, 1.0);
> > }
> > ```

