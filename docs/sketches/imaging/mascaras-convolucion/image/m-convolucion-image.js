let img;
// const mat = [ [ 0, -1, 0 ],
// [ -1,  4, -1 ],
// [ 0, -1, 0 ] ];
// Box Blur kernel const mat = [[1 / 9, 1 / 9, 1 / 9],[1 / 9, 1 / 9, 1 / 9],[1 / 9, 1 / 9, 1 / 9]];
// High-pass kernel const mat = [[0,-.5,0],[-.5,3,-.5 ],[0,-.5,0]];
const mat = [[-1, 0, 1],[-2, 0, 2],[-1, 0, 1]];
function preload() {
  img = loadImage('/vc/docs/sketches/imaging/mascaras-convolucion/image/image-test.jpg');
}

function setup() {
  createCanvas(img.width, img.height);   
  img.loadPixels();
  pixelDensity(1);  
}

function draw() {
  let mat_size = 3;
  loadPixels();
   for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++ ) {
      let conv = convolution(x, y, mat, mat_size, img);
      let position = (x + y*img.width) * 4;
      setPixels(position, conv);
    }
  }
  updatePixels();
}

function setPixels(position, conv){
    pixels[position] = red(conv);
    pixels[position + 1] = green(conv);
    pixels[position + 2] = blue(conv);
    pixels[position + 3] = alpha(conv);   
}

function calculateTotal(position, mat_pos){
    return (img.pixels[position]) * mat_pos;
}

function setPosition(height, width, i, j, out_bounds){
    const heightloc = (height + i - out_bounds);
    const widthloc = (width + j - out_bounds);
    return position = (heightloc + img.width * widthloc) * 4;
}

function convolution(height, width, mat, mat_size, img) {
  let r = 0.0, g = 0.0, b = 0.0, out_bounds = Math.floor(mat_size / 2);
  for (let i = 0; i < mat_size; i++){
    for (let j = 0; j < mat_size; j++){
      let position = constrain(setPosition(height, width, i, j, out_bounds), 0 , img.pixels.length - 1);
      r += calculateTotal(position, mat[i][j]);
      g += calculateTotal(position + 1, mat[i][j]);
      b += calculateTotal(position + 2, mat[i][j]);
    }
  }
  r = constrain(r, 0, 255);
  g = constrain(g, 0, 255);
  b = constrain(b, 0, 255);
  return color(r, g, b);
} 