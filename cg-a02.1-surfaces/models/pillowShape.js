/**
 * Created by Daniel on 30.11.2015.
 */
define(["three", "parametric"],
    (function(THREE, ParametricSurface) {

        "use strict";

        var PillowShape = function (a, b, c, config){
            this.config = config;

            var PillowFunction = function(u, v) {
                var x = Math.cos(u) * a;
                var y = Math.cos(v) *b;
                var z = Math.sin(v) * Math.sin(u)* c;
                return[x, y, z]
            };

            var parametricSurface = new ParametricSurface(PillowFunction, this.config);

            this.positions = parametricSurface.getPositions();
            this.colors = parametricSurface.getColors();


            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };

            this.getIndices = function() {
                return parametricSurface.getIndices();
            }



        };
        return PillowShape;

    }));