# Conversión de la imagen a un foto-mosaico.

> [Volver](/docs/workshops/imaging)

## Explicacion

## Idea general
Lo primero que vamos a hacer es cargar la imagen a la que le deseamos realizar el mosaico, ya con esta imagen vamos a determinar que tan grandes van a ser las piezas (imágenes) del mosaico.
 
El tamaño de estas imágenes va a estar relacionado en proporción al tamaño de la imagen sobre la cual se va a crear el mosaico, por ejemplo podemos hacer la imagen 1/8 del tamaño original, entonces el tamaño de cada píxel será 8 veces el tamaño que tenía originalmente
 
Ya con los tamaños determinados, buscamos un conjunto de imágenes que van a ser las piezas del mosaico, estas imágenes las guardamos en una carpeta y despues corremos una parte del código que se encarga de determinar el color promedio de cada imagen, una vez determinado se guarda en un archivo para evitar realizar este proceso que es muy demorado.
 
Una vez determinado el color promedio de las imágenes se hace uso del valor Delta E que nos permite determinar la similitud entre dos colores, y haciendo uso de este encontramos la imagen que tenga el color promedio más parecido al píxel correspondiente de la imagen.
 
Cuando se encuentra esta imagen se dibuja con su tamaño correspondiente en el canvas, se hace esto para cada "pixel" de la imagen original hasta que se cambian todos, y ya tendríamos el mosaico.

## Obtencion del color de la piza del mosaico

Para la obtención del color de la pieza del mosaico lo que se hizo fue hacer la imagen más pequeña, en el ejemplo que se está mostrando la imagen se hizo 8 veces más pequeña.

## Imagen original
> :P5 sketch=/docs/sketches/imaging/foto-mosaico/foto-mosaico-original.js, width=800, height=500

Si tomamos cada pixel y lo rescalamos en la proporcion que se habia reducido la imagen tendremos otra imagen con el mismo tamaño, pero se veria mucho mas pixelada, estos "píxeles" son los que van a ser cambiados por imágenes de ese tamaño que contienen un color promedio cercano al color de esa imagen.

## Imagen reducida y escalado de los pixeles
Acontinuacion se puede ver la imagen al haberla reducido, y al escalar los pixeles en la misma proporcion que se redujo la imagen original.

> :P5 sketch=/docs/sketches/imaging/foto-mosaico/foto-mosaico-pixel.js, width=800, height=500

Estos pixeles son los que van a ser remplazados por imagenes que tengan un color promedio cercano al de el pixel al que corresponden.

## Piezas del mosaico y promedio de color pieza (imange)

Después de esto tenemos el proceso más complejo y demorado. Lo primero que se hizo fue crear un conjunto de imágenes que representan los píxeles, después haciendo uso de ps5 se desarrolló un código encargado de generar el color promedio de cada imagen, para esto se sumó el color rojo en rgb de cada pixel de la imagen a la que se le desea calcular el color promedio, y para cada imagen se dividió este color por la cantidad de pixeles, de maner similar se hizo para el color verde y el azul del RGB, ya con los valore promedios del color rojo, verde y azul, tomamos ese valor como el color promedio de la imagen en RGB. Una vez calculados todos estos colores se imprimen en un documento de texto que le asocia a cada imagen su color promedio y así evitamos realizar múltiples veces este proceso que es demorado y además permitimos un fácil escalado de la cantidad de imágenes.

## Cercania entre promedio del color de la pieza y color del pixel

Una vez tenemos el conjunto de imágenes con sus colores promedios y el color de los píxeles, lo que nos hace falta es reemplazar cada uno de estos por una imagen que tenga un color promedio cercano al color del pixel, para esto se hizo uso del Delta E, para ser más exacto se hizo uso de la fórmula del delta E **CIE76** que básicamente lo que hace es calcular la distancia entre el vector de RGB de un color con la distancia del otro color, la formula es:
 
Delta E = ((R_1-R_2)^2+(G_1-G_2)^2+(B_1-B_2)^2)^(1/2)
 
Haciendo uso de esta fórmula encontramos la imagen que tiene el color más cercano al del pixel que vamos a representar y finalmente dibujamos la imagen con el tamaño que le corresponde.

## Imagen final del mosaico 

> :P5 sketch=/docs/sketches/imaging/foto-mosaico/foto-mosaico.js, width=800, height=500

## Imagen final del mosaico con un tamaño de pieza mas grande
> :P5 sketch=/docs/sketches/imaging/foto-mosaico/foto-mosaico-bigpix.js, width=800, height=500

## Imagen final del mosaico flamenco
> :P5 sketch=/docs/sketches/imaging/foto-mosaico/foto-mosaico-falmenco.js, width=800, height=800