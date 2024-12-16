import { readLines, log } from './utils.js';

let lines = readLines('./19-1.txt');
let value = 0;

let delimiter = lines.indexOf('');
let workflows = {};

for (let line of lines.slice(0, delimiter)) {
  let [, key, rules] = line.match(/(\w+)\{(.+)\}/);

  workflows[key] = rules.split(',').map((rule) => {
    let [, , prop, op, num, next] = rule.match(/((\w)(\W)(\d+):)?(\w+)/);

    return { prop, op, num: Number(num), next };
  });
}

function walk(key, bounds) {
  if (key === 'R') {
    return;
  }

  if (key === 'A') {
    value += Object.values(bounds)
      .map(([a, b]) => b - a + 1)
      .reduce((a, b) => a * b);

    return;
  }

  for (let rule of workflows[key]) {
    let { prop, op, num, next } = rule;

    if (prop) {
      let clone = structuredClone(bounds);

      if (op === '<') {
        clone[prop][1] = Math.min(clone[prop][1], num - 1);
        bounds[prop][0] = Math.max(bounds[prop][0], num);
      }

      if (op === '>') {
        clone[prop][0] = Math.max(clone[prop][0], num + 1);
        bounds[prop][1] = Math.min(bounds[prop][1], num);
      }

      walk(next, clone);
    } else {
      walk(next, bounds);
    }
  }
}

walk('in', {
  x: [1, 4000],
  m: [1, 4000],
  a: [1, 4000],
  s: [1, 4000],
});

log(value);
