#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D content;

void main() {
  vec2 cordinates = vTexCoord;
  cordinates.y = 1.0 - cordinates.y;
  vec4 current = texture2D(content, cordinates);
  float average = dot(current.rgb, vec3(1.0/3.0, 1.0/3.0, 1.0/3.0));
  gl_FragColor = vec4(average,average,average,1.0);
}