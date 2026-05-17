const fs = require('fs');

function checkPng() {
  const buf = fs.readFileSync('/Users/piotrjuskowiak/Desktop/Projekty/wreczyca_wielka/public/logo-new.png');
  
  // PNG signature is 8 bytes
  // Next is IHDR chunk: 4 bytes length, 4 bytes type ('IHDR'), 13 bytes data, 4 bytes CRC
  // IHDR data: 4 bytes width, 4 bytes height, 1 byte bit depth, 1 byte color type, ...
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  const bitDepth = buf.readUInt8(24);
  const colorType = buf.readUInt8(25);
  
  console.log(`PNG Info: Width=${width}, Height=${height}, BitDepth=${bitDepth}, ColorType=${colorType}`);
  
  // ColorType:
  // 0: Grayscale
  // 2: Truecolor (RGB)
  // 3: Indexed
  // 4: Grayscale with alpha
  // 6: Truecolor with alpha (RGBA)
  if (colorType === 6) {
    console.log('PNG has an alpha channel (colorType 6)');
  } else {
    console.log(`PNG does not have an alpha channel (colorType ${colorType})`);
  }
}

checkPng();
