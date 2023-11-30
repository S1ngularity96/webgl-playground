export default interface GLScript {
  default: { onRun: (gl: WebGLRenderingContext, args?: any[]) => void };
}
