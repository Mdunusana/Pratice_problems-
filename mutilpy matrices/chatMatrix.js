// Get the WebGL context
const canvas = document.querySelector(`canvas`);
const gl = canvas.getContext(`webgl`);

// Ensure WebGL is available
if (!gl) {
    alert("WebGL not supported!");
    throw new Error("WebGL not supported");
}

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Vertex shader code
const vertexShaderSource = `
    attribute vec4 a_position;
    uniform mat4 u_modelViewMatrix;
    uniform mat4 u_projectionMatrix;
    void main() {
        gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
    }
`;

// Fragment shader code
const fragmentShaderSource = `
    void main() {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); // Green color
    }
`;

// Function to compile shaders

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    
   
// Compile vertex and fragment shaders
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Create shader program
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

// Ensure the program linked successfully
if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error("ERROR linking program:", gl.getProgramInfoLog(shaderProgram));
    throw new Error("Shader program link failed");
}

gl.useProgram(shaderProgram);

// Define cube vertices (8 vertices for a cube)
const vertices = new Float32Array([
    -1.0, -1.0, -1.0,  // Vertex 0
    1.0, -1.0, -1.0,   // Vertex 1
    1.0,  1.0, -1.0,   // Vertex 2
    -1.0,  1.0, -1.0,  // Vertex 3
    -1.0, -1.0, 1.0,   // Vertex 4
    1.0, -1.0, 1.0,    // Vertex 5
    1.0,  1.0, 1.0,    // Vertex 6
    -1.0,  1.0, 1.0    // Vertex 7
]);

// Define indices for drawing the cube's faces (12 triangles)
const indices = new Uint16Array([
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    0, 1, 5, 0, 5, 4,
    2, 3, 7, 2, 7, 6,
    1, 2, 6, 1, 6, 5,
    4, 7, 3, 4, 3, 0
]);

// Create buffers for vertices and indices
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

// Get attribute and uniform locations


const uModelViewMatrix = gl.getUniformLocation(shaderProgram, 'u_modelViewMatrix');
const uProjectionMatrix = gl.getUniformLocation(shaderProgram, 'u_projectionMatrix');

// Enable attribute array for position
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
const aPosition = gl.getAttribLocation(shaderProgram, 'a_position');
gl.enableVertexAttribArray(aPosition);
gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);


// Set up projection matrix (perspective)
const projectionMatrix = new Float32Array([
    2.0 / canvas.width, 0, 0, 0,
    0, 2.0 / canvas.height, 0, 0,
    0, 0, -2.0 / (1000 - 0.1), 0,
    0, 0, -(1000 + 0.1) / (1000 - 0.1), 1
]);

// Rotation matrices for each axis
function rotationMatrix(angle, axis) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const matrix = new Float32Array(16);
    
    if (axis === 'x') {
        matrix.set([
            1, 0, 0, 0,
            0, cos, -sin, 0,
            0, sin, cos, 0,
            0, 0, 0, 1
        ]);
    } else if (axis === 'y') {
        matrix.set([
            cos, 0, sin, 0,
            0, 1, 0, 0,
            -sin, 0, cos, 0,
            0, 0, 0, 1
        ]);
    } else if (axis === 'z') {
        matrix.set([
            cos, -sin, 0, 0,
            sin, cos, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }
    
    return matrix;
}

let angleX = 0;
let angleY = 0;
let angleZ = 0;

// Draw function (for animation)
function drawScene() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    // Model View Matrix (apply rotation)
    let modelViewMatrix = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, -5,
        0, 0, 0, 1
    ]);
    
    
    // Combine rotation matrices with model view matrix
    modelViewMatrix = multiplyMatrices(rotationMatrix(angleX, 'x'), modelViewMatrix);
    modelViewMatrix = multiplyMatrices(rotationMatrix(angleY, 'y'), modelViewMatrix);
    modelViewMatrix = multiplyMatrices(rotationMatrix(angleZ, 'z'), modelViewMatrix);
    
    // Set the rotation matrix as a uniform
    gl.uniformMatrix4fv(uModelViewMatrix, false, modelViewMatrix);
    gl.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);
    
    // Draw the cube
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    
    // Increment the rotation angles for animation
    angleX += 0.01;
    angleY += 0.01;
    angleZ += 0.01;
    
    requestAnimationFrame(drawScene);
}

// Multiply two 4x4 matrices
function multiplyMatrices(a, b) {
    const result = new Float32Array(16);
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            result[row * 4 + col] = 0;
            for (let k = 0; k < 4; k++) {
                result[row * 4 + col] += a[row * 4 + k] * b[k * 4 + col];
            }
        }
    }
    return result;
}

// Enable depth testing
gl.enable(gl.DEPTH_TEST);

// Start rendering the scene
drawScene();
