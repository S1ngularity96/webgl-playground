export default interface GLScript {
    default: { onRun: (gl: WebGLRenderingContext) => void }
}