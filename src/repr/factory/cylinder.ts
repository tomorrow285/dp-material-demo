import * as THREE from "three"
import { Structure } from "../../core/structure";
import { createCylinderObject } from "./object";
import Vector3 from '../../math/vector3'


type GetCylinder = (structure: Structure) => [Vector3, Vector3][]

export function CylinderFactory(structure: Structure, getCylinder: GetCylinder) {
  const group = new THREE.Group();

  return {
    createOrUpdate() {
      group.clear()
      const positions = getCylinder(structure)
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

export function getBondsCylinderParmas(structure: Structure): [Vector3, Vector3][] {
  const { sites } = structure
  const bonds = new Map<string, number[]>()
  const invertedBonds = new Set<string>()

  for (let i = 0; i < sites.length; i++) {
    structure.getNearNeighbor(i, .1, 3).forEach(nb => {
      const bond = [i, nb.index]
      const invertBond = [nb.index, i]
      const tag = bond.join('-')
      const invertTag = invertBond.join('-')
      if (bonds.has(tag)) { return }
      if (invertedBonds.has(invertTag)) { return }
      bonds.set(tag, bond)
      invertedBonds.add(invertTag)
    })
  }

  return [...bonds.values()].map((bond => {
    const [s, e] = bond
    return [
      new Vector3(...sites[s].coords),
      new Vector3(...sites[e].coords)
    ]
  }))
}