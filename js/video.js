function openFullscreen() {
    let video = document.getElementById("fullscreenVideo");

    video.classList.add("active"); // Show the video
    video.play(); // Start playing

    // Request fullscreen mode
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }

    // Listen for fullscreen exit event (including mobile compatibility)
    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
    document.addEventListener("MSFullscreenChange", exitHandler);

    function exitHandler() {
        // Check if fullscreen mode is exited
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

    // Optional: Force close fullscreen on click (for mobile devices)
    video.addEventListener("click", function() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        video.pause(); // Pause video
        video.currentTime = 0; // Reset playback position
        video.classList.remove("active"); // Hide video
    });
}
