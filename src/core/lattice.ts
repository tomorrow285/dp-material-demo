import * as THREE from 'three'

export default class Lattice {
    /**
     * 一个晶格对象。本质上是一个矩阵和转换矩阵。
     * 除非另有说明，一般假定长度单位为埃，角度单位为度。
     */
    static angles: number[] = [];
    static alpha: number = 0;
    static beta: number = 0;
    static gamma: number = 0;
    static abc: number[] = [];
    static a: number = 0;
    static b: number = 0;
    static c: number = 0;
    public matrix3: THREE.Matrix3;
    // static matrix: any = [];
    constructor(public matrix: number[][]) {
        this.matrix3 = new THREE.Matrix3()
        this.matrix3.elements = matrix.flat()
    }

    // 坐标系转化
    get_cartesian_coords(fractional_coords: number[]) {
        const v = new THREE.Vector3(...fractional_coords).applyMatrix3(this.matrix3)
        return [v.x, v.y, v.z];
    }

    // 获取晶胞长度及角度
    static from_parameters(a: number, b: number, c: number, alpha: number, beta: number, gamma: number) {
        this.abc = [a, b, c];
        this.angles = [alpha, beta, gamma];

        this.alpha = alpha;
        this.beta = beta;
        this.gamma = gamma;

        this.a = a;
        this.b = b;
        this.c = c;

        //transformation matrix: see https://en.wikipedia.org/wiki/Fractional_coordinates#Conversion_to_Cartesian_coordinates
        const a21 = 0, a31 = 0, a32 = 0
        const a11 = a
        //other matrix entries as below:
        const angle = Math.PI / 180;

        const a12 = b * Math.cos(gamma * angle)
        const a13 = c * Math.cos(beta * angle)
        const a22 = b * Math.sin(gamma * angle)
        const a23 = c * (Math.cos(alpha * angle) - Math.cos(beta * angle) * Math.cos(gamma * angle)) / Math.sin(gamma * angle)
        const a33 = c * (Math.sqrt(1 - Math.pow(Math.cos(alpha * angle), 2) - Math.pow(Math.cos(beta * angle), 2) - Math.pow(Math.cos(gamma * angle), 2) + 2 * Math.cos(alpha * angle) * Math.cos(beta * angle) * Math.cos(gamma * angle))) / Math.sin(gamma * angle)

        const matrix = [
            [a11, a12, a13],
            [a21, a22, a23],
            [a31, a32, a33],
        ];
        // this.matrix = matrix;

        return new Lattice(matrix);
    }
}
