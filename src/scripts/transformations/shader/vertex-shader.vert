// Vertex Shader
precision mediump int;
precision mediump float;

uniform mat4 u_Transform;

attribute vec2 a_Vertex;

void main() {
  // Transform the location of the vertex
  gl_Position = u_Transform * vec4(a_Vertex, 0, 1);

}