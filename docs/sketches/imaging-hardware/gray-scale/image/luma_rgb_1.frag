#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D content;

float Y = 1.0/2.0;

void main() {
  vec2 cordinates = vTexCoord;
  cordinates.y = 1.0 - cordinates.y;
  vec4 current = texture2D(content, cordinates);
  float luma = dot(pow(current.rgb, vec3(Y, Y, Y)), vec3(0.599, 0.587, 0.114));
  gl_FragColor = vec4(luma,luma,luma,1.0);
}