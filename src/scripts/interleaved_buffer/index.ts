import vertexShaderSource from "./shader/shader.vert?raw";
import fragmentShaderSource from "./shader/shader.frag?raw";
import { createBufferObject, createGrid, createProgram, createShader, drawCircle } from "../../utils";

function onRun(gl: WebGLRenderingContext, args: any[]) {
  // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (vertexShader && fragmentShader) {
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (program) {
      gl.useProgram(program);
      const a_positionLocation = gl.getAttribLocation(program, "a_position");
      const a_colorLocation = gl.getAttribLocation(program, "a_color");

      const red = [1, 0, 0];
      const green = [0, 1, 0];
      const blue = [0, 0, 1];
      const triangleOne = [0, 0, 1, 0, 0, 1];
      const triangleTwo = [0, 0, -1, 0, -1, 1];
      const triangleThree = [0, 0, 0, 1, -1, 0];

      const data = new Float32Array([...red, ...triangleOne]);

      const bytes_per_float = data.BYTES_PER_ELEMENT;
      const triangleBuffer = createBufferObject(gl, data);

      if (triangleBuffer != null) {
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
        gl.vertexAttribPointer(a_colorLocation, 3, gl.FLOAT, false, bytes_per_float * 9, 0);
        gl.vertexAttribPointer(a_positionLocation, 6, gl.FLOAT, false, bytes_per_float * 9, bytes_per_float * 3);
        gl.drawArrays(gl.TRIANGLES, 0, 1);
      }
    }
  }
}

export default {
  onRun,
};
