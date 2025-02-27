# Ray Tracing

## I. INTRODUCCIÓN

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

## II. HISTORIA

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

## III. DESCRIPCIÓN DETALLADA DEL ALGORITMO DEL RAY TRACING

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

## IV. MATEMÁTICA APLICADA

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

## V. Formas de  optimizar el RAY TRACING

En esta sección se van a hablar brevemente de dos algoritmos descritos en artículos científicos para poder optimizar el rendimiento del raytracing.

### 1 - Ray Tracing with Rope Trees

#### Autores
Vlastimil Havran, Jirí Bittner, Jirí Zára 

#### Abstract
In this paper an acceleration method for finding the nearest ray–object intersection for ray tracing
purposes is presented. We use the concept of BSP trees enriched by rope trees. These are used to
accelerate the traversal of the BSP tree. We give a comparison of experimental results between the
technique based on BSP tree and uniform spatial subdivision

#### Introducción
El Ray Tracing es una técnica de renderización bien conocida para producir imágenes realistas que simulan bien los espectros
superficies. El principal inconveniente de este algoritmo es su complejidad computacional bastante grande, que no permite
su uso interactivo. El problema se ha centrado en una gran cantidad de interés de investigación en el pasado que ha llevado a
algunas técnicas prácticas para acelerar el algoritmo básico.

El enfoque presentado en este documento se centra en mejorar la complejidad de casos promedio de la proyección de rayos.
En particular, es adecuado para escenas que contienen una gran cantidad de objetos. Explota la idea de espacio
subdivisión, que sirve para determinar una parte de la escena atravesada por un rayo de manera eficiente.

#### Subdivisión espacial uniforme
Una subdivisión espacial uniforme (a menudo denominada cuadrícula) es uno de los primeros métodos desarrollados para la subdivisión espacial. Implica la subdivisión del espacio de la escena en celdas elementales de igual tamaño, independientemente de la
distribución de objetos en la escena. La cuadrícula tridimensional se asemeja a la subdivisión de una cuadrícula bidimensional.
pantalla en píxeles. A cada celda se le asigna una lista de objetos que la cruzan.

<div style="text-align:center">
<img src="https://i.gyazo.com/c0683367072d17c9b6f4e4fa7cf0841b.png"
     alt="Markdown Monster icon"
     style="width: 100hv;margin-bottom: 1s0px"
     />
</div>

#### Árbol de partición de espacio binario
Un árbol de partición de espacio binario (BSP) es análogo al árbol de búsqueda binaria. El árbol BSP representa una escena que contiene un conjunto de objetos jerárquicamente. El BSP se forma subdividiendo recursivamente el espacio de la escena en dos partes. Cada nodo interior contiene un plano de división. Todos los nodos del árbol BSP corresponden a células poliédricas convexas. En cada hoja del árbol BSP se almacena una lista de objetos que se cruzan con la celda correspondiente.

<div style="text-align:center">
<img src="https://i.gyazo.com/11184129252da8d4e12db574d89268d0.png"
     alt="Markdown Monster icon"
     style="width: 100hv;margin-bottom: 1s0px"
     />
</div>


#### Optimización estadística de un árbol BSP
El tiempo necesario para la construcción de un árbol BSP suele ser insignificante en comparación con el cálculo
tiempo dedicado a atravesar el árbol para determinar las intersecciones entre el rayo y el objeto. Por tanto, es ventajoso dedicar un
mayor esfuerzo para crear un árbol eficiente, bajo el supuesto de que el tiempo extra se recuperaría
durante el recorrido.

<div style="text-align:center">
<img src="https://i.gyazo.com/22a4974bf86ac1fc675d7ac59ae3a487.png"
     alt="Markdown Monster icon"
     style="width: 100hv;margin-bottom: 1s0px"
     />
</div>

