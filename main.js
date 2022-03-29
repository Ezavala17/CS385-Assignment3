var angle = 0;

function init() //initializes webgl
{
    canvas = document.getElementById("webgl-canvas"); //
    gl = canvas.getContext("webgl2");

    fovy = 30;
    aspect = canvas.clientWidth / canvas.clientHeight;
    near = .10;
    far = 1000;

    eye = [0, 0, -8];
    at = [0, 0, 0]
    up = [0, 1, 0];
    
    gl.clearColor(0.0, 0.5, 0.5, 1.0); 
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    cube = new Cube(gl, "Cube-vertex-shader", "Cube-fragment-shader");

    cube.V = lookAt(eye, at, up); 
    cube.P = perspective(fovy , aspect, near, far);
    render();

}
    function render() 
    {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        angle = angle + 1;
        origin = [1, 1, 1]
        
        cube.MV = rotate(angle, origin);
        
        
        cube.render(); 
        
        requestAnimationFrame(render);
    };
    
    window.onload = init;