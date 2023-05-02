chrome.downloads.onCreated.addListener((downloadItem) => {
    fetch("http://" + PRIVATE.aria2c.host + ":" + PRIVATE.aria2c.port + "/jsonrpc", {
        "method": "POST",
        "body": JSON.stringify({
            "id": downloadItem["finalUrl"],
            "method": "aria2.addUri",
            "params": ["token:" + PRIVATE.aria2c.secretToken, [downloadItem["finalUrl"]]]
        })
    });
});

chrome.downloads.onDeterminingFilename.addListener(function (downloadItem, suggest) {
    suggest({ filename: downloadItem.filename });
    chrome.downloads.cancel(downloadItem.id);
});
