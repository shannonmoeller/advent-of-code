let request = await fetch('./25-1.txt');
let data = await request.text();
let lines = data.trim().split('\n');

let pointsById = {};
let edgesById = {};

for (let line of lines) {
	let ids = line.match(/\w{3}/g);
	let [left, ...rights] = ids;

	for (let id of ids) {
		pointsById[id] ??= {
			id,
			x: Math.random() * 1200,
			y: Math.random() * 1200,
			mass: 0.5,
			radius: 50,
		};
	}

	for (let right of rights) {
		let [a, b] = [left, right].sort();

		edgesById[[a, b]] ??= [
			pointsById[a],
			pointsById[b],
		];
	}
}

// delete edgesById['hfx,pzl'];
// delete edgesById['bvb,cmg'];
// delete edgesById['jqt,nvd'];

let points = Object.values(pointsById);
let edges = Object.values(edgesById);

let PRECISION = 1e-6;
let HALF_PRECISION = PRECISION / 2;

function get(obj, key) {
  if (!obj.has(key)) {
    obj.set(key, new Set());
  }

  return obj.get(key);
}

function set(obj, key, value) {
  get(obj, key).add(value);
}

function imprecision() {
  return Math.random() * PRECISION - HALF_PRECISION;
}

function isLessThanZero(value) {
  return value < PRECISION;
}

function isMoreThanZero(value) {
  return value > -PRECISION;
}

function isZero(value) {
  return Math.abs(value) <= PRECISION;
}

function constrain(a, b, options = {}) {
  let { x: ax, y: ay, mass: aMass = 1, radius: aRadius = 0 } = a;
  let { x: bx, y: by, mass: bMass = 1, radius: bRadius = 0 } = b;
  let { length = 0, strength = 1, adjust } = options;

  if (isZero(aMass) && isZero(bMass)) {
    return;
  }

  if (ax === bx && ay === by) {
    ax += imprecision();
    ay += imprecision();
    bx += imprecision();
    by += imprecision();
  }

  let xDelta = ax - bx;
  let yDelta = ay - by;
  let abDistance = Math.hypot(xDelta, yDelta);
  let abDelta = abDistance - aRadius - bRadius - length;

  if (adjust) {
    abDelta = adjust(abDelta);
  }

  if (!abDelta) {
    return;
  }

  let abMass = aMass + bMass;
  let abScale = abDelta / (abDistance * abMass);
  let aScale = abScale * aMass * strength;
  let bScale = abScale * bMass * strength;

  a.x -= xDelta * aScale;
  a.y -= yDelta * aScale;
  b.x += xDelta * bScale;
  b.y += yDelta * bScale;
}

function constrainAll(particles, options = {}) {
  let cellSize = options.cellSize;
  let cells = new Map();
  let cache = new Map();

  if (!cellSize) {
    cellSize = Math.max(...particles.map((p) => p.radius)) * 2;
  }

  for (let particle of particles) {
    let { x, y, radius } = particle;

    let top = Math.floor((y - radius) / cellSize);
    let bottom = Math.floor((y + radius) / cellSize);
    let left = Math.floor((x - radius) / cellSize);
    let right = Math.floor((x + radius) / cellSize);

    set(cells, `${left},${top}`, particle);
    set(cells, `${left},${bottom}`, particle);
    set(cells, `${right},${top}`, particle);
    set(cells, `${right},${bottom}`, particle);
  }

  for (let cell of cells.values()) {
    let neighbors = [...cell];
    let { length } = neighbors;

    for (let i = 0; i < length; i++) {
      let a = neighbors[i];

      for (let j = i + 1; j < length; j++) {
        let b = neighbors[j];

        if (get(cache, a).has(b)) {
          continue;
        }

        set(cache, a, b);
        set(cache, b, a);
        constrain(a, b, options);
      }
    }
  }
}

function adjustBall(delta) {
  return isMoreThanZero(delta) ? 0 : delta;
}

function constrainBalls(particles, options) {
  constrainAll(particles, { adjust: adjustBall, ...options });
}

function adjustStick(delta) {
  return isZero(delta) ? 0 : delta;
}

function constrainStick(a, b, options) {
  constrain(a, b, { adjust: adjustStick, ...options });
}

let svg = document.querySelector('svg');

// for (let point of points) {
// 	constrainStick(
// 		point,
// 		{ x: 600, y: 600, mass: 0 },
// 		{ length: 50 }
// 	);
// }

for (let i = 3; i--;) {
	// constrainBalls(points);

	for (let j = 20; j--;) {
		for (let [a, b] of edges) {
			constrainStick(a, b, { length: 50 });
		}
	}
}

for (let [a, b] of edges) {
	svg.insertAdjacentHTML('beforeend', `
		<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}">
			<title>${a.id},${b.id}</title>
		</line>
	`);
}
