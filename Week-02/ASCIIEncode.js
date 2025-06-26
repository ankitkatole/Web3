function bytesToAscii(byteArray) {
    return byteArray.map(byte => String.fromCharCode(byte)).join('');
  }
  
// Example usage:
  const byte = [ 116, 114, 117, 101 ]; // Corresponds to "true"
  const asciiString = bytesToAscii(byte);
  console.log(asciiString); // Output: "true"

function asciiToBytes(asciiString) {
    const byteArray = [];
    for (let i = 0; i < asciiString.length; i++) {
        byteArray.push(asciiString.charCodeAt(i));
    }
    return byteArray;
}

// Example usage:
const ascii = "true";
const byteArray = asciiToBytes(ascii);
console.log(byteArray); // Output: [ 116, 114, 117, 101 ]

function bytesToAsciiUA(byteArray) {
    return new TextDecoder().decode(byteArray);
}

// Example usage:
const Byte = new Uint8Array([ 116, 114, 117, 101 ]); // Corresponds to "Hello"
const AsciiString = bytesToAsciiUA(Byte);
console.log(AsciiString); // Output: "true"


function asciiToBytesUA(asciiString) {
    return new Uint8Array([...asciiString].map(char => char.charCodeAt(0)));
}

// Example usage:
const Ascii = "true";
const ByteArray = asciiToBytesUA(Ascii);
console.log(ByteArray); // Output: Uint8Array(4) [ 116, 114, 117, 101 ]