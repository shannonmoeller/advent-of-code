import { readFile } from 'fs/promises';

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

function checkPassport(passport) {
  const data = passport.split(/\s+/).map((x) => x.split(':'));
  const fields = Object.fromEntries(data);

  return requiredFields.every((x) => x in fields);
}

async function main() {
  const data = await readFile('04.txt', 'utf8');
  const passports = data.trim().split('\n\n');

  return passports.filter(checkPassport).length;
}

main().then(console.log).catch(console.error);
