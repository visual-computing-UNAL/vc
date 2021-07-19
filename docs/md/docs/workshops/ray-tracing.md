# Ray Tracing

## I. RESUMEN

## II. INTRODUCCIÓN

El ray tracing es una técnica de renderizado para generar un imagen a través del  rastreo de un camino de luz como píxeles en un plano de imagen y simulando los efectos de sus encuentros con objetos virtuales, esta técnica es capaz de producir un alto grado de realismo visual, mayor que los métodos de renderización de línea de exploración, pero a cambio de un gran costo computacional. Por esta razón el raytracing generalmente se ha utilizado para aplicaciones donde se puede tomar mucho tiempo para renderizar, como por ejemplo imágenes generadas por computadora, efectos visuales (VFX) de peliculas y television, pero se suele utilizar muy poco en aplicaciones de ejecución en tiempo real como pueden ser  los videojuegos, donde la velocidad de renderización de cada frame es importante.

<div style="text-align:center">
<img src="https://upload.wikimedia.org/wikipedia/commons/3/32/Recursive_raytrace_of_a_sphere.png"
     alt="Markdown Monster icon"
     style="width: 300px;margin-bottom: 20px"
     />
</div>
Vale la pena mencionar que en los últimos años, la aceleración por hardware para en tiempo real para el raytracing se ha convertido en un estándar en las nuevas tarjetas gráficas, algo que también ha pasado en los apis de gráficos, lo que le ha permitido a los desarrolladores agregar técnicas ray tracing en tiempo real  los videojuegos y otros medios de renderizado con un impacto menor en el tiempo que consumen, aunque aún sigue siendo un tiempo considerable en la generación del frame.
<div style="text-align:center">
<img src="https://i.ytimg.com/vi/AdTxrggo8e8/maxresdefault.jpg"
     alt="Markdown Monster icon"
     style="width: 800px;margin-bottom: 20px"
     />
</div>

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

### Versión simplificada de lo que pasa en la naturaleza
En la naturaleza, la luz emite un rayo de luz el cual viaja eventualmente a una superficie que interrumpe su progreso. Uno puede pensar en ese rayo como un flujo de protones viajando a lo largo del mismo camino. En un vacío perfecto este rayo sería una línea recta, a este rayo le pueden suceder cuatro cosas: absorción, reflexión, refracción y fluorescencia. Una superficie puede absorber parte del rayo de luz, resultando en una pérdida de intensidad de la luz reflejada o refractada. Este puede también reflejar toda o parte del rayo de luz, en una o más direcciones. Si la superficie tiene transparente o translúcida, puede refractarse una porción de luz en sí mismo en una dirección diferente mientras absorbe una parte (o toda) del espectro,provocando probablemente una alteración en el color.

Algo menos común es cuando una superficie puede absorber alguna porción de la luz y volver a emitir la luz de forma fluorescente en un color de longitud de onda más larga en una dirección aleatoria, aunque esto es lo suficientemente raro como para que se puede descartar de la mayoría de las aplicaciones de rendering. Entre la absorción, la reflexión, la refracción y la fluorescencia, toda la luz entrante se tiene que tener en cuenta, y no más. Es decir por ejemplo en una superficie no se puede por ejemplo reflejar el 70% de una luz entrante, y reflejar el 60% porque el total estaría en 130%. A partir de ahí los rayos reflejados y/o refractados pueden continuar incidiendo en otras superficies, donde sus propiedades, refractivas, absorbentes y fluorescentes pueden afectar nuevamente el progreso de los rayos entrantes. Algunos de estos rayos viajan y terminan impactando en nuestros ojos, haciéndonos ver la escena y también contribuyendo a la imagen final renderizada.

