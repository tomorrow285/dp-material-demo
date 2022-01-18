import * as THREE from "three"
import { createSphereObject } from "./object";

export function SphereFactory(structure?: any) {
  const group = new THREE.Group();

  return {
    createOrUpdate() {
      group.clear()
      const positions = new Array(6).fill('').map((a, i) => {
        const n = .4 * i
        return new THREE.Vector3(n, n, n)
      })
      positions.forEach((pos) => {
        const object = createSphereObject(pos)
        group.add(object)
      })
    },

    get renderObjects() {
      return group
    }
  }
}