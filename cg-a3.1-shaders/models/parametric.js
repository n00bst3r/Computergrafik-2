/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: ParametricSurface
 *
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var ParametricSurface = function (posFunc, config) {
            /*
             * Parameter u und v:
             */
            var umin = config.umin;
            var umax = config.umax;
            var vmin = config.vmin;
            var vmax = config.vmax;
            var uSegments = config.uSegments;
            var vSegments = config.vSegments;

            /**
             *
             * Gr��e eines Elements u
             */
            var du = (umax - umin) / uSegments;

            /**
             * Gr��e eines Elements v
             *
             */

            var dv = (vmax - vmin) / vSegments;


            this.positions = new Float32Array((uSegments + 1) * (vSegments + 1) * 3);
            this.indices = new Uint32Array((uSegments) * (vSegments) * 2 * 3);


            /**
             * Array with colors.
             * @type {Float32Array}
             */
            this.colors = new Float32Array((uSegments + 1) * (vSegments + 1) * 3);

            var color = new THREE.Color();
            var indexCounter = 0;
            var counter = 0;
            //Abtasten der Segmente:
            for (var i = 0; i <= uSegments; i++) {
                var u = umin + (i * du);  //beginnt bie umin und endet bei umax.
                for (var j = 0; j <= vSegments; j++) {

                    var v = vmin + (j * dv);

                    var xyz = posFunc(u, v);


                    var x = xyz[0];
                    var y = xyz[1];
                    var z = xyz[2];

                    this.positions[counter] = x;
                    this.positions[counter + 1] = y;
                    this.positions[counter + 2] = z;

                    color.setRGB(1, 0, 0);
                    this.colors[counter]     = color.r;
                    this.colors[counter + 1] = color.g;
                    this.colors[counter + 2] = color.b;


                    var temp = i * (vSegments + 1) + j;
                    // TODO: Fehler: Gehe zu weit.... if-Bedingung, die das ausschlie�t.
                    this.indices[indexCounter] = temp;
                    this.indices[indexCounter + 1] = temp + 1;
                    this.indices[indexCounter + 2] = temp + vSegments + 1;


                    this.indices[indexCounter + 3] = temp + vSegments + 1;
                    this.indices[indexCounter + 4] = temp + vSegments + 2;
                    this.indices[indexCounter + 5] = temp + 1;
                    indexCounter = indexCounter + 6;  //wie bei Band.js 6 Indizes-Schritte
                    counter = counter + 3;  //Sorgt daf�r, dass in 3 Punkteschritten gegangen wird.
                }
            }
            console.log("IndexCounter:" + (indexCounter - 6));
            console.log("Length Array: "+ this.indices.length);


            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };

            this.getIndices = function() {
                return this.indices;
            }

        };

        return ParametricSurface;
    }));

