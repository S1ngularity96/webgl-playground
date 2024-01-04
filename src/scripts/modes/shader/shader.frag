 // fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;
uniform vec4 u_color;
varying vec4 v_vertex_color;
void main() {
    
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
    if(u_color != vec4(0, 0, 0, 0)) {
        gl_FragColor = u_color;
    } else {
        gl_FragColor = v_vertex_color;
    }
}