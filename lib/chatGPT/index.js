"use strict";

function chatGPT(prompt, tabID) {
    const UUID = crypto.randomUUID();
    fetch("https://chat.openai.com/api/auth/session").then((value) => {
        return value.text();
    }).then(async (session) => {
        if (JSON.parse(session)["accessToken"] !== undefined) {
            const stream = await fetch(
                "https://chat.openai.com/backend-api/conversation",
                {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(session)["accessToken"]
                    },
                    "body": JSON.stringify({
                        action: "next",
                        messages: [{
                            role: "user",
                            content: {
                                content_type: "text",
                                parts: [prompt]
                            }
                        }],
                        model: "text-davinci-002-render-sha",
                        parent_message_id: UUID
                    })
                }
            );
            stream.clone().text().then((value) => {
                try {
                    JSON.parse(value);
                    if (value["detail"]["code"] === "message_length_exceeds_limit") {
                        chrome.tabs.get(tabID).then((_) => {
                            chrome.tabs.sendMessage(
                                tabID,
                                {
                                    "UUID": UUID,
                                    "content": "",
                                    "status": "DONE",
                                    "error": "MESSAGE_LENGTH_EXCEEDS_LIMIT"
                                }
                            );
                        }).catch((_) => { });
                    };
                } catch (_) { }
            })
            const reader = stream.body?.pipeThrough(new TextDecoderStream()).getReader();
            let data = "";
            let finalContent = "";
            while (true) {
                const { done, value } = await reader?.read();
                if (done) {
                    chrome.tabs.get(tabID).then((_) => {
                        chrome.tabs.sendMessage(
                            tabID,
                            {
                                "UUID": UUID,
                                "content": finalContent,
                                "status": "DONE",
                                "error": ""
                            }
                        );
                    }).catch((_) => { });
                    fetch("https://chat.openai.com/backend-api/conversation/" + JSON.parse(data.split("\n")[data.split("\n").length - 7].slice(6))["conversation_id"], {
                        "method": "PATCH",
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + JSON.parse(session)["accessToken"]
                        },
                        "body": JSON.stringify({ "is_visible": false })
                    });
                    break;
                } else {
                    data = data + value;
                }
                const dataProcessor = data;
                let textFound = false;
                dataProcessor.split("\n").reverse().forEach(async (dataLine) => {
                    if (textFound === false && dataLine !== "") {
                        try {
                            JSON.parse(dataLine.slice(6));
                            if (JSON.parse(dataLine.slice(6)).hasOwnProperty("message")) {
                                finalContent = JSON.parse(dataLine.slice(6))["message"]["content"]["parts"][0];
                                chrome.tabs.get(tabID).then((_) => {
                                    chrome.tabs.sendMessage(
                                        tabID,
                                        {
                                            "UUID": UUID,
                                            "content": finalContent,
                                            "status": "IN_PROGRESS",
                                            "error": ""
                                        }
                                    );
                                }).catch((_) => { });
                            }
                            textFound = true;
                        } catch (_) { }
                    }
                })
            }

        } else {
            chrome.tabs.get(tabID).then((_) => {
                chrome.tabs.sendMessage(
                    tabID,
                    {
                        "UUID": UUID,
                        "content": "",
                        "status": "DONE",
                        "error": "ACCESS_TOKEN_NOT_FOUND"
                    }
                );
            }).catch((_) => { });
        }
    }).catch((_) => {
        chrome.tabs.get(tabID).then((_) => {
            chrome.tabs.sendMessage(
                tabID,
                {
                    "UUID": UUID,
                    "content": "",
                    "status": "DONE",
                    "error": "NETWORK_ERROR"
                }
            );
        }).catch((_) => { });
    });
    return UUID;
}
