import * as THREE from "three"
import { Structure } from "../../core/structure";
import { createLineObject } from "./object";

type GetLine = (structure: Structure) => [THREE.Vector3, THREE.Vector3][]

export function LineFactory(structure: Structure, getCylinder: GetLine) {
  const group = new THREE.Group();

  return {
    createOrUpdate() {
      // console.log(
      //   getCylinder(structure)
      // )
      group.clear()
      const positions = getCylinder(structure)
      // const positions = new Array(6).fill('').map((a, i) => {
      //   const n = .4 * i
      //   const j = .4
      //   return [new THREE.Vector3(n, n, n), new THREE.Vector3(n, j, j)]
      // })
      positions.forEach(([s, e]) => {
        const object = createLineObject(s, e)
        group.add(object)
      })
    },

    get renderObjects() {
      return group
    }
  }
}

export function getUnitCellLineParmas(structure: Structure): [THREE.Vector3, THREE.Vector3][] {
  // const { matrix3 } = structure.lattice
  // // const lines: THREE.Vector3[][] = []
  // const points: THREE.Vector3[] = new Array(8).fill('').map(() => new THREE.Vector3)
  // matrix3.extractBasis(points[1], points[2], points[3])
  // points[5] = points[1].add(points[3])
  // points[6] = points[1].add(points[2])
  // points[7] = points[2].add(points[3])
  // points[4] = points[2].add(points[5])
  // // const lines: THREE.Vector3[][] = [[0, 1]].map(([s, e]) => [points[s], points[e]])
  // // lines.push([points[0], points[1]])
  // // console.log(matrix3, a, b, c)
  // console.log(matrix3)
  // return [
  //   // [0, 1], [0, 2], [0, 3],
  //   [0, 1], [0, 2], [0, 3], [4, 5],
  //   [4, 6], [4, 7], [1, 6], [1, 7],
  //   [2, 5], [2, 7], [3, 5], [3, 6],
  // ].map(([s, e]) => [points[s], points[e]])

  return [[new THREE.Vector3, new THREE.Vector3]]
}