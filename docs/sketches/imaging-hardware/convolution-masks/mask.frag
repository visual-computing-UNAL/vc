precision mediump float;
uniform float kernel[9];
uniform sampler2D texture;
uniform vec2 texOffset;
vec2 tc[9];
varying vec2 vTexCoord;
vec4 col[9];
varying vec4 vVertexColor;
const vec4 lumcoeff = vec4(0.299, 0.587, 0.114, 0);
void set_texture(){
  for ( int i = 0; i < 9; i++){
    col[i] = texture2D( texture, tc[i] );
  }
}
void set_vtcoord(){
  tc[0] = vTexCoord + vec2(-texOffset.s, -texOffset.t);
  tc[1] = vTexCoord + vec2(         0.0, -texOffset.t);
  tc[2] = vTexCoord + vec2(+texOffset.s, -texOffset.t);
  tc[3] = vTexCoord + vec2(-texOffset.s,          0.0);
  tc[4] = vTexCoord + vec2(         0.0,          0.0);
  tc[5] = vTexCoord + vec2(+texOffset.s,          0.0);
  tc[6] = vTexCoord + vec2(-texOffset.s, +texOffset.t);
  tc[7] = vTexCoord + vec2(         0.0, +texOffset.t);
  tc[8] = vTexCoord + vec2(+texOffset.s, +texOffset.t);
}
void main() {
  set_vtcoord();
  set_texture();
  vec4 total = kernel[0] * col[0];
  for (int i = 1; i<9 ; i++){
    vec4 colour =  kernel[i] * col[i];
    total += colour;
  }
  gl_FragColor = vec4(vec3(total), 1.0) * vVertexColor;
}