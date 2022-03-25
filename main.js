function init() //initializes webgl
{
    var canvas = document.getElementById("webgl-canvas"); //
    gl = canvas.getContext("webgl2");
    // sets the color for the paint
    gl.clearColor(0.0, 0.5, 0.0, 1.0); 
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    cube = new Cube(gl, "Cube-vertex-shader", "Cube-fragment-shader"); 
    render();
}
    function render() 
    {
        //this actually clears the canvas
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // color buffer stores what color each pixel is, depth buffering shows how deep it is
        cube.render();
                
    };
    
    window.onload = init;