import * as THREE from "three"
import { Structure } from "../../core/structure";
import { createSphereObject } from "./object";

type GetSphere = (structure: Structure) => THREE.Vector3[]

export function SphereFactory(structure: Structure, getSphere: GetSphere) {
  const group = new THREE.Group();

  return {
    createOrUpdate() {
      group.clear()
      const positions = getSphere(structure)
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

export function getAtomSphereParmas(structure: Structure) {
  return structure.sites.map((site) => {
    const { coords } = site
    return new THREE.Vector3(...coords)
  })
}