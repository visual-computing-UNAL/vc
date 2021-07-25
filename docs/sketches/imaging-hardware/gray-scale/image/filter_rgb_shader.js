let gray_rgb_shader
let inverse_rgb_shader
let graphics_space

function preload() {
  image = loadImage('/vc/docs/sketches/imaging-hardware/gray-scale/image/image-test.jpg')
  video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm'])
  gray_rgb_shader = loadShader(
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/gray_rgb_shader.frag'
  );
  inverse_rgb_shader = loadShader(
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/inverse_rgb_shader.frag'
  )
  video.hide()
}

function setup() {
  createCanvas(900, 600, WEBGL)
  graphics_space = createGraphics(900, 600, WEBGL)
  graphics_space.noStroke()
  video.loop()
  noStroke()
}

function draw() {

  texture(image)
  rect(-450, -300, 300, 300)

  texture(video)
  rect(-450, 0, 300, 300)

  graphics_space.shader( gray_rgb_shader)

  gray_rgb_shader.setUniform('content', image)
  texture(graphics_space)
  graphics_space.rect()
  rect(-150, -300, 300, 300)

  gray_rgb_shader.setUniform('content', video)
  texture(graphics_space)
  graphics_space.rect()
  rect(-150, 0, 300, 300)

  graphics_space.shader(inverse_rgb_shader)

  inverse_rgb_shader.setUniform('content', image)
  texture(graphics_space)
  graphics_space.rect()
  rect(150, -300, 300, 300)

  inverse_rgb_shader.setUniform('content', video)
  texture(graphics_space)
  graphics_space.rect()
  rect(150, 0, 300, 300)
}
