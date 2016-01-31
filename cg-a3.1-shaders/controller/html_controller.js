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
define(["jquery", "BufferGeometry", "random", "band","ellipsoid","pillowShape","cosine", "robot","planet", "explosion"],
    (function($,BufferGeometry, Random, Band, Ellipsoid, PillowShape, Cosine, Robot,Planet,Explosion) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {

            this.rotationSetter;


            this.directionalLightRotationInterval;


            this.directionalLightRotationInterval;

            
            var directionalLightRotate = function (angle) {
                var quat = new THREE.Quaternion();
                quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0).normalize(), angle);
                scene.currentDirectionalLight.position.applyQuaternion(quat).normalize();
            };


            var rotate = function(value) {
                scene.currentMesh.rotation.y += value;
            };

            $("#random").show();
            $("#band").hide();
            $("#robotParamField").hide();
            $("#paramtricfield").hide();
            $("#explosionParamField").hide();
            $("#planetParamField").hide();

            $("#btnRandom").click( (function() {
                $("#random").show();
                $("#planetParamField").hide();
                $("#explosionParamField").hide();
                $("#band").hide();
                $("#robotParamField").hide();
                $("#paramtricfield").hide();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
                $("#planetParamField").hide();
                $("#explosionParamField").hide();
                $("#paramtricfield").hide();
                $("#robotParamField").hide();
                $("#band").show();
            }));

            $("#btnEllipsoid").click( (function() {
                $("#random").hide();
                $("#planetParamField").hide();
                $("#explosionParamField").hide();
                $("#band").hide();
                $("#robotParamField").hide();
                $("#paramtricfield").show();
            }));
            $("#btnRobot").click( (function() {
                $("#planetParamField").hide();
                $("#random").hide();
                $("#explosionParamField").hide();
                $("#band").hide();
                $("#paramtricfield").hide();
                $("#robotParamField").show();
            }));
            $("#btnPlanet").click( (function() {

                $("#checkTable").hide();
                $("#random").hide();
                $("#band").hide();
                $("#explosionParamField").hide();
                $("#robotParamField").hide();
                $("#paramtricfield").hide();
                $("#planetParamField").show();
            }));
            $("#btnExplosion").click( (function() {

                $("#checkTable").hide();
                $("#random").hide();
                $("#band").hide();
                $("#robotParamField").hide();
                $("#paramtricfield").hide();
                $("#planetParamField").hide();
                $("#explosionParamField").show();

            }));


            $("#btnNewRandom").click( (function() {

                var renderMesh = $('#chkSolid').is(':checked');
                var renderWireframe = $('#chkWireframe').is(':checked');
                var renderPoints = $('#chkPoints').is(':checked');


                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry(renderMesh, renderWireframe, renderPoints);
                bufferGeometryRandom.setIndex(random.getIndices());
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

                var renderMesh = $('#chkSolid').is(':checked');
                var renderWireframe = $('#chkWireframe').is(':checked');
                var renderPoints = $('#chkPoints').is(':checked');


                var band = new Band(config);
                var bufferGeometryBand = new BufferGeometry(renderMesh, renderWireframe, renderPoints);
                bufferGeometryBand.setIndex(band.getIndices());
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());

                scene.addBufferGeometry(bufferGeometryBand);
            }));

            $("#btnNewEllipsoid").click( (function() {

                var config = {
                    umin : parseFloat($('#uMin').attr('value').replace( /,/,"." )),
                    umax :  parseFloat($('#uMax').attr('value').replace( /,/,"." )),
                    vmin : parseFloat($('#vMin').attr('value').replace( /,/,"." )),
                    vmax :  parseFloat($('#vMax').attr('value').replace( /,/,"." )),
                    uSegments : parseFloat($('#uSegments').attr('value').replace( /,/,"." )),
                    vSegments :  parseFloat($('#vSegments').attr('value').replace( /,/,"." ))

                };

                var renderMesh = $('#chkSolid').is(':checked');
                var renderWireframe = $('#chkWireframe').is(':checked');
                var renderPoints = $('#chkPoints').is(':checked');


                var a = parseInt($('#valueA').attr('value'));
                var b = parseInt($('#valueB').attr('value'));
                var c = parseInt($('#valueC').attr('value'));

                var parametricBody = undefined;



                switch ($('#parametricOptions').val()) {

                    case '0':
                        parametricBody = new Ellipsoid(a, b, c, config);
                        break;
                    case '1':
                        config.umin = 0.0;
                        config.umax = Math.PI;
                        config.vmin = - Math.PI;
                        config.vmax = Math.PI;
                        parametricBody = new PillowShape(a, b, c, config);
                        break;
                    case '2':
                        config.umin = - Math.PI;
                        config.umax = Math.PI;
                        config.vmin = - Math.PI;
                        config.vmax = Math.PI;
                        parametricBody = new Cosine(a, b, c, config);
                        break;
                }



                var renderMesh = $('#chkSolid').is(':checked');
                var renderWireframe = $('#chkWireframe').is(':checked');
                var renderPoints = $('#chkPoints').is(':checked');

                var bufferGeometryParamBody = new BufferGeometry(renderMesh, renderWireframe, renderPoints);
                bufferGeometryParamBody.setIndex(parametricBody.getIndices());
                bufferGeometryParamBody.addAttribute('position', parametricBody.getPositions());
                bufferGeometryParamBody.addAttribute('color', parametricBody.getColors());

                scene.addBufferGeometry(bufferGeometryParamBody);

            }));

            $("#btnNewRobot").click( (function() {

                var robot = new Robot();
                scene.addBufferGeometry(robot);


            }));

            //TODO

            $('#btnNewPlanet').click(function() {
                console.log("Creating a new planet...");
                console.log(scene);
                var planet = new Planet($('#chkPlanetDayTexture').is(':checked'), $('#chkPlanetNightTexture').is(':checked'), $('#chkPlanetCloudsTexture').is(':checked'));
                scene.addMesh(planet.getMesh());

                var aLight = new THREE.AmbientLight('#ADADAD');
                var dLight = new THREE.DirectionalLight('#FFF8D1', 1);
                dLight.name = "dLight";
                dLight.position.set(-1, 0, -0.3).normalize();
                scene.addLight(aLight);
                scene.addLight(dLight);
            });

            $('#btnNewExplosion').click(function() {
                console.log("Creating new explosion...");
                //TODO Implement
            });

            $('#animationCheck').change(function() {

                if ($('#animationCheck').is(':checked')) {
                    this.rotationSetter = setInterval(function() {rotate(50); },100);
                }else{
                    clearInterval(this.rotationSetter);

                }

            });

            $('#animationCheckPlanet').change(function() {

                if ($('#animationCheck').is(':checked')) {
                    this.rotationSetter = setInterval(function() {rotate(50); },100);
                }else{
                    clearInterval(this.rotationSetter);

                }

            });

            $('#chkPlanetSunAnimation').change(function() {
                if ($(this).is(':checked')) {
                    console.log("Sun rotation started!");
                    this.directionalLightRotationInterval = setInterval(directionalLightRotate, 20, 0.02);
                } else {
                    clearInterval(this.directionalLightRotationInterval);
                }
            });

        };

        // return the constructor function
        return HtmlController;


    })); // require



            
