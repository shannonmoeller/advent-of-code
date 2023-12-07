import { log, readLines } from './utils.js';

let lines = readLines('./07.txt');
let value = 0;

let hands = [];
let values = {
	2: '1',
	3: '2',
	4: '3',
	5: '4',
	6: '5',
	7: '6',
	8: '7',
	9: '8',
	T: '9',
	J: '0',
	Q: 'b',
	K: 'c',
	A: 'd',
};

for (let line of lines) {
	let [cards, bet] = line.split(/\s+/);
  let strength = {};
	let power = '0x';

	for (let card of cards) {
		strength[card] ??= 0;
		strength[card] += 1;
		power += values[card];
	}

	let j = strength.J;
	delete strength.J;

	hands.push({
		cards,
		bet: Number(bet),
		strength: j === 5
			? 1 << 2 * 5
			: Object
				.values(strength)
				.sort((a, b) => b - a)
				.reduce((a, b) => {
					if (j) {
						b += j;
						j = 0;
					}
					return a + (1 << 2 * b);
				}, 0),
		power: Number(power),
	});
}
hands.sort((a, b) =>
	a.strength - b.strength ||
	a.power - b.power
);

value = hands.reduce(
	(acc, { bet }, rank) => acc + bet * (rank + 1),
	0
);

console.log(value);
