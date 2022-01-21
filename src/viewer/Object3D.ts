
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Lattice from '../core/lattice';
import { Structure } from '../core/structure';
import { CifBlock } from '../molstar/mol-io/reader/cif';
import { BallStickRepresentation } from '../repr/ball-stick';
// import { CovalentBond } from '../repr/bonds';

// TODO: rename => visualizer

export namespace Object3D {
  let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer, controls: OrbitControls, group: THREE.Group;
  let offset: THREE.Vector3, sphereGeometry: THREE.IcosahedronGeometry, boxGeometry: THREE.BoxGeometry;

  export function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 200);
    camera.position.z = 10;
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
    controls.minDistance = 10;
    controls.maxDistance = 20;
    controls.addEventListener('change', render)

    offset = new THREE.Vector3()
    sphereGeometry = new THREE.IcosahedronGeometry(1, 3)
    boxGeometry = new THREE.BoxGeometry(1, 1, 1)


    // const camera_m = new THREE.Matrix3().set(
    //   window.innerWidth, 0, 0,
    //   0, window.innerHeight, 0,
    //   0, 0, 5000 / 2
    // )

    // console.log(camera_m)
    // console.log(camera)


    // demo()
    // CovalentBond.getCovalentBonds()
  }

  export function render() {
    renderer.render(scene, camera);
  }

  function getSingleBlockValue(cifBlock: CifBlock, name: string, defaultVal = 0) {
    return cifBlock.getField(name)?.toFloatArray()[0] || defaultVal
  }

  export function readCif(cifBlock: CifBlock) {
    console.log('cifBlock', cifBlock)
    // const {categories} = cifBlock
    // console.log('categories', cifBlock.getField('cell_length_a')?.toFloatArray())
    const [a, b, c, alpha, beta, gamma] = [
      'cell_length_a', 'cell_length_b', 'cell_length_c',
      'cell_angle_alpha', 'cell_angle_beta', 'cell_angle_gamma'
    ].map(name => getSingleBlockValue(cifBlock, name))
    // console.log(a, b, c, alpha, beta, gamma)
    const lattice = Lattice.from_parameters(a, b, c, alpha, beta, gamma)
    const siteSymbols = cifBlock.getField('atom_site_type_symbol')!.toStringArray() as string[]
    const fractX = cifBlock.getField('atom_site_fract_x')!.toFloatArray()
    const fractY = cifBlock.getField('atom_site_fract_y')!.toFloatArray()
    const fractZ = cifBlock.getField('atom_site_fract_z')!.toFloatArray()
    const coords = fractX.map((n, i) => [n, fractY[i], fractZ[i]])
    const struct = new Structure(lattice, siteSymbols, coords)
    console.log(struct)
    const repr = BallStickRepresentation(struct)
    repr.createOrUpdate()
    group.clear()
    group.add(repr.renderObjects)
    renderer.render(scene, camera);
  }

  export function demo() {
    const lattice = Lattice.from_parameters(
      4.97352800, 4.97352800, 4.97352800,
      90, 90, 90
    )
    const coords = [
      [0.37280000, 0.37280000, 0.62720000],
      [0.62720000, 0.37280000, 0.37280000],
      [0.37280000, 0.62720000, 0.37280000],
      [0.12720000, 0.12720000, 0.12720000],
      [0.87280000, 0.87280000, 0.12720000],
      [0.12720000, 0.87280000, 0.87280000],
      [0.87280000, 0.12720000, 0.87280000],
      [0.62720000, 0.62720000, 0.62720000],
      [0.00000000, 0.00000000, 0.00000000],
      [0.50000000, 0.50000000, 0.50000000],
    ]
    // console.log(lattice.matrix3)
    const struct = new Structure(lattice, ["H", "H", "H", "H", "H", "H", "H", "H", "C", "C"], coords)

    // console.log(struct.sites[0])
    // console.log(struct.getNearNeighbor(4))
    const repr = BallStickRepresentation(struct)
    repr.createOrUpdate()
    group.add(repr.renderObjects)
    renderer.render(scene, camera);
  }

  // export function add(structure: StructureGeometry) {
  //   const { atoms, bonds } = structure
  //   structure.computeBoundingBox();
  //   structure.boundingBox!.getCenter(offset).negate();
  // }

}