### Algoritmo de ray casting
La idea detrás del ray casting, el predecesor del ray tracing recursivo, es trazar rayos desde el ojo, uno por pixel, y encontrar el objeto más cercano bloqueando el camino de ese rayo, se puede pensar en la imagen como una puerta de pantalla, en la que cada cuadro de la pantalla es un pixel. Este es el objeto que el ojo ve a través de ese pixel. Usando propiedades de los materiales y el efecto de las luces de la escena, este algoritmo puede determinar el sombreado de este objeto. Se hacen varias suposiciones, una de ellas es que si una superficie se enfrenta a una luz, la luz llegará a esta superficie y no quedará bloqueada ni en sombra. 

<div style="text-align:center">
<img src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Idealized_universal_joint_generated_by_ray_tracing.jpg"
     alt="Markdown Monster icon"
     style="width: 400px;margin-bottom: 20px"
     />
</div>

### Algoritmo de ray tracing recursivo
Los primeros algoritmos trazaban rayos desde el a través de la escena hasta que ellos golpeaban un objeto, pero determinaban el color del rayo sin trazar recursivamente más rayos. El raytracing recursivo continúa el proceso. Cuando un rayo golpea una superficie, rayos adicionales pueden ser emitidos a causa de la reflexión, refracción, y la sombra. 

- Un rayo de reflexión es trazado a través de la dirección de reflejo del espejo. El objeto más cercano que intersecta es el que se verá en el reflejo.

- Un rayo de sombra se traza hacia cada luz. Si se encuentra algún objeto opaco entre la superficie y la luz, la superficie está en sombra y la luz no la ilumina.

- Un rayo refractado viaja a través de un material transparente funciona de manera similar a la reflexión, con la diferencia de que el rayo refractado puede entrar o salir del material.
<div style="text-align:center">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Glasses_800_edit.png/1600px-Glasses_800_edit.png"
     alt="Markdown Monster icon"
     style="width: 600px;margin-bottom: 20px"
     />
</div>

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

> :Formula
>
> E\in \mathbb{R}^{3} \quad posición \ ojo
>
> T\in \mathbb{R}^{3} \quad posición \ objetivo
>
> \Theta \in [0,\pi ] \quad Campo \ de \ vision \ de \ los \ humanos, \ se  \ asume \approx \pi / 2 rad = 90^{\circ} 
>
> m, k \in \mathbb{N} \quad número \ de \ píxeles \ cuadrados \ en \ la \ dirección \ de \ la \ ventana
>
> i,j \in \mathbb{N}, 1\leq i\leq k \wedge 1\leqslant j\leqslant m \quad numeros \ de \ actuales \ pixeles
>
> \tilde{v}\in \mathbb{R}^{3} \quad vector \ vertical \ que \ indica \ dónde \ está \ arriba \ y \ abajo
>
>

<div style="text-align:center">
 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/RaysViewportSchema.png/638px-RaysViewportSchema.png"
     alt="Markdown Monster icon"
     style="width: 500px;margin-bottom: 20px"
     />
</div>

La idea es encontrar la posición de cada centro de píxeles de la ventana gráfica Pij lo que nos permite encontrar la línea que va desde el ojo <strong>E</strong> a través de ese píxel y finalmente obtener el rayo descrito por el punto <strong>E</strong> y el vector <strong>Rij = Pij - E</strong> ( o su normalizacion <strong>rij</strong>)

Cálculos previos: busquemos y normalicemos el vector <strong>t</strong> y y los vectores <strong>b,v</strong> que son paralelas a la ventana gráfica (todas representadas en la imagen de arriba)

> :Formula
>
> {\displaystyle {\vec {t}}=T-E,\qquad  {\vec {b}}={\vec {v}}\times {\vec {t}}}
>
>{\displaystyle {\vec {t_{n}}}={\frac {\vec {t}}{||{\vec {t}}||}},\qquad {\vec {b_{n}}}={\frac {\vec {b}}{||{\vec {b}}||}},\qquad {\vec {v_{n}}} ={\vec {t_{n}}}\times {\vec {b_{n}}}}

Hay que tener en cuenta que el centro de la ventana gráfica  <strong>C = E + tn*d</strong>, luego se calculan los tamaños del viewport  <strong>hx, hy</strong>


