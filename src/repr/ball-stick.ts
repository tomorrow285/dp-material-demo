import { Structure } from "../core/structure";
import { CylinderFactory, getBondsCylinderParmas } from "./factory/cylinder";
import { getUnitCellLineParmas, LineFactory } from "./factory/line";
import { getAtomSphereParmas, SphereFactory } from "./factory/sphere";
import { Representation } from "./representation";
// TODO: Display style => Line Stick Ball&stick CPK Polyhedron

export function BallStickRepresentation(structure: Structure) {
  return Representation.createMulti({
    'ball': () => SphereFactory(structure, getAtomSphereParmas),
    'stick': () => CylinderFactory(structure, getBondsCylinderParmas),
    'line': () => LineFactory(structure, getUnitCellLineParmas)
  })
}
