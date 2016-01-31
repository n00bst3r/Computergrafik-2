/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: scene
 *
 * A Scene is a depth-sorted collection of things to be drawn, 
 * plus a background fill style.
 *
 */



/* requireJS module definition */
define(["three", "util", "shaders", "BufferGeometry", "random", "band"],
    (function(THREE, util, shaders, BufferGeometry, Random, Band) {

        "use strict";

        /*
         * Scene constructor
         */
        var Scene;
        Scene = function (renderer, width, height) {

            // the scope of the object instance
            var scope = this;


            scope.renderer = renderer;
            scope.t = 0.0;

            scope.camera = new THREE.PerspectiveCamera(66, width / height, 0.1, 2000);
            scope.camera.position.z = 1000;
            scope.scene = new THREE.Scene();

            // Add a listener for 'keydown' events. By this listener, all key events will be
            // passed to the function 'onDocumentKeyDown'. There's another event type 'keypress'.
            document.addEventListener("keydown", onDocumentKeyDown, false);


            function onDocumentKeyDown(event) {
                // Get the key code of the pressed key
                var keyCode = event.which;

                var nodeShoulderLeft = scope.scene.getObjectByName("shoulderLeft", true);
                var nodeShoulderRight = scope.scene.getObjectByName("shoulderRight", true);

                var nodeEllbowLeft = scope.scene.getObjectByName("ellbowLeft", true);
                var nodeEllbowRight = scope.scene.getObjectByName("ellbowRight", true);

                var nodeThighLeft = scope.scene.getObjectByName("thighLeft", true);
                var nodeThighRight = scope.scene.getObjectByName("thighRight", true);
                var nodeKneeRight = scope.scene.getObjectByName("kneeRight", true);
                var nodeKneeLeft = scope.scene.getObjectByName("kneeLeft", true);

                var nodeHead = scope.scene.getObjectByName("head", true);

                if (keyCode == 38) {
                    console.log("cursor up");
                    scope.currentMesh.rotation.x += 0.05;
                    // Cursor down
                } else if (keyCode == 40) {
                    console.log("cursor down");
                    scope.currentMesh.rotation.x += -0.05;
                    // Cursor left
                } else if (keyCode == 37) {
                    console.log("cursor left");
                    scope.currentMesh.rotation.y += 0.05;
                    // Cursor right
                } else if (keyCode == 39) {
                    console.log("cursor right");
                    scope.currentMesh.rotation.y += -0.05;
                    // Cursor up
                } else if (keyCode == 87) {   // 87 = w   Oberarme

                    if (nodeShoulderLeft && nodeShoulderRight) {
                        nodeShoulderLeft.rotateX(Math.PI / 16);
                        nodeShoulderRight.rotateX(Math.PI / 16);
                    }
                } else if (keyCode == 83) {   //83 = s Unterarme Z Achse

                    if (nodeShoulderLeft && nodeShoulderRight) {
                        nodeShoulderLeft.rotateX(-Math.PI / 16);
                        nodeShoulderRight.rotateX(-Math.PI / 16);
                    }

                } else if (keyCode == 68) {  // 68 = d
                    if (nodeEllbowLeft && nodeEllbowRight) {
                        nodeEllbowLeft.rotateZ(-Math.PI / 16);
                        nodeEllbowRight.rotateZ(-Math.PI / 16);
                    }
                } else if (keyCode == 65) {  // 65 = a
                    if (nodeEllbowLeft && nodeEllbowRight) {
                        nodeEllbowLeft.rotateZ(Math.PI / 16);
                        nodeEllbowRight.rotateZ(Math.PI / 16);
                    }

                } else if (keyCode == 72) {  // 72 = h  Kopf
                    if (nodeHead) {
                        nodeHead.rotateY(Math.PI / 16);
                    }
                } else if (keyCode == 75) {   //75 = k
                    if (nodeThighLeft && nodeThighRight && nodeKneeLeft && nodeKneeRight) {
                        nodeThighLeft.rotateX(Math.PI / 16);
                        nodeKneeLeft.rotateX(-Math.PI / 16);
                        nodeThighRight.rotateX(-Math.PI / 16);
                        nodeKneeRight.rotateX(Math.PI / 16);
                    }
                } else if (keyCode == 76) {  //76 = l
                    if (nodeThighLeft && nodeThighRight && nodeKneeLeft && nodeKneeRight) {
                        nodeThighLeft.rotateX(-Math.PI / 16);
                        nodeKneeLeft.rotateX(Math.PI / 16);
                        nodeThighRight.rotateX(Math.PI / 16);
                        nodeKneeRight.rotateX(-Math.PI / 16);

                    }
                } else if (keyCode == 73) { // 73 = i
                    if (nodeThighLeft && nodeThighRight) {
                        nodeThighLeft.rotateZ(-Math.PI / 16);
                        nodeThighRight.rotateZ(Math.PI / 16);
                    }

                } else if (keyCode == 79) {  //79 = o
                    if (nodeThighLeft && nodeThighRight) {
                        nodeThighLeft.rotateZ(Math.PI / 16);
                        nodeThighRight.rotateZ(-Math.PI / 16);
                    }
                }
            };

            this.addBufferGeometry = function (bufferGeometry) {

                scope.currentMesh = bufferGeometry.getMesh();
                scope.scene.add(scope.currentMesh);

            }



            this.addLight = function(light) {
                if (light instanceof THREE.Light) {
                    console.log("Addded light", light, "to the scene.");
                    scope.scene.add(light);
                    if (light instanceof  THREE.DirectionalLight) {
                        scope.currentDirectionalLight = light;
                    }
                } else {
                    console.log(light, "is not a valid THREE.light");
                }
            };

            this.addMesh = function(mesh) {
                scope.currentMesh = mesh;
                scope.scene.add(scope.currentMesh);
            }

            /*
             * drawing the scene
             */
            this.draw = function () {

                requestAnimFrame(scope.draw);

                scope.renderer.render(scope.scene, scope.camera);

            };


        };


        // this module only exports the constructor for Scene objects
        return Scene;

    })); // define

    
