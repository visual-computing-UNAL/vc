let grayShader;
let shaderTexture;


function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
  video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
  grayShader = loadShader('/vc/docs/sketches/gray_rgb.vert', '/vc/docs/sketches/gray_rgb.frag');
  video.hide();
}

function setup() {
  createCanvas(512, 256, WEBGL);
  shaderTexture = createGraphics(256, 256, WEBGL);
  shaderTexture.noStroke();

  video.loop();
  noStroke();
}

function draw() {
  shaderTexture.shader(grayShader);
  grayShader.setUniform('tex', img);
  texture(shaderTexture);
  shaderTexture.rect(0,0,256,256);
  rect(-256,-256/2.0,256,256)
  grayShader.setUniform('tex', video);
  texture(shaderTexture);
  shaderTexture.rect(0,0,256,256);
  rect(0,-256/2.0,256,256)
}