#### Cuerdas
Cada hoja en el árbol BSP corresponde a la hoja-celda alineada con el eje. Cada una de estas hoja-celdas tiene seis caras. Las caras de una celda de hoja se llamarán hoja-cara. Las celdas que cruzan la cara de una hoja se denominan celdas vecinas.

#### Algoritmo de construcción de cuerdas
La construcción de cuerdas es sencilla. Para cada hoja-celda del árbol BSP se coloca una cuerda. Para una hoja-cara determinada, la jerarquía se busca comenzando desde el nodo raíz. En cada paso, la búsqueda continúa en el subárbol, que corresponde a una cara que se cruza con la celda. Si la cara está dividida por el plano referido en el nodo alcanzado actualmente (es decir, interseca ambos subárboles), la búsqueda finaliza.

####  Árboles de cuerda
Las cuerdas se utilizan para localizar una hoja vecina para un rayo que sale de la hoja actual durante el algoritmo de recorrido del rayo. Las cuerdas apuntan a hojas o nodos interiores del árbol BSP.

<div style="text-align:center">
<img src="https://i.gyazo.com/9975c8010707d57068e8cf22022a6129.png"
     alt="Markdown Monster icon"
     style="width: 100hv;margin-bottom: 1s0px"
     />
</div>

#### Análisis de algoritmos
La técnica de los árboles de cuerda requiere una memoria adicional para almacenar los árboles de cuerda, pero por otro lado, elimina los largos pasos transversales (a menudo llamados verticales) desde la raíz hacia abajo. La eliminación de los pasos transversales es especialmente notable para los rayos secundarios y de sombra porque sabemos exactamente en qué hoja-célula se encuentra el origen del rayo.

### 2 -Fast Robust BSP Tree  Traversal Algorithm For Ray Tracing

#### Autores
Vlastimil Havran, Tomás Kopal, Jirí Bittner, Jirí Zára 

#### Abstract 
Un árbol de BSP (Partición binaria del espacio) ortogonal es una estructura de datos de subdivisión espacial comúnmente usada para la aceleración de ray tracing, su construcción toma relativamente poco tiempo y la eficacia de su recorrido influencia significativamente el resultado del tiempo de renderizado. En este artículo se propone un nuevo algoritmo de recorrido rápido basado en la evaluación estadística de todos los casos posibles que ocurren durante al recorrer un árbol BSP. 

El algoritmo propuesto manipula todas las singularidades correctamente y ahorra desde un 30% hasta un 50% del tiempo de recorrido en comparación con los algoritmos Sung y Arvo. 

#### Introducción
Las técnicas de subdivisión espacial son métodos bien conocidos para acelerar los cálculos de ray tracing, hay una variedad de esquemas para la subdivisión espacial incluyendo los uniformes como grillas y los no uniformes como árboles BSP, y oc. La complejidad del tiempo de ray tracing es determinada por el casteo de una gran cantidad de rayos. 

El principio de todas las técnicas de subdivisión espacial, es la reducción las computaciones de intersecciones rayo-objeto mediante particionamiento del espacio de la escena en celdas disjuntas y la prueba de intersección rayo-objeto es computada por las celdas sobre el camino del rayo. 
Debe notarse que a pesar que el número de pruebas de intersección disminuye significativamente, hay requerimientos adicionales para el recorrido de la estructura de datos por subdivisión espacial. Una manera para reducir el tiempo total, es mejorar la estructura de datos espacial y la segunda manera es mejorar el algoritmo de recorrido, lo cual es la aproximación del artículo. 

Un árbol de partición binaria del espacio es una estructura de datos simple y poderosa que puede ser usada para resolver una variedad de problemas geométricos, para el caso de ray-tracing se construye dividiendo planos de manera perpendicular a los principales ejes. Lo anterior representa una ventaja cuando los objetos con formas complejas que están encerrados son renderizados, con la ortogonalidad del árbol BSP se disminuye el número de cálculos requeridos por una intersección de un rayo y un plano de división. 

#### Clasificación Transversal

