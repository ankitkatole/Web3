const uint8Array = new Uint8Array([ 116, 114, 117, 101 ]);
const base64Encoded = Buffer.from(uint8Array).toString("base64");
console.log(base64Encoded);