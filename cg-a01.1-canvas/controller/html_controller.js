/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "Line", "Circle","Point", "KdTree", "util", "kdutil","Param_curve", "Bezier_curve"],
    (function($, Line, Circle, Point, KdTree, Util, KdUtil, ParametricCurve, BezierCurve) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(context,scene,sceneController) {

            var kdTree;
            var pointList = [];


            // generate random X coordinate within the canvas
            var randomX = function() {
                return Math.floor(Math.random()*(context.canvas.width-10))+5;
            };

            // generate random Y coordinate within the canvas
            var randomY = function() {
                return Math.floor(Math.random()*(context.canvas.height-10))+5;
            };

            // generate random radius within the canvas
            var randomR = function() {
                return Math.floor(Math.random() * ((context.canvas.height / 2) - 10)) + 5;
            };

            // generate random color in hex notation
            var randomColor = function() {

                // convert a byte (0...255) to a 2-digit hex string
                var toHex2 = function(byte) {
                    var s = byte.toString(16); // convert to hex string
                    if(s.length == 1) s = "0"+s; // pad with leading 0
                    return s;
                };

                var r = Math.floor(Math.random()*25.9)*10;
                var g = Math.floor(Math.random()*25.9)*10;
                var b = Math.floor(Math.random()*25.9)*10;

                // convert to hex notation
                return "#"+toHex2(r)+toHex2(g)+toHex2(b);
            };

            /*
             * event handler for "new line button".
             */
            $("#btnNewLine").click( (function() {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };

                var line = new Line( [randomX(),randomY()],
                    [randomX(),randomY()],
                    style );
                scene.addObjects([line]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(line); // this will also redraw

            }));
            $("#btnRdmCircle").click( (function() {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };

                var circle = new Circle([randomX(), randomY()], randomR(), style);

                scene.addObjects([circle]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(circle); // this will also redraw

            }));

            /*
             * Event Handler for the NewPoint Button
             */
            $("#btnNewPoint").click( (function() {
                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };
                var r;
                var point = new Point([randomX(), randomY()],r, style);
                scene.addObjects([point]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(point); // this will also redraw
            }));

            sceneController.onSelection(function() {
                var object = this.getSelectedObject();
                $("#inputLineWidth").val(object.lineStyle.width);
                $("#inputColor").val(object.lineStyle.color);
                if (object instanceof Circle) {
                    $("#inputRadius").prop("disabled", false);
                    $("#inputRadius").val(object.radius);
                } else {
                    $("#inputRadius").val(0); //Hier wird aktiv gesetzt oder auch nicht.
                    $("#inputRadius").prop("disabled", true);
                }
            });

            /**
             * Event handler that changes the color of the selected object if the color of
             * the input field is changed.
             */
            $("#inputColor").change(function() {
                var object = sceneController.getSelectedObject();
                object.lineStyle.color = this.value;
                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(object);
            });

            /**
             * Event handler that changes the width of the selected object if the value of
             * the input field is changed.
             */
            $("#inputLineWidth").change(function() {
                var object = sceneController.getSelectedObject();
                object.lineStyle.width = this.value;
                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(object);
            });

            /**
             * Event handler that changes the radius of the selected circle if the value of
             * the input field is changed.
             */
            $("#inputRadius").change(function() {
                var object = sceneController.getSelectedObject();
                object.radius = this.value;
                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(object);
            });

            $("#btnNewPointList").click( (function() {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };

                var numPoints = parseInt($("#numPoints").attr("value"));;
                for(var i=0; i<numPoints; ++i) {
                    var point = new Point([randomX(), randomY()], 5,
                        style);
                    scene.addObjects([point]);
                    pointList.push(point);
                }

                // deselect all objects, then select the newly created object
                sceneController.deselect();

            }));

            $("#visKdTree").click( (function() {

                var showTree = $("#visKdTree").attr("checked");
                console.log("Checking constraints in showTree...")
                if(showTree && kdTree) {
                    console.log("showTree constraints given...");
                    console.log(kdTree);
                    KdUtil.visualizeKdTree(sceneController, scene, kdTree.root, 0, 0, 600, true);
                }

            }));

            $("#btnBuildKdTree").click( (function() {
                console.log("Build Tree Button gedrückt...");

                kdTree = new KdTree(pointList);

            }));

            /**
             * creates a random query point and
             * runs linear search and kd-nearest-neighbor search
             */
            $("#btnQueryKdTree").click( (function() {

                var style = {
                    width: 2,
                    color: "#ff0000"
                };
                var queryPoint = new Point([randomX(), randomY()], 2,
                    style);
                scene.addObjects([queryPoint]);
                sceneController.select(queryPoint);

                console.log("query point: ", queryPoint.center);

                ////////////////////////////////////////////////
                // TODO: measure and compare timings of linear
                //       and kd-nearest-neighbor search
                ////////////////////////////////////////////////
                var linearTiming;
                var kdTiming;

                var start = new Date().getTime();
                var end;

                var minIdx = KdUtil.linearSearch(pointList, queryPoint);

                end = new Date().getTime();
                linearTiming = end - start;

                console.log("nearest neighbor linear: ", pointList[minIdx].center);
                console.log("Duration of nearest neighbor linear: " + linearTiming + " msecs.");

                start = new Date().getTime();
                var kdNearestNeighbor = kdTree.findNearestNeighbor(kdTree.root, queryPoint, 10000000, kdTree.root, 0);
                end = new Date().getTime();
                kdTiming = end - start;


                console.log("nearest neighbor kd: ", kdNearestNeighbor.point.center);
                console.log("Duration of kd-Tree nearest neighbor: "+kdTiming+ " msecs");

                sceneController.select(pointList[minIdx]);
                sceneController.select(kdNearestNeighbor.point);

            }));

            $("#btnNewParaCurve").click((function() {
                var style = {
                    width : Math.floor(Math.random()*3)+1,
                    color : randomColor()
                };
                console.log("ParaCurve geklickt...");
                try {
                    var t = 1;
                    var errorString = "The given x(t) is not a correct function.";
                    parseInt(eval($("#xt").val()));
                    errorString = "The given y(t) is not a correct function.";
                    parseInt(eval($("#yt").val()));
                } catch(err) {
                    console.log("Error-Catch");
                    alert(errorString);
                    return;
                }
                //xT, yT, tMin, tMax, segments, lineStyle
                var curve =	 new ParametricCurve($("#xt").val(), $("#yt").val(),parseInt($("#tmin").val()), parseInt($("#tmax").val()), parseInt($("#segments",10).val()), style);

                scene.addObjects([curve]);
                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(curve); // this will also redraw

            }));

            $("#btnNewBezierCurve").click((function(){
                console.log("BezierCurv geklickt...");
                var style = {
                    width : Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };


                var bezier = new BezierCurve(
                     [randomX(), randomY()], //,point1
                    [randomX(), randomY()], [randomX(), randomY()], //point2,point3
                    0, 1, parseInt($("#segments").val()), style);

                scene.addObjects([bezier]);
                sceneController.deselect();
                sceneController.select(bezier); // this will also redraw

            }));

            $("#xt").change((function(){
                var obj = sceneController.getSelectedObject();
                obj.xt = $("#xt").val();
                scene.draw(context);
            }));
            $("#yt").change((function(){
                var obj = sceneController.getSelectedObject();
                obj.yt = $("#yt").val();
                scene.draw(context);
            }));
            $("#tmin").change((function(){
                var obj = sceneController.getSelectedObject();
                obj.tmin = parseInt($("#tmin").val());
                scene.draw(context);
            }));
            $("#tmax").change((function(){
                var obj = sceneController.getSelectedObject();
                obj.tmax = parseInt($("#tmax").val());
                scene.draw(context);
            }));
            $("segments").change((function(){
                var obj = sceneController.getSelectedObject();
                obj.segments = parseInt($("#segments").val());
                scene.draw(context);
            }));
            $("#tickmarks").change((function() {
                var obj = sceneController.getSelectedObject();
                obj.tickmarks = !obj.tickmarks;
                scene.draw(context);
            }));

            var updateInputFields = function() {
                var obj = this.getSelectedObject();
                $("#inputColor").val(obj.lineStyle.color);
                $("#inputRadius").val(obj.radius);
                $('#inputLineWidth').val(obj.lineStyle.width);
                $("#tickmarks").attr('checked',obj.tickmarks);
                $("segments").val(obj.segments);
                if (obj.tmin) {
                    $("#tmin").val(obj.tmin);
                    $("#tmax").val(obj.tmax);
                }
                if (obj.xt) {
                    $("#xt").val(obj.xt);
                    $("#yt").val(obj.yt);
                }
            }

            sceneController.onSelection(updateInputFields);
            sceneController.onObjChange(updateInputFields);


        };

        // return the constructor function
        return HtmlController;


    })); // require




