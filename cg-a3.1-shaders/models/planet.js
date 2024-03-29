/* requireJS module definition */
define(["three", "shaders"],
    (function(THREE, Shaders) {

        "use strict";

        var Planet = function(showDayTexture, showNightTexture, showCloudTexture) {


            this.root = new THREE.Object3D();

            // load and create required textures

            var scope = this;

            // implement ShaderMaterial using the code from
            // the lecture

            var material = new THREE.ShaderMaterial( {
                uniforms: THREE.UniformsUtils.merge( [
                    THREE.UniformsLib['lights'],
                    {
                        diffuseMaterial: {    //Shader
                            type: 'c',       //Typ
                            value: new THREE.Color(1, 0, 0)   //JS Wert
                        },
                        specularMaterial: {
                            type: 'c',
                            value: new THREE.Color(0.7, 0.7, 0.7)
                        },
                        ambientMaterial: {
                            type: 'c',
                            value: new THREE.Color(0.2, 0.2, 0.2)
                        },
                        shininessMaterial: {
                            type: 'f',
                            value: 8.0
                        },
                        textureDay: {
                            type: 't'
                        },
                        textureCloud: {
                            type: 't'
                        },
                        textureNight: {
                            type: 't'
                        },
                        textureTopo: {
                            type: 't'
                        },
                        showDayTexture: {
                            type: 'i',
                            value: showDayTexture
                        },
                        showNightTexture: {
                            type: 'i',
                            value: showNightTexture
                        },
                        showCloudTexture: {
                            type: 'i',
                            value: showCloudTexture
                        }
                    }
                ]),
                vertexShader: Shaders.getVertexShader('planet'),
                fragmentShader: Shaders.getFragmentShader('planet'),
                lights: true
            });

            // hint:
            // texture can be assigned only when it is loaded completely, e.g. like this
            // material.uniforms.daytimeTexture.value = textureName;
            var textureLoader = new THREE.TextureLoader();

            textureLoader.load('textures/earth_month04.jpg', function(t) {
                console.log("loaded texture:", t);
                t.needsUpdate = true;
                material.uniforms.textureDay.value = t;
            });

            textureLoader.load('textures/earth_at_night_2048.jpg', function(t) {
                console.log("loaded texture:", t);
                t.needsUpdate = true;
                material.uniforms.textureNight.value = t;
            });

            textureLoader.load('textures/earth_clouds_2048.jpg', function(t) {
                console.log("loaded texture:", t);
                t.needsUpdate = true;
                material.uniforms.textureCloud.value = t;
            });

            textureLoader.load('textures/earth_topography_2048.jpg', function(t) {
                console.log("loaded texture:", t);
                t.needsUpdate = true;
                material.uniforms.textureTopo.value = t;
            });

            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry(500, 100, 100), material);
            scope.mesh.name = "planet";

            scope.root.add(scope.mesh);
            this.material = material;


            this.getMesh = function() {
                return this.root;
            };

            this.getMaterial = function() {
                return this.material;
            }


        }; // constructor

        return Planet;

    })); // define module
