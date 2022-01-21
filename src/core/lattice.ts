import Matrix3 from '../math/matrix3'
import Vector3 from '../math/vector3'

export default class Lattice {
    /**
     * 一个晶格对象。本质上是一个矩阵和转换矩阵。
     * 除非另有说明，一般假定长度单位为埃，角度单位为度。
     */
    constructor(
        public a: number,
        public b: number,
        public c: number,
        public alpha: number,
        public beta: number,
        public gamma: number,
        public abc: number[],
        public angles: number[],
        public matrix3: Matrix3
    ) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.alpha = alpha;
        this.beta = beta;
        this.gamma = gamma;
        this.angles = angles;
        this.matrix3 = matrix3;
    }

    // 坐标系转化
    get_cartesian_coords(fractional_coords: number[]) {
        const v = new Vector3(...fractional_coords).applyMatrix3(this.matrix3)
        return [v.x, v.y, v.z];
    }

    // 获取晶胞长度及角度
    static from_parameters_old(a: number, b: number, c: number, alpha: number, beta: number, gamma: number) {
        const abc = [a, b, c];
        const angles = [alpha, beta, gamma];

        //transformation matrix: see https://en.wikipedia.org/wiki/Fractional_coordinates#Conversion_to_Cartesian_coordinates
        const angle = Math.PI / 180;
        const a21 = 0, a31 = 0, a32 = 0
        const a11 = a

        //other matrix entries as below:
        const a12 = b * Math.cos(gamma * angle)
        const a13 = c * Math.cos(beta * angle)
        const a22 = b * Math.sin(gamma * angle)
        const a23 = c * (Math.cos(alpha * angle) - Math.cos(beta * angle) * Math.cos(gamma * angle)) / Math.sin(gamma * angle)
        const a33 = c * (Math.sqrt(1 - Math.pow(Math.cos(alpha * angle), 2) - Math.pow(Math.cos(beta * angle), 2) - Math.pow(Math.cos(gamma * angle), 2) + 2 * Math.cos(alpha * angle) * Math.cos(beta * angle) * Math.cos(gamma * angle))) / Math.sin(gamma * angle)

        const matrix3 = new Matrix3();
        matrix3.elements = [
            a11, a12, a13,
            a21, a22, a23,
            a31, a32, a33,
        ];

        return new Lattice(a, b, c, alpha, beta, gamma, abc, angles, matrix3);
    }

    static from_parameters(a: number, b: number, c: number, alpha: number, beta: number, gamma: number) {
        const abc = [a, b, c];
        const angles = [alpha, beta, gamma];

        const angles_r = angles.map(angle => angle * Math.PI / 180)
        const [cos_alpha, cos_beta, cos_gamma] = angles_r.map(Math.cos)
        const [sin_alpha, sin_beta] = angles_r.map(Math.sin)

        const val = (() => {
            const val = (cos_alpha * cos_beta - cos_gamma) / (sin_alpha * sin_beta)
            const max_abs_val = 1
            return Math.max(Math.min(val, max_abs_val), -max_abs_val)
        })()
        const gamma_star = Math.acos(val)

        const matrix3 = new Matrix3();
        matrix3.elements = [
            a * sin_beta, 0.0, a * cos_beta,

            -b * sin_alpha * Math.cos(gamma_star),
            b * sin_alpha * Math.sin(gamma_star),
            b * cos_alpha,

            0.0, 0.0, c
        ];

        // const vector_a = [a * sin_beta, 0.0, a * cos_beta]
        // const vector_b = [
        //     -b * sin_alpha * Math.cos(gamma_star),
        //     b * sin_alpha * Math.sin(gamma_star),
        //     b * cos_alpha,
        // ]
        // const vector_c = [0.0, 0.0, c]

        // console.log(cos_alpha, cos_beta, cos_gamma)
        // console.log(sin_alpha, sin_beta)
        // console.log(val)
        // console.log('gamma_star', val, gamma_star, Math.cos(gamma_star))
        // console.log(-b * sin_alpha, Math.cos(gamma_star), -b * sin_alpha * Math.cos(gamma_star))
        // console.log(vector_a, vector_b, vector_c)

        return new Lattice(a, b, c, alpha, beta, gamma, abc, angles, matrix3);
    }
}
