# Conversión de la imagen a ascii art.

> [Volver](/docs/workshops/imaging)

## Ascii Art

Para el desarrollo de la conversión a ascii art se partió del proyecto público [ASCII art with p5js](https://www.mathiasbernhard.ch/ascii-art-with-p5js/) desde el cual se hicieron ajustes para convertir la imagen de prueba presentada posteriormente a un Ascii Art.

### Imagen Original

> :P5 sketch=/docs/sketches/imaging/acii-art/ascii-art-original.js, width=800, height=500

### Conversión a caracteres ascii

A partir de una serie de opciones definidas por el proyecto en el que fue basado este desarrollo se recorre la imagen en un rango definido el cual traducirá cada parce de la imagen en uno de los carácteres dentro de las opciones, finalmente se traducen unos símbolos especiales ( , <, >, ") en un carácter que pueda ser traducido en un div de respuesta donde se verá el Ascii Art como a continuación.

> :P5 sketch=/docs/sketches/imaging/acii-art/ascii-art.js, width=800, height=800

