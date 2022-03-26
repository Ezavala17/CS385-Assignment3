

function Cube( gl, vertexShaderId, fragmentShaderId ) 
{
    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);
        if (this.program < 0) {
            alert("Error: Cube shader pipeline failed to compile.\n\n" +
                "\tvertex shader id:  \t" + vertShdr + "\n" +
                "\tfragment shader id:\t" + fragShdr + "\n");
            return;
        }


        var vertexPositions = [
        -0.5,-0.5,-0.5,     0.5,-0.5,-0.5, 
        0.5, 0.5,-0.5,      -0.5, 0.5,-0.5,
        -0.5,-0.5, 0.5,     0.5,-0.5, 0.5, 
        0.5, 0.5, 0.5,      -0.5, 0.5, 0.5,
        -0.5,-0.5,-0.5,     -0.5, 0.5,-0.5, 
        -0.5, 0.5, 0.5,     -0.5,-0.5, 0.5,
        0.5,-0.5,-0.5,      0.5, 0.5,-0.5, 
        0.5, 0.5, 0.5,      0.5,-0.5, 0.5,
        -0.5,-0.5,-0.5,     -0.5,-0.5, 0.5, 
        0.5,-0.5, 0.5,      0.5,-0.5,-0.5,
        -0.5, 0.5,-0.5,     -0.5, 0.5, 0.5, 
        0.5, 0.5, 0.5,       0.5, 0.5,-0.5, 
        ];

        var colors = [
        5,3,7, 5,3,7,       5,3,7, 5,3,7,
        1,1,3, 1,1,3,       1,1,3, 1,1,3,
        0,0,1, 0,0,1,       0,0,1, 0,0,1,
        1,0,0, 1,0,0,       1,0,0, 1,0,0,
        1,1,0, 1,1,0,       1,1,0, 1,1,0,
        0,1,0, 0,1,0,       0,1,0, 0,1,0
        ];

        var indices = [
        0,1,2,      0,2,3, 
        4,5,6,      4,6,7,
        8,9,10,     8,10,11, 
        12,13,14,   12,14,15,
        16,17,18,   16,18,19, 
        20,21,22,   20,22,23 
        ];

    var positions_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positions_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositions), gl.STATIC_DRAW);

    var color_buffer = gl.createBuffer ();
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var index_buffer = gl.createBuffer ();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    var positions_attributeLoc = gl.getAttribLocation(this.program, "aPosition");
    gl.enableVertexAttribArray(positions_attributeLoc);

    var color_attributeLoc = gl.getAttribLocation(this.program, "vColor");
    gl.enableVertexAttribArray(color_attributeLoc);

    MV = gl.getUniformLocation(this.program, "MV");
        
    
    this.MV = mat4();

    this.render = function () {
        gl.useProgram(this.program);

        gl.bindBuffer(gl.ARRAY_BUFFER, positions_buffer);
        gl.vertexAttribPointer(positions_attributeLoc, 3,
            gl.FLOAT, gl.FALSE, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
        gl.vertexAttribPointer(color_attributeLoc, 3,
            gl.FLOAT, gl.FALSE, 0, 0);

        gl.uniformMatrix4fv(MV, gl.FALSE, flatten(this.MV));

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    }

};

        
        


