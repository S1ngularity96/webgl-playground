# OpenGL Modes

## Point
<GL script="modes" :args="['points']"/>

## Triangle (using triangles to draw a circle )
<GL script="modes" :args="['triangle']"/>

## Line-Strip
<GL script="modes" :args="['lines-strip']"/>

::: code-group

<<< @/src/scripts/modes/index.ts{ts}[Main]
<<< @/src/scripts/modes/shader/shader.frag{glsl}[Fragment Shader]
<<< @/src/scripts/modes/shader/shader.vert{glsl}[Vertex Shader]

:::
