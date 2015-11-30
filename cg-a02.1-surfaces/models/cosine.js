/**
 * Created by Daniel on 30.11.2015.
 */
define(["three", "parametric"],
    (function(THREE, ParametricSurface) {

        "use strict";

        var Cosine = function (a, b, c, config){
            this.config = config;

            var CosineFunction = function(u, v) {
                var x = Math.cos(u) *a;
                var y = Math.cos(v) *b  ;
                var z = Math.cos(u+v) * a;
                return[x, y, z]
            };

            var parametricSurface = new ParametricSurface(CosineFunction, this.config);

            this.positions = parametricSurface.getPositions();
            this.colors = parametricSurface.getColors();

            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };



        };
        return Cosine;

    }));