> :Formula
>
> {\displaystyle g_{x}={\frac {h_{x}}{2}}=d\tan {\frac {\theta }{2}}, \qquad g_{y}={\frac {h_{y}}{2}}=g_{x}{\frac {m-1}{k-1}}}

Y luego se calculan los vectores de desplazamiento del siguiente píxel <strong>qx</strong> y <strong>qy</strong> a lo largo de las direcciones paralelas al viewport (<strong>b,v</strong>), y el centro de píxeles de la parte inferior izquierda <strong>p1m</strong>

> :Formula
>
> {\displaystyle {\vec {c}}={\frac {2g_{x}}{k-1}}{\vec {b_{n}}},\qquad {\vec {q_{y}}}={\frac {2g_{y}}{m-1}}{\vec {v_{n}}}, \qquad {\vec {p_{1m}}}={\vec {t_{n}}}d-g_{x}{\vec {b_{n}}}-{g_{y}}{\vec {v}}_{n}}

Para los calculos finales se tiene que tener en cuenta que <strong>Pij = E + pij</strong>, y <strong>Rij = Pij - E</strong>

> :Formula
>
> {\displaystyle {\vec {p_{ij}}}={\vec {p_{1m}}}+{\vec {q_{x}}}(i-1)+{\vec {q}}_{y}(j-1)} 
>
>{\displaystyle {\vec {r_{ij}}}={\frac {{\vec {R_{ij}}}}{||{\vec {R_{ij}}}||}}={\frac {{\vec {p_{ij}}}}{||{\vec {p}}_{ij}||}}}

# VI. PROGRAMMABLE GRAPHICS HARDWARE

<div style="text-align:center">
<img src="https://i.gyazo.com/d12dd5016bf312b1423cc361e3e06b72.png"
     alt="Markdown Monster icon"
     style="width: 200px;margin-bottom: 20px"
     />
</div>

## El flujo actual de gráficos programables:
Actualmente chips como el NVIDIA GeForce3 y el ATI Radeon 8500 reemplazan el vértice de función fija y las etapas de fragmentación con las etapas programables. Estos vectores programables y motores de fragmentos ejecutan programas definidos por el usuario y permiten un buen control sobre los cálculos de shading y texturizado. Un programa de vértice Nvidia consiste de 128 y 4-way SIMD de instrucciones de punto flotante.
El programa de vertices corre en cada vértice que entra y los resultados computados son pasados a la etapa de rasterización, la etapa de fragmentación es también programable, desde un combinador de registros Nvidia o desde un Pixel shader DirectX 8. Los pixel shaders como los programas de vértices proveen un set de instrucción 4-way SIMD para texturizados pero no operan sobre valores punto fijo como los programas de vértices. 

El shading programable posee algunas limitaciones:
- Programas de vértices y fragmentos poseen sets de instrucciones simples e incompletas. 
- Los tipos de datos de programas de fragmentos son mayoritariamente puntos fijos, las texturas de entradas y tienen como salida colores framebuffers de 8-bits típicamente por cada color de componente. Los valores intermedios en registros tienen valores levemente más precisos. 	
- Hay muchas limitaciones en términos de recursos, los programas poseen un límite de instrucciones y un pequeño número de registros. Cada etapa tiene un número limitado de entradas y salidas.
- El número de texturas activas y dependientes es limitado. El hardware actual permite ciertas instrucciones para la computación de ciertas direcciones de texturas solo dentro de ciertos puntos del programa.
- Solamente un unico valor de color puede ser escrito al framebuffer en cada pasada. 
- Los programas no pueden repetirse y no hay instrucciones de ramificación condicional. 

## El flujo propuesto de gráficos programables a un término cercano:
Las limitantes actuales del hardware hacen difícil la tarea de implementar ray-tracing en un programa de fragmentos. Gracias al interés en shading programable para juegos, el flujo de gráficos programables ha evolucionado y circulan diferentes propuestas para la futura aproximación;
- Arquitectura multi paso:
    Admite lecturas de texturas arbitrarias, formatos de textura de punto flotante y framebuffer, instrucciones generales de punto flotante y dos salidas de 4 vectores de punto flotante. La ramificación se implementa a través de la representación multipass.
