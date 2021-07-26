let theShader;
let fingers;
let reproduce = false;


function preload() {
  shader_ = loadShader('/vc/docs/sketches/imaging-hardware/convolution-masks/mask.vert', '/vc/docs/sketches/imaging-hardware/convolution-masks/mask.frag');
  fingers = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
  fingers.hide();
}

function shader_set(){
  shader(shader_);
  shader_.setUniform('texture', fingers);
  shader_.setUniform('texOffset',[1/fingers.width,1/fingers.height]);    
}
function setup() {
 createCanvas(320, 240, WEBGL);
 _text = createGraphics(320, 240);
 _text.fill(255, 0, 0);
 _text.textSize(33);
 noStroke();
 textureMode(NORMAL); 
 shader_set();
 frameRate(120);
  
}
function set_vertex(){
   vertex(-width / 2, height / 2, 0, 0, 1);
   vertex(width / 2, height / 2, 0, 1, 1);
   vertex(width / 2, -height / 2, 0, 1, 0);
   vertex(-width / 2, -height / 2, 0, 0, 0);
}
function draw() {
  background(0);
  fingers.loop()
  beginShape() 
  set_vertex();
  shader_.setUniform('kernel',  [-1, 0, 1, -2, 0, 2,-1, 0, 1]);
  endShape(CLOSE) 
  console.log(frameRate())

}