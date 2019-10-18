import { fromHex, isHex, toHex } from './hex';

describe('hex utils', () => {
  const testText = `
      public convertHashToHex() {
        const hashControl = this.form.get('hash');
        let value: string = hashControl.value;

        if (!isHex(value)) {
          value = toHex(value);
          console.log('converting', value);
          this.validateHashIsHex(value);
          hashControl.setValue(value);
        }
      }
    `;

  it('converts back and forth', () => {
    const hexText = toHex(testText);
    expect(fromHex(hexText)).toEqual(testText);
  });

  it('checks if the text is hex', () => {
    const hexText = toHex(testText);
    expect(isHex(testText)).toBeFalsy();
    expect(isHex(hexText)).toBeTruthy();
  });
});
