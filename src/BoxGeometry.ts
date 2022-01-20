import { BoxGeometry } from 'three';
import { Vector3 } from 'three/src/math/Vector3.js';
import { Matrix3 } from 'three/src/math/Matrix3.js';
import Lattice from './core/lattice';
export default class LatticeGeometry extends BoxGeometry {
	constructor(
		public a: number,
        public b: number,
        public c: number,
        public alpha: number,
        public beta: number,
        public gamma: number,
        public matrix3: Matrix3
	) {
		super();

		this.a = a;
        this.b = b;
        this.c = c;
        this.alpha = alpha;
        this.beta = beta;
        this.gamma = gamma;
        this.matrix3 = matrix3;

		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		let numberOfVertices = 0;
		let groupStart = 0;

		const scope = this;

		buildPlane( 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0 );

		function buildPlane(
				u:string,
				v:string,
				w:string,
				udir:number,
				vdir:number,
				width:number,
				height:number,
				depth:number,
				alpha:number,
				beta:number,
				gamma:number,
				gridX:number,
				gridY:number,
				materialIndex:number
			) {

			const segmentWidth = width / gridX;
			const segmentHeight = height / gridY;

			const widthHalf = width / 2;
			const heightHalf = height / 2;
			const depthHalf = depth / 2;

			const gridX1 = gridX + 1;
			const gridY1 = gridY + 1;

			let vertexCounter = 0;
			let groupCount = 0;

			const vector = new Vector3();

			// generate vertices, normals and uvs

			for ( let iy = 0; iy < gridY1; iy ++ ) {

				const y = iy * segmentHeight - heightHalf;

				for ( let ix = 0; ix < gridX1; ix ++ ) {

					const x = ix * segmentWidth - widthHalf;

					// set values to correct vector component

					vector[ u ] = x * udir;
					vector[ v ] = y * vdir;
					vector[ w ] = depthHalf;

					const angle = Math.PI / 180;
					// // var matrix = new Matrix3().setFromMatrix4(new Matrix4().makeRotationZ(-Math.PI/6));
					// const matrix = new Matrix3().set(
					// 	vector.x, 0, 0,
					// 	vector.y * Math.cos(gamma * angle), vector.y * Math.sin(gamma * angle), 0,
					// 	vector.z * Math.cos(beta * angle), vector.z * ((Math.cos(alpha * angle) - Math.cos(beta * angle) * Math.cos(gamma * angle)) / Math.sin(gamma * angle)), vector.z * Math.sqrt((Math.pow(Math.sin(beta * angle), 2) - Math.pow(((Math.cos(alpha * angle) - Math.cos(beta * angle) * Math.cos(gamma * angle)) / Math.sin(gamma * angle)), 2)))
					// );

					//transformation matrix: see https://en.wikipedia.org/wiki/Fractional_coordinates#Conversion_to_Cartesian_coordinates
					//a21, a31, a32 = 0
					//a11 = a
					//other matrix entries as below:

					const a12 = vector.y * Math.cos(gamma * angle)
					const a13 = vector.z * Math.cos(beta * angle)

					const a22 = vector.y * Math.sin(gamma * angle)
					const a23 = vector.z * (Math.cos(alpha * angle) - Math.cos(beta * angle) * Math.cos(gamma * angle)) / Math.sin(gamma * angle)

					const a33 = vector.z * (Math.sqrt(1 - Math.pow(Math.cos(alpha * angle), 2) - Math.pow(Math.cos(beta * angle), 2) - Math.pow(Math.cos(gamma * angle), 2) + 2 * Math.cos(alpha * angle) * Math.cos(beta * angle) * Math.cos(gamma * angle))) / Math.sin(gamma * angle)

					//xyz = [A]*(xyz)
					const x1 = vector.x + a12 + a13
					const y1 = a22 + a23
					const z1 = a33

					// const vector1 = vector.applyMatrix3(matrix)
					// console.log(matrix, 'matrix');


					// now apply vector to vertex buffer
					// debugger
					vertices.push( x1, y1, z1 );
					
					// console.log(vertices);
					// set values to correct vector component

					vector[ u ] = 0;
					vector[ v ] = 0;
					vector[ w ] = depth > 0 ? 1 : - 1;

					// now apply vector to normal buffer

					normals.push( vector.x, vector.y, vector.z );

					// uvs

					uvs.push( ix / gridX );
					uvs.push( 1 - ( iy / gridY ) );
					
					// counters

					vertexCounter += 1;

				}

			}

			// indices

			// 1. you need three indices to draw a single face
			// 2. a single segment consists of two faces
			// 3. so we need to generate six (2*3) indices per segment

			for ( let iy = 0; iy < gridY; iy ++ ) {

				for ( let ix = 0; ix < gridX; ix ++ ) {

					const a = numberOfVertices + ix + gridX1 * iy;
					const b = numberOfVertices + ix + gridX1 * ( iy + 1 );
					const c = numberOfVertices + ( ix + 1 ) + gridX1 * ( iy + 1 );
					const d = numberOfVertices + ( ix + 1 ) + gridX1 * iy;

					// faces

					indices.push( a, b, d );
					indices.push( b, c, d );

					// increase counter

					groupCount += 6;

				}

			}

			// add a group to the geometry. this will ensure multi material support

			scope.addGroup( groupStart, groupCount, materialIndex );

			// calculate new start value for groups

			groupStart += groupCount;

			// update total number of vertices

			numberOfVertices += vertexCounter;
			// console.log(vertices, 'vertices');
			
		}
	}
}
