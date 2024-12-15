export function gcd(a, b) {
  return a ? gcd(b % a, a) : b;
}

export function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
