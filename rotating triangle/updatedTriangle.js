const canvas = document.querySelector(`canvas`);
const gl = canvas.getContext(`webgl`);

gl.clearColor(0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([
    -0.5, 0.0, 0.0,
    0.5, 0.0, 0.0,
    0.0, -0.5, 0.0
]);

const colours = new Float32Array([
    1.0,0.0,0.0,
    0.0,1.0,0.0,
    0.0,0.0,1.0
]);

const v_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, v_buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const c_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, c_buffer);
gl.bufferData(gl.ARRAY_BUFFER, colours, gl.STATIC_DRAW);

const vsSource = `
    attribute vec3 pos;
    attribute vec3 col;
    uniform float shift;
    varying vec3 vCol;
    uniform mat4 rotation;
    void main(){
        gl_Position = rotation * vec4(pos, 1.0) + vec4(shift, 0.0, 0.0, 1.0);
        vCol = col;
    }`;

const fsSource = `
    precision mediump float;
    varying vec3 vCol;
    void main(){
        gl_FragColor = vec4(vCol, 1.0);
    }`;

const vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vsSource);
gl.compileShader(vertShader);

const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fsSource);
gl.compileShader(fragShader);

const program = gl.createProgram();
gl.attachShader(program, vertShader);
gl.attachShader(program, fragShader);
gl.linkProgram(program);

gl.bindBuffer(gl.ARRAY_BUFFER, v_buffer);
const attrib_1 = gl.getAttribLocation(program, `pos`);
gl.enableVertexAttribArray(attrib_1);
gl.vertexAttribPointer(attrib_1, 3, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, c_buffer);
const attrib_2 = gl.getAttribLocation(program, `col`);
gl.enableVertexAttribArray(attrib_2);
gl.vertexAttribPointer(attrib_2, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);

const uniLoc = gl.getUniformLocation(program, `rotation`);
const shiftLoc = gl.getUniformLocation(program, `shift`);

let shift = 0.03;
let myshift = 0;
let move = 0;
let val;
start_x = -1;
start_y = -1;
start_z = -1;

draw();

function draw(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    myshift += shift;
    if(start_x == 1){
        val = xRot(myshift);
        //gl.uniformMatrix4fv(uniLoc, false, val);
    }

    else if(start_y == 1){
        val = yRot(myshift);
        //gl.uniformMatrix4fv(uniLoc, false, val);
    }
    else if(start_z == 1){
        val = zRot(myshift);
        
    }
    
    
    gl.uniformMatrix4fv(uniLoc, false, val);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    window.requestAnimationFrame(draw);
}

function yRot(Rads){

    var cos = Math.cos(Rads);
    var sin = Math.sin(Rads);

    return new Float32Array([
        cos, 0.0, -sin, 0.0,
        0.0, 1.0, 0.0, 0.0,
        sin, 0.0, cos, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}

function xRot(Rads){

    var cos = Math.cos(Rads);
    var sin = Math.sin(Rads);

    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, cos, sin, 0.0,
        0.0, -sin, cos, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}


function zRot(Rads){

    var cos = Math.cos(Rads);
    var sin = Math.sin(Rads);

    return new Float32Array([
        cos, -sin, 0.0, 0.0,
        sin, cos, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
}


function xSpin(){
    start_x *= -1;
}

function ySpin(){
    start_y *= -1;
}

function zSpin(){
    start_z *= -1;
}

function moveRight(){
    move += shift;
}

function moveLeft(){
    move -= shift;
}