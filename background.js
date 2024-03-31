let redirectEnabled = true;

chrome.runtime.onMessage.addListener(function (message) {
  if (message.hasOwnProperty("redirectEnabled")) {
    redirectEnabled = message.redirectEnabled;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!redirectEnabled) return;

  if (tab.url.includes("twitter.com") && changeInfo.status === "loading") {
    chrome.tabs.query({}, function (tabs) {
      const twitterTabs = tabs.filter((t) => t.url.includes("twitter.com"));
      if (twitterTabs.length > 1) {
        chrome.tabs.update(twitterTabs[0].id, { active: true });
        chrome.windows.update(twitterTabs[0].windowId, { focused: true });
        chrome.tabs.remove(tabId);
      }
    });
  }
});

chrome.storage.sync.get(["redirectEnabled"], function (data) {
  redirectEnabled = data.redirectEnabled !== false; // Default to true
});
