# Interleaved Buffer

Interleaved data puts all model data into a single 1-dimensional array and uploads the data to a single buffer object. When you link an attribute variable in your vertex shader to a buffer object you have to tell WebGL how to get to the specific data for that variable. This is done using the parameters of the gl.vertexAttribPointer function.

```js
gl.vertexAttribPointer(uint index, int size, enum type, bool normalized, long stride, long offset);
```

The parameters have the following meaning:

- `index` : the location of the attribute variable to link to.
- `size` : the number of components in the attribute value; 1, 2, 3 or 4.
- `type` : the data type of each component value; e.g., gl.FLOAT.
- `normalized` : if true, integer values are normalized to -1.0 to + 1.0; For WebGL, always false.
- `stride` : number of bytes between the start of one attribute value and the next attribute value.
- `offset` : number of bytes to skip to get to the first value.

## Example (Theory)

Lets create three triangles with different colors from one buffer.

```
[
    r1, g1, b1, a1, x1,y1, r1, g1, b1, a1, x2,y2, r1, g1, b1, a1, x3,y3
    r2, g2, b2, a2, x1,y1, r2, g2, b2, a2, x2,y2, r2, g2, b2, a2, x3,y3 
]

```

With following attributes: 

```
atribute vec3 a_color;
attribute vec2 a_vertex;
```

## Example (Applied)

<GL script="interleaved_buffer" :args="[]"/>

::: code-group

<<< @/src/scripts/interleaved_buffer/index.ts{ts}[Main]
<<< @/src/scripts/interleaved_buffer/shader/shader.frag{glsl}[Fragment Shader]
<<< @/src/scripts/interleaved_buffer/shader/shader.vert{glsl}[Vertex Shader]

:::
