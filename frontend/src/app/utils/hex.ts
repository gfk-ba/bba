export function toHex(text: string) {
  let h = '';
  for (let i = 0; i < text.length; i++) {
    const hex = text.charCodeAt(i).toString(16);
    h += ('000' + hex).slice(-4);
  }
  return h;
}

const hexRegEx = /([0-9]|[a-f])/gim;

export function isHex(input: string) {
  return typeof input === 'string' && (input.match(hexRegEx) || []).length === input.length;
}

export function fromHex(text: string) {
  let j;
  let back = '';
  const hexes = text.match(/.{1,4}/g) || [];

  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
}
