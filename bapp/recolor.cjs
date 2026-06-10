const Jimp = require('jimp');

async function recolor() {
  try {
    const image = await Jimp.read('public/115px-Double_Tap.png');
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      // Get the alpha value (idx + 3)
      const alpha = this.bitmap.data[idx + 3];
      
      // If pixel is not fully transparent, change its color to rgb(103, 12, 178)
      if (alpha > 0) {
        this.bitmap.data[idx] = 103;     // Red
        this.bitmap.data[idx + 1] = 12;  // Green
        this.bitmap.data[idx + 2] = 178; // Blue
      }
    });

    await image.writeAsync('public/115px-Double_Tap_Violet.png');
    console.log('Image successfully recolored to violet!');
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

recolor();
