chrome.action.onClicked.addListener((_) => {
    chrome.windows.create({
        "url": "/manifest/background/service_worker/root/windows/index.html",
        "type": "panel",
        "height": 200,
        "width": 800
    });
});