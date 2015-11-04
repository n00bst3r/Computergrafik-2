/**
 * Created by Daniel on 02.11.2015.
 */
define(["vec2", "PointDragger","Scene", "StraightLine"],
    (function( vec2, PointDragger,Scene, StraightLine) {
    "use strict";

    var ParametricCurve = function(xT, yT, tMin, tMax, segments, lineStyle) {

        console.log("creating ParametricCurve with x(t) = " + xT + " and y(t) = " + yT +
            ", segments " + segments + ", between [ " + tMin + " and " + tMax + " ]");

        // line style
        this.lineStyle = lineStyle || {
                width: "2",
                color: "#FFAAAA"
            };

        // initial values in case a parameter is undefined
        this.xT = xT || "350 * Math.sin(t)";
        this.yT = yT || "150 * Math.cos(t)";
        this.tMin = tMin || 0;
        this.tMax = tMax || Math.PI * 2;
        this.segments = segments || 6;
        this.lines = new Array(this.segments);
        console.log("this: "+this);
        createParametricCurve(this);
    };

        var createParametricCurve = function(curve) {

            var points = [];
            for (var i = 0; i < curve.segments + 1; i++) {

                // t = t_min + i/segments * (t_max - t_min)
                var t = curve.tMin + i / curve.segments * (curve.tMax - curve.tMin);
                points.push([eval(curve.xT), eval(curve.yT)]);
            }

            for (var i = 1; i < curve.segments + 1; i++) {
                curve.lines[i - 1] = new StraightLine(points[i - 1], points[i], curve.lineStyle);
            }
        };

        ParametricCurve.prototype.draw = function(context) {

            // draw line
            context.beginPath();

            for (var i = 0; i < this.segments; i++) {
                this.lines[i].draw(context);
            }
            console.log("Curve Klasse zeichnet");
            // start drawing
            context.stroke();
        };

        // test if mouse is on the line
        ParametricCurve.prototype.isHit = function(context, mousePosition) {
            for (var i = 0; i < this.lines.length; i++) {
                if (this.lines[i].isHit(context, mousePosition)) {
                    return true;
                }
            }
            return false;
        };

        // empty list
        ParametricCurve.prototype.createDraggers = function() {
            return [];
        };

        // this module only exports the constructor for ParametricCurve objects
        return ParametricCurve;

    })); // define
