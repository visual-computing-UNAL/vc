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
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}