Cuando un objeto es traspasado por un rayo durante el proceso de renderizado, un árbol BSP se atraviesa desde la raíz hasta las hojas. Las secuencias corregidas de hojas, tienen que ser identificadas para el origen de un rayo y dirección, la hoja más cercana tiene que ser procesada primero, el plano dividido subdivide una celda rectangular en dos más pequeñas, el test realizado durante el recorrido debe determinar si visitar ambos nodos y en qué orden o si debe visitar sólo uno y cuál.

<div style="text-align:center">
<img src="https://i.gyazo.com/9bd87a654c4c938050badd5942a292cc.png"
     alt="Markdown Monster icon"
     style="width: 400px;margin-bottom: 20px"
     />
</div>

En la figura se muestran todos los casos clasificados por el origen y dirección del rayo con respecto al plano dividido, como el plano dividido está orientado, podemos distinguir ubicaciones negativas del punto de origen (la parte de abajo del plano) y la positiva (la parte de arriba del plano divisor), los casos descritos anteriormente son denominados como N y P respectivamente. Los casos Z muestran cuando la situación es que el origen del rayo está embebido dentro del plano divisor. Puntos geométricos importantes del esquema de clasificación son caracterizados por la distancia clasificada, medida desde el origen del rayo sobre la dirección de este. El rayo al entrar el nodo en el punto de entrada es denotado con la clasificación a y sale por el punto marcado como b por lo que a<=b, la distancia marcada desde el origen del rayo hacia el plano divisor es denotada como s. La clasificación incluye todas las relaciones entre las variables señaladas. 

#### Propuesta algoritmo 
Para resolver los casos señalados en la figura se propuso un nuevo algoritmo para realizar el recorrido, este compara coordenadas en lugar de distancias debido a la propiedad del arbol de ser ortogonal 

<div style="text-align:center">
<img src="https://i.gyazo.com/47fc74ed97ebfaf903568c7ed9a148e0.png"
     alt="Markdown Monster icon"
     style="width: 400px;margin-bottom: 20px"
     />
</div>

En la figura suponemos que el plano divisor es perpendicular al eje x, por lo cual las coordenadas x de los puntos s, a y b son suficientes para distinguir todos los otros casos señalados en la figura anterior. 

Este algoritmo necesita exactamente dos comparaciones para encontrar el caso del recorrido, las coordenadas x, y o z son seleccionados de acuerdo a la orientación del plano divisor dado. Cuando los nodos son golpeados por el rayo, la ubicación de s es procesada, que es la parte computacionalmente más costosa pero estas son luego reutilizadas y no es necesario un recálculo. 

#### Resultados
<div style="text-align:center">
<img src="https://i.gyazo.com/585c1a1270f10083b1599a374e8a1181.png"
     alt="Markdown Monster icon"
     style="width: 400px;margin-bottom: 20px"
     />
</div>
El algoritmo propuesto es denotado como TA-B puede verse que requiere de un menor costo computacional y los resultados conforme al ray tracing son de alrededor de dos veces más rápido.

## VI. Ray Tracing en GPU

### Creando la cuadrícula uniforme
Un enfoque bastante sencillo puede ser utilizado para crear la rejilla uniforme, para todos los triángulos Ti en la escena:
Se calculan las celdas límites (b1,b2) del triángulo Ti
Se prueba la intersección triángulo-caja Ti con cada celda Cj que pertenece a (b1,b2)
Si la intersección triángulo-box retorna verdadero, se añade una referencia de Ti a Cj.

<div style="text-align:center">
<img src="https://i.gyazo.com/e9c7ec0f5757702441a3efd83a14e8db.png"
     alt="Markdown Monster icon"
     style="height: 300px;margin-bottom: 1s0px"
     />
     <img src="https://i.gyazo.com/9332a442b0efd435655fb21bafc9d218.png"
     alt="Markdown Monster icon"
     style="height: 300px;margin-bottom: 1s0px"
     />
