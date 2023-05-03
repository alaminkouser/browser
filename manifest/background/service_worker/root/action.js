chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: "/lib/ariaNg/index.html" });
});
