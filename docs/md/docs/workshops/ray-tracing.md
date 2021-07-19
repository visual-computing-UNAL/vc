# Ray Tracing

## I. RESUMEN

## II. INTRODUCCIÓN

El ray tracing es una técnica de renderizado para generar un imagen a través del  rastreo de un camino de luz como píxeles en un plano de imagen y simulando los efectos de sus encuentros con objetos virtuales, esta técnica es capaz de producir un alto grado de realismo visual, mayor que los métodos de renderización de línea de exploración, pero a cambio de un gran costo computacional. Por esta razón el raytracing generalmente se ha utilizado para aplicaciones donde se puede tomar mucho tiempo para renderizar, como por ejemplo imágenes generadas por computadora, efectos visuales (VFX) de peliculas y television, pero se suele utilizar muy poco en aplicaciones de ejecución en tiempo real como pueden ser  los videojuegos, donde la velocidad de renderización de cada frame es importante.

<div style="text-align:center">
<img src="https://upload.wikimedia.org/wikipedia/commons/3/32/Recursive_raytrace_of_a_sphere.png"
     alt="Markdown Monster icon"
     style="width: 300px;margin-bottom: 20px"
     />
     <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/Recursive_raytrace_of_a_sphere.png"
     alt="Markdown Monster icon"
     style="width: 300px;margin-bottom: 20px"
     />
</div>
Vale la pena mencionar que en los últimos años, la aceleración por hardware para en tiempo real para el raytracing se ha convertido en un estándar en las nuevas tarjetas gráficas, algo que también ha pasado en los apis de gráficos, lo que le ha permitido a los desarrolladores agregar técnicas ray tracing en tiempo real  los videojuegos y otros medios de renderizado con un impacto menor en el tiempo que consumen, aunque aún sigue siendo un tiempo considerable en la generación del frame.

## III. HISTORIA

La idea del Ray Tracing se remonta al siglo XVI cuando fue descrito por Alberto Durero, a quien se le atribuye su invención. En “Four Books on Measurement”, describió un aparato llamado puerta de Durero que usa un hilo sujeto al extremo de un lápiz que un asistente mueve a lo largo de los contornos del objeto a dibujar. El hilo pasa a través del marco de la puerta y luego a través de un gancho en la pared. El hilo forma un rayo y el gancho actúa como el centro de proyección y corresponde a la posición de la cámara en el trazado de rayos.  

<div style="text-align:center">
<img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/D%C3%BCrer_-_Man_Drawing_a_Lute.jpg"
     alt="Markdown Monster icon"
     style="width: 500px;margin-bottom: 1s0px"
     />
</div>

Los primeros sistemas de  Ray Tracing estaban basados en lotes (tarjetas perforadas de computadora o cinta) que se ejecutaban en computadoras relativamente lentas con memoria central. Ahora, las GPU (unidades de procesamiento de gráficos) admiten el trazado de rayos para un mayor realismo en los juegos de computadora en 3D de ritmo rápido.

Goldstein y Nagel de MAGI (Mathematics Applications Group, Inc.) intentaron por primera vez usar una computadora para el trazado de rayos para generar imágenes sombreadas. En el artículo de Goldsein y Nagel, “Simulación visual 3-D”, el trazado de rayos se usa para hacer imágenes sombreadas de sólidos simulando el proceso fotográfico al revés.. Ampliando aún más este método, MAGI desarrolló un sistema CAD / CAM comercial llamado SynthaVision que creaba imágenes sombreadas y dibujos de líneas, calculaba las propiedades de masa y verificaba la no interferencia en las operaciones de mecanizado N / C. Desafortunadamente, debido a la potencia de procesamiento de la computadora en ese momento, era un sistema por lotes costoso. MAGI produjo un video de animación llamado MAGI / SynthaVision Sampler en 1974. 

