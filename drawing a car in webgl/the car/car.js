const canvas = document.querySelector(`canvas`);
const gl= canvas.getContext(`webgl`);
gl.clearColor( 0.1,0.0,0.0,0.1);

gl.clear( gl.COLOR_BUFFER_BIT);

// PETTING THE POINTS FOR MY TRAINGEL 
const points = new Float32Array([ -0.5,-0.5, -0.5,0.5, 0.5,0.5]);

const color = new Float32Array( [ 1,0,0,1,  0,1,0,1,  0,0,1,1]);

// crearting buffers for my code 
const buffer = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, buffer);
gl.bufferData( gl.ARRAY_BUFFER,points,gl.STATIC_DRAW);

const cbuffer= gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER,cbuffer);
gl.bufferData( gl.ARRAY_BUFFER,color,gl.STATIC_DRAW);

/// creating ths shders for my code 
const vsSource=`  
attribute vec2 pos;
attribute vec4 col;
varying vec4 vCol;
void main()
{
gl_Position=vec4( pos ,0.0,1.0);
vCol= col;
}`;
const fsSource = `   
 precision mediump float;
 varying  vec4 vCol;

void main()
{
gl_FragColor= vCol;

}`;
 // creating shders for my sources 
 function complileShader( gl,source,type){
 const vertexshader= gl.createShader(gl.VERTEX_SHADER);
 gl.shaderSource(vertexshader,vsSource );

 gl.compileShader( vertexshader);

  const fragmentshader= gl.createShader( gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentshader,fsSource);
  gl.compileShader( fragmentshader);


  // craeting the program for my shaders 

  const program= gl.createProgram();
  gl.attachShader( program,vertexshader);
  gl.attachShader( program,fragmentshader);
  gl.linkProgram( program);

  gl.bindBuffer( gl.ARRAY_BUFFER,buffer);
  const positionlocation = gl.getAttribLocation(program, "pos");

  gl.enableVertexAttribArray( positionlocation);
  gl.vertexAttribPointer( positionlocation,3, gl.FLOAT,false,0,0);

  gl.bindBuffer( gl.ARRAY_BUFFER,cbuffer);
  const colorLocation = gl.getAttribLocation(program, "col");

  gl.enableVertexAttribArray( colorLocation);
  gl.vertexAttribPointer( colorLocation,4,gl.FLOAT,false,0,0);
  gl.useProgram(program);
 gl.drawArrays( gl.TRIANGLES,0,3);




