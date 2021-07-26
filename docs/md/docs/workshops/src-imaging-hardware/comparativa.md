# Comparativa de la eficiencia computacional 

> [Volver](/docs/workshops/imaging-hardware)

## Escala de Grises con Promedio

Lo primero que se hizo para poder probar la eficiencia computacional fue realizar la comparación de software vs hardware en la implementación de la conversión a escala de grises utilizando el promedio, a continuación se van a mostrar las dos implementaciones corriendo con su respectivo framerate, donde la de la izquierda es por software y la de la derecha es por hardware.

> :P5 sketch=/docs/sketches/imaging-hardware/comparativa/gray-average-video.js, width=320, height=240

> :P5 sketch=/docs/sketches/imaging-hardware/comparativa/gray-shader-average-video.js, width=320, height=240

Como para realizar la implementación por hardware se necesita crear un canvas de tipo WEBGL en estos canvas al realizar el display de la función frameRate() este no se ve bien, por lo que decidimos mostrar los valores directamente en la consola del navegador para poder realizar una comparación de los framerates.

La imagen de la izquierda corresponde a los framerates de la implementación por software y la imagen de la derecha corresponde a los framerates de la implementación por hardware.

> :P5 sketch=/docs/sketches/imaging-hardware/comparativa/gray-images.js, width=500, height=390

Dados los resultados anteriores podemos concluir que la implementación por hardware es mucho más eficiente computacionalmente ya que esta pudo obtener framerates máximos de 83fps, mientras que el framerate máximo de la implementación por software fue de 62fps por lo que fue para este caso en particular un incremento de casi un 25% aproximadamente.

## Aplicación de máscaras de convolución 

> :P5 sketch=/docs/sketches/imaging-hardware/comparativa/fingers-conv-mask-software.js, width=320, height=240

> :P5 sketch=/docs/sketches/imaging-hardware/comparativa/fingers-conv-mask-hardware.js, width=320, height=240
