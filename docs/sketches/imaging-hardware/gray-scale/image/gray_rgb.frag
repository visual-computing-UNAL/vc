#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D tex;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  vec4 tex_f = texture2D(tex, uv);

  float gray = dot(tex_f.rgb, vec3(1.0/3.0, 1.0/3.0, 1.0/3.0));

  gl_FragColor = vec4(gray,gray,gray,1.0);
}