function add(a, b) {
  return a + b;
}

function isEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

module.exports = { add, isEmail };
