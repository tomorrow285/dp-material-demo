import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
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
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 10 });
      const points = [];
      points.push(new THREE.Vector3(-1, 0, 0));
      points.push(new THREE.Vector3(0, 1, 0));
      points.push(new THREE.Vector3(1, 0, 0));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    })();
    (() => {
      const geometry = new THREE.CylinderGeometry(.01, .01, .1, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const cylinder = new THREE.Mesh(geometry, material);
      cylinder.translateX(1)
      cylinder.translateY(1)
      cylinder.translateZ(1)
      scene.add(cylinder);
    })();
    (() => {
      const geometry = new THREE.SphereGeometry(.1);
      const material = new THREE.MeshLambertMaterial({
        color: 0xffff0033,
        side: THREE.DoubleSide,

      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = 1
      scene.add(sphere);
    })();

    (() => {
      const heartShape = new THREE.Shape();

      heartShape.lineTo(.1, .1);
      heartShape.lineTo(-.1, .1)
      heartShape.lineTo(.1, -.1)

      const geometry = new THREE.ShapeGeometry(heartShape);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide, opacity: .6, transparent: true });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

    })();

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