function createVideo(isMobile) {
    const video = document.createElement('video');
    video.id = isMobile ? 'heroVideoMobile' : 'heroVideo';
    video.className = 'image hero-full-width-right-image';
    video.style = 'max-width: 300px; margin: auto; cursor: pointer;';
    video.controls = true;
    video.playsinline = true;
    video.preload = 'metadata';
    
    // Add click handler for fullscreen
    video.addEventListener('click', function() {
        if (this.requestFullscreen) {
            this.requestFullscreen();
        } else if (this.webkitRequestFullscreen) { /* Safari */
            this.webkitRequestFullscreen();
        } else if (this.msRequestFullscreen) { /* IE11 */
            this.msRequestFullscreen();
        }
    });
    
    const source = document.createElement('source');
    source.src = 'images/info-video.mp4';
    source.type = 'video/mp4';
    
    video.appendChild(source);
    video.appendChild(document.createTextNode('Your browser does not support the video tag.'));
    
    return video;
}

// Desktop video handler
document.getElementById('heroVideoPlaceholder').addEventListener('click', function() {
    const video = createVideo(false);
    this.parentNode.replaceChild(video, this);
    video.play().then(() => {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });
});

// Mobile video handler
document.getElementById('heroVideoMobilePlaceholder').addEventListener('click', function() {
    const video = createVideo(true);
    this.parentNode.replaceChild(video, this);
    video.play().then(() => {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });
    
});
