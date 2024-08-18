// Uint8array takes up less space than simple arrays and have restrictions while storing values 

let byte = new Uint8Array([0,12,127,128]);
console.log(byte)

let uint8Arr = new Uint8Array([0, 255, 127, 128]);
uint8Arr[1] = 300;
console.log(uint8Arr)