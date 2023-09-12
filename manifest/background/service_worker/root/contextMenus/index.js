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
    chrome.contextMenus.create({
        "id": "contextMenus_DEFINE",
        "contexts": ["selection"],
        "title": "DEFINE SELECTION"
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
            case "contextMenus_DEFINE":
                chrome.tabs.query(
                    { currentWindow: true, active: true },
                    function (tabArray) {
                        chatGPT(
                            "Define" + "\"" + event["selectionText"] + "\". " + "Give example and provide historical definition. If the term belongs to any technical fields then provide technical definitions also.",
                            tabArray[0]["id"]);
                    }
                );
                break;
            default:
                console.log(false);
        }
    }
)
