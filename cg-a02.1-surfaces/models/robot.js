/**
 * Created by Daniel on 10.12.2015.
 */
define(["three", "parametric"],
    (function(THREE, ParametricSurface) {

        "use strict";

        var Robot = function (){
            var headSize = [130,130,130];
            var torsoSize = [250, 400, 150];

            this.root = new THREE.Object3D();
            //Skeleton
            this.head = new THREE.Object3D();
            this.head.name = "head";
            this.head.translateY(torsoSize[1]/2 + headSize[1]/2);
            this.torso = new THREE.Object3D();
            this.torso.add(this.head);


            //skin
            this.headSkin = new THREE.Mesh(new THREE.CubeGeometry(headSize[0],headSize[1],headSize[2]),new THREE.MeshNormalMaterial());
            this.headSkin.rotateY(Math.PI/4);
            this.torsoSkin = new THREE.Mesh(new THREE.CubeGeometry(torsoSize[0],torsoSize[1],torsoSize[2]),new THREE.MeshNormalMaterial());
            this.torso.add(this.torsoSkin);
            this.head.add(this.headSkin);

            this.root.add(this.torso);

            this.getMesh = function(){
                return this.root;
            }


        };
        return Robot;

    }));
