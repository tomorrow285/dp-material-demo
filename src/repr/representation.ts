import * as THREE from "three"

interface Representation {
  // state: Representation.State
  // params: Representation.Params
  createOrUpdate: () => void
  renderObjects: THREE.Object3D

  // setState(state: Representation.State): void
}

export type RepresentationFactory = () => Representation

namespace Representation {
  export interface State { }
  export interface Params { }

  export function createMulti(reprFactorys: { [k: string]: RepresentationFactory }) {
    const reprList: Representation[] = Object.entries(reprFactorys).map(([name, factory]) => {
      const repr = factory()
      // repr.setState(state)
      return repr
    })
    const group = new THREE.Group();


    return {
      createOrUpdate() {
        reprList.forEach((repr) => {
          repr.createOrUpdate()
        })
      },

      get renderObjects() {
        group.clear()
        reprList.forEach((repr) => {
          group.add(repr.renderObjects)
        })
        return group
      }
    }
  }
}

export { Representation };