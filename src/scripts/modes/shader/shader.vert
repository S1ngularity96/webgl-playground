// an attribute will receive data from a buffer
attribute vec4 a_position;
varying vec4 v_vertex_color;
  // all shaders have a main function
void main() {
  //mandatory because OpenGL on windows needs this to be set -.-
  gl_PointSize = float(2);
    // gl_Position is a special variable a vertex shader
    // is responsible for setting
  v_vertex_color = vec4(a_position[0]+1.0,a_position[1]+1.0, a_position[0]+1.0, 1.0);
  gl_Position = a_position;
}