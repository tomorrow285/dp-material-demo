import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {BoxGeometry} from '../BoxGeometry'

namespace Viewer {
  let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
  const params = {
    clipIntersection: true,
    planeConstant: 0,
    showHelpers: false
  };
  const clipPlanes = [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
    new THREE.Plane(new THREE.Vector3(0, - 1, 0), 0),
    new THREE.Plane(new THREE.Vector3(0, 0, - 1), 0)
  ];

  export function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight - 20);
    // renderer.localClippingEnabled = true;
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    // 坐标系
    const axesHelper = new THREE.AxesHelper( 10 );
    scene.add( axesHelper );

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 200);

    camera.position.set(-1.5, 2.5, 3.0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use only if there is no animation loop
    controls.minDistance = 1;
    controls.maxDistance = 100;
    controls.enablePan = false;

    const light = new THREE.HemisphereLight(0xffffff, 0x080808, 1.5);
    light.position.set(-1.5, 2.5, 3.0);
    scene.add(light);

    (() => {

    })();

    // (() => {
    //   const geometry = new THREE.BufferGeometry();
    //   // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
    //   // 因为在两个三角面片里，这两个顶点都需要被用到。
    //   const vertices = new Float32Array( [
    //     -1.0, -1.0,  1.0,
    //     1.0, -1.0,  1.0,
    //     1.0,  1.0,  1.0,

    //     1.0,  1.0,  1.0,
    //     -1.0,  1.0,  1.0,
    //     -1.0, -1.0,  1.0
    //   ] );

    //   // itemSize = 3 因为每个顶点都是一个三元组。
    //   geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    //   const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    //   // const line = new THREE.LineSegments( geometry, new THREE.LineBasicMaterial( { color: 0xffffaa } ) );
    //   const mesh = new THREE.Mesh( geometry, material );
    //   scene.add( mesh );
    // })();

    (() => {
      const geometry = new BoxGeometry( 1, 2, 3 );
      console.log(geometry);
            const edges = new THREE.EdgesGeometry( geometry );
      const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffaa } ) );
      scene.add( line );
      
      // const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
      // const mesh = new THREE.Mesh( geometry, material );
      // scene.add( mesh );
    })();

    // (() => {
    //   const geometry = new THREE.BoxGeometry( 1, 2, 1 );
    //   const edges = new THREE.EdgesGeometry( geometry );
    //   const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffaa } ) );
    //   scene.add( line );
    // })();
//     (() => {
//       const path = new THREE.Path();

// path.lineTo( 0, 0.8 );
// path.quadraticCurveTo( 0, 1, 0.2, 1 );
// path.lineTo( 1, 1 );

// const points = path.getPoints();

// const geometry = new THREE.BufferGeometry().setFromPoints( points );
// const material = new THREE.LineBasicMaterial( { color: 0xffffff } );

// const line = new THREE.Line( geometry, material );
// scene.add( line );
//     })();
    // (() => {
    //   const material = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 10 });
    //           //创建立方体的顶点
    //           // const vertices = new Float32Array( [
    //           //   10, 10, 10,
    //           //   -10, 10, 10,
    //           //   -10, -10, 10,
    //           //   10, -10, 10,
    //           //   10, -10, 10,
    //           //   10, -10, -10,
    //           //   -10, 10, -10,
    //           //   -10, -10, -10
    //           // ] );
    //           const vertices1 = [
    //             new THREE.Vector3(0,0,0),
    //             new THREE.Vector3(0,3,10),
    //             new THREE.Vector3(0,6,10),
    //             new THREE.Vector3(0,3,0),
    //         ];

    
    //         const geometry = new THREE.BufferGeometry().setFromPoints(vertices1);

    //         const line = new THREE.Line(geometry, material);
    //         scene.add(line);
    //         //创建立方的面
    //         //   var faces=[
    //         //     new THREE.Face(0,1,2),
    //         //     new THREE.Face3(0,2,3),
    //         //     new THREE.Face3(0,3,4),
    //         //     new THREE.Face3(0,4,5),
    //         //     new THREE.Face3(1,6,7),
    //         //     new THREE.Face3(1,7,2),
    //         //     new THREE.Face3(6,5,4),
    //         //     new THREE.Face3(6,4,7),
    //         //     new THREE.Face3(5,6,1),
    //         //     new THREE.Face3(5,1,0),
    //         //     new THREE.Face3(3,2,7),
    //         //     new THREE.Face3(3,7,4)
    //         // ];
    //         // cubeGeometry.faces = faces;
    //           // let  mesh = new THREE.Points( geometry, material );
    //           // scene.add( mesh );

    // })();
    (() => {
      
    })();


    // (() => {
    //   //create a blue LineBasicMaterial
    //   const material = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 10 });
    //   const points = [];
    //   points.push(new THREE.Vector3(0, 0, 0));
    //   points.push(new THREE.Vector3(0, 1, 0));
    //   points.push(new THREE.Vector3(1, 0, 0));
    //   points.push(new THREE.Vector3(1, 1, 1));
    //   const geometry = new THREE.BufferGeometry().setFromPoints(points);
    //   const line = new THREE.Line(geometry, material);
    //   scene.add(line);
    // })();
    // (() => {
    //   const geometry = new THREE.CylinderGeometry(.01, .01, .1, 32);
    //   const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    //   const cylinder = new THREE.Mesh(geometry, material);
    //   cylinder.translateX(1)
    //   cylinder.translateY(1)
    //   cylinder.translateZ(1)
    //   scene.add(cylinder);
    // })();
    // (() => {
    //   const geometry = new THREE.SphereGeometry(.1);
    //   // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    //   const material = new THREE.MeshLambertMaterial({
    //     color: 0xffff00,
    //     side: THREE.DoubleSide,
    //     // clippingPlanes: clipPlanes,
    //     // clipIntersection: params.clipIntersection

    //   });
    //   const sphere = new THREE.Mesh(geometry, material);
    //   sphere.translateX(1)
    //   console.log(sphere.position)
    //   // sphere.applyMatrix4(new THREE.Matrix4())
    //   // sphere.position = new THREE.Vector3(1, 0, 0)
    //   scene.add(sphere);
    // })();

    render()

  }

  export function dispose() {
    renderer.dispose()
  }

  export function render() {
    renderer.render(scene, camera);

  }
}

export default Viewer