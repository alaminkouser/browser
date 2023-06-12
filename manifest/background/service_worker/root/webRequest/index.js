[
    "onBeforeRequest",
    "onBeforeSendHeaders",
    "onSendHeaders",
    "onHeadersReceived",
    "onAuthRequired",
    "onBeforeRedirect",
    "onResponseStarted",
    "onCompleted",
    "onErrorOccurred"
].forEach(event => {
    chrome.webRequest[event].addListener(
        function (details) {
            details.event = event;
            chrome.tabs.query({ active: true, currentWindow: true }, function (currentTab) {
                chrome.action.setBadgeBackgroundColor(
                    { color: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0") },
                    () => { },
                );
                chrome.action.setBadgeText(
                    {
                        text: details["requestId"],
                        // tabId: currentTab[0]["id"]
                    },
                    () => { }
                );
            });
            // console.log(details);
        },
        { urls: ["<all_urls>"] }
    );
});

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'User-Agent') {
          details.requestHeaders[i].value = "AAK";
          break;
        }
      }
      return { requestHeaders: details.requestHeaders };
    },
    { urls: ['<all_urls>'] },
    ['blocking', 'requestHeaders']
  );
