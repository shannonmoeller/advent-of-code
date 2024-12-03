import { readFile } from 'fs/promises';

function parseDeps(rules) {
	const deps = {};

	for (const rule of rules) {
		if (rule.includes('contain no')) {
			continue;
		}

		const [parentId, ...childIds] = rule
			.match(/(\d+ )?\w+ \w+ bag/g)
			.map((x) => x.replace(' bag', ''));

		const parent = deps[parentId] || (deps[parentId] = []);

		for (const child of childIds) {
			const [, count, id] = child.match(/(\d+) (\D+)/);

			parent.push([id, count]);
		}
	}

	return deps;
}

function readDeps(deps, parentId, ids = new Set()) {
	const children = deps[parentId];
	let sum = 1;

	if (!children) {
		return sum;
	}

	for (const [childId, childCount] of children) {
		if (ids.has(childId)) {
			continue;
		}

		sum += childCount * readDeps(deps, childId, ids);
	}

	return sum;
}

async function main() {
	const data = await readFile('07.txt', 'utf8');
	const rules = data.trim().split('\n');
	const deps = parseDeps(rules);

	return readDeps(deps, 'shiny gold') - 1;
}

main().then(console.log).catch(console.error);
