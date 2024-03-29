
/*
 *  RequireJS alias/path configuration (http://requirejs.org/)
 */

requirejs.config({
    paths: {

        // jquery library
        "jquery": [
            // try content delivery network location first
            'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
            //If the load via CDN fails, load locally
            '../lib/jquery-1.7.2.min'],

        // gl-matrix library
        "gl-matrix": "../lib/gl-matrix-1.3.7",

        "util" : "./utils/util",

        "Scene" : "./scene/scene",
        "Line" : "./scene/line",
        "Param_curve" : "./scene/param_curve",
        "Bezier_curve" : "./scene/bezier_curve",
        "Circle" : "./scene/circle",
        "Point" : "./scene/point",
        "PointDragger" : "./scene/point_dragger",
        "ControlPolygon" : "./scene/control_polygon",
        "BoundingBox" : "./kdtree/boundingbox",
        "KdNode" : "./kdtree/kdnode",
        "KdTree" : "./kdtree/kdtree",
        "kdutil" : "./kdtree/kdutil",
        "StraightLine":"./scene/straight_line",
        "vec2" : "./math/vec2",

        "SceneController" : "./controller/scene_controller",
        "HtmlController" : "./controller/html_controller"
    }
});


/*
 * The function defined below is the "main" function,
 * it will be called once all prerequisites listed in the
 * define() statement are loaded.
 *
 */

/* requireJS module definition */
define(["jquery", "gl-matrix", "util",
        "Scene", "SceneController", "HtmlController"],

    (function($, glmatrix, util,
              Scene, SceneController, HtmlController) {

        "use strict";


        /*
         * main program, to be called once the document has loaded
         * and the DOM has been constructed
         *
         */

        $(document).ready( (function() {

            console.log("document ready - starting!");

            // get the canvas element to be used for drawing
            var canvas=$("#drawing_area").get(0);
            if(!canvas) {
                throw new util.RuntimeError("drawing_area not found", this);
            }

            // get 2D rendering context for canvas element
            var context=canvas.getContext("2d");
            if(!context) {
                throw new util.RuntimeError("could not create 2D rendering context", this);
            }

            // create scene with background color
            var scene = new Scene("#FFF");

            // create SceneController to process and map events
            var sceneController = new SceneController(context,scene);

            // callbacks for the various HTML elements (buttons, ...)
            var htmlController = new HtmlController(context,scene,sceneController);

            // draw scene initially
            scene.draw(context);

        })); // $(document).ready()

    })); // define module

