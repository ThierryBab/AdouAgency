function openFullscreen() {
    let video = document.getElementById("fullscreenVideo");

    if (!video) return;

    video.classList.add("active"); // Show the video
    video.play().catch(err => console.error("Playback failed:", err)); // Handle autoplay issues

    // Detect mobile device
    let isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Force native fullscreen on mobile (iOS & Android)
        video.setAttribute("playsinline", ""); // Prevent inline playback on iOS
        video.setAttribute("controls", ""); // Show default video controls (prevents issues)
        video.requestFullscreen().catch(err => console.warn("Fullscreen failed:", err));
    } else {
        // Desktop: Request fullscreen mode
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }

        // Listen for fullscreen exit on desktop only
        document.addEventListener("fullscreenchange", exitHandler);
        document.addEventListener("webkitfullscreenchange", exitHandler);
        document.addEventListener("mozfullscreenchange", exitHandler);
        document.addEventListener("MSFullscreenChange", exitHandler);
    }

    function exitHandler() {
        if (!document.fullscreenElement && !document.webkitFullscreenElement &&
            !document.mozFullScreenElement && !document.msFullscreenElement) {

            video.pause(); // Pause video
            video.currentTime = 0; // Reset playback position
            video.classList.remove("active"); // Hide video

            // Remove event listeners to prevent stacking
            document.removeEventListener("fullscreenchange", exitHandler);
            document.removeEventListener("webkitfullscreenchange", exitHandler);
            document.removeEventListener("mozfullscreenchange", exitHandler);
            document.removeEventListener("MSFullscreenChange", exitHandler);
        }
    }
}