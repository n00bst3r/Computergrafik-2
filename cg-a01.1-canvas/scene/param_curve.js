/**
 * Created by Daniel on 02.11.2015.
 */
define(["vec2", "PointDragger"],
    (function( vec2, PointDragger) {
    "use strict";

    var ParametricCurve = function(tmin, tmax, xt, yt, segments, lineStyle) {

        console.log("creating Parametric Curve with x(t)  [" +
            xt + "], y(t) [" + yt + "], tMin [" + tmin + "], tMax [" + tmax + "] and " + segments + " segments.");

        // draw style for drawing the line
        this.lineStyle = lineStyle || { width: "2", color: "#0000AA" };

        this.xt = xt || "350+100*Math.sin(t)";
        this.yt = yt || "150+100*Math.cos(t)";
        this.tmin = tmin || 0;
        this.tmax = tmax || 8;
        this.segments = segments || 10;
        this.tickMarks = tickmarks || false;
        this.p = [];
    };

    function normale(pt1, pt2){
        var v = vec2.sub(pt1, pt2);
        var d = vec2.length(v);
        var direction = [v[0]/d, v[1]/d];
        return [ -direction[1], direction[0] ];
    }

    // draw this parametric curve into the provided 2D rendering context
    ParametricCurve.prototype.draw = function(context) {
        var delta = (this.tmax - this.tmin) / this.segments;
        var t = this.tmin;

        // draw actual line
        context.beginPath();
        //script CG2-U03-Arbeiten-mit-Kurven.pdf page 6 //
        //berechne N+1 punkte
        for (var i = 0; i<= this.segments; i++){
            this.p[i] = [eval(this.xt), eval(this.yt)];
            //console.log("t: " + t + " Delta: " + delta);
            t += delta;
        }
        //zeichne N segmente
        for (var i = 1; i<= this.segments; i++){
            context.moveTo(this.p[i-1][0], this.p[i-1][1]);
            context.lineTo(this.p[i][0], this.p[i][1]);

            //tick marks
            if(this.tickmarks == true){
                var n = normale(
                    [ this.p[i-1][0], this.p[i-1][1] ], //this.p[i-1]
                    [ this.p[i][0], this.p[i][1] ]
                );
                context.moveTo(this.p[i-1][0]+n[0]*5, this.p[i-1][1]+n[1]*5 );
                context.lineTo(this.p[i-1][0]-n[0]*5, this.p[i-1][1]-n[1]*5 );
            }
        }
        // set drawing style
        context.lineWidth = this.lineStyle.width;
        context.strokeStyle = this.lineStyle.color;

        // actually start drawing
        context.stroke();
    };

    ParametricCurve.prototype.isHit = function(context, apos) {
        var t = 0;
        // project point on line, get parameter of that projection point
        for (var i = 0; i < this.p.length - 1; i++) {
            t = vec2.projectPointOnLine(apos, this.p[i], this.p[i + 1])

            // outside the line segment?
            if (t >= 0 && t <= 1) {
                // coordinates of the projected point
                var pos = vec2.add(this.p[i], vec2.mult(vec2.sub(this.p[i + 1], this.p[i]), t));

                // distance of the point from the line
                var d = vec2.length(vec2.sub(pos, p));

                // allow 2 pixels extra "sensitivity"
                // hitting the line
                if (d <= (this.lineStyle.width / 2) + 2){
                    console.log("Curve: Hit");
                    return true;
                }
            }
            console.log("Curve: Missed");
            return false;
        }
    }
    ParametricCurve.prototype.createDraggers = function() {
        return [];
    };
    return ParametricCurve;
}));
