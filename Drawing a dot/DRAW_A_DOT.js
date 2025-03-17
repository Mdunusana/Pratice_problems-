// 1. Get WebGL context
const canvas = document.getElementById("webgl-canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert("WebGL not supported!");
}

// 2. Define vertex shader
const vertexShaderSource = `
    attribute vec2 a_Position;
    void main() {
        gl_Position = vec4(a_Position, 0.0, 1.0);
        gl_PointSize = 10.0; // Size of the dot
    }
`;

// 3. Define fragment shader
const fragmentShaderSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
    }
`;

// 4. Function to compile shaders
function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

// 5. Create shaders
const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

// 6. Create and link WebGL program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// 7. Define dot position (x, y in clip space)
const dotPosition = new Float32Array([0.0, 0.0]); // Center of screen

// 8. Create buffer
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, dotPosition, gl.STATIC_DRAW);

// 9. Get attribute location, enable, and point to buffer
const a_Position = gl.getAttribLocation(program, "a_Position");
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(a_Position);

// 10. Clear and draw
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS, 0, 1);
