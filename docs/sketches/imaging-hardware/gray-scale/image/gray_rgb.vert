#ifdef GL_ES
precision mediump float;
#endif

// Geometry position attribute
attribute vec3 aPosition;
// Geometry texture coordinate
attribute vec2 aTexCoord;

// vertex texcoord
varying vec2 vTexCoord;

void main() {
  // copy / interpolate texcoords
  vTexCoord = aTexCoord;
  // vertex projection into clipspace
  gl_Position = vec4(aPosition, 1.0);
}
