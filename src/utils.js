const spaceChars = ' \\s\u00A0';
const symbolRegex = /([[\]().?/*{}+$^:])/g;

export function trimStart(str, charlist = spaceChars) {
  charlist = (charlist + '').replace(symbolRegex, '$1');
  const re = new RegExp('^[' + charlist + ']+', 'g');
  return (str + '').replace(re, '');
}

export function trimEnd(str, charlist = spaceChars) {
  charlist = (charlist + '').replace(symbolRegex, '\\$1');
  const re = new RegExp('[' + charlist + ']+$', 'g');
  return (str + '').replace(re, '');
}
