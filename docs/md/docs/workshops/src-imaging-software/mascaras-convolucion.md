# Aplicación de máscara de convolución sobre imagen y video.
> [Volver](/docs/workshops/imaging)

## Descripción

Este ejercicio tiene como objetivo que por el proceso de convolución, cada elemento de la imagen sea evaluado por un kernel y de esta manera ciertas características de la imagen de entrada sean alteradas.
Para ver los cambios ocasionados por el uso del Kernel en el proceso de uso de máscaras de convolución sobre una imagen, proveemos su original para ser detallado previamente. 
## Imagen Original
> :P5 sketch=/docs/sketches/imaging/mascaras-convolucion/image/m-convolucion-imagenOriginal.js, width=400, height=400

## Proceso de Aplicación de máscara de convolución sobre una imagen

Una vez el color resultante del proceso de convolución, este debe aplicarse a cada cuadro de la imagen y el resultado es el siguiente: 
## Matrices de Detección de Bordes Utilizadas
> :P5 sketch=/docs/sketches/imaging/mascaras-convolucion/image/m-convolucion-EdgeMatrix.js, width=130, height=130

> :P5 sketch=/docs/sketches/imaging/mascaras-convolucion/image/oneMoreEdgeDetection.js, width=145, height=130

## Matriz de Sharpen Utilizada
> :P5 sketch=/docs/sketches/imaging/mascaras-convolucion/image/m-convolucion-SharpenMatrix.js, width=130, height=130
## Imagen con Máscara de Convolución
## Matriz de Bordes
> :P5 sketch=/docs/sketches/imaging/mascaras-convolucion/image/m-convolucion-image.js, width=400, height=400

## Una más de Matriz de Detección de ordes
> :P5 sketch=/docs/sketches/imaging/mascaras-convolucion/image/m-convolucion-imageEdgeDetection.js, width=400, height=400

## Matriz de Sharpen
> :P5 sketch=/docs/sketches/imaging/mascaras-convolucion/image/m-convolucion-imageSharpen.js, width=400, height=400

## Video
### (hacer click en los cuadros para correr los videos)

## Matriz de Bordes
Para este caso podemos observar el video original, el cual ha sido sujeto a la aplicación de una máscara de convolución y su resultado se encuentra abajo de este. 
> :P5 sketch=/docs/sketches/imaging/mascaras-convolucion/video/m-convolucion-video.js, width=350, height=550

## Uno más de Detección de Bordes

> :P5 sketch=/docs/sketches/imaging/mascaras-convolucion/video/m-convolucion-video-EdgeDetection.js, width=350, height=550

## Matriz de Sharpen

> :P5 sketch=/docs/sketches/imaging/mascaras-convolucion/video/m-convolucion-video-Sharpen.js, width=350, height=550
