import { readFile } from 'fs/promises';

function parseDeps(rules) {
	const deps = {};

	for (const rule of rules) {
		if (rule.includes('contain no')) {
			continue;
		}

		const [parentId, ...childIds] = rule
			.match(/\w+ \w+ bag/g)
			.map((x) => x.replace(' bag', ''));

		for (const childId of childIds) {
			const child = deps[childId] || (deps[childId] = new Set());

			child.add(parentId);
		}
	}

	return deps;
}

function readDeps(deps, parentId, ids = new Set()) {
	const childIds = deps[parentId];

	if (!childIds) {
		return ids;
	}

	for (const childId of childIds) {
		if (ids.has(childId)) {
			continue;
		}

		ids.add(childId);
		readDeps(deps, childId, ids);
	}

	return ids;
}

async function main() {
	const data = await readFile('07.txt', 'utf8');
	const rules = data.trim().split('\n');
	const deps = parseDeps(rules);

	return readDeps(deps, 'shiny gold').size;
}

main().then(console.log).catch(console.error);
