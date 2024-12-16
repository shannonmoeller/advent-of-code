import { readFile } from 'fs/promises';

const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const rules = {
  byr(value) {
    return value >= 1920 && value <= 2002;
  },

  iyr(value) {
    return value >= 2010 && value <= 2020;
  },

  eyr(value) {
    return value >= 2020 && value <= 2030;
  },

  hgt(value) {
    const [, num, unit] = value.match(/^(\d+)(in|cm)$/) || [];

    switch (unit) {
      case 'cm':
        return num >= 150 && num <= 193;
      case 'in':
        return num >= 59 && num <= 76;
      default:
        return false;
    }
  },

  hcl(value) {
    return value.match(/^#[0-9a-f]{6}$/i);
  },

  ecl(value) {
    return eyeColors.includes(value);
  },

  pid(value) {
    return value.match(/^\d{9}$/);
  },
};

function checkPassport(passport) {
  const entries = passport.split(/\s+/).map((x) => x.split(':'));
  const fields = Object.fromEntries(entries);

  return Object.keys(rules).every((key) => {
    const value = fields[key];
    const isValid = value && rules[key](value);

    return isValid;
  });
}

async function main() {
  const data = await readFile('04.txt', 'utf8');
  const passports = data.trim().split('\n\n');

  return passports.filter(checkPassport).length;
}

main().then(console.log).catch(console.error);
