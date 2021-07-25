let gray_rgb_shader
let graphics_space
let _text

function preload() {
  video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm'])
  gray_rgb_shader = loadShader(
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/gray_rgb_shader.frag'
  );
  video.hide()
}

function setup() {
  createCanvas(320, 240, WEBGL)
  graphics_space = createGraphics(320, 240, WEBGL)
  graphics_space.noStroke()
  _text = createGraphics(320, 240);
  _text.fill(255, 0, 0);
  _text.textSize(33);
  video.loop()
  noStroke()
}

function draw() {

  graphics_space.shader( gray_rgb_shader)

  gray_rgb_shader.setUniform('content', video)
  texture(graphics_space)
  graphics_space.rect()
  rect(-160, -120, 320, 240)

  orbitControl();
  _text.text('Framerate: ' + Math.floor(frameRate()), 0, 220)
  texture(_text);
  plane(320, 240);
}
