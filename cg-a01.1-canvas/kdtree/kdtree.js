/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: kdtree
 *
 *
 */


/* requireJS module definition */
define(["kdutil", "vec2", "Scene", "KdNode", "BoundingBox"],
    (function(KdUtil, vec2, Scene, KdNode, BoundingBox) {

        "use strict";

        /**
         * Creates a kd-tree. The build function is directly called
         * on generation
         *
         * @param pointList
         * @constructor
         */
        var KdTree = function (pointList) {

            /**
             *
             * @param pointList - list of points
             * @param dim       - current axis
             * @param parent    - current parent (starts with root)
             * @param isLeft    - flag if node is left or right child of its parent
             * @returns returns root node after tree is build
             */


            this.build = function(pointList, dim, parent, isLeft) {
                console.log("Starte build...")
                console.log("Laenge PointList: "+pointList.length);
                for (var key in pointList){
                    var value = pointList[key];

                    console.log(value);
                }

                // Rekursionsanker:
                if(pointList.length === 0){
                    console.log("Rekursionsanker erreicht.")
                    return undefined;
                }

                // IMPLEMENT!
                // create new node
                var node = new KdNode(dim);
                // find median position in pointList
                var medPos = KdUtil.median(pointList,dim);
                var medPoint = pointList[medPos];
                var nextDim;
                // compute next axis
                if(dim===0){
                   nextDim = 1;
                }else{
                    nextDim = 0;
                }
                // set point in node

                node.point = medPoint;
                console.log("This is the median at pos " + medPos + ": ", medPoint);


                // compute bounding box for node
                // check if node is root (has no parent)
                // 
                // take a look in findNearestNeighbor why we 
                // need this bounding box!
                var boundingBox;
                if( !parent ) {
                    // Note: hardcoded canvas size here
                    boundingBox = new BoundingBox(0,0,499,399,medPoint,node.dim);


                } else {


                    // create bounding box and distinguish between axis and
                    // which side (left/right) the node is on


                    if (dim === 0) {
                        console.log("dim = 0");
                        if (isLeft) {
                            console.log("dim = 0 und isLeft");
                            var newXMin = parent.bbox.xmin;
                            var newXMax = parent.bbox.xmax;
                            var newYMin = parent.bbox.ymin;
                            var newYMax = parent.point.center[1];
                            boundingBox = new BoundingBox(newXMin, newYMin, newXMax, newYMax, medPoint, dim);
                        } else {
                            console.log("dim = 0 und isRight");
                            var newXMin = parent.bbox.xmin;
                            var newXMax = parent.bbox.xmax;
                            var newYMin = parent.point.center[1];
                            var newYMax = parent.bbox.ymax;
                            boundingBox = new BoundingBox(newXMin, newYMin, newXMax, newYMax, medPoint, dim);
                        }

                    } else {
                        console.log("dim = 1");
                        if (isLeft) {
                            var newXMin = parent.bbox.xmin;
                            var newXMax = parent.point.center[0];
                            var newYMin = parent.bbox.ymin;
                            var newYMax = parent.bbox.ymax;
                            boundingBox = new BoundingBox(newXMin, newYMin, newXMax, newYMax, medPoint, dim);
                        } else {
                            var newXMin = parent.point.center[0];
                            var newXMax = parent.bbox.xmax;
                            var newYMin = parent.bbox.ymin;
                            var newYMax = parent.bbox.ymax;
                            boundingBox = new BoundingBox(newXMin, newYMin, newXMax, newYMax, medPoint, dim);
                        }
                    }

                    

                }
                node.bbox = boundingBox;

                var leftChilds = pointList.slice(0, medPos);
                var rightChilds = pointList.slice(medPos + 1, pointList.length);

                // create point list left/right and
                // call build for left/right arrays
                console.log("next Dim for childs is: "+nextDim);
                node.leftChild = this.build(leftChilds, nextDim, node, true);
                node.rightChild = this.build(rightChilds, nextDim, node, false);
                // return root node
                return node;
            };

            /**
             * Given a query point the function return its nearest neighbor by traversing
             * down the tree
             *
             * @param node - current tree node
             * @param query - query node
             * @param nearestDistance - current nearest distance to query node
             * @param currentBest - current best/nearest node to query node
             * @param dim - current axis (x or y)
             * @returns closest tree node to query node
             */
            this.findNearestNeighbor = function(node, query, nearestDistance, currentBest, dim) {

                if( !node ) {
                    return currentBest;
                }

                var closest = currentBest;
                var closestDistance = nearestDistance;

                var dist = KdUtil.distance(node.point.center, query.center);
                if( dist < nearestDistance ) {
                    closestDistance = dist;
                    closest = node;
                }

                var first, second;
                if (dim == 0) {
                    if ( query.center[0] < node.point.center[0]) {
                        first = node.leftChild;
                        second = node.rightChild;
                    } else {
                        first = node.rightChild;
                        second = node.leftChild;
                    }
                } else {
                    if (query.center[1] < node.point.center[1]) {
                        first = node.leftChild;
                        second = node.rightChild;
                    } else {
                        first = node.rightChild;
                        second = node.leftChild;
                    }
                }
                var nextDim ;
                if (dim === 0) {
                    nextDim = 1;
                }else{
                    nextDim = 0;
                }
                if( first && first.bbox.distanceTo(query.center) < closestDistance) {
                    closest = this.findNearestNeighbor(first, query, closestDistance, closest, nextDim);
                    closestDistance = KdUtil.distance(closest.point.center, query.center);
                }

                if( second && second.bbox.distanceTo(query.center) < closestDistance) {
                    closest = this.findNearestNeighbor(second, query, closestDistance, closest, nextDim);
                }

                return closest;
            };


            //
            console.log(this.node);
            this.root = this.build(pointList, 0);
            console.log(" this is the root: ", this.root);

        };

        return KdTree;


    })); // define


