chrome.history.onVisited.addListener(function (value) {
    fetch(PRIVATE.insert + "?" + PRIVATE.chromeHistoryGoogleSheetID + "=0", {
        "method": "POST",
        "body": JSON.stringify([
            value.id,
            value.lastVisitTime,
            value.title,
            value.typedCount,
            value.url,
            value.visitCount
        ])
    })
});