</div>

Aunque la grilla es creada usualmente en la GPU y almacenada en texturas esta puede ser recorrida utilizando la GPU.

### Atravesando la cuadrícula uniforme
Jhon Amanatides y Andrew Woo presentaron una manera de recorrer la cuadrícula rápidamente haciendo uso del algoritmo 3D-DDA(Diferencia digital). Con unas pequeñas modificaciones, este algoritmo puede ser mapeado a la GPU.

Este algoritmo consiste de dos pasos: inicialización y recorrido incremental.

<div style="text-align:center">
<img src="https://i.gyazo.com/c5f20fc2761619b96a3f7f673f56af6b.png"
     alt="Markdown Monster icon"
     style="width: 80hv;margin-bottom: 1s0px"
     />
</div>

### Removiendo la recursión

La ecuación para calcular el color en la iteración i se puede obtener simplemente eliminando la recursividad: calcule el color para 1 rayo, luego para 2 rayos, luego para 3 rayos y así sucesivamente, y luego pruebe el resultado con inducción completa. Sería posible agregar soporte a los rayos transmisivos de una manera similar a la reflexión. El problema es que para cada rayo transmisivo, también podría haber un rayo reflectante. Un enfoque simple sería agregar una nueva textura de rayo para cada objeto transmisivo en la escena: cada rayo seguiría un camino diferente, lo que significa agregar una nueva textura por objeto. Pero esto consumiría mucha memoria y requeriría demasiadas pasadas adicionales. Para simplificar el RayTracer basado en GPU, no se utilizan rayos transmisivos.

### Almacenamiento de la escena 3D

Toda la escena, almacenada en una estructura de cuadrícula uniforme, debe mapearse en la memoria de textura. Cada celda de la estructura del índice Voxel contiene un puntero a una lista de elementos. La lista de elementos apunta a los datos reales del elemento, los triángulos. El trazador de rayos solo debería usar triángulos como datos de elementos, pero aquí sería posible admitir otras formas como esferas perfectas, por ejemplo, un juego de trazado de rayos en tiempo real que usa muchas esferas, pero por ahora, solo se usan triángulos.

### Bucle de cruce e intersección de equilibrio de carga

Un problema importante es que tanto el núcleo del intersector como el del traverser requieren bucles y ambos dependen el uno del otro. La forma más fácil sería hacer un bucle en el traverser hasta que ningún rayo esté en estado "activo", luego hacer un bucle en el núcleo del intersector hasta que ningún rayo esté en estado de "espera". Esto es muy ineficiente, porque el número de llamadas al kernel tiene que ser mínimo para evitar que las operaciones de selección-z dominen los cálculos. El intersector de rayos solo debe llamarse si hay suficientes rayos en estado de "espera" y listos para la intersección. Y el rayo traverser solo debe llamarse si hay suficientes rayos listos para atravesarlo. Los experimentos muestran que realizar intersecciones una vez que el 20% de los rayos requiere intersección produce el número mínimo de llamadas al núcleo.

<div style="text-align:center">
<img src="https://i.gyazo.com/59578fb65d0a61e6deddcb35090e4b39.png"
     alt="Markdown Monster icon"
     style="width: 100hv;margin-bottom: 1s0px"
     />
</div>

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


## VIII. PROGRAMMABLE GRAPHICS HARDWARE

<div style="text-align:center">
<img src="https://i.gyazo.com/d12dd5016bf312b1423cc361e3e06b72.png"
     alt="Markdown Monster icon"
     style="width: 200px;margin-bottom: 20px"
     />
</div>

