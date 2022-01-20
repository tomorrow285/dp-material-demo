import * as THREE from "three"
import { Structure } from "../../core/structure";
import { VESTA_COLOR } from "../schemes";
import { createSphereObject } from "./object";

type GetSphere = (structure: Structure) => THREE.Vector3[]

export function SphereFactory(structure: Structure, getSphere: GetSphere) {
  const group = new THREE.Group();

  return {
    createOrUpdate() {
      group.clear()
      const positions = getSphere(structure)
      positions.forEach((pos, i) => {
        const { species } = structure.sites[i]
        const rgb = VESTA_COLOR[species]
        const object = createSphereObject(pos, `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`)
        group.add(object)
      })
    },

    get renderObjects() {
      return group
    }
  }
}

export function getAtomSphereParmas(structure: Structure) {
  return structure.sites.map((site) => {
    const { coords } = site
    return new THREE.Vector3(...coords)
  })
}