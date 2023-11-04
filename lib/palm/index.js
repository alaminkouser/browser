"use strict";

async function palm(promptText) {
  return await fetch(
    `https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=${PRIVATE.PALM_API_KEY}`,
    {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "prompt": {
          "text": promptText,
        },
      }),
    },
  ).then((value) => {
    return value.json();
  }).then((value) => {
    return value["candidates"][0]["output"];
  }).catch((_) => {
    return "";
  });
}
