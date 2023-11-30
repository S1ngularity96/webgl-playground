 // fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;
uniform vec4 u_color;
void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
    if(u_color == vec4(0, 0, 0, 0)) {
        gl_FragColor = vec4(1, 1, 1, 1.0);

    } else {
        gl_FragColor = u_color; // return redish-purple
    }
}