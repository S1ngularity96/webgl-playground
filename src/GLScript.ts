export default interface GLScript {
  default: { onRun: (gl: WebGLRenderingContext, out: (msg: string) => void, args?: any[]) => void };
}
