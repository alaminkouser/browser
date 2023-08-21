chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [
        {
            id: 1,
            priority: 1,
            action: {
                type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
                requestHeaders: [
                    {
                        operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                        header: "A-A-K",
                        value: "https://alaminkouser.github.io/"
                    },
                ]
            },
            condition: {
                urlFilter: "*",
                resourceTypes: Object.values(chrome.declarativeNetRequest.ResourceType)
            }
        }
    ]
});
