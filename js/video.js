function openFullscreen() {
    let video = document.getElementById("fullscreenVideo");

    // Check if the user is on mobile
    let isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Mobile: Native fullscreen (just play the video)
        video.setAttribute("controls", "true"); // Enable default controls
        video.removeAttribute("playsinline");   // Forces fullscreen on mobile
        video.play();
    } else {
        // Desktop: Custom fullscreen behavior
        video.classList.add("active"); // Show the video
        video.play(); // Start playing

        // Request fullscreen
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
}