- Arquitectura de ramificación.
    Arquitectura multipass mejorada para incluir soporte para instrucciones de bifurcación condicional para bucles y flujo de control.


## VII. Kernel de Shading 

El kernel de shading se puede utilizar en el Ray Tracing para evalúar el color de contribución de un rayo en un punto de choque. Los cálculos de shading son exactamente como los de la canalización de gráficos estándar. La información de shading es almacenada en memoria como información de triángulos, un set de tres texturas RGB con 32-bits por canal, contienen los normales y colores del vértice para cada triángulo. La información del choque que es pasada al shader incluye el número de triángulos, a esta información de shading se accede por una búsqueda de textura dependiendo única para el triángulo en particular. 
Al elegir los diferentes rayos de shading, podemos implementar muchísimas variantes de ray tracing usando algoritmos de streaming.  
El kernel de shading opcionalmente genera sombra, reflejo, refracción o generación aleatoria de rayos, estos rayos secundarios son dispuestos en ubicaciones de texturas para próximas pasadas de renderización. A cada rayo se le asigna un peso para cuando es finalmente procesado, su contribución al final de la imagen sea añadido dentro de la imagen, lo anterior con el fin de eliminar recursión y simplificar el flujo de control. 

### Ray Caster
Genera imágenes que son idénticas a las generadas fuentes de información gráfica estándar. Para cada pixel sobre la pantalla un rayo ocular es generado, este rayo es disparado dentro de la escena y devuelve el color del triángulo más cercano que es chocado. Ningún rayo secundario es generado, incluyendo los rayos sin sombra.

###  Whitted Ray Tracer
El trazador clásico de estilo blanqueado genera rayos oculares que los envían desde afuera hacia la escena, al encontrar un choque, el modelo de reflexión para la superficie es evaluado y después un par de rayos de reflexión y refracción, además de un set de rayos sombreados, uno por fuente de luz son generados hacia la escena.
    
###  Path Tracer
Los rayos son aleatoriamente dispersos desde superficies hasta que golpean una fuente de luz.

### Shadow Caster
Usa fuentes de información gráfica estándar para en la primera pasada llevar a cabo cálculos de superficie ocultos y luego usa el algoritmo de raytracing para evaluar sombras. Esta técnica es útil como un reemplazo para los mapas de sombras y de volúmenes. 
<div style="text-align:center">
<img src="https://i.gyazo.com/6db34c558845eac4ed55ae3dbc34dfe2.png"
     alt="Markdown Monster icon"
     style="width: 700px;margin-bottom: 20px"
     />
</div>

Diagramas de flujo de datos para los algoritmos de trazado de rayos. 
Los algoritmos representados son (a) proyección de sombras, (b) proyección de rayos,
(c) Trazado de rayos blanqueados y (d) Trazado de trayectorias. Para el trazado de rayos, cada intersección de la superficie del rayo genera L + 2 rayos, donde L es el número de
luces en una escena, correspondientes al número de rayos de sombra que se van a probar, y los otros dos son rayos de reflexión y refracción. Seguimiento de ruta
elige aleatoriamente un rebote de rayo para seguir y la ruta de retroalimentación tiene solo un rayo de ancho.


## VIII. POSIBLE IMPLEMENTACIÓN

Una imagen rasterizada está hecha de píxeles. Una forma de producir una imagen de una escena 3D es "deslizar" de alguna manera esta imagen ráster a lo largo del plano de la imagen de nuestra cámara virtual y disparar rayos a través de cada píxel de la imagen, para encontrar qué parte de la escena cubre cada píxel. La forma en que lo hacemos es simplemente proyectando un rayo que se origina en la posición de la cámara y pasa por el centro de cada píxel. Luego encontramos con que objetos de la escena se cruzan los rayos. Si un pixel "ve" algo, seguramente ve el objeto que está justo frente a él en la dirección señalada por ese rayo. La dirección del rayo, como acabamos de mencionar, se puede construir simplemente trazando una línea desde el origen de la cámara hasta el centro del píxel y luego extendiendo esa línea en la escena.

Ahora que sabemos lo que ve un pixel, todo lo que tenemos que hacer es repetir este proceso para cada píxel de la imagen. Al configurar el color del píxel con el color del objeto en el que se cruza cada rayo que pasa por el centro de cada píxel, podemos formar una imagen de la escena vista desde un punto de vista particular. Hay que tener en cuenta que este método requiere recorrer todos los píxeles de la imagen y proyectar un rayo en la escena para cada uno de estos píxeles. El segundo paso, el paso de intersección, requiere recorrer todos los objetos en la escena para probar si un rayo se cruza con alguno de estos objetos. Aquí hay una implementación de esta técnica en pseudocódigo:

<div style="text-align:center">
<img src="https://i.gyazo.com/1131847a861bbdb839c9e90aa946da53.png"
     alt="Markdown Monster icon"
     style="width: 100hv;margin-bottom: 1s0px"
     />
</div>

Se suele decir que el trazado de rayos es mejor que la rasterización para el sombreado, pero la mayoría de los libros de texto no explican por qué. Gran parte en el renderizado se trata de calcular la visibilidad entre un punto en el espacio y la primera superficie visible en una dirección determinada, o la visibilidad entre dos puntos. El primero se usa para resolver el problema de visibilidad, el segundo para resolver cosas como el sombreado. La rasterización (combinada con el algoritmo de búfer de profundidad) es muy buena para encontrar la primera superficie visible, pero es ineficaz para resolver la visibilidad entre dos puntos. El trazado de rayos en el otro extremo puede manejar ambos casos de manera eficiente. Encontrar la primera superficie visible es útil para resolver el problema de visibilidad. Por lo tanto, tanto el trazado de rayos como la rasterización hacen un buen trabajo en eso. El sombreado, por otro lado, requiere resolver la visibilidad entre superficies. Se utiliza para calcular sombras, sombras suaves cuando se utilizan luces de área y, en general, efectos de iluminación global como reflexión, refracción, reflejos indirectos y difusa indirecta. Para esta parte particular del proceso de renderizado, el trazado de rayos es más eficiente que la rasterización. Pero tenga en cuenta que cualquier técnica que calcule la visibilidad entre puntos puede usarse para sombrear y resolver el problema de visibilidad. No tiene que ser ni trazado de rayos ni rasterización, pero el trazado de rayos es de alguna manera la forma perezosa de hacerlo, aunque tiene un precio, el costo computacional.

El trazado de rayos suena como un método mucho mejor que la rasterización cuando se mira de esa manera, aunque el problema principal con el trazado de rayos es que implica calcular la intersección de rayos con geometría, que es una operación costosa. En las aplicaciones de gráficos en tiempo real, la velocidad es más importante que el realismo fotográfico, razón por la cual las GPU utilizan la rasterización. Cuando el fotorrealismo es más importante que la velocidad, el trazado de rayos es una opción mucho mejor, aunque es más difícil producir imágenes con trazado de rayos a velocidades de cuadro interactivas y menos aún a velocidades de cuadro en tiempo real.
En resumen, el uso del trazado de rayos para calcular imágenes fotorrealistas de objetos 3D se puede descomponer esencialmente en tres pasos:

* **Proyección de rayos:** proyecta un rayo para cada píxel de la imagen.
* **Intersección Ray-Geometría:** prueba si un rayo se cruza con alguno de los objetos en la escena (esto requiere hacer un bucle sobre todos los objetos para cada rayo emitido).
* **Sombreado:** averigua cómo se ve el punto de intersección entre el rayo y el objeto (si se ha producido una intersección).

## IX. APLICACIONES EN LA VIDA REAL

El ray tracing produce resultados bastante vistosos pero cuya utilidad práctica no es del todo obvia. A continuación hablaremos de algunas de las aplicaciones prácticas del mismo:

### Arquitectura

