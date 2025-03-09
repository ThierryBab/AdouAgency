function openFullscreen() {
    let video = document.getElementById("fullscreenVideo");

    video.classList.add("active"); // Show video
    video.play(); // Start playing

    // Detect if mobile (iPhone, iPad, Android)
    let isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    if (!isMobile) {
        // Desktop: Request fullscreen
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }

        // Listen for fullscreen exit
        document.addEventListener("fullscreenchange", exitHandler);
        document.addEventListener("webkitfullscreenchange", exitHandler);
        document.addEventListener("mozfullscreenchange", exitHandler);
        document.addEventListener("MSFullscreenChange", exitHandler);
    } else {
        // Mobile: Listen for pause event (when user exits fullscreen)
        video.addEventListener("pause", exitHandler);
    }

    function exitHandler() {
        if (
            !document.fullscreenElement && 
            !document.webkitFullscreenElement &&
            !document.mozFullScreenElement &&
            !document.msFullscreenElement
        ) {
            video.pause(); // Pause video
            video.currentTime = 0; // Reset playback position
            video.classList.remove("active"); // Hide video

            // Remove event listeners
            document.removeEventListener("fullscreenchange", exitHandler);
            document.removeEventListener("webkitfullscreenchange", exitHandler);
            document.removeEventListener("mozfullscreenchange", exitHandler);
            document.removeEventListener("MSFullscreenChange", exitHandler);
            video.removeEventListener("pause", exitHandler);
        }
    }
}
