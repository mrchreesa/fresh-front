const fs = require('fs');
const path = require('path');

// Read the image file
const imagePath = path.join(__dirname, 'images/Fresh--Clean-Logo-White.png');

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
    console.log('\nOutput has been saved to base64Output1.txt');

} catch (error) {
    console.error('Error:', error.message);
}
