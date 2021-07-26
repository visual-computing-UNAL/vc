let asciiShader;
let shaderTexture;


function preload() {
  img = loadImage('/vc/docs/sketches/imaging-hardware/acii-art/test3.jpg');
  asciiShader = loadShader('/vc/docs/sketches/imaging-hardware/acii-art/ascii-art.vert', '/vc/docs/sketches/imaging-hardware/acii-art/ascii-art.frag');
}

function setup() {
  createCanvas(958, 596, WEBGL);
  shaderTexture = createGraphics(958, 596, WEBGL);
}

function draw() {
  shaderTexture.shader(asciiShader);
  asciiShader.setUniform('tex', img);
  texture(shaderTexture);
  shaderTexture.rect(0,0,958,596);
  rect(-958/2,-596/2,958,596)
}