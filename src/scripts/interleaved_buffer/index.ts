import "../../../types/global.d.ts";
import vertexShaderSource from "./shader/shader.vert?raw";
import fragmentShaderSource from "./shader/shader.frag?raw";
import { createBufferObject, createGrid, createProgram, createShader, drawCircle } from "../../utils";

function createTriangle(color: number[], vertices: number[]): Array<number> | null {
  const data = [];
  if (color.length === 4 && vertices.length === 6) {
    return [...color, vertices[0], vertices[1], ...color, vertices[2], vertices[3], ...color, vertices[4], vertices[5]];
  }
  return null;
}

function onRun(gl: WebGLRenderingContext, out: (msg: string) => void, args: any[]) {
  // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (vertexShader && fragmentShader) {
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (program) {
      gl.useProgram(program);
      const a_positionLocation = gl.getAttribLocation(program, "a_position");
      const a_colorLocation = gl.getAttribLocation(program, "a_color");
      const red = [1, 0, 0, 1];
      const blue = [0, 0, 1, 1];
      const green = [0, 1, 0, 1];

      const triangleOne = createTriangle(blue, [-0.5, -0.5, -0.5, 0.5, 0.5, -0.5]);
      const triangleTwo = createTriangle(green, [0.5, 0.5, 0.5, -0.5, -0.5, 0.5]);

      if (triangleOne == null && triangleTwo == null) {
        alert("Could not create triangles");
      } else {
        const data = new Float32Array([...triangleOne, ...triangleTwo]);
        const bpe = data.BYTES_PER_ELEMENT;
        const triangleBuffer = createBufferObject(gl, data);
        if (triangleBuffer != null) {
          out("Buffer initialized");
          gl.enableVertexAttribArray(a_positionLocation);
          gl.enableVertexAttribArray(a_colorLocation);
          gl.vertexAttribPointer(a_colorLocation, 4, gl.FLOAT, false, bpe * 6, 0);
          gl.vertexAttribPointer(a_positionLocation, 2, gl.FLOAT, false, bpe * 6, bpe * 4);

          gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
          out(`Bytes per element in data: ${data.BYTES_PER_ELEMENT}`);
          out("Try to draw triangles");
        }
      }
    }
  }
}

export default {
  onRun,
};
