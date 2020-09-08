export function between(value, min, max) {
  if (min && min > value) {
    return min;
  }
  if (max && max > value) {
    return max;
  }

  return value;
}


function isValidNum(num) {
  return num !== null && num !== false && !Number.isNaN(Number(num));
};

export function safeMin(...args) {
  return Math.min(...args.filter(isValidNum));
};

export function safeMAx(...args) {
  return Math.max(...args.filter(isValidNum));
}