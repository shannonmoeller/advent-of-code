import { readLines, log, lcm, createQueue } from './utils.js';

let lines = readLines('./20.txt');
let value = 0;

let modules = {};

for (let line of lines) {
	let [, type, id, outputs] = line.match(/([%&])?(\w+) -> (.*)/);

	modules[id] = {
		id,
		type,
		outputs: outputs.split(', '),
		receipts: {},
		state: 0,
	};
}

for (let [id, { outputs }] of Object.entries(modules)) {
	for (let output of outputs) {
		if (!(output in modules)) continue;

		modules[output].receipts[id] = 0;
	}
}

let count = 0;
let queue = createQueue();
let multiples = {};

while (true) {
	count++;
	queue.add(['broadcaster', 0]);

	for (let [id, pulse] of queue) {
		let source = modules[id];

		for (let output of source.outputs) {
			if (!(id in multiples) && output === 'qt' && pulse) {
				multiples[id] = count;
			}

			if (!(output in modules)) {
				continue;
			}

			let target = modules[output];

			target.receipts[source.id] = pulse;

			switch (target.type) {
				case '%': {
					if (pulse) break;
					target.state = Number(!target.state);
					queue.add([target.id, target.state]);
					break;
				}
				case '&': {
					target.state = Number(!Object.values(target.receipts).every(Boolean));
					queue.add([target.id, target.state]);
					break;
				}
			}
		}
	}

	if (Object.keys(multiples).length === Object.keys(modules.qt.receipts).length) {
		break;
	}
}

log(Object.values(multiples).reduce(lcm));