En 1976, Scott Roth creó una animación de libro animado en el curso de gráficos por computadora de Bob Sproull en Caltech utilizando el trazado de rayos con un modelo simple de cámara estenopeica. Las páginas escaneadas se muestran como un video a la derecha. El programa de computadora de Roth notó un punto de borde en la ubicación de un píxel si el rayo se cruzaba con un plano delimitado diferente al de sus vecinos. Por supuesto, un rayo podría intersecar varios planos en el espacio, pero solo se observó cómo visible el punto de la superficie más cercano a la cámara. Roth acuñó el término ""ray casting" antes de escuchar "ray tracing", sin embargo, ambos términos describen el mismo concepto. Para cada píxel de la imagen, se proyecta un rayo en la escena, se identifica la superficie visible, se calcula la superficie normal en el punto visible y se calcula la intensidad de la luz visible. Para modelar sombras, transparencias y especularidad general (por ejemplo, espejos) , se proyectan rayos adicionales.

> :P5 sketch=/docs/sketches/ray-tracing/gif.js, width=640, height=470

## IV. DESCRIPCIÓN DETALLADA DEL ALGORITMO DEL RAY TRACING

## V. MATEMÁTICA APLICADA

El trazado de rayos ópticos (Ray tracing) describe un método para producir imágenes visuales construidas en entornos de gráficos por computadora en 3D, con más fotorrealismo que las técnicas de proyección de rayos o de reproducción de líneas de exploración. Funciona trazando un camino desde un ojo imaginario a través de cada píxel en una pantalla virtual y calculando el color del objeto visible a través de él.

Las escenas en el trazado de rayos son descritas matemáticamente por un programador o por un artista visual (normalmente utilizando herramientas intermedias). Las escenas también pueden incorporar datos de imágenes y modelos capturados por medios como la fotografía digital.

Por lo general, cada rayo debe probarse para la intersección con algún subconjunto de todos los objetos de la escena. Una vez que se ha identificado el objeto más cercano, el algoritmo estimará la luz entrante en el punto de intersección, examinará las propiedades del material del objeto y combinará esta información para calcular el color final del píxel. Ciertos algoritmos de iluminación y materiales reflectantes o translúcidos pueden requerir que se vuelvan a proyectar más rayos en la escena. Al principio puede parecer contradictorio o "hacia atrás" enviar rayos lejos de la cámara, en lugar de dentro de ella (como lo hace la luz real en la realidad), pero hacerlo es mucho más eficiente en muchos órdenes de magnitud. Dado que la inmensa mayoría de los rayos de luz de una fuente de luz determinada no llegan directamente al ojo del espectador, una simulación "hacia adelante" podría desperdiciar una enorme cantidad de cálculos en trayectorias de luz que nunca se registran.

Por lo tanto, el atajo tomado en el trazado de rayos es presuponer que un rayo dado interseca el marco de la vista. Después de un número máximo de reflejos o de que un rayo viaje una cierta distancia sin intersección, el rayo deja de viajar y se actualiza el valor del píxel.

<div style="text-align:center">
 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Ray_trace_diagram.svg/300px-Ray_trace_diagram.svg.png"
     alt="Markdown Monster icon"
     style="width: 400px;margin-bottom: 20px"
     />
</div>

### Calcular rayos para un viewport rectangular:

Como inputs para este cálculo se tienen:

> :Formula align=center
>
> E\in \mathbb{R}^{3} \quad posicion \ ojo
>
> T\in \mathbb{R}^{3} \quad posicion \ objetivo

## VI. PROGRAMMABLE GRAPHICS HARDWARE

## VII. RAY TRACING KERNELS

## VIII. POSIBLE IMPLEMENTACIÓN

## IX. APLICACIONES EN LA VIDA REAL

## X. REFERENCIAS

<hr/>

> [1](/docs/workshops/rendering/1)
> [2](/docs/workshops/rendering/2)
> [3](/docs/workshops/rendering/3)
> [4](/docs/workshops/rendering/4)
> [5](/docs/workshops/rendering/5)
> [6](/docs/workshops/rendering/6)
> [7](/docs/workshops/rendering/7)
> [8](/docs/workshops/rendering/8)
> [9](/docs/workshops/rendering/9)