El lenguaje de descripción de escenas es sencillo y es fácil generar escenas automáticamente, haciendo uso de un programa que calcule las posiciones de los elementos de la obra o incluso importar escenas ya existentes a partir de formatos usados por programas de diseño populares como AutoCAD. Esto permite la creación de escenas que permitan previsualizar diseños de ingeniería o arquitectónicos con un acercamiento fidedigno del aspecto que tendrá un proyecto terminado, más aún cuando es importante que el resultado sea vistoso y de alta calidad. 

<div style="text-align:center">
<img src="https://i.gyazo.com/04379d3eb14f8989ab80a1a5f68a7da1.png"
     alt="Markdown Monster icon"
     style="width: 100hv;margin-bottom: 1s0px"
     />
</div>
<div style="text-align:center">
Caso práctico, comparación de dos tipos de acabados de características diversas.
</div>

Es extremadamente difícil producir efectos de iluminación realistas utilizando los métodos de renderizado tradicionales. Incluso muchos programas de diseño asistido por computadora (CAD) que modelan objetos con precisión no pueden modelar la luz.

Algunos programas de modelado incluso permiten a los arquitectos introducir luz en una imagen, especificando la ubicación, orientación, color y distribución de la luz. Estas características ayudan a los diseñadores a crear efectos como sombras y reflejos especulares, sin embargo, aún no logran modelar la realidad física de que los objetos interactúan con la luz. Para modelar con precisión el verdadero comportamiento de la luz en un entorno dado, debemos considerar toda la luz en ese entorno y reconocer que la luz real se refleja, refracta, difunde y absorbe.

Los arquitectos están interesados ​​principalmente en crear imágenes visualmente realistas. El trazado de rayos, combinado con técnicas de radiosidad, es a menudo el método más útil para el renderizado arquitectónico. Debido a que el modelado de la luz es tan esencial para el campo, el desarrollo de programas que incorporan el trazado de rayos ha sido un sueño hecho realidad para muchos arquitectos. La tecnología de iluminación global está logrando dar vida al diseño arquitectónico.

<div style="text-align:center">
<img src="https://cdn2.unrealengine.com/Unreal+Engine%2Ftech-blog%2Freal-time-ray-tracing-in-unreal-engine---part-2-architectural-visualization%2FNews_RayTracing_AEC_feature_image-1920x960-d09dd3f962953649881eff65d7809fbfc9aabeb0.jpg"
     alt="Markdown Monster icon"
     style="width: 100hv;margin-bottom: 1s0px"
     />
</div>

### Diseño de luz en teatro y televisión

Debido a que el trazado de rayos permite un modelado visualmente realista de la luz, la tecnología se puede aplicar de manera útil en las áreas de iluminación de teatro y televisión. Sin la capacidad de modelar imágenes físicamente correctas, las configuraciones de iluminación del escenario pueden requerir cantidades extremas de esfuerzo. Muchas producciones teatrales y televisivas requieren cientos de luces individuales que deben posicionarse, orientarse y filtrarse. También es necesario que las luces se cambien, redirijan y atenúen mientras una producción está en curso. El trazado de rayos permite a los diseñadores de escenarios e iluminación, actores y directores desarrollar y visualizar configuraciones de iluminación complejas meses antes de que se abra una producción.

<div style="text-align:center">
<img src="https://cdn2.unrealengine.com/Unreal+Engine%2Ftech-blog%2Freal-time-ray-tracing-in-unreal-engine---part-2-architectural-visualization%2FNews_RayTracing_AEC_blog_body_SJB_img-1640x1000-52c0874cd0012adbc3827d097668b1f962281ff7.jpg"
     alt="Markdown Monster icon"
     style="width: 100hv;margin-bottom: 1s0px"
     />
</div>

### Herramienta para ingenieros

