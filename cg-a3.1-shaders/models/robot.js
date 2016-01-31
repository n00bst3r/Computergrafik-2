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
            var forarmSize = [40,80,50];
            var thighSize = [60, 120, 100];
            var kneeSize = [50,50,60]; //radius top, radius bottom, height
            var lowerLegSize = [60,100,100];
            var footSize = [60,30,150];

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

            //Upper Arm Left:

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


            //forearm right:
            this.forarmRight = new THREE.Object3D();
            this.forarmRight.name = "forearmRight";
            this.forarmRight.translateY(-ellbowSize[1]/2-forarmSize[1]/2);
            this.ellbowRight.add(this.forarmRight);

            //forearm left:
            this.forarmLeft = new THREE.Object3D();
            this.forarmLeft.name = "forearmLeft";
            this.forarmLeft.translateY(-ellbowSize[1]/2-forarmSize[1]/2);
            this.ellbowLeft.add(this.forarmLeft);

            //thigh Left:
            this.thighLeft = new THREE.Object3D();
            this.thighLeft.name = "thighLeft";
            this.thighLeft.translateY(-torsoSize[1]/2 - thighSize[1]/2);
            this.thighLeft.translateX(-torsoSize[0]/3);

            //thigh Right
            this.thighRight = new THREE.Object3D();
            this.thighRight.name = "thighRight";
            this.thighRight.translateY(-torsoSize[1]/2 - thighSize[1]/2);
            this.thighRight.translateX(torsoSize[0]/3);

            //knee left:
            this.kneeLeft = new THREE.Object3D();
            this.kneeLeft.name = "kneeLeft";
            this.kneeLeft.translateY(-thighSize[1]/2-kneeSize[0]+1);
            this.thighLeft.add(this.kneeLeft);

            //knee right:
            this.kneeRight = new THREE.Object3D();
            this.kneeRight.name = "kneeRight";
            this.kneeRight.translateY(-thighSize[1]/2-kneeSize[0]+1);
            this.thighRight.add(this.kneeRight);

            //lower Leg left:
            this.lowerLegLeft = new THREE.Object3D();
            this.lowerLegLeft.name = "lowerLegLeft";
            this.lowerLegLeft.translateY(-kneeSize[0]-lowerLegSize[1]/2);
            this.kneeLeft.add(this.lowerLegLeft);

            //lower Leg right:
            this.lowerLegRight = new THREE.Object3D();
            this.lowerLegRight.name = "lowerLegRight";
            this.lowerLegRight.translateY(-kneeSize[0]-lowerLegSize[1]/2);
            this.kneeRight.add(this.lowerLegRight);

            //Foot left:
            this.footLeft = new THREE.Object3D();
            this.footLeft.name = "footLeft";
            this.footLeft.translateY(-lowerLegSize[1]/2-footSize[1]/2);
            this.footLeft.translateZ(lowerLegSize[2]/2-lowerLegSize[2]/4);
            this.lowerLegLeft.add(this.footLeft);

            //Foot right:
            this.footRight = new THREE.Object3D();
            this.footRight.name = "footRight";
            this.footRight.translateY(-lowerLegSize[1]/2-footSize[1]/2);
            this.footRight.translateZ(lowerLegSize[2]/2-lowerLegSize[2]/4);
            this.lowerLegRight.add(this.footRight);

            //TorsoSKELETON:
            this.torso = new THREE.Object3D();
            this.torso.add(this.head);
            this.torso.add((this.shoulderLeft));
            this.torso.add(this.shoulderRight);
            this.torso.add(this.thighLeft);
            this.torso.add(this.thighRight);



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

            //forarm Right_
            this.forarmRightSkin = new THREE.Mesh(new THREE.CubeGeometry(forarmSize[0],forarmSize[1],forarmSize[2]),new THREE.MeshNormalMaterial());
            this.forarmRight.add(this.forarmRightSkin);

            //forarm Left:
            this.forarmLeftSkin = new THREE.Mesh(new THREE.CubeGeometry(forarmSize[0],forarmSize[1],forarmSize[2]),new THREE.MeshNormalMaterial());
            this.forarmLeft.add(this.forarmLeftSkin);

            //thighLeft:
            this.thighLeftSkin = new THREE.Mesh(new THREE.CubeGeometry(thighSize[0],thighSize[1],thighSize[2]),new THREE.MeshNormalMaterial());
            this.thighLeft.add(this.thighLeftSkin);

            //thighRight:
            this.thighRightSkin = new THREE.Mesh(new THREE.CubeGeometry(thighSize[0],thighSize[1],thighSize[2]),new THREE.MeshNormalMaterial());
            this.thighRight.add(this.thighRightSkin);

            //knee Left:
            this.kneeLeftSkin = new THREE.Mesh(new THREE.CylinderGeometry(kneeSize[0],kneeSize[1],kneeSize[2]),new THREE.MeshNormalMaterial());
            this.kneeLeftSkin.rotateZ(Math.PI/2);
            this.kneeLeft.add(this.kneeLeftSkin);

            //knee Right:
            this.kneeRightSkin = new THREE.Mesh(new THREE.CylinderGeometry(kneeSize[0],kneeSize[1],kneeSize[2]),new THREE.MeshNormalMaterial());
            this.kneeRightSkin.rotateZ(Math.PI/2);
            this.kneeRight.add(this.kneeRightSkin);

            //lower Leg Left:
            this.lowerLegLeftSkin = new THREE.Mesh(new THREE.CubeGeometry(lowerLegSize[0],lowerLegSize[1],lowerLegSize[2]),new THREE.MeshNormalMaterial());
            this.lowerLegLeft.add(this.lowerLegLeftSkin);

            //lower Leg Right:
            this.lowerLegRightSkin = new THREE.Mesh(new THREE.CubeGeometry(lowerLegSize[0],lowerLegSize[1],lowerLegSize[2]),new THREE.MeshNormalMaterial());
            this.lowerLegRight.add(this.lowerLegRightSkin);

            //foot left:
            this.footLeftSkin = new THREE.Mesh(new THREE.CubeGeometry(footSize[0],footSize[1],footSize[2]),new THREE.MeshNormalMaterial());
            this.footLeft.add(this.footLeftSkin);

            //foot right:
            this.footRightSkin = new THREE.Mesh(new THREE.CubeGeometry(footSize[0],footSize[1],footSize[2]),new THREE.MeshNormalMaterial());
            this.footRight.add(this.footRightSkin);

            this.getMesh = function(){
                return this.root;
            }


        };
        return Robot;

    }));
