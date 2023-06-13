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
                        header: "AAK",
                        value: "https://aak.deno.dev/"
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
