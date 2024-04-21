var gl;
var points;

window.onload = function init(){
var canvas = document.getElementById("gl-canvas");
gl = WebGLUtils.setupWebGL(canvas);
if (!gl) { alert("WebGL isn't available"); }


var triangle1 = [
    vec2( -0.5, 0 ),
    vec2( 0.5, 0),
    vec2( 0, 0.8)   
];
var rectangle1 = [
    vec2 (-0.5,0),
    vec2 (0.5,0),
    vec2 (0.5, -1),
    vec2 (-0.5,-1)
]

var rectangle2 = [
    vec2 (0,-0.5),
    vec2 (0.3,-0.5),
    vec2 (0.3, -1),
    vec2 (0,-1)
]

// Configure WebGL
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0, 1, 1, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT);

renderSHAPES("fragment-shader2", triangle1, 3);
renderSHAPES("fragment-shader3", rectangle1, 4);
renderSHAPES("fragment-shader4", rectangle2, 4);

};

function renderSHAPES(id, shape, v) {
    var program = initShaders(gl, "vertex-shader", id);
    gl.useProgram(program);
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(shape), gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    gl.drawArrays(gl.TRIANGLE_FAN, 0, v);
}
