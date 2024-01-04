import vertexShaderSource from "./shader/vertex-shader.vert?raw";
import fragmentShaderSource from "./shader/fragment-shader.frag?raw";
import {
  createBufferObject,
  createProgram,
  createShader,
  setAttributeLocations,
  setUniformLocations,
} from "../../utils/index";
import { MathCollection, cos, sin, matrix, identity } from "mathjs";

const AttributeLocations = {
  a_Vertex: 0,
};

const UniformLocations = {
  u_Transform: 0,
};

function matToFloat32Array(mat: Array<number[]>): Float32Array {
  let array: Array<number> = [];
  mat.forEach((cell) => array.push(...cell));
  return new Float32Array(array);
}

function matTranslate(x: number, y: number, z: number): Array<number[]> {
  const matTranslate = matrix(identity(4) as MathCollection);
  matTranslate.set([3, 0], x);
  matTranslate.set([3, 1], y);
  matTranslate.set([3, 2], z);
  return matTranslate.toArray() as Array<number[]>;
}

function matScale(x: number, y: number, z: number): Array<number[]> {
  const matScale = matrix(identity(4) as MathCollection);
  matScale.set([0, 0], x);
  matScale.set([1, 1], y);
  matScale.set([2, 2], z);
  return matScale.toArray() as Array<number[]>;
}

function matRotateX(angle: number): Array<number[]> {
  const matRotate = matrix(identity(4) as MathCollection);
  matRotate.set([1, 1], cos(angle));
  matRotate.set([1, 2], sin(angle));
  matRotate.set([2, 1], -sin(angle));
  matRotate.set([2, 2], cos(angle));
  return matRotate.toArray() as Array<number[]>;
}

function matRotateY(angle: number): Array<number[]> {
  const matRotate = matrix(identity(4) as MathCollection);
  matRotate.set([0, 1], cos(angle));
  matRotate.set([0, 3], -sin(angle));
  matRotate.set([3, 0], sin(angle));
  matRotate.set([3, 3], cos(angle));
  return matRotate.toArray() as Array<number[]>;
}

function drawCube(gl: WebGLRenderingContext) {
  const cube_strip = [0, 0, 0, 0.5, 0.5, 0];

  const cubeBuffer = createBufferObject(gl, new Float32Array(cube_strip));
  if (cubeBuffer === null) {
    alert("Buffer is null");
    return;
  }

  gl.enableVertexAttribArray(AttributeLocations.a_Vertex);
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
  gl.vertexAttribPointer(AttributeLocations.a_Vertex, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function onRun(gl: WebGLRenderingContext, out: (msg: string) => void, args: any[]) {
  out("Try to draw cube");
  // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (vertexShader && fragmentShader) {
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (program) {
      gl.useProgram(program);
      setUniformLocations(gl, program, UniformLocations);
      console.log(matToFloat32Array(matRotateX(2)))
      gl.uniformMatrix4fv(UniformLocations.u_Transform, false, matToFloat32Array(matRotateX(0)));

      setAttributeLocations(gl, program, AttributeLocations);
      drawCube(gl);
    }
  }
}

export default { onRun };
