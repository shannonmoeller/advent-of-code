import { createHash } from 'node:crypto';
import { exec } from '../helpers/utils.js';

function main([line]) {
  function md5(data) {
    return createHash('md5').update(data).digest('hex');
  }

  for (let i = 0; ; i++) {
    let value = md5(line + i);

    if (value.startsWith('00000')) {
      return i;
    }
  }
}

exec(main, '04-a', 609043);
exec(main, '04-1');
