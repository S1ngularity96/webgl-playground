
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GLScript from '../src/GLScript';

type GLProps = {
    script?: string
    args?: any[]
}


async function postExecGL(props: GLProps, gl: WebGLRenderingContext) {
    if (props.script) {
        const module: GLScript = await import(`../src/scripts/${props.script}/index.ts`)
        module.default.onRun(gl, props.args);
    }
}


const canvas = ref<HTMLCanvasElement>();
const props: GLProps = defineProps<GLProps>()

onMounted(async () => {
    try {
        if (!canvas.value) throw new Error("No canvas ref in component")
        const gl = canvas.value.getContext("webgl");
        if (!gl) throw new Error("Could not get WebGL Context")
        await postExecGL(props, gl);
    } catch (err) {
        alert((err as Error).message)
    }
})
</script>

<template>
    <p v-if="props.script == undefined">No script available</p>
    <canvas ref="canvas" width="680" height="480" id="canvas"></canvas>
</template>

<style>
#canvas {
    border: 1px black solid;
}
</style>