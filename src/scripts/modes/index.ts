import "../../../types/global.d.ts"
import vertexShaderSource from "./shader/shader.vert?raw";
import fragmentShaderSource from "./shader/shader.frag?raw";
import { range } from "lodash";
function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  var shader = gl.createShader(type);
  if (shader) {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
  return null;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  var program: WebGLProgram | null = gl.createProgram();
  if (program) {
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }
  return null;
}

function createBufferObject(gl: WebGLRenderingContext, data: Float32Array): WebGLBuffer | null {
  let buffer_id = gl.createBuffer();
  if (!buffer_id) {
    console.log("Failed to create buffer object");
    return null;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer_id);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer_id;
}

function drawInTriangleMode(gl: WebGLRenderingContext, program: WebGLProgram) {
  createGrid(gl, program, 0.5);
  drawCircle(gl, program, 0.3);
}

function drawInPointsMode(gl: WebGLRenderingContext, program: WebGLProgram) {
  let positions = [];

  for (let x = -1; x <= 1; x += 0.001) {
    let y = Math.sin(x * 10 - 2);
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

function createGrid(gl: WebGLRenderingContext, program: WebGLProgram, grid_width: number = 0.5) {
  let x_axis = [];
  let y_axis = [];
  for (let x = -1; x <= 1; x += grid_width) {
    for (let y = -1; y <= 1; y += grid_width) {
      x_axis.push(-1, y, 1, y);
      y_axis.push(x, -1, x, 1);
    }
  }

  let uniform_color = gl.getUniformLocation(program, "u_color");
  const grid_x_buffer = createBufferObject(gl, new Float32Array(x_axis));
  const grid_y_buffer = createBufferObject(gl, new Float32Array(y_axis));
  if (grid_x_buffer !== null && grid_y_buffer !== null) {
    gl.uniform4fv(uniform_color, new Float32Array([0.25, 0.25, 0.25, 0]));
    let location = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, grid_x_buffer);
    gl.drawArrays(gl.LINES, 0, x_axis.length / 2);

    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, grid_y_buffer);
    gl.drawArrays(gl.LINES, 0, y_axis.length / 2);
    gl.uniform4fv(uniform_color, new Float32Array([0, 0, 0, 0]));
  }
}

function drawCircle(gl: WebGLRenderingContext, program: WebGLProgram, radius: number = 1) {
  let triangles: Array<number> = [];
  let uniform_color = gl.getUniformLocation(program, "u_color");
  const stepSize = 0.001;
  let ranges = range(0, 4 * Math.PI, stepSize);
  ranges.forEach((step, index) => {
    const nextStep = ranges.length - 1 > index ? step : ranges[index + 1];
    triangles.push(
      0,
      0,
      Math.sin(step) * radius,
      Math.cos(step) * radius,
      Math.sin(nextStep) * radius,
      Math.cos(nextStep) * radius
    );
  });
  const circleBuffer = createBufferObject(gl, new Float32Array(triangles));
  if (circleBuffer != null) {
    let location = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, circleBuffer);
    gl.uniform4fv(uniform_color, [0.1, 0, 1, 0]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, triangles.length / 6);

    gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
    gl.uniform4fv(uniform_color, [0, 0, 0, 0]);
    gl.drawArrays(gl.POINTS, 0, triangles.length / 6);
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

function onRun(gl: WebGLRenderingContext, args: any[]) {
  const mode = args[0];
  console.log(`Try to draw in mode: ${mode}`);
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