El trazado de rayos es capaz de considerar toda la luz en un entorno determinado (denominado iluminación global). La iluminación global es un modelo físicamente correcto, que simula con precisión el comportamiento de la luz en un entorno físico real. Esto demuestra ser extremadamente útil para diseñadores de iluminación, investigadores de energía solar e ingenieros mecánicos. Pueden utilizar el trazado de rayos para hacer mucho más que renderizar imágenes fotorrealistas. Los ingenieros utilizan la tecnología para predecir los niveles de iluminación, los gradientes de luminancia y los criterios de rendimiento visual. La iluminación global es una valiosa herramienta de ingeniería ya que nos permite analizar cuantitativamente la distribución y direccionalidad de la luz e investigar la transferencia de calor radiante. Esto nos está ayudando a progresar en todo, desde la iluminación y la calefacción de habitaciones de manera más eficiente, hasta la creación de concentradores de energía solar para aplicaciones aeroespaciales.

### Animación

El trazado de rayos se puede utilizar para agregar efectos "sofisticados", como el reflejo y el sombreado, que a menudo son difíciles de producir y requieren mucho tiempo para los artistas tradicionales. La tecnología gráfica también es capaz de generar imágenes fotorrealistas que serían casi imposibles de producir sin el trazado de rayos computarizado.

Los ejemplos de gráficos por computadora y trazado de rayos en la animación moderna incluyen la reflexión avanzada, el sombreado y la especularidad.

<div style="text-align:center">
<img src="https://cdn.vox-cdn.com/thumbor/qHmvoA9FfZO16XkHoIrknaK6OLk=/55x0:964x606/920x613/filters:focal(55x0:964x606):format(webp)/cdn.vox-cdn.com/assets/2820241/monstersuseaurchin.jpg"
     alt="Markdown Monster icon"
     style="width: 100hv;margin-bottom: 1s0px"
     />
</div>
<div style="text-align:center">
Escena de “Monsters University” primera película de Pixar donde usaron Ray Tracing
</div>

### Videojuegos

El Ray Tracing en películas animadas es popular y suficiente porque no requiere de ser renderizado en tiempo real como lo es un videojuego. Estas se renderizan de manera independiente para formar un archivo multimedia que es reproducible en cualquier pantalla. Por otro lado, los videojuegos dependen de los componentes de una computadora en donde se estén usando, por eso su introducción al gaming es importante.

<div style="text-align:center">
<img src="https://www.pchardwarepro.com/wp-content/uploads/2019/03/ray_tracing.jpg"
     alt="Markdown Monster icon"
     style="width: 100hv;margin-bottom: 1s0px"
     />
</div>
	
En la vida real las ondas formadas por innumerables pequeños fotones salen disparadas de una fuente de luz, rebotan a través de una variedad de superficies y luego te golpean directamente en los globos oculares. Luego, su cerebro interpreta todos estos diferentes rayos de luz como una imagen completa

<div style="text-align:center">
<img src="https://thetechrevolutionist.com/wp-content/uploads/2020/10/screen1.jpg"
     alt="Markdown Monster icon"
     style="width: 100hv;margin-bottom: 1s0px"
     />
</div>

El trazado de rayos funciona casi de la misma manera, excepto que todo generalmente se mueve en la dirección opuesta. Dentro del software, la luz trazada por rayos comienza en el espectador (desde la lente de la cámara) y se mueve hacia afuera, trazando un camino que rebota a través de múltiples objetos, a veces incluso adquiriendo su color y propiedades reflectantes, hasta que el software determina la luz adecuada dependiendo de las fuentes que afectarían a ese rayo en particular. Esta técnica de simulación de la visión hacia atrás es mucho más eficiente para que la maneje una computadora que tratar de rastrear los rayos de la fuente de luz. Después de todo, los únicos caminos de luz que deben renderizarse son los que encajan en el campo de visión del usuario. Se necesita mucha menos potencia de cálculo para mostrar lo que está frente a usted que para representar los rayos emitidos por todas las fuentes de luz en una escena.

<div style="text-align:center">
<img src="https://www.masgamers.com/wp-content/uploads/2020/09/minecraftsdfds.jpg"
     alt="Markdown Monster icon"
     style="width: 100hv;margin-bottom: 1s0px"
     />
</div>

## X. REFERENCIAS


