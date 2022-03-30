
export default function (secretWord, guess) {
    let array1 = secretWord.toUpperCase().split("");
    let array2 = guess.toUpperCase().split("");

    let answerArray = array2.map(item => (
        {
            letter: item,
            result: "red"
        }
    ));

    if (array2.length !== array1.length) {
        answerArray = null;
    } else {

        for (let i = 0; i < array2.length; i++) {
            if (array2[i] === array1[i]) {
                answerArray.splice([i], 1, {
                    letter: array2[i],
                    result: "green"
                })
                array1[i] = "!";
                array2[i] = "&";
            }
        }
        for (let i = 0; i < array2.length; i++) {
            for (let j = 0; j < array2.length; j++) {
                if (array1[j] === array2[i]) {
                    array1[j] = "?";
                    answerArray.splice([i], 1, {
                        letter: array2[i],
                        result: "yellow"
                    })
                    array2[i] = "&"
                }
            }
        }
    }
    return answerArray;
}
