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
            console.log(details);
        },
        { urls: ["<all_urls>"] }
    );
});