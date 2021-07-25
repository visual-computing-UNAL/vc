#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D content;

void main() {
  vec2 cordinates = vTexCoord;
  cordinates.y = 1.0 - cordinates.y;
  vec4 current = texture2D(content, cordinates);
  current.rgb = 1.0 - current.rgb;
  gl_FragColor = current;
}