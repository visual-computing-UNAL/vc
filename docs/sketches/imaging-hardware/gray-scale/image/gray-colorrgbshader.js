let grayShader;
let shaderTexture;


function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
  video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
  grayShader = loadShader(
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/gray_rgb.vert', 
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/gray_rgb.frag'
    );
  video.hide();
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  shaderTexture = createGraphics(1000, 1000, WEBGL);
  shaderTexture.noStroke();

  video.loop();
  noStroke();
}

function draw() {
  shaderTexture.shader(grayShader)

  grayShader.setUniform('tex', img)
  texture(shaderTexture)
  shaderTexture.rect()
  rect(-750,-500,500,500)

  grayShader.setUniform('tex', video);
  texture(shaderTexture);
  shaderTexture.rect();
  rect(0,-256/2.0,256,256)
}
