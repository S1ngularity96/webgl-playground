
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import GLScript from '../src/GLScript';


interface State {
    logs: string[]
}

const state: State = reactive<State>({
    logs: []
});

type GLProps = {
    script?: string
    args?: any[]
}


function out(msg: string) {
    state.logs.push(msg);
}

async function postExecGL(props: GLProps, gl: WebGLRenderingContext) {
    if (props.script) {
        const module: GLScript = await import(`../src/scripts/${props.script}/index.ts`)
        module.default.onRun(gl, out, props.args);
    }
}

async function load() {
    try {
        if (!canvas.value) throw new Error("No canvas ref in component")
        const gl = canvas.value.getContext("webgl");
        if (!gl) throw new Error("Could not get WebGL Context")
        await postExecGL(props, gl);
    } catch (err) {
        alert((err as Error).message)
    }
}


const canvas = ref<HTMLCanvasElement>();
const props: GLProps = defineProps<GLProps>()



onMounted(async () => {
    await load();
})
</script>

<template>
    <p v-if="props.script == undefined">No script available</p>
    <p>Last Reload: {{ Intl.DateTimeFormat('de', { timeStyle: 'medium' }).format(Date.now()) }}</p>
    <canvas ref="canvas" width="680" height="480" id="canvas"></canvas>
    <details style=" padding: 0; margin: 0 0;">
        <summary>Output Log</summary>
        <div style="border: 1px solid; border-radius: 4px; padding: 4px; height:50px; overflow: hidden; overflow-y: scroll">
            <span style="font-size: 10px;" v-for="(log, index) in state.logs" :key="index">{{ log }} <br></span>
        </div>
    </details>
</template>

<style>
#canvas {
    border: 1px gray solid;
    border-radius: 8px;
}
</style>