# Conversión de la imagen a un foto-mosaico.

> [Volver](/docs/workshops/imaging)

## Explicacion

## Idea general
Lo primero que vamos a hacer es cargar la imagen a la que le deseamos realizar el mosaico, ya con esta imagen vamos a determinar que tan grandes van a ser las piezas (imagenes) del mosaico.

El tamaño de estas imagenes va a estar relacionado en proporcion al tamaño de la imagen sobre la cual se va a crear el mosaico, por ejemplo podemos hacer la imagen 1/8 del tamaño original, entonces el tamaño de cada pixel sera 8 veces el tamaño que tenia originalmente

Ya con los tamaños determinados, buscamos un conjunto de imagenes que van a ser las piezas del mosaico, estas imagenes las guardamos en una carpeta y despues corrermos una parte del codigo que se encarga de determinar el color promedio de cada imagen, una vez determinado se guarda en un archivo para evitar realizar este proceso que es muy demorado.

Una vez determinado el color promedio de las imagenes se hace uso del valor Delta E que nos permite determinar la similitud entre dos colores, y haciendo uso de este encontramos la imagen que tenga el color promedio mas pecido al pixel correpondiente de la imagen.

Cuando se encuentra esta imagen se dibuja con su tamaño correspondiente en el canvas, se hace esto para cada "pixel" de la imagen original hasta que se cambian todos, y ya tendriamos el mosaico.

## Obtencion del color de la piza del mosaico

Para la obtencion del color de la pieza del mosaico lo que se hizo fue hacer la imagen mas pequeña, en el ejemplo que se esta mostrando la imagen se hizo 8 veces mas pequeña.

## Imagen original
> :P5 sketch=/docs/sketches/imaging/foto-mosaico/foto-mosaico-original.js, width=800, height=500

Si tomamos cada pixel y lo rescalamos en la proporcion que se habia reducido la imagen tendriamos otra imagen con el mismo tamaño, pero se veria mucho mas pixelada, esos "pixeles" son los que van a ser cambiados por imagenes de ese tamaño que contienen un color promedio cercano al color de esa imagen.

## Imagen reducida y escalado de los pixeles
Acontinuacion se puede ver la imagen al haberla reducido, y al escalar los pixeles en la misma proporcion que se redujo la imagen original.

> :P5 sketch=/docs/sketches/imaging/foto-mosaico/foto-mosaico-pixel.js, width=800, height=500

Estos pixeles son los que van a ser remplazados por imagenes que tengan un color promedio cercano al de el pixel al que corresponden.

## Piezas del mosaico y promedio de color pieza (imange)

Despues de esto tenemos el proceso mas complejo y demorado. Lo primero que se hizo fue crear un conjunto de imagenes que representarian los pixeles, depues haciendo uso de ps5 se desrrollo un codigo encargado de generar el color promedio de cada imagen, para esto se sumo el color rojo en rgb de cada pixel de la imagen a la que se le deseaba calcular el color promedio, y para cada imagen se dividio este color por la cantidad de pixeles, de maner similar se hizo para el color verde y el azul del RGB, ya con los valore promedios del color rojo, verde y azul, tomamos ese valor como el color promedio de la imagen en RGB. Una vez calculados todos estos colores se imprimen en un documento de texto que le asocia a acada imagen su color promedio y asi evitamos realizar multiples veces este proceso que es demorado y ademas permitimos un facil escalado de la cantidad de imagenes.

## Cercania entre promedio del color de la pieza y color del pixel

Una vez tenemos el conjunto de imagenes con sus colores promedios y el color de los pixeles, lo que nos hace falta es remplazar cada uno de estos por una imagen que tenga un color promedio cercano al color del pixel, para esto se hizo uso del Delta E, para ser mas exacto se hizo uso de la foruma del delta E **CIE76** que basicamnte lo que hace es calcular la distancia entre el vector de RGB de un color con la distancia del otro color, la formula es:

Delta E = ((R_1-R_2)^2+(G_1-G_2)^2+(B_1-B_2)^2)^(1/2)

Haciendo uso de esta formula encontramos la imagen que tiene el color mas cercano al de el pixel que vamos a representar y finalmente dibujamos la imagen con el tamaño que lo corresponde.

## Imagen final del mosaico 

> :P5 sketch=/docs/sketches/imaging/foto-mosaico/foto-mosaico.js, width=800, height=500

## Imagen final del mosaico con un tamaño de pieza mas grande
> :P5 sketch=/docs/sketches/imaging/foto-mosaico/foto-mosaico-bigpix.js, width=800, height=500

## Imagen final del mosaico flamenco
> :P5 sketch=/docs/sketches/imaging/foto-mosaico/foto-mosaico-falmenco.js, width=800, height=800