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
