/**
 * Created by Daniel on 02.11.2015.
 */
define([ "vec2", "Scene", "PointDragger"],
    (function(vec2,PointDragger) {

        var p = [];
        var c = [];
        var BezierCurve = function(p0, p1, p2, p3, segments, lineStyle) {

            console.log("creating bezire Curve with p0 [" + p0 + "], p1 [" + p1 + "], p2 [" + p2 + "], p3 [" + p3 + "] and " + segments + " segments.");

            p[0] = p0 || [150, 230];
            p[1] = p1 || [145, 161];
            p[2] = p2 || [250, 201];
            p[3] = p3 || [400, 250];

            this.segments = segments || 20;
            // draw style for drawing the line
            this.lineStyle = lineStyle || { width: "2", color: "#0000AA" };
            this.tickmarks = tickmarks || false;
        };

        //script CG2-U03-Arbeiten-mit-Kurven.pdf page 11 //
        var casteljau = function (t){
            // step 1
            var a0 = vec2.add(vec2.mult(p[0], 1-t),vec2.mult(p[1], t));
            var a1 = vec2.add(vec2.mult(p[1], 1-t),vec2.mult(p[2], t));
            var a2 = vec2.add(vec2.mult(p[2], 1-t),vec2.mult(p[3], t));

            // step 2
            var b0 = vec2.add(vec2.mult(a0, 1-t),vec2.mult(a1, t));
            var b1 = vec2.add(vec2.mult(a1, 1-t),vec2.mult(a2, t));

            // step 3
            var c = vec2.add(vec2.mult(b0, 1-t),vec2.mult(b1, t));

            return c;
        }

        function normale(pt1, pt2){
            var v = vec2.sub(pt1, pt2);
            var d = vec2.length(v);
            var direction = [v[0]/d, v[1]/d];
            return [ -direction[1], direction[0] ];
        }

        // draw this bezier into the provided 2D rendering context
        BezierCurve.prototype.draw = function(context) {

            // draw actual line
            context.beginPath();
            // draws a line between the points
            context.moveTo(p[0][0], p[0][1]);
            context.lineTo(p[1][0], p[1][1]);

            context.moveTo(p[1][0], p[1][1]);
            context.lineTo(p[2][0], p[2][1]);

            context.moveTo(p[2][0], p[2][1]);
            context.lineTo(p[3][0], p[3][1]);


            //script CG2-U03-Arbeiten-mit-Kurven.pdf page 6//
            var t = 0;
            //berechne N+1 punkte
            for (var i = 0; i <= this.segments; i++){
                c[i] = casteljau(t);
                t = t+1/this.segments;
            }

            //zeichne N segmente
            for (var i = 1; i <= this.segments; i++){
                context.moveTo(c[i-1][0], c[i-1][1]);
                context.lineTo(c[i][0], c[i][1]);

                //tick marks
                if(this.tickmarks == true){
                    var n = normale([ c[i-1][0], c[i-1][1] ], [ c[i][0], c[i][1] ]);
                    context.moveTo(c[i-1][0]+n[0]*10, c[i-1][1]+n[1]*10 );
                    context.lineTo(c[i-1][0]-n[0]*10, c[i-1][1]-n[1]*10 );
                }
            }

            // set drawing style
            context.lineWidth = this.lineStyle.width;
            context.strokeStyle = this.lineStyle.color;

            // actually start drawing
            context.stroke();
        };

        BezierCurve.prototype.isHit = function(context, apos) {
            var t = 0;
            // project point on line, get parameter of that projection point
            for (var i = 0; i < c.length - 1; i++) {
                t = vec2.projectPointOnLine(apos, c[i], c[i + 1])

                // outside the line segment?
                if (t >= 0 && t <= 1) {
                    // coordinates of the projected point
                    var pos = vec2.add(c[i], vec2.mult(vec2.sub(c[i + 1], c[i]), t));

                    // distance of the point from the line
                    var d = vec2.length(vec2.sub(pos, apos));

                    // allow 10 pixels extra "sensitivity"
                    // hitting the line
                    if (d <= (this.lineStyle.width / 2) + 10){
                        console.log("Curve: Hit");
                        return true;
                    }
                }
                console.log("Curve: Missed");
                return false;
            }
        }

        // return list of draggers to manipulate this line
        BezierCurve.prototype.createDraggers = function() {
            var draggerStyle = { radius:4, color: this.lineStyle.color, width:0, fill:true }
            var draggers = [];

            // create closure and callbacks for dragger

            var getP0 = function() { return p[0]; };
            var getP1 = function() { return p[1]; };
            var getP2 = function() { return p[2]; };
            var getP3 = function() { return p[3]; };

            var setP0 = function(dragEvent) { p[0] = dragEvent.position; };
            var setP1 = function(dragEvent) { p[1] = dragEvent.position; };
            var setP2 = function(dragEvent) { p[2] = dragEvent.position; };
            var setP3 = function(dragEvent) { p[3] = dragEvent.position; };

            draggers.push( new PointDragger(getP0, setP0, draggerStyle) );
            draggers.push( new PointDragger(getP1, setP1, draggerStyle) );
            draggers.push( new PointDragger(getP2, setP2, draggerStyle) );
            draggers.push( new PointDragger(getP3, setP3, draggerStyle) );

            return draggers;
        };

        // this module only exports the constructor for StraightLine objects
        return BezierCurve;

    }));
