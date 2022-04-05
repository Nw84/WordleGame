
import checkWord from "../src/script/checkWord.js";
/* Testing strategy 

*First i wanted to check if the function gives the correct response if the correct word is guessed

*Secondly i wanted to check if the function gives the correct response if the word is reversed, 
so that i know that the letters are correctly labeled missplaced if they are. 

*In my third test i wanted to check that the function handles repeated letters correctly, so that they are correctly labeled as correct, missplaced and incorrect. So i used three L´s in the hidden word and four in the guess to test that they got the correct label.

*In my fourth test i wanted to check that the function handles lowercased and uppercased inputs correctly and that it does not affect the result. 

*In my fifth test i wanted to check that the function returns the correct error message if the guess is longer or shorter than the secret word. 

*The last test is just a copy of Richards test example from the assignment, to test if i get the same result 

*/

test("1: function gives the correct response if the correct word is guessed", () => {
    let response = checkWord("cykla", "cykla");

    let expectedResponse = [
        {
            letter: "C", result: "green"
        },
        {
            letter: "Y", result: "green"
        },
        {
            letter: "K", result: "green"
        },
        {
            letter: "L", result: "green"
        },
        {
            letter: "A", result: "green"
        },
    ]

    expect(response).toEqual(expectedResponse);
})

test("2: function gives the correct response if its the right letters, but in the wrong order", () => {
    let response = checkWord("hammare", "erammah");

    let expectedResponse = [
        {
            letter: "E", result: "yellow"
        },
        {
            letter: "R", result: "yellow"
        },
        {
            letter: "A", result: "yellow"
        },
        {
            letter: "M", result: "green"
        },
        {
            letter: "M", result: "yellow"
        },
        {
            letter: "A", result: "yellow"
        },
        {
            letter: "H", result: "yellow"
        },
    ]

    expect(response).toEqual(expectedResponse);
})

test("3: function gives the correct response if several of the same letters are guessed", () => {
    let response = checkWord("llploooos", "oolllolop");

    let expectedResponse = [
        {
            letter: "O", result: "yellow"
        },
        {
            letter: "O", result: "yellow"
        },
        {
            letter: "L", result: "yellow"
        },
        {
            letter: "L", result: "green"
        },
        {
            letter: "L", result: "yellow"
        },
        {
            letter: "O", result: "green"
        },
        {
            letter: "L", result: "red"
        },
        {
            letter: "O", result: "green"
        },
        {
            letter: "P", result: "yellow"
        },

    ]

    expect(response).toEqual(expectedResponse);
})

test("4: function gives the correct response if the secret word is lowercased and the guess is uppercased", () => {
    let response = checkWord("akuten", "ALENnA");

    let expectedResponse = [
        {
            letter: "A", result: "green"
        },
        {
            letter: "L", result: "red"
        },
        {
            letter: "E", result: "yellow"
        },
        {
            letter: "N", result: "yellow"
        },
        {
            letter: "N", result: "red"
        },
        {
            letter: "A", result: "red"
        },
    ]

    expect(response).toEqual(expectedResponse);
})

test("5: function gives error response if the two words does not have the same length", () => {
    let response = checkWord("cykla", "cyklar");

    let expectedResponse = null;


    expect(response).toEqual(expectedResponse);
})

test("6: Richards test example from the assignment", () => {
    let response = checkWord("cykla", "hallå");

    let expectedResponse = [
        {
            letter: "H", result: "red"
        },
        {
            letter: "A", result: "yellow"
        },
        {
            letter: "L", result: "red"
        },
        {
            letter: "L", result: "green"
        },
        {
            letter: "Å", result: "red"
        },
    ]

    expect(response).toEqual(expectedResponse);
}) 