// Mostly copied from https://github.com/mathiasbynens/mothereff.in/blob/master/css-escapes/eff.js

module.exports = (string) => {
  let output = '';

  const firstChar = string.charAt(0);
  const length = string.length;
  let counter = 0;
  let value;
  let character;
  let charCode;
  let surrogatePairCount = 0;
  let extraCharCode; // low surrogate

  while (counter < length) {
    character = string.charAt(counter++);
    charCode = character.charCodeAt();
    if (/[\t\n\v\f]/.test(character)) {
      value = '\\' + charCode.toString(16).toUpperCase() + ' ';
    } else if (/[ !"#$%&'()*+,./;:<=>?@\[\\\]^`{|}~]/.test(character)) {
      value = '\\' + character;
    } else {
      value = character;
    }
    output += value;
  }

  if (/^_/.test(output)) { // Prevent IE6 from ignoring the rule altogether.
    output = '\\_' + output.slice(1);
  }
  if (/^-[\d]/.test(output)) {
    output = '\\-' + output.slice(1);
  }
  if (/\d/.test(firstChar)) {
    output = '\\3' + firstChar + ' ' + output.slice(1);
  }

  return output
}
