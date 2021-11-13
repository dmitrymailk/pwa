window.onload = () => {
  let installButton = document.querySelector("#install_button");
  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (event) => {
    console.log("Event: beforeinstallprompt");
    // don't allow the browser to do its install, we want to do it when the user
    // taps our install button
    event.preventDefault();
    // stash the event object so we can use it later (when the user taps the
    // install button)
    deferredPrompt = event;
    // now unhide the Install button so the user can tap it!
    installButton.style.display = "block";
  });

  installButton.addEventListener("click", () => {
    console.log("doInstall");
    // we've tapped the install button, so hide it
    installButton.style.display = "none";
    // execute the deferred installation prompt
    deferredPrompt.prompt();
    // wait for the response from the deferred prompt
    deferredPrompt.userChoice.then((res) => {
      // did the user approve installation?
      if (res.outcome === "accepted") {
        console.log("doInstall: accepted");
      } else {
        console.log("doInstall: declined");
      }
      // clear the deferred prompt object so we can only do this once
      deferredPrompt = null;
    });
  });
};
