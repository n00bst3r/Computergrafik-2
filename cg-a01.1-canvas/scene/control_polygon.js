/**
 * Created by Daniel on 03.11.2015.
 */
define(["util", "Scene"], (function(Util, Scene) {

    "use strict";

    var ControlPolygon = function(getPoint0, getPoint1, getPoint2, getPoint3, setPosition, lineStyle) {

        // callbacks
        this.getPoint0 = getPoint0;
        this.getPoint1 = getPoint1;
        this.getPoint2 = getPoint2;
        this.getPoint3 = getPoint3;
        this.setPosition = setPosition;

        // default style
        this.lineStyle = {
            radius: 6,
            width: 4,
            color: "#00ff00",
            fill: false
        };

        // draggers
        this.isDragger = true;
    };

    // draw 3 lines
    ControlPolygon.prototype.draw = function(context) {
        var point0 = this.getPoint0();
        var point1 = this.getPoint1();
        var point2 = this.getPoint2();
        var point3 = this.getPoint3();

        context.beginPath();
        context.lineTo(point0[0], point0[1]);
        context.lineTo(point1[0], point1[1]);
        context.lineTo(point2[0], point2[1]);
        context.lineTo(point3[0], point3[1]);

        // style
        context.lineWidth = this.lineStyle.width;
        context.strokeStyle = this.lineStyle.color;

        // start drawing
        context.stroke();
    };

    // do not hit that thang!
    ControlPolygon.prototype.isHit = function(context, mousePosition) {
        return false;
    };

    // Event handler triggered by a SceneController when mouse is being dragged
    ControlPolygon.prototype.mouseDrag = function(dragEvent) {
        // change position of the original object
        this.setPosition(dragEvent);
    };

    // this module exposes only the constructor for Dragger objects
    return ControlPolygon;
}));
