import * as THREE from "three"

const sphereGeometry = new THREE.SphereGeometry(.2)
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

export function createSphereObject(position: THREE.Vector3, color: string | number = 0xff0000) {
  // const material = new THREE.MeshBasicMaterial({ color });
  const material = new THREE.MeshPhongMaterial({ color });
  const object = new THREE.Mesh(sphereGeometry, material);
  object.position.copy(position);
  // object.position.multiplyScalar(75);
  // object.scale.multiplyScalar(25);
  return object
}

export function createCylinderObject(start: THREE.Vector3, end: THREE.Vector3) {
  // start.multiplyScalar(75);
  // end.multiplyScalar(75);
  // const boxGeometry = new THREE.CylinderGeometry(.05, .05, start.distanceTo(end), 32)
  // const object = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial({ color: 0xffffff }));
  // object.position.copy(start);
  // object.position.lerp(end, 0.5);
  // console.log(object)

  const object = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial({ color: 0xffffff }));
  object.position.copy(start);
  object.position.lerp(end, 0.5);
  object.scale.set(.1, .1, start.distanceTo(end));
  object.lookAt(end);
  return object
}

export function createLineObject(start: THREE.Vector3, end: THREE.Vector3) {
  // start.multiplyScalar(75);
  // end.multiplyScalar(75);
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
  const object = new THREE.Line(geometry, material);
  return object
}