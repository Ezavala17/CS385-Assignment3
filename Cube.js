

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

        this.colors = {
            numComponents: 4,
            values: new Float32Array([
                // front
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                // back
                0.75, 0.25, 0.5, 1.0,
                0.75, 0.25, 0.5, 1.0,
                0.75, 0.25, 0.5, 1.0,
                0.75, 0.25, 0.5, 1.0,
                // top
                0.25, 0.25, 0.75, 1.0,
                0.25, 0.25, 0.75, 1.0,
                0.25, 0.25, 0.75, 1.0,
                0.25, 0.25, 0.75, 1.0,
                // bottom
                1.0, 0.0, 0.15, 1.0,
                1.0, 0.0, 0.15, 1.0,
                1.0, 0.0, 0.15, 1.0,
                1.0, 0.0, 0.15, 1.0,
                // right
                0.0, 1.0, 0.15, 1.0,
                0.0, 1.0, 0.15, 1.0,
                0.0, 1.0, 0.15, 1.0,
                0.0, 1.0, 0.15, 1.0,
                // left
                0.5, 0.5, 1.0, 1.0,
                0.5, 0.5, 1.0, 1.0,
                0.5, 0.5, 1.0, 1.0,
                0.5, 0.5, 1.0, 1.0,
            ])
        };

        this.positions = {
            values: new Float32Array([
                // Front Face
                -1.0, -1.0,  1.0,
                1.0, -1.0,  1.0,
                1.0,  1.0,  1.0,
               -1.0,  1.0,  1.0,
             
               // Back face
               -1.0, -1.0, -1.0,
               -1.0,  1.0, -1.0,
                1.0,  1.0, -1.0,
                1.0, -1.0, -1.0,
             
               // Top face
               -1.0,  1.0, -1.0,
               -1.0,  1.0,  1.0,
                1.0,  1.0,  1.0,
                1.0,  1.0, -1.0,
             
               // Bottom face
               -1.0, -1.0, -1.0,
                1.0, -1.0, -1.0,
                1.0, -1.0,  1.0,
               -1.0, -1.0,  1.0,
             
               // Right face
                1.0, -1.0, -1.0,
                1.0,  1.0, -1.0,
                1.0,  1.0,  1.0,
                1.0, -1.0,  1.0,
             
               // Left face
               -1.0, -1.0, -1.0,
               -1.0, -1.0,  1.0,
               -1.0,  1.0,  1.0,
               -1.0,  1.0, -1.0,
            ]),

            numComponents: 3
        };


        this.indices = {
            values: new Uint16Array([
                0,  1,  2,      0,  2,  3,    // front
                4,  5,  6,      4,  6,  7,    // back
                8,  9,  10,     8,  10, 11,   // top
                12, 13, 14,     12, 14, 15,   // bottom
                16, 17, 18,     16, 18, 19,   // right
                20, 21, 22,     20, 22, 23,   // left
            ])
        };

        var edges = [
            0, 1,  // "Front" face edges
            1, 2,
            2, 3,
            3, 0,
            4, 5,  // "Back" face edges
            5, 6,
            6, 7,
            7, 4,
            0, 4,  // "Side" edges
            1, 5,
            2, 6,
            3, 7
        ];

        this.positions.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW);

        this.colors.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colors.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors.values, gl.STATIC_DRAW);

        this.positions.attributeLoc = gl.getAttribLocation(this.program, "aPosition");
        gl.enableVertexAttribArray(this.positions.attributeLoc);

        this.colors.attributeLoc = gl.getAttribLocation(this.program, "vColor");
        gl.enableVertexAttribArray(this.colors.attributeLoc);

        this.indices.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW);

        edges.buffer = gl.createBuffer();
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
        gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(edges), gl.STATIC_DRAW );
       

        this.render = function () {
            gl.useProgram(this.program);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
            gl.vertexAttribPointer(this.positions.attributeLoc, this.positions.numComponents,
                gl.FLOAT, gl.FALSE, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.colors.buffer);
            gl.vertexAttribPointer(this.colors.attributeLoc, this.colors.numComponents,
                gl.FLOAT, gl.FALSE, 0, 0);

            //gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
            //gl.drawElements( gl.LINES, edges.length, gl.UNSIGNED_SHORT, 0 );

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
            gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);


            //
            //var offset = this.indices.count * 2 /* sizeof(UNSIGNED_INT) */;
           // var offset = this.indices.values.length * 2 /* sizeof(UNSIGNED_INT) */;
           // gl.drawElements( gl.TRIANGLES, this.indices.values.length , gl.UNSIGNED_SHORT, offset );
        };
};

