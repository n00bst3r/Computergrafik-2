/**
 * Created by Daniel on 02.11.2015.
 */
define([ "vec2", "Scene", "PointDragger","Param_curve","StraightLine","ControlPolygon"],
    (function(vec2,PointDragger, ParametricCurve,StraightLine,ControlPolygon) {

        var BezierCurve = function(point0, point1, point2, point3, tMin, tMax, segments, lineStyle) {

            console.log("creating bezierCurve with " + segments + " segments, between [ " + tMin + " and " + tMax + " ]");

            // line style
            this.lineStyle = lineStyle || {
                    width: "4",
                    color: "#0000AA"
                };

            // initial values in case a parameter is undefined
            this.point0 = point0 || [0.4, 0.4];
            this.point1 = point1 || [0.6, 0.6];
            this.point2 = point2 || [0.3, 0.7];
            this.point3 = point3 || [0.2, 0.8];
            this.tMin = 0;
            this.tMax = 1;
            this.segments = segments || 20;
            this.lines = [];
            createBezierCurve(this);
        };

        var createBezierCurve = function(bezier) {
            // create new array and push the first point
            var points = [];
            bezier.lines = [];

            for (var i = 0; i <= bezier.segments; i++) {
                var t = 1 / bezier.segments * i;

                // P = (1 ? t)^3 * [Point0] + 3(1 ? t)^2 * t * [Point1] + 3 (1 ? t) * t^2 * [Point1] + t^3 * [Point3]
                var x = (Math.pow((1 - t), 3) * bezier.point0[0]) + (3 * Math.pow((1 - t), 2) * t * bezier.point1[0]) + (3 * (1 - t) * Math.pow(t, 2) * bezier.point2[0]) + (Math.pow(t, 3) * bezier.point3[0]);
                var y = (Math.pow((1 - t), 3) * bezier.point0[1]) + (3 * Math.pow((1 - t), 2) * t * bezier.point1[1]) + (3 * (1 - t) * Math.pow(t, 2) * bezier.point2[1]) + (Math.pow(t, 3) * bezier.point3[1]);;

                //push points into the array
                points.push([x, y]);
            }

            for (var i = 1; i <= bezier.segments; i++) {
                bezier.lines[i - 1] = new StraightLine(points[i - 1], points[i], bezier.lineStyle);
            }
        };

        BezierCurve.prototype.isHit = ParametricCurve.prototype.isHit;

        // return empty list of draggers
        BezierCurve.prototype.createDraggers = function() {

            var editStyle = {
                radius: 4,
                color: "#ff0000",
                width: 0,
                fill: false
            }

            var draggerStyle = {
                radius: 4,
                color: this.lineStyle.color,
                width: 0,
                fill: true
            }

            var polygonStyle = {
                radius: 4,
                width: 2,
                color: "#ff0000",
                fill: false
            };

            var draggers = [];

            // create closure and callbacks for dragger
            var _curve = this;
            var getPoint0 = function() {
                return _curve.point0;
            };
            var getPoint1 = function() {
                return _curve.point1;
            };
            var getPoint2 = function() {
                return _curve.point2;
            };
            var getPoint3 = function() {
                return _curve.point3;
            };

            var setPoint0 = function(dragEvent) {
                _curve.point0 = dragEvent.position;
            };
            var setPoint1 = function(dragEvent) {
                _curve.point1 = dragEvent.position;
            };
            var setPoint2 = function(dragEvent) {
                _curve.point2 = dragEvent.position;
            };
            var setPoint3 = function(dragEvent) {
                _curve.point3 = dragEvent.position;
            };

            draggers.push(new ControlPolygon(getPoint0, getPoint1, getPoint2, getPoint3, setPoint0, polygonStyle));

            draggers.push(new PointDragger(getPoint0, setPoint0, draggerStyle));
            draggers.push(new PointDragger(getPoint1, setPoint1, editStyle));
            draggers.push(new PointDragger(getPoint2, setPoint2, editStyle));
            draggers.push(new PointDragger(getPoint3, setPoint3, draggerStyle));
            return draggers;
        };

        // draw ParametricCurve onto the provided 2D rendering context
        BezierCurve.prototype.draw = function(context) {
            createBezierCurve(this);
            // draw line
            context.beginPath();

            for (var i = 0; i < this.segments; i++) {
                this.lines[i].draw(context);
            }
            // start drawing
            context.stroke();

        };

        // this module only exports the constructor for ParametricCurve objects
        return BezierCurve;
    })); // define