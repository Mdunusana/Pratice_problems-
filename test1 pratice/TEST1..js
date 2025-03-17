const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert("WebGL not supported!");
}

// Vertex Shader
const vertexShaderSource = `
    attribute vec2 a_position;
    uniform vec2 u_translation;
    void main() {
        gl_Position = vec4(a_position + u_translation, 0, 1);
    }
`;

// Fragment Shader
const fragmentShaderSource = `
    precision mediump float;
    uniform vec4 u_color;
    void main() {
        gl_FragColor = u_color;
    }
`;

// Compile Shader function
function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

// Create program
const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
}
gl.useProgram(program);

// Set up geometry
const vertices = new Float32Array([
    -0.5, -0.5,  0.0,  0.5,  0.5, -0.5,
    -0.5, -0.5,  0.5, -0.5,  0.0, -0.8,
]);
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Get attribute location
const positionAttrib = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(positionAttrib);
gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

// Get uniform locations
const translationUniform = gl.getUniformLocation(program, "u_translation");
const colorUniform = gl.getUniformLocation(program, "u_color");

// Movement variables
let translation = [0, 0];
let direction = 1;

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Update bouncing lines
    translation[1] += 0.01 * direction;
    if (translation[1] > 0.5 || translation[1] < -0.5) {
        direction *= -1;
    }

    gl.uniform2fv(translationUniform, translation);
    gl.uniform4f(colorUniform, 0.0, 0.0, 1.0, 1.0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
}
render();

// Button controls
function move(dx, dy) {
    translation[0] += dx;
    translation[1] += dy;
}

document.getElementById("up").onclick = () => move(0, 0.1);
document.getElementById("down").onclick = () => move(0, -0.1);
document.getElementById("left").onclick = () => move(-0.1, 0);
document.getElementById("right").onclick = () => move(0.1, 0);
