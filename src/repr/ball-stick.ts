import { CylinderFactory } from "./factory/cylinder";
import { LineFactory } from "./factory/line";
import { SphereFactory } from "./factory/sphere";
import { Representation } from "./representation";
// TODO: Display style => Line Stick Ball&stick CPK Polyhedron

export function BallStickRepresentation() {
  return Representation.createMulti({
    'ball': () => SphereFactory(),
    'stick': () => CylinderFactory(),
    'line': () => LineFactory()
  })
}
