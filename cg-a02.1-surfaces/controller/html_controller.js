/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "BufferGeometry", "random", "band","ellipsoid"],
    (function($,BufferGeometry, Random, Band, Ellipsoid) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {

            this.rotationSetter;


            var rotate = function(value) {
                scene.currentMesh.rotation.y += value;
            };

            $("#random").show();
            $("#band").hide();
            $("#elipsoid").hide();

            $("#btnRandom").click( (function() {
                $("#random").show();
                $("#band").hide();
                $("#elipsoid").hide();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
                $("#elipsoid").hide();
                $("#band").show();
            }));

            $("#btnEllipsoid").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#elipsoid").show();
            }));

            $("#btnNewRandom").click( (function() {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry();
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

                scene.addBufferGeometry(bufferGeometryRandom);
            }));


            $("#btnNewBand").click( (function() {

                var config = {
                    segments : parseInt($("#numSegments").attr("value")),
                    radius : parseInt($("#radius").attr("value")),
                    height : parseInt($("#height").attr("value"))
                };


                var band = new Band(config);
                var bufferGeometryBand = new BufferGeometry();
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());

                scene.addBufferGeometry(bufferGeometryBand);
            }));

            $("#btnNewEllipsoid").click( (function() {

                var config = {
                    umin : parseInt($('#uMin').attr('value')),
                    umax : parseInt($('#uMax').attr('value')),
                    vmin : parseInt($('#vMin').attr('value')),
                    vmax : parseInt($('#vMax').attr('value')),
                    uSegments : parseInt($('#uSegments').attr('value')),
                    vSegments : parseInt($('#vSegments').attr('value'))

                };

                var a = parseInt($('#valueA').attr('value'));
                var b = parseInt($('#valueB').attr('value'));
                var c = parseInt($('#valueC').attr('value'));

                var ellipsoid = new Ellipsoid(a, b, c, config);
                var bufferGeometryEllipsoid = new BufferGeometry();
               // console.log("getPosition: "+ellipsoid.getPositions());
                bufferGeometryEllipsoid.addAttribute('position', ellipsoid.getPositions());
                bufferGeometryEllipsoid.addAttribute('color', ellipsoid.getColors());

                scene.addBufferGeometry(bufferGeometryEllipsoid);



            }));

            $('#animationCheck').change(function() {
                // TODO Objekte auswählbar machen.
                if ($('#animationCheck').is(':checked')) {
                    this.rotationSetter = setInterval(function() {rotate(50); },100);
                }else{
                    clearInterval(this.rotationSetter);

                }

            });


        };

        // return the constructor function
        return HtmlController;


    })); // require



            
