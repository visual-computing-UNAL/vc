 
let img;

function preload() {
  shader_ = loadShader('/vc/docs/sketches/imaging-hardware/convolution-masks/mask.vert', '/vc/docs/sketches/imaging-hardware/convolution-masks/mask.frag');
  img = loadImage('/vc/docs/sketches/imaging/mascaras-convolucion/image/image-test.jpg');
}

function shader_set(){
   shader(shader_);
   shader_.setUniform('texture', img);
   shader_.setUniform('texOffset',[1/img.width,1/img.height]);    
}
function setup() {
  createCanvas(640, 400, WEBGL);
  noStroke();
  textureMode(NORMAL); 
  shader_set();
}
function set_vertex(){
    vertex(-width / 2, height / 2, 0, 0, 1);
    vertex(width / 2, height / 2, 0, 1, 1);
    vertex(width / 2, -height / 2, 0, 1, 0);
    vertex(-width / 2, -height / 2, 0, 0, 0);
}
function draw() {
  background(0);
  beginShape() 
  set_vertex()
  shader_.setUniform('kernel', [-1, 0, 1, -2, 0, 2,-1, 0, 1]);
  endShape(CLOSE)
}
