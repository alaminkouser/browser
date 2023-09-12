const node = window.document.createElement("div");
node.id = "TOAST";
window.document.body.appendChild(node);

chrome.runtime.onMessage.addListener(
    function (request, _sender, sendResponse) {
        console.log("request", request);
        toast(request["content"], 10000);
        sendResponse(true);
    }
);