import { exec } from '../helpers/utils.js';

function main(lines) {
  return lines.map(Number).reduce((a, b) => a + b);
}

exec(main, './01.txt', 531);