### El flujo actual de gráficos programables:
Actualmente chips como el NVIDIA GeForce3 y el ATI Radeon 8500 reemplazan el vértice de función fija y las etapas de fragmentación con las etapas programables. Estos vectores programables y motores de fragmentos ejecutan programas definidos por el usuario y permiten un buen control sobre los cálculos de shading y texturizado. Un programa de vértice Nvidia consiste de 128 y 4-way SIMD de instrucciones de punto flotante.
El programa de vertices corre en cada vértice que entra y los resultados computados son pasados a la etapa de rasterización, la etapa de fragmentación es también programable, desde un combinador de registros Nvidia o desde un Pixel shader DirectX 8. Los pixel shaders como los programas de vértices proveen un set de instrucción 4-way SIMD para texturizados pero no operan sobre valores punto fijo como los programas de vértices. 

El shading programable posee algunas limitaciones:
- Programas de vértices y fragmentos poseen sets de instrucciones simples e incompletas. 
- Los tipos de datos de programas de fragmentos son mayoritariamente puntos fijos, las texturas de entradas y tienen como salida colores framebuffers de 8-bits típicamente por cada color de componente. Los valores intermedios en registros tienen valores levemente más precisos. 	
- Hay muchas limitaciones en términos de recursos, los programas poseen un límite de instrucciones y un pequeño número de registros. Cada etapa tiene un número limitado de entradas y salidas.
- El número de texturas activas y dependientes es limitado. El hardware actual permite ciertas instrucciones para la computación de ciertas direcciones de texturas solo dentro de ciertos puntos del programa.
- Solamente un unico valor de color puede ser escrito al framebuffer en cada pasada. 
- Los programas no pueden repetirse y no hay instrucciones de ramificación condicional. 

### El flujo propuesto de gráficos programables a un término cercano:
Las limitantes actuales del hardware hacen difícil la tarea de implementar ray-tracing en un programa de fragmentos. Gracias al interés en shading programable para juegos, el flujo de gráficos programables ha evolucionado y circulan diferentes propuestas para la futura aproximación;
- Arquitectura multi paso:
    Admite lecturas de texturas arbitrarias, formatos de textura de punto flotante y framebuffer, instrucciones generales de punto flotante y dos salidas de 4 vectores de punto flotante. La ramificación se implementa a través de la representación multipass.
- Arquitectura de ramificación.
    Arquitectura multipass mejorada para incluir soporte para instrucciones de bifurcación condicional para bucles y flujo de control.

## IX. POSIBLE IMPLEMENTACIÓN

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

## X. APLICACIONES EN LA VIDA REAL

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

## XII. REFERENCIAS

> Martin Christen,(2005). Ray tracing on GPU. url:https://www.geeknetic.es/Ray-Tracing/que-es-y-para-que-sirve.

> Timothy J. Purcell, Ian Buck, William R. Mark, Pat Hanrahan.(2002). Ray Tracing on Programmable Graphics Hardware.

> Scratchapixel. An Overview of the Ray-Tracing Rendering Technique. Referido de: https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-overview

> ArchDaily. (23 Jul 2020). Real-Time Ray-Tracing is Changing Architectural Visualization. Referido de: https://www.archdaily.com/943676/real-time-ray-tracing-is-changing-architectural-visualization

> Akrich Corradini, Gaston. (2020-10-19). Ray tracing: realidad virtual y su aplicación en la arquitectura. Referido de: https://upcommons.upc.edu/handle/2117/341552

> Vlastimil, H., Bittner J., Zára J. (1998) Ray Tracing with Rope Trees. Referido de: https://www.researchgate.net/publication/2691301_Ray_Tracing_with_Rope_Trees

> Vlastimil, H., Kopal, T., Bittner J., Zára J. (1998) Fast Robust BSP Tree  Traversal Algorithm For Ray Tracing.  Referido de: https://researchgate.net/publication/242938069_Fast_Robust_Bsp_Tree_Traversal_Algorithm_For_Ray_Tracing

> Purcell, T., Buck, I., Mark, W., Hanrahan, P. (2002) Ray tracing on programmable graphics hardware. Referido de: https://graphics.stanford.edu/papers/rtongfx/rtongfx.pdfZ