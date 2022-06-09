const { createFiveLetterWords, getPossibleMatches } = require('./utils')

const PORT = process.env.PORT || 8000;

createFiveLetterWords();

const express = require('express')

const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-ecv', function (req, res) {
    res.send({
        status: 200,
        message: "App is healthy"
    })
})

app.post("/getMatchingWords", function (req, res) {
    const { correctGuess, jumbledGuess, wrongGuess } = req.body;
    let matchingList = getPossibleMatches(correctGuess, jumbledGuess, wrongGuess);
    res.send({
        status: 200,
        matchingWords: matchingList
    })
})

// let correctGuess = ['a','d','','','']
// let jumbledGuess = ['','','','t','']
// let wrongGuess = "eh"

// getPossibleMatches(correctGuess, jumbledGuess, wrongGuess);

app.listen(PORT, function () {
    console.log("Server is ready to get request at port, ", PORT)
})