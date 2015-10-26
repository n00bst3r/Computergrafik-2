/**
 * Created by Daniel on 15.10.2015.
 */
/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
    (function(util,vec2,Scene,PointDragger) {

        "use strict";

        /**
         *  A simple straight line that can be dragged
         *  around by its endpoints.
         *  Parameters:
         *  - point0 and point1: array objects representing [x,y] coordinates of start and end point
         *  - lineStyle: object defining width and color attributes for line drawing,
         *       begin of the form { width: 2, color: "#00FF00" }
         */

        var Circle = function(middle, radius, lineStyle) {

            console.log("creating circle at [" +
                middle[0] + "," + middle[1] + "] with radius " + radius + ".");

            // draw style for drawing the line
            this.lineStyle = lineStyle || { width: "2", color: "#0000AA" };

            // initial values in case either point is undefined
            this.middle = middle || [10,10];
            this.radius = radius || 10;

            // draw this line into the provided 2D rendering context
            this.draw = function(context) {

                // draw actual line
                context.beginPath();

                // set points to be drawn
                context.arc(this.middle[0], this.middle[1], this.radius, 0, 2 * Math.PI);

                // set drawing style
                context.lineWidth = this.lineStyle.width;
                context.strokeStyle = this.lineStyle.color;

                // actually start drawing
                context.stroke();

            };

        };

        // this module only exports the constructor for StraightLine objects
        return Circle;

    })); // define