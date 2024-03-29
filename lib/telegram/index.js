"use strict";
/**
 * Telegram
 */
const telegram = {
    /**
     * Send Message
     * @param {string} text
     */
    sendMessage(text) {
        fetch("https://api.telegram.org/bot" + PRIVATE.telegram.bot.id + ":" + PRIVATE.telegram.bot.token + "/sendMessage", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "chat_id": PRIVATE.telegram.chats[0].id,
                "text": text
            })
        });
    },
    /**
     * Send Photo
     * @param {string} photoUrl
     * @param {string} text
     */
    async sendPhoto(photoUrl, text) {
        fetch("https://api.telegram.org/bot" + PRIVATE.telegram.bot.id + ":" + PRIVATE.telegram.bot.token + "/sendPhoto", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "chat_id": PRIVATE.telegram.chats[0].id,
                "photo": photoUrl,
                "caption": text
            })
        });
    }
}
