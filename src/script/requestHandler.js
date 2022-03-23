import fetch from "node-fetch";
import { parse } from "path";

export async function loadSecretWord(secretwordlength) {
    const res = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json");
    const payload = await res.json();
    const data = Object.keys(payload);
    const filteredData = data.filter((word) => {
        return word.length === 5;
    })

    return filteredData;
}

export default loadSecretWord; 
