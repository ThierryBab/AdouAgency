function openFullscreen() {
    let video = document.getElementById("fullscreenVideo");

    video.classList.add("active"); // Show the video
    video.play(); // Start playing

    // Close video when clicked
    video.addEventListener("click", function() {
        video.pause(); // Pause the video
        video.currentTime = 0; // Reset playback position
        video.classList.remove("active"); // Hide the video
    }, { once: true }); // Ensure the event runs only once per session
}
