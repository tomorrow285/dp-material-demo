
import * as THREE from 'three';
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { StructureGeometry } from './StructureGeometry'

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
  }

  export function render() {
    renderer.render(scene, camera);
  }

  export function add(structure: StructureGeometry) {
    const { atoms, bonds } = structure
    structure.computeBoundingBox();
    structure.boundingBox!.getCenter(offset).negate();
    atoms.translate(offset.x, offset.y, offset.z);
    bonds.translate(offset.x, offset.y, offset.z);
    createAtomObjects(atoms)
    createBoneObjects(bonds)
    render()
  }

  function createAtomObjects(atoms: THREE.BufferGeometry) {
    const positions = atoms.getAttribute('position');
    const colors = atoms.getAttribute('color');
    const position = new THREE.Vector3();
    const color = new THREE.Color();
    for (let i = 0; i < positions.count; i++) {
      position.x = positions.getX(i);
      position.y = positions.getY(i);
      position.z = positions.getZ(i);
      color.r = colors.getX(i);
      color.g = colors.getY(i);
      color.b = colors.getZ(i);
      const material = new THREE.MeshPhongMaterial({ color: color });
      const object = new THREE.Mesh(sphereGeometry, material);
      object.position.copy(position);
      object.position.multiplyScalar(75);
      object.scale.multiplyScalar(25);
      group.add(object)
    }
  }

  function createBoneObjects(bonds: THREE.BufferGeometry) {
    const positions = bonds.getAttribute('position');
    const start = new THREE.Vector3();
    const end = new THREE.Vector3();

    for (let i = 0; i < positions.count; i += 2) {
      start.x = positions.getX(i);
      start.y = positions.getY(i);
      start.z = positions.getZ(i);

      end.x = positions.getX(i + 1);
      end.y = positions.getY(i + 1);
      end.z = positions.getZ(i + 1);

      start.multiplyScalar(75);
      end.multiplyScalar(75);

      const object = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial({ color: 0xffffff }));
      object.position.copy(start);
      object.position.lerp(end, 0.5);
      object.scale.set(5, 5, start.distanceTo(end));
      object.lookAt(end);
      group.add(object);
    }
  }
}