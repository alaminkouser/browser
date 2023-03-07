"use strict";
/**
 * Dictionary
 * @param {string} word 
 * @returns {Promise<{"status":boolean,"words":[{"word":string,"phonetic":string,"phonetics":[{"text":string,"audio":string,"sourceUrl":string,"license":{"name":string,"url":string}}],"meanings":[{"partOfSpeech":"noun","definitions":[{"definition":string,"synonyms":Array.<string>,"antonyms":Array.<string>,"example":string}],"synonyms":Array.<string>,"antonyms":Array.<string>}],"license":{"name":string,"url":string},"sourceUrls":Array.<string>}]}>}
 */
async function dictionary(word) {
    return fetch(PRIVATE.dictionary + word).then(async (value) => {
        if (value.status === 200) {
            return { "status": true, "words": await value.json() };
        } else if (value.status === 404) {
            return { "status": true, "words": [] };
        } else {
            return { "status": false, "words": [] };
        }
    }).then((value) => {
        return value;
    }).catch((error) => {
        console.error(error);
        return { "status": false, "words": [] };
    })
}
