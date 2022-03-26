var angle = 0;
function init() //initializes webgl
{
    var canvas = document.getElementById("webgl-canvas"); //
    gl = canvas.getContext("webgl2");
    
    gl.clearColor(0.0, 0.5, 0.5, 1.0); 
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    cube = new Cube(gl, "Cube-vertex-shader", "Cube-fragment-shader"); 
    render();
    requestAnimationFrame(render);
}
    function render() 
    {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        angle = angle + 1;
        
        cube.MV = rotate(angle, [1, 1, 1]);
        cube.render();
        
        requestAnimationFrame(render);
    };
    
    window.onload = init;