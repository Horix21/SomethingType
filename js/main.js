var words = [
    "a",
    "about",
    "all",
    "also",
    "and",
    "as",
    "at",
    "be",
    "because",
    "but",
    "by",
    "can",
    "come",
    "could",
    "day",
    "do",
    "even",
    "find",
    "first",
    "for",
    "from",
    "get",
    "give",
    "go",
    "have",
    "he",
    "her",
    "here",
    "him",
    "his",
    "how",
    "if",
    "in",
    "into",
    "it",
    "its",
    "just",
    "know",
    "like",
    "look",
    "make",
    "man",
    "many",
    "me",
    "more",
    "my",
    "new",
    "no",
    "not",
    "now",
    "of",
    "on",
    "one",
    "only",
    "or",
    "other",
    "our",
    "out",
    "people",
    "say",
    "see",
    "she",
    "so",
    "some",
    "take",
    "tell",
    "than",
    "that",
    "the",
    "their",
    "them",
    "then",
    "there",
    "these",
    "they",
    "thing",
    "think",
    "this",
    "those",
    "time",
    "to",
    "two",
    "up",
    "use",
    "very",
    "want",
    "way",
    "we",
    "well",
    "what",
    "when",
    "which",
    "who",
    "will",
    "with",
    "would",
    "year",
    "you",
    "your"
];


var currentWords = 0;
var currentInput = "";
var timerconfig = 60;
var timer;
var timerRunning = false;
var correctCount = 0;
var incorrectCount = 0;
var i = 0;
var typedWords = '';
var timeInMs=1000;
var j = 0;
var k = 0;
var starting = 0;

var shownWords=[];

for(i = 0; i <= 60; i=i+1)
    {
        shownWords[i] = words[Math.floor(Math.random() * words.length)];
    }

let show = shownWords.join(' ');
document.getElementById('word').textContent = shownWords.join(' ');


i = 0;
function getVal() {
    if (correctCount + incorrectCount > 0 && k < 1) {
        starting = Date.now();
        k++;}
    let hi = document.querySelector('input').value;
    let result = hi.includes(' ');
    
    
    if(result == true){
        typedWords = document.getElementById("myInput").value;
        if(i < 59){
            if(typedWords == shownWords[i] + ' '){
                correctCount += 1;
                
            }
            else if (typedWords != shownWords[i] + ' ') {
                incorrectCount += 1;
                
            }
        }
        else if(i == 59){
            console.log(correctCount + " correct")
            console.log(incorrectCount + " incorrect")
        }
        
        document.getElementById("myInput").value=''
        i += 1;

        if (starting > 0 && correctCount+incorrectCount <= 59){
            document.getElementById('timer').textContent = (Date.now() - starting) / 1000;
            console.log(Date.now())
        }

        if(correctCount+incorrectCount == 59) {
            document.getElementById('score-screen').style.display = 'inline';
        }
        
    }
}


