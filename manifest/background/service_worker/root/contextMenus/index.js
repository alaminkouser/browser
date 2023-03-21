chrome.contextMenus.removeAll(function () {
    chrome.contextMenus.create({
        "id": "contextMenus_IMAGE",
        "contexts": ["image"],
        "title": "SEND IMAGE"
    });
    chrome.contextMenus.create({
        "id": "contextMenus_LINK",
        "contexts": ["link"],
        "title": "SEND LINK"
    });
    chrome.contextMenus.create({
        "id": "contextMenus_PAGE",
        "contexts": ["page"],
        "title": "SEND PAGE"
    });
    chrome.contextMenus.create({
        "id": "contextMenus_SELECTION",
        "contexts": ["selection"],
        "title": "SEND SELECTION"
    });
});

chrome.contextMenus.onClicked.addListener(
    function (event) {
        console.log(event);
        switch (event["menuItemId"]) {
            case "contextMenus_IMAGE":
                telegram.sendPhoto(event["srcUrl"], event["pageUrl"]);
                break;
            case "contextMenus_LINK":
                telegram.sendMessage(event["linkUrl"]);
                break;
            case "contextMenus_PAGE":
                telegram.sendMessage(event["pageUrl"]);
                break;
            case "contextMenus_SELECTION":
                telegram.sendMessage(event["selectionText"]);
                break;
            default:
                console.log(false);
        }
    }
)
