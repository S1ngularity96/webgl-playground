import vertexShaderSource from "./shader/shader.vert?raw";
import fragmentShaderSource from "./shader/shader.frag?raw";
import { createBufferObject, createGrid, createProgram, createShader, drawCircle } from "../../utils/index";

function drawInTriangleMode(gl: WebGLRenderingContext, program: WebGLProgram) {
  createGrid(gl, program, 0.5);
  drawCircle(gl, program, 0.3);
}

function drawInPointsMode(gl: WebGLRenderingContext, program: WebGLProgram) {
  let positions = [];

  for (let x = -1; x <= 1; x += 0.001) {
    let y = Math.sin(x * 10);
    positions.push(x);
    positions.push(y);
  }

  createGrid(gl, program, 0.1);

  let data = new Float32Array(positions);
  const buffer_id = createBufferObject(gl, data);
  if (buffer_id !== null) {
    let location = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_id);
    gl.drawArrays(gl.POINTS, 0, positions.length / 2);
  }
}

function drawInLinesStripMode(gl: WebGLRenderingContext, program: WebGLProgram) {
  let positions = [];
  for (let x = -1; x <= 1; x += 0.01) {
    let y = Math.cos(x * 10 - 2);
    positions.push(x);
    positions.push(y);
  }

  createGrid(gl, program, 0.3);

  const sine_wave_buffer = createBufferObject(gl, new Float32Array(positions));
  if (sine_wave_buffer !== null) {
    let location = gl.getAttribLocation(program, "a_position");
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, sine_wave_buffer);
    gl.drawArrays(gl.LINE_STRIP, 0, positions.length / 2);
  }
}

function onRun(gl: WebGLRenderingContext, out: (msg: string) => void, args: any[]) {
  const mode = args[0];
  out(`Try to draw in mode: ${mode}`);
  // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (vertexShader && fragmentShader) {
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (program) {
      gl.useProgram(program);

      switch (mode) {
        case "points":
          drawInPointsMode(gl, program);
          break;
        case "triangle":
          drawInTriangleMode(gl, program);
          break;
        case "lines-strip":
          drawInLinesStripMode(gl, program);
          break;
      }
    }
  }
}

export default {
  onRun,
};
