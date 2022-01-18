import * as THREE from "three"
import { createCylinderObject } from "./object";

export function CylinderFactory(structure?: any) {
  const group = new THREE.Group();

  return {
    createOrUpdate() {
      group.clear()
      const positions = new Array(6).fill('').map((a, i) => {
        const n = .4 * i
        const j = -.4
        return [new THREE.Vector3(n, n, n), new THREE.Vector3(n, n, j)]
      })
      positions.forEach(([s, e]) => {
        const object = createCylinderObject(s, e)
        group.add(object)
      })
    },

    get renderObjects() {
      return group
    }
  }
}