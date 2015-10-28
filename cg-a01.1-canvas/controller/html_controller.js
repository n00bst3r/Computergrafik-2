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
define(["jquery", "Line", "Circle","Point"],
    (function($, Line, Circle, Point) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(context,scene,sceneController) {


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
                var style2 = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };

                var circle = new Circle([randomX(), randomY()], randomR(), style2);

                scene.addObjects([circle]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(circle); // this will also redraw

                if(sceneController.getSelectedObject().r != undefined){
                    console.log(sceneController.getSelectedObject());
                    $("#pRadius").show();
                }

            }));

            /*
             * Event Handler for the NewPoint Button
             */
            $("#btnNewPoint").click(function() {
                // create the actual line and add it to the scene
                var style3 = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };


                var point = new Point([randomX(), randomY()], style3);
                scene.addObjects([point]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(point); // this will also redraw
            });

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



        };

        // return the constructor function
        return HtmlController;


    })); // require




