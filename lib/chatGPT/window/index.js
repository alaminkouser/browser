chrome.runtime.onMessage.addListener(
    function (request, _sender, sendResponse) {
        let converter = new showdown.Converter();
        converter.setFlavor("github");
        document.querySelector("body>div").innerHTML = converter.makeHtml(request["content"]);
        sendResponse(true);
    }
);