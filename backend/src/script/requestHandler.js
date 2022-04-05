import fetch from "node-fetch";

export async function loadSecretWord(secretwordlength, secretwordtype) {
    const res = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json");
    const payload = await res.json();
    const data = Object.keys(payload);

    const filteredData = data.filter((word) => {
        return word.length === Number(secretwordlength);
    })

    const hasRepeatedCharacters = str => new Set(str).size < str.length;

    let uniqueWords = [];

    if (Number(secretwordtype) === 1) {
        for (let i = 0; i < filteredData.length; i++) {
            let check = hasRepeatedCharacters(filteredData[i]);
            if (check === false) {
                uniqueWords.push(filteredData[i])
            }
        }
        let secretWord = uniqueWords[Math.floor(Math.random() * uniqueWords.length)];

        return secretWord;

    }
    let secretWord = filteredData[Math.floor(Math.random() * filteredData.length)];

    return secretWord;
}
export default loadSecretWord; 
