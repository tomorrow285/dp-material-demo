
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BallStickRepresentation } from '../repr/ball-stick';

export namespace Object3D {
  let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer, controls: OrbitControls, group: THREE.Group;
  let offset: THREE.Vector3, sphereGeometry: THREE.IcosahedronGeometry, boxGeometry: THREE.BoxGeometry;

  export function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 1000;
    scene.add(camera);

    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.position.set(- 1, - 1, 1);
    scene.add(light2);

    group = new THREE.Group();
    scene.add(group);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 2000;
    controls.addEventListener('change', render)

    offset = new THREE.Vector3()
    sphereGeometry = new THREE.IcosahedronGeometry(1, 3)
    boxGeometry = new THREE.BoxGeometry(1, 1, 1)

    const repr = BallStickRepresentation()
    repr.createOrUpdate()
    group.add(repr.renderObjects)
    renderer.render(scene, camera);

  }

  export function render() {
    renderer.render(scene, camera);
  }

  // export function add(structure: StructureGeometry) {
  //   const { atoms, bonds } = structure
  //   structure.computeBoundingBox();
  //   structure.boundingBox!.getCenter(offset).negate();
  // }

}