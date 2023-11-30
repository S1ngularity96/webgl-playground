// an attribute will receive data from a buffer
attribute vec4 a_position;
attribute vec3 a_color;

varying vec3 v_color;
  // all shaders have a main function
void main() {
  v_color = a_color;
  gl_Position = a_position;
}