
export function allX(source) {
  return 'x'.repeat(source.length);
}

export function asciiShift(source, shiftAmount) {
  console.log(source);
  console.log(shiftAmount);
  return source.split('')
    .map(l => String.fromCharCode(l.charCodeAt() + shiftAmount));
}
