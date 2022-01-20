import { Site, PeriodicSite } from "./sites";
import Lattice from './lattice'

class Neighbor extends Site {
    /**
     * site子类，包含一个相邻原子
     */
    constructor(
        public species: object,
        public coords: number[],
        public properties: object,
        public nn_distance: number,
        public index = 0
    ) {
        super(species, coords, properties)
    }
}

class PeriodicNeighbor extends PeriodicSite {
    /**
     * 周期性site子类，包含一个相邻原子
     */
}

class SiteCollection {
    /**
     * Sites or PeriodicSites站点集合， 这用作 Molecule 和 Structure 的基类。
     * Basic SiteCollection. Essentially a sequence of Sites or PeriodicSites.
     * This serves as a base class for Molecule (a collection of Site, i.e.,
     * no periodicity) and Structure (a collection of PeriodicSites, i.e.,
     * periodicity). Not meant to be instantiated directly.
     */
    DISTANCE_TOLERANCE: number = 0.5
}

class IMolecule {
    /**
     *  基本不变的分子对象，没有周期性。基本上是一个
        序列的网站。分子是不可变的，所以它们可以变
        作为字典中的键。对于一个可变分子，
        使用:类:分子。
        分子扩展了序列和哈希，这意味着在很多情况下，
        它可以像任何list一样使用。在分子中迭代是
        相当于按顺序浏览场地。
    */

    /**
     * Lattice:晶格(Lattice/3x3 array)
     * species: 原子物种的列表。可能的输入类型包括一个dict的元素/物种和占有，一个list的元素/物种指定为实际的元素/物种，字符串(“Fe”，“Fe2+”)或原子序数(1,56)。
     * coords: 坐标(3x1 array)-每个物种的笛卡尔坐标列表。
     * charge(number)-分子的电荷。默认值为0。
     */

    // lattice: number[] = [];
    // species: any[] = [];
    // coords: Array<any> = [];
    // charge: number = 0;
    // validate_proximity: boolean = false;
    // to_unit_cell: boolean = false;
    // coords_are_cartesian: boolean = false;
    // site_properties: Object = {};
}

class Molecule {
    /**
   * 可变的分子对象。
   */
}

export class IStructure {
    /**
     * 具有周期性的基本不可变结构对象。
     */
    sites: any[] = [];

    getSitesInSphere(site: Site, r: number) {
        const neighbors: Neighbor[] = []

        this.sites.forEach((s, idx) => {
            if (s === site) return
            const dist = site.distance(s)
            if (dist < r) {
                neighbors.push(new Neighbor(s.species, s.coords, s.properties, dist, idx))
            }
        })

        return neighbors
    }

    getNearNeighbor(n: number, tol = 0.1, cutoff = 10.0) {
        const site = this.sites[n]
        const neighbors = this.getSitesInSphere(site, cutoff)
        const minDist = Math.min.apply(null, neighbors.map(nb => nb.nn_distance))
        return neighbors.filter(nb => nb.nn_distance < (1 + tol) * minDist)
    }

    constructor(
        public lattice: any,
        public species: any[] = [],
        public coords: Array<any> = [],
        public charge: number = 0,
        public validate_proximity: boolean = false,
        public to_unit_cell: boolean = false,
        public coords_are_cartesian: boolean = false,
        public site_properties: Object = {},
    ) {

        if (species.length !== coords.length) {
            throw new Error("The list of atomic species must be of the same length as the list of fractional coordinates.")
        }

        this.species = species;
        this.coords = coords;
        // TODO: 需要判断lattice格式
        this.lattice = lattice;
        this.charge = charge;
        this.validate_proximity = validate_proximity;
        this.to_unit_cell = to_unit_cell;
        this.coords_are_cartesian = coords_are_cartesian;
        this.site_properties = site_properties;

        for (let i = 0; i < species.length; i++) {
            const prop = {};
            this.sites.push(new PeriodicSite(
                species[i],
                coords[i],
                lattice,
                to_unit_cell,
                coords_are_cartesian,
                prop,
            ))
        }
    }
}

export class Structure extends IStructure {
    /**
     * 可变的结构对象。
     */
    constructor(
        public lattice: any,
        public species: any[] = [],
        public coords: Array<any> = [],
        public charge: number = 0,
        public validate_proximity: boolean = false,
        public to_unit_cell: boolean = false,
        public coords_are_cartesian: boolean = false,
        public site_properties: Object = {},
    ) {
        super(lattice, species, coords, charge, validate_proximity, to_unit_cell);

        this.species = species;
        this.coords = coords;
        this.lattice = lattice;
        this.charge = charge;
        this.validate_proximity = validate_proximity;
        this.to_unit_cell = to_unit_cell;
        this.coords_are_cartesian = coords_are_cartesian;
        this.site_properties = site_properties;
        console.log(this.sites);

        // TODO: 单个site crud
    }
}



