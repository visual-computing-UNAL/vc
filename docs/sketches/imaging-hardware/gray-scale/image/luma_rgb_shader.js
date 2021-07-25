let lumaShader1
let lumaShader2
let lumaShader3
let lumaShader4
let graphics_space


function preload() {
  image = loadImage('/vc/docs/sketches/lenna.png')
  video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm'])
  grayShader = loadShader(
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/gray_rgb_shader.frag'
  )
  lumaShader1 = loadShader(
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/luma_rgb_1.frag'
  )
  lumaShader2 = loadShader(
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/luma_rgb_2.frag'
  )
  lumaShader3 = loadShader(
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/luma_rgb_3.frag'
  )
  lumaShader4 = loadShader(
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/filters.vert',
    '/vc/docs/sketches/imaging-hardware/gray-scale/image/luma_rgb_4.frag'
  )
  video.hide()
}

function setup() {
  createCanvas(800, 400, WEBGL);
  graphics_space = createGraphics(800, 400, WEBGL)
  graphics_space.noStroke()
  video.loop()
  noStroke()
}

function draw() {

  graphics_space.shader(lumaShader1)

  lumaShader1.setUniform('content', image)
  texture(graphics_space)
  graphics_space.rect()
  rect(-400, -200, 200, 200)

  lumaShader1.setUniform('content', video)
  texture(graphics_space);
  graphics_space.rect();
  rect(-400, 0, 200, 200)

  graphics_space.shader(lumaShader2)

  lumaShader2.setUniform('content', image)
  texture(graphics_space)
  graphics_space.rect()
  rect(-200, -200, 200, 200)

  lumaShader2.setUniform('content', video)
  texture(graphics_space)
  graphics_space.rect()
  rect(-200, 0, 200, 200)

  graphics_space.shader(lumaShader3)

  lumaShader3.setUniform('content', image)
  texture(graphics_space)
  graphics_space.rect()
  rect(0, -200, 200, 200)

  lumaShader3.setUniform('content', video)
  texture(graphics_space)
  graphics_space.rect()
  rect(0, 0, 200, 200)

  graphics_space.shader(lumaShader4)

  lumaShader4.setUniform('content', image)
  texture(graphics_space)
  graphics_space.rect()
  rect(200, -200, 200, 200)

  lumaShader4.setUniform('content', video)
  texture(graphics_space)
  graphics_space.rect()
  rect(200, 0, 200, 200)
}
