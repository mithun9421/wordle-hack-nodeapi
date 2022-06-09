var fs = require('fs');
var path = require('path');

isWordFiveLetter = (word, length) => word?.length == length ? true : false;
convertToLowerCase = (word) => word?.toLowerCase();
doesWordHasSymbols = (word) => !/[^a-zA-Z]/.test(word);

module.exports.createFiveLetterWords = function () {
    let syncWordRead = fs.readFileSync(path.resolve(__dirname, './words.txt'), 'utf8')
    let words = syncWordRead.split("\n");
    let fiveLetterWords = words.filter(word => isWordFiveLetter(word, 5)).map((word) => convertToLowerCase(word));
    let cleanseWords = fiveLetterWords?.filter(word => doesWordHasSymbols(word) ? true : false).map(word => word);
    fs.writeFileSync(path.resolve(__dirname, './five-words.txt'), cleanseWords + "")
}

eliminateWrongGuessWords = (word, wrongString) => {
    let isWrongWord = false;
    for (let i = 0; i < word.length; i++) {
        if ((wrongString.replace(word[i], "")).length != wrongString.length) {
            isWrongWord = true;
            break;
        }
    }
    return isWrongWord;
}

module.exports.getPossibleMatches = function (correctGuess, jumbledGuess, wrongGuess) {
    let globalWordsString = (fs.readFileSync(path.resolve(__dirname, './five-words.txt'), 'utf8'));
    let globalWords = globalWordsString.split(",");
    let matchingWords = [];
    for (let i = 0; i < globalWords.length; i++) {
        let currentWord = globalWords[i].split("");
        let matchFlag = true;
        if (!eliminateWrongGuessWords(currentWord, wrongGuess)) {
            for (let j = 0; j < (correctGuess?.length); j++) {
                if (correctGuess[j] != "" && ((currentWord[j] != correctGuess[j]))) {
                    matchFlag = false;
                    break;
                }
            }
        } else {
            matchFlag = false;
        }

        matchFlag ? matchingWords.push(currentWord.join("")) : null;
    }
    let jumbledGuessString = jumbledGuess.join("");
    let cleanupMatchingWords = matchingWords
    .filter((word) => {
        for(let i = 0; i < jumbledGuessString.length; i++) {
            if((word.indexOf(jumbledGuessString[i]) == -1)) {
                return false
            }
        }
        return true
    }).map((word) => word);
    return cleanupMatchingWords;
}