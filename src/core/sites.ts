import Lattice from './lattice'
import { Species } from './structure.type'
import Vector3 from '../math/vector3'


export class Site {
    /**
     * 非周期性站点。
     * 合成在空间的某个点上，与一些可选属性相关联
     * 坐标用标准笛卡尔坐标表示坐标。
     */

    /**
     * species:物种列表
     * i.(首选)一个指定为字符串的元素/物种。
     * ii.符号,如“Li”，“Fe2+”，“P”或原子序数，如3,56，或实际的元素或物种对象。
     * iii.3元素/种类和占用的字典.例如: {“Fe”:0.5，“Mn”:0.5}。这允许无序结构的建立。
     *
     * coords: 笛卡尔坐标系坐标
     * properties: 与站点关联的字典属性
     * skip_checks: 是否忽略所有常规检查，只创建站点。如果站点是以受控的方式创建并且需要速度，请使用此方法
     */
    // x,y,z坐标
    x: number;
    y: number;
    z: number;
    constructor(
        public species: Species,
        public coords: number[],
        public properties: { [key: string]: number },
        public skip_checks: boolean = false
    ) {
        if (!!this.skip_checks) {
            // TODO:skip_checks
        }

        this.species = species;
        this.coords = coords;
        this.properties = properties;
        this.skip_checks = skip_checks;

        const [x, y, z] = this.coords;
        this.x = x;
        this.y = y;
        this.z = z;


    }

    /**
     * 序列化site，输出一个字典
     */
    as_dict() {

    }

    /**
     * 测量与另一个site的距离
     * @param other:site
     */
    distance(other: Site) {
        return new Vector3(...this.coords).distanceTo(new Vector3(...other.coords))
    }

    /**
     * 返回site与空间中一个点之间的距离
     * @param pt:point
     */
    distance_from_point(pt: number[]) {

    }

    /**
     * Create Site from dict representation
     */
    from_dict() {

    }

    /**
     * True if site is an ordered site, i.e., with a single species with occupancy 1.
     */
    is_ordered() {
        const totalOccu = this.species.num_atoms;
        return totalOccu === 1 && this.species.length === 1;
    }

    /**
     * String representation of species on the site.
     */
    species_string() {
        if (this.is_ordered()) {

        }
    }

    __str__() {
        return `${this.coords} ${this.species_string}`;
    }

}

export class PeriodicSite extends Site {
    /**
     * 周期性的站点。
     */
    frac_coords: number[] = [];
    // a,b,c坐标
    a: number;
    b: number;
    c: number;
    constructor(
        public species: Species,
        public coords: number[],
        public lattice: Lattice,
        public to_unit_cell: boolean = false,
        public coords_are_cartesian: boolean = false,
        public properties: { [key: string]: number },
        public skip_checks: boolean = false
    ) {
        super(species, coords, properties, skip_checks)
        this.lattice = lattice;
        this.to_unit_cell = to_unit_cell;
        this.coords_are_cartesian = coords_are_cartesian;


        if (this.coords_are_cartesian) {
            // TODO:如果传入的是笛卡尔坐标系需转换
            // frac_coords = lattice.get_fractional_coords(coords)
        } else {
            this.frac_coords = this.coords;
        }

        if (this.to_unit_cell) {
            // TODO:将分数坐标转换为基本单元格，即所有分数坐标满足0 <= a < 1。默认值为False。
            // this.frac_coords = np.mod(frac_coords, 1);
        }

        if (!!this.skip_checks) {
            // TODO:skip_checks && class Site
        }

        // 转换为笛卡尔坐标
        this.coords = this.lattice.get_cartesian_coords(this.frac_coords)

        // console.log('this.coords', this.coords, species)

        const [a, b, c] = this.frac_coords;
        this.a = a;
        this.b = b;
        this.c = c;

    }

    // to_unit_cell(in_place) {

    // }
}

