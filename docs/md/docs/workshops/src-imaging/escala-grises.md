# Conversión a escala de grises.

> [Volver](/docs/workshops/imaging)

## Explicacion

### Escala de Grises con Promedio

Para poder hacer la escala de grises con promedio lo que nosotros hicimos fue tomar el valor del RGB de cada pixel y promediar estos tres valores, y luego reemplazar los valores individuales del RGB con el promedio.

`let averageRGB = (colorArr[0] + colorArr[1] + colorArr[2]) / 3;`<br />
` let index = (i + j * original.width) * 4;`<br />
` average.pixels[index] = averageRGB;`<br />
` average.pixels[index + 1] = averageRGB;`<br />
`average.pixels[index + 2] = averageRGB;`<br />

### Escala de Grises con Luma

Para poder hacer la escala de grises con Luma nosotros utilices los coeficientes Rec. 601 luma, para poder calcular los valores r’ g’ b’  o  gamma-compressed utilizamos la fórmula de abajo que depende de un valor Y y un valor A, nosotros tomamos siempre A = 1 y Definimos distintos valores para Y.  con lo anterior lo que se hizo fue por cada pixel calcular los valores gamma-compressed y reemplazarlos en la función.

> :P5 sketch=/docs/sketches/imaging/gray-scale/docs/form1.js, width=140, height=45

> :P5 sketch=/docs/sketches/imaging/gray-scale/docs/form2.js, width=320, height=45

### Escala de Grises en Videos

Para poder realizar la escala de grises con video simplemente se realizó el mismo proceso anterior a cada frame del video, por lo que a cada frame se le aplicó el filtro de manera independiente.

## Imagen
> :P5 sketch=/docs/sketches/imaging/gray-scale/image/gray-scale-image.js, width=800, height=1200

## Video

### (hacer click en los cuadros para correr los videos)

### Original
> :P5 sketch=/docs/sketches/imaging/gray-scale/video/original-video.js, width=320, height=240

### Average
> :P5 sketch=/docs/sketches/imaging/gray-scale/video/average-video.js, width=320, height=240

### Luma Y=1/4
> :P5 sketch=/docs/sketches/imaging/gray-scale/video/luma1-video.js, width=320, height=240

### Luma Y=1
> :P5 sketch=/docs/sketches/imaging/gray-scale/video/luma2-video.js, width=320, height=240

### Luma Y=4
> :P5 sketch=/docs/sketches/imaging/gray-scale/video/luma3-video.js, width=320, height=240