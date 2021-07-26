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

Framerates de la implementación por software y la imagen de la derecha corresponde a los framerates de la implementación por hardware.

> :P5 sketch=/docs/sketches/imaging-hardware/comparativa/masks-average-video.js, width=500, height=360

Dados los resultados anteriores podemos concluir que la implementación por hardware es mucho más eficiente computacionalmente ya que esta pudo obtener framerates máximos de 59fps, mientras que el framerate máximo de la implementación por software fue de 1fps por lo que fue para este caso en particular un incremento de casi un 60% aproximadamente.

# Ascii
En el caso del Ascii podemos realizar una comparacion de los tiempos que toman en ejecutarse, teniendo en cuenta que la solucion por software esta generando un div con los caracteres y la de hardware esta procesando y dibujando la imagen. En el caso del Software usamos el reloj de la computadora en la funcion asciify() y en hardware en el draw(). A continuacion veremos el rendimiento en ambos casos:

|Indice| hardware(ms) | software(ms) |
|:---|:----:| :---:|
|1|41|63|
|2|29|74|
|3|56|70|
|4|19|87|
|5|23|68|
|6|45|71|
|7|19|62|
|8|35|63|
|9|36|72|
|10|28|64|
|Promedio| 33.1 |69.4 |

En vista de los tiempos de hardware y software podemos notar que el hardware renderiza la imagen en el 47.7% del tiempo que le toma al software generar el div.

# Mosaico
Para realizar la comparativa entre hardware y software lo primero que hicimos fue hacer un codigo que hiciera el mismo mosaico pero con la version de software, en este caso utilizamos el mosaico de la imagen pequeña:

## Software
> :P5 sketch=/docs/sketches/imaging-hardware/foto-mosaico/software.js, width=512, height=512

## Hardware
> :P5 sketch=/docs/sketches/imaging-hardware/foto-mosaico/software.js, width=512, height=512

Una vez realizado el mosaico en los dos modos, procedimos a tomar los tiempos que van a ser utilizados para estimar la diferencia en el rendimiento, para esto hicimos uso del reloj de la computadora y tomamos la diferencias de tiempo desde el principio del llamado a la funcion draw() al final del llamado de esta funcion, realizamos este proceso 10 veces como se puede observar en la siguiente tabla:

|Indice| hardware(ms) | software(ms) |
|:---|:----:| :---:|
|1|19|35|
|2|22|39|
|3|22|35|
|4|21|35|
|5|22|36|
|6|24|36|
|7|20|33|
|8|17|31|
|9|22|37|
|10|28|31|
|Promedio| 22 |34.8 |

Como podemos observar a la version realizada en harware se renderiza la imagen en mucho menos tiempo, es decir en promedio la version de software se mas de un 50% que la version de hardware