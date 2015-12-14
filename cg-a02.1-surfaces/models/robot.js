/**
 * Created by Daniel on 10.12.2015.
 */
define(["three", "parametric"],
    (function(THREE, ParametricSurface) {

        "use strict";

        var Robot = function (){
            // S I Z E S :

            var headSize = [130,130,130];
            var torsoSize = [250, 400, 150];
            var shoulderSize = [25,25,50];
            var upperArmSize = [40, 90, 50];
            var ellbowSize = [20,20,40];

            this.root = new THREE.Object3D();

            //S K E L E T O N  D E F I N I T I O N S:

            // HEAD SKELETON
            this.head = new THREE.Object3D();
            this.head.name = "head";
            this.head.translateY(torsoSize[1]/2 + headSize[1]/2);

            //Shoulder Left Skeleton:

            this.shoulderLeft = new THREE.Object3D();
            this.shoulderLeft.name = "shoulderLeft";
            this.shoulderLeft.translateY(torsoSize[1]/4 + shoulderSize[1]/2);
            this.shoulderLeft.translateX(-torsoSize[0]/2 - shoulderSize[0]/2);

            //Shoulder Right Skeleton:
            this.shoulderRight = new THREE.Object3D();
            this.shoulderRight.name = "shoulderRight";
            this.shoulderRight.translateY(torsoSize[1]/4 + shoulderSize[1]/2);
            this.shoulderRight.translateX(torsoSize[0]/2 + shoulderSize[0]/2);

            // Upper Arm Right:
            this.upperArmRight = new THREE.Object3D();
            this.upperArmRight.name = "upperArmRight";
            this.upperArmRight.translateX(shoulderSize[2]);
            this.upperArmRight.translateY(-shoulderSize[1]/2- upperArmSize[1]/4);
            this.shoulderRight.add(this.upperArmRight);

            //Uper Arm Left:

            this.upperArmLeft = new THREE.Object3D();
            this.upperArmLeft.name = "upperArmLeft";
            this.upperArmLeft.translateX(-shoulderSize[2]);
            this.upperArmLeft.translateY(-shoulderSize[1]/2- upperArmSize[1]/4);
            this.shoulderLeft.add(this.upperArmLeft);

            //Ellbow right:
            this.ellbowRight = new THREE.Object3D();
            this.ellbowRight.name = "ellbowRight";
            this.ellbowRight.translateY(-upperArmSize[1]/2 - ellbowSize[2]/2+1);
            this.upperArmRight.add(this.ellbowRight);

            //Ellbow left:

            this.ellbowLeft = new THREE.Object3D();
            this.ellbowLeft.name = "ellbowLeft";
            this.ellbowLeft.translateY(-upperArmSize[1]/2 - ellbowSize[2]/2+1);
            this.upperArmLeft.add(this.ellbowLeft);


            //TorsoSKELETON:
            this.torso = new THREE.Object3D();
            this.torso.add(this.head);
            this.torso.add((this.shoulderLeft));
            this.torso.add(this.shoulderRight);



            // S K I N  DE F I N I T I O N S :
            // HEAD SKIN
            this.headSkin = new THREE.Mesh(new THREE.CubeGeometry(headSize[0],headSize[1],headSize[2]),new THREE.MeshNormalMaterial());
            this.headSkin.rotateY(Math.PI/3);
            this.head.add(this.headSkin);

            // TORSO SKIN
            this.torsoSkin = new THREE.Mesh(new THREE.CubeGeometry(torsoSize[0],torsoSize[1],torsoSize[2]),new THREE.MeshNormalMaterial());
            this.torso.add(this.torsoSkin);

            //Shoulder Left Skin:
            this.shoulderLeftSkin = new THREE.Mesh(new THREE.CylinderGeometry(shoulderSize[0],shoulderSize[1],shoulderSize[2]),new THREE.MeshNormalMaterial());
            this.shoulderLeftSkin.rotateZ(Math.PI/2);
            this.shoulderLeft.add(this.shoulderLeftSkin);

            //Shoulder Right Skin:
            this.shoulderRightSkin = new THREE.Mesh(new THREE.CylinderGeometry(shoulderSize[0],shoulderSize[1],shoulderSize[2]),new THREE.MeshNormalMaterial());
            this.shoulderRightSkin.rotateZ(Math.PI/2);
            this.shoulderRight.add(this.shoulderRightSkin);

            // Upper Arm Right:
            this.upperArmRightSkin = new THREE.Mesh(new THREE.CubeGeometry(upperArmSize[0],upperArmSize[1],upperArmSize[2]),new THREE.MeshNormalMaterial());
            this.upperArmRight.add(this.upperArmRightSkin);

            // Upper Arm Left:
            this.upperArmLeftSkin = new THREE.Mesh(new THREE.CubeGeometry(upperArmSize[0],upperArmSize[1],upperArmSize[2]),new THREE.MeshNormalMaterial());
            this.upperArmLeft.add(this.upperArmLeftSkin);

            //Ellbow right:
            this.ellbowRightSkin = new THREE.Mesh(new THREE.CylinderGeometry(ellbowSize[0],ellbowSize[1],ellbowSize[2]),new THREE.MeshNormalMaterial());
            this.ellbowRightSkin.rotateZ(Math.PI/2);
            this.ellbowRight.add(this.ellbowRightSkin);

            //Ellbow left:
            this.ellbowLeftSkin = new THREE.Mesh(new THREE.CylinderGeometry(ellbowSize[0],ellbowSize[1],ellbowSize[2]),new THREE.MeshNormalMaterial());
            this.ellbowLeftSkin.rotateZ(Math.PI/2);
            this.ellbowLeft.add(this.ellbowLeftSkin);
            this.root.add(this.torso);

            this.getMesh = function(){
                return this.root;
            }


        };
        return Robot;

    }));
