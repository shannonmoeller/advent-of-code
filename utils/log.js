import { inspect, styleText } from 'node:util';

['bold', 'green', 'red', 'yellow'].forEach((color) => {
  Object.defineProperty(String.prototype, color, {
    get() {
      return styleText(color, this);
    },
  });
});

export function log(...args) {
  console.log(
    ...args.map((x) => (x !== Object(x) ? x : inspect(x, { colors: true, depth: Infinity }))),
  );

  return args.at(-1);
}
