import * as THREE from "three"
import bondLengthJSON from './bond_lengths.json'


const bondLengthData = (() => {
  const data = new Map<string, { [o: string]: number }>()
  bondLengthJSON.forEach(bond => {
    const { elements, length, bond_order } = bond
    const label = elements.join('-')
    const value = data.get(label) || {}
    value[bond_order] = length
    data.set(label, value)
  })
  return data

})()
// console.log(bondLengthJSON)
// console.log(bondLengthData)

class Atom {
  distance(atom: Atom) {
    return this.position.distanceTo(atom.position)
  }
  constructor(public type: string, public position: THREE.Vector3) { }
}

const list = [
  new Atom('C', new THREE.Vector3(0, 0, 0)),
  new Atom('C', new THREE.Vector3(0, 0, 1))
]

class CovalentBond {
  get distance() {
    return this.atomA.distance(this.atomB)
  }
  constructor(public atomA: Atom, public atomB: Atom) { }
}

namespace CovalentBond {

  function isBonded(a: Atom, b: Atom, tol = .2) {
    const label = [a.type, b.type].sort((a, b) => a > b ? 1 : -1).join('-')
    const value = bondLengthData.get(label)
    if (!value) return false
    const dist = a.distance(b)
    for (let [, v] of Object.entries(value)) {
      if (dist < (1 + tol) * v) {
        return true
      }
    }
    return false
  }

  export function getCovalentBonds(structure?: any) {
    const bonds: CovalentBond[] = []

    for (let i = 0; i < list.length - 1; i++) {
      for (let j = 1; j < list.length; j++) {
        if (isBonded(list[i], list[j])) {
          bonds.push(new CovalentBond(list[i], list[j]))
        }
      }
    }

    console.log(bonds)
  }

}

export { CovalentBond }