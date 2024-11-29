const fs = require('fs');
const path = require('path');

// Read the image file
const imagePath = path.join(__dirname, 'info-video.mp4');

try {
    // Read the image file
    const imageData = fs.readFileSync(imagePath);
    
    // Convert to base64
    const base64Image = imageData.toString('base64');
    
    // Create the full SVG image tag with the base64 data
    const svgImageTag = `<image x="750" y="100" width="50" height="50"  
        xlink:href="data:image/png;base64,${base64Image}"
        preserveAspectRatio="xMidYMid meet" 
        transform="rotate(12, 1840, 1210)"/>`;
    
    console.log('Base64 SVG Image Tag:');
    console.log(svgImageTag);

    // Optionally write to a file
    fs.writeFileSync('base64Output1.txt', svgImageTag);
    console.log('\nOutput has been saved to videoBase64.txt');

} catch (error) {
    console.error('Error:', error.message);
}
