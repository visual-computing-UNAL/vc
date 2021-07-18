# Conversión a escala de grises por Hardware.

> [Volver](/docs/workshops/imaging-hardware)

## Explicacion

### Idea general

Lo que se va a realizar para poder aplicar los filtros a las imágenes es recorrer las imagen original pixel por pixel, y por cada pixel obtener los valores del rbg de esta, ya con estos valores hacer los cálculos correspondientes para reemplazar los valores del pixel mismo para obtener el filtro

Con el siguiente for anidado es que recorreremos las imágenes

```js
for (let i = 0; i < original.width; i++) {
      for (let j = 0; j < original.height; j++) {
          let colorArr = original.get(i, j);
        }
    }
```

### Escala de Grises con Promedio

Para poder hacer la escala de grises con promedio lo que nosotros hicimos fue tomar el valor del RGB de cada pixel y promediar estos tres valores, y luego reemplazar los valores individuales del RGB con el promedio.

```js
let averageRGB = (colorArr[0] + colorArr[1] + colorArr[2]) / 3;
let index = (i + j * original.width) * 4;
average.pixels[index] = averageRGB;
average.pixels[index + 1] = averageRGB;
average.pixels[index + 2] = averageRGB;
```

### Escala de Grises con Luma

Para poder hacer la escala de grises con Luma nosotros utilices los coeficientes Rec. 601 luma, para poder calcular los valores r’ g’ b’  o  gamma-compressed utilizamos la fórmula de abajo que depende de un valor Y y un valor A, nosotros tomamos siempre A = 1 y Definimos distintos valores para Y.  con lo anterior lo que se hizo fue por cada pixel calcular los valores gamma-compressed y reemplazarlos en la función.

> :P5 sketch=/docs/sketches/imaging-hardware/gray-scale/docs/form1.js, width=140, height=45

> :P5 sketch=/docs/sketches/imaging-hardware/gray-scale/docs/form2.js, width=320, height=45

### Escala de Grises en Videos

Para poder realizar la escala de grises con video simplemente se realizó el mismo proceso anterior a cada frame del video, por lo que a cada frame se le aplicó el filtro de manera independiente.

Para recorrer los píxeles del video utilizamos el siguiente for anidado.

```js
for (let i = 1; i < fingers.width; i++) {
    for (let j = 1; j < fingers.height; j++) {
       let index = 4 * (i + fingers.width * j);
    }
}
```

## Imagen
> :P5 sketch=/docs/sketches/imaging-hardware/gray-scale/image/gray-scale-image.js, width=800, height=1200

## Video

### (hacer click en los cuadros para correr los videos)

### Original
> :P5 sketch=/docs/sketches/imaging-hardware/gray-scale/video/original-video.js, width=320, height=240

### Average
> :P5 sketch=/docs/sketches/imaging-hardware/gray-scale/video/average-video.js, width=320, height=240

### Luma Y=1/4
> :P5 sketch=/docs/sketches/imaging-hardware/gray-scale/video/luma1-video.js, width=320, height=240

### Luma Y=1
> :P5 sketch=/docs/sketches/imaging-hardware/gray-scale/video/luma2-video.js, width=320, height=240

### Luma Y=4
> :P5 sketch=/docs/sketches/imaging-hardware/gray-scale/video/luma3-video.js, width=320, height=240

### Test
> :P5 sketch=/docs/sketches/imaging-hardware/gray-scale/image/gray-colorrgbshader.js, width=512, height=256