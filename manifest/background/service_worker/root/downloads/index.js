chrome.downloads.onCreated.addListener((downloadItem) => {
    fetch("http://" + PRIVATE.aria2c.host + ":" + PRIVATE.aria2c.port + "/jsonrpc", {
        "method": "POST",
        "body": JSON.stringify({
            "id": downloadItem["finalUrl"],
            "method": "aria2.addUri",
            "params": ["token:" + PRIVATE.aria2c.secretToken, [downloadItem["finalUrl"]]]
        })
    }).then((value) => {
        return value.text();
    }).then((value) => {
        console.log(value);
    })
});

chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
    suggest({ filename: item.filename });
    chrome.downloads.cancel(item.id);
});
