// Select the canvas and get WebGL context
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

// Set clear color and clear the canvas
gl.clearColor(0.1, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Define the triangle vertices
const points = new Float32Array([
  -0.5, -0.5, 
  -0.5,  0.5, 
   0.5,  0.5
]);

// Define the colors (RGBA for each vertex)
const colors = new Float32Array([
  1, 0, 0, 1,  
  0, 1, 0, 1,  
  0, 0, 1, 1  
]);

// Create and bind a vertex buffer
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

// Create and bind a color buffer
const cbuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, cbuffer);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

// Vertex Shader
const vsSource = `
  attribute vec2 pos;
  attribute vec4 col;
  varying vec4 vCol;
  void main() {
    gl_Position = vec4(pos, 0.0, 1.0);
    vCol = col;
  }
`;

// Fragment Shader
const fsSource = `
  precision mediump float;
  varying vec4 vCol;
  void main() {
    gl_FragColor = vCol;
  }
`;

// Function to compile shaders
function compileShader(gl, source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader Compilation Error:", gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}


// Compile vertex and fragment shaders
const vertexShader = compileShader(gl, vsSource, gl.VERTEX_SHADER);
const fragmentShader = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);

// Create the shader program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// Check for program link errors
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error("Program Link Error:", gl.getProgramInfoLog(program));
}

// Use the shader program
gl.useProgram(program);

// Bind vertex position buffer
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
const positionLocation = gl.getAttribLocation(program, "pos");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// Bind color buffer
gl.bindBuffer(gl.ARRAY_BUFFER, cbuffer);
const colorLocation = gl.getAttribLocation(program, "col");
gl.enableVertexAttribArray(colorLocation);
gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);

// Draw the triangle
gl.drawArrays(gl.TRIANGLES, 0, 3);
 // thindgs to take note of from this code : learning how to add the rotion to my code 
 // codes for adding rotation 
  function yRot( Rads)

