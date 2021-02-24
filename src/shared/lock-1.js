export function lock (setFullscreen) {
    // Enter fullscreen
    if (document.documentElement.requestFullscreen) {
        try {
            document.documentElement.requestFullscreen();
            setFullscreen(true);
        } catch {
            document.documentElement.requestFullscreen().then(() => {
                setFullscreen(true);
            }).catch((err) => {
                alert("this feature does not work on your device.")
                console.log(err);
            });
        }
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
        setFullscreen(true);
    } else if (document.documentElement.webkitRequestFullscreen) {
        setFullscreen(true);
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
        setFullscreen(true);
    } else {
        alert("this feature does not work on your device.")
    }
    // Then lock orientation
    window.screen.orientation.lock("portrait").then((success) => {
        console.log(success)
    }).catch((err) => {
        console.log(err);
    });
  }
  
  export function unlock (setFullscreen) {
    // Unlock orientation
    window.screen.orientation.unlock();
   
    // Exit full screen
    if (document.exitFullscreen) {
        setFullscreen(false);
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        setFullscreen(false);
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        setFullscreen(false);
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        setFullscreen(false);
        document.msExitFullscreen();
    }
  }