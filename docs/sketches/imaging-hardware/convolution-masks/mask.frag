precision mediump float;
uniform float kernel[9];

vec4 col[9];
vec2 tc[9];

uniform sampler2D texture;
uniform vec2 texOffset;

varying vec4 vVertexColor;

varying vec2 vTexCoord;

const vec4 lumcoeff = vec4(0.299, 0.587, 0.114, 0);

void main() {
  tc[0] = vTexCoord + vec2(-texOffset.s, -texOffset.t);
  tc[1] = vTexCoord + vec2(         0.0, -texOffset.t);
  tc[2] = vTexCoord + vec2(+texOffset.s, -texOffset.t);
  tc[3] = vTexCoord + vec2(-texOffset.s,          0.0);
  tc[4] = vTexCoord + vec2(         0.0,          0.0);
  tc[5] = vTexCoord + vec2(+texOffset.s,          0.0);
  tc[6] = vTexCoord + vec2(-texOffset.s, +texOffset.t);
  tc[7] = vTexCoord + vec2(         0.0, +texOffset.t);
  tc[8] = vTexCoord + vec2(+texOffset.s, +texOffset.t);
  for ( int i=0;i<9;i++){
    col[i] = texture2D(texture, tc[i]);
  }
  vec4 sum = kernel[0] * col[0];
  for (int i = 1; i<9 ; i++){
    vec4 pc =  kernel[i] * col[i];
    sum += pc;
  }
  gl_FragColor = vec4(vec3(sum), 1.0) * vVertexColor;

}