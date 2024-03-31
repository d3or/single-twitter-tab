document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggleRedirect");

  chrome.storage.sync.get("redirectEnabled", function (data) {
    if (data.hasOwnProperty("redirectEnabled")) {
      toggle.checked = data.redirectEnabled;
    } else {
      toggle.checked = true;
    }
  });

  toggle.addEventListener("change", function () {
    const isEnabled = toggle.checked;

    chrome.storage.sync.set({ redirectEnabled: isEnabled }, function () {
      if (chrome.runtime.lastError) {
        console.error(
          `Error setting redirectEnabled: ${chrome.runtime.lastError}`
        );
      }
    });

    chrome.runtime.sendMessage({ redirectEnabled: isEnabled });
  });
});
