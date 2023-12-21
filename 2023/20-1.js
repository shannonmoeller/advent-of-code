import { readLines, log, createQueue } from './utils.js';

let lines = readLines('./20.txt');
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

for (let [srcId, { outputs }] of Object.entries(modules)) {
	for (let outId of outputs) {
		if (!(outId in modules)) continue;

		modules[outId].receipts[srcId] = 0;
	}
}

let count = [0, 0];
let queue = createQueue();

for (let i = 0; i < 1000; i++) {
	count[0]++;
	queue.add(['broadcaster', 0]);

	for (let [srcId, pulse] of queue) {
		let source = modules[srcId];

		for (let outId of source.outputs) {
			count[pulse]++;

			let output = modules[outId];

			if (!output) continue;

			output.receipts[srcId] = pulse;

			switch (output.type) {
				case '%': {
					if (pulse) break;
					output.state = Number(!output.state);
					queue.add([outId, output.state]);
					break;
				}
				case '&': {
					output.state = Number(!Object.values(output.receipts).every(Boolean));
					queue.add([outId, output.state]);
					break;
				}
			}
		}
	}
}

log(count[0] * count[1]);
