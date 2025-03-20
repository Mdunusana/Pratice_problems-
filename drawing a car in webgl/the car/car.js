const canvas = document.getElementById("myCanvas");
const gl = canvas.getContext("webgl");



// Clear the canvas
gl.clearColor(0.9, 0.9, 0.9, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Define the vertices for the car (body, wheels, etc.)
const carVertices = new Float32Array([
    // Car body (rectangle)
    -0.5, -0.2,  // Bottom-left
    0.5, -0.2,   // Bottom-right

    0.5, -0.2,   // Bottom-right
    0.5, 0.2,    // Top-right

    0.5, 0.2,    // Top-right
    -0.5, 0.2,   // Top-left

    -0.5, 0.2,   // Top-left
    -0.5, -0.2,  // Bottom-left

    // Wheels (circles approximated with lines)
    -0.3, -0.3,  // Left wheel (bottom-left)
    -0.2, -0.3,  // Left wheel (bottom-right)

    0.3, -0.3,   // Right wheel (bottom-left)
    0.2, -0.3,   // Right wheel (bottom-right)
]);

// Create and bind the position buffer
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, carVertices, gl.STATIC_DRAW);

// Vertex shader source
const vsSource = `
    attribute vec2 pos;

    void main() {
        gl_Position = vec4(pos, 0.0, 1.0);
    }
`;

// Fragment shader source
const fsSource = `
    precision mediump float;

    void main() {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color for the lines
    }
`;

// Create and compile the vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("Vertex shader compilation failed:", gl.getShaderInfoLog(vertexShader));
}

// Create and compile the fragment shader
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("Fragment shader compilation failed:", gl.getShaderInfoLog(fragmentShader));
}

// Create and link the shader program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program linking failed:", gl.getProgramInfoLog(program));
}
gl.useProgram(program);

// Bind the position buffer and set up the attribute
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positionLocation = gl.getAttribLocation(program, "pos");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// Draw the car using lines
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.LINES, 0, carVertices.length / 2);