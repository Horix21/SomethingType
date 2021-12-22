const res = await fetch('/js/words.json');
const words = await res.json();

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
var m = 0;
var starting = 0;
var time = 0;
var shownWords= [];
var wordsCount = 0;

setWords(60);

document.getElementById('60w').addEventListener('click', () => {
    setWords(60);
})

document.getElementById('30w').addEventListener('click', () => {
    setWords(30);
})

document.getElementById('10w').addEventListener('click', () => {
    setWords(10);
})

function setWords(wordCount) {
    

    wordsCount = wordCount;
    document.getElementById('greenText').textContent = '';
    shownWords = [];
    for(m = 0; m <= wordCount; m++)
        {
            shownWords[m] = words[Math.floor(Math.random() * words.length)];
        }

    let show = shownWords.join('');
    document.getElementById('greenText').textContent = shownWords.join(' ');
}


document.getElementById('myInput').addEventListener('keypress', () => {
    getVal();
})

i = 0;
function getVal() {
    if (correctCount + incorrectCount > 0 && k < 1) {
        starting = Date.now();
        k++;}
    let hi = document.querySelector('input').value;
    let result = hi.includes(' ');
    
    if (starting > 0 && correctCount+incorrectCount <= wordsCount){
        time = (Date.now() - starting) / 1000 ;
        //console.log((Date.now() - starting) / 1000)
        document.getElementById('timer').textContent = time.toFixed(0);
    }
    
    if(result == true){
        typedWords = document.getElementById("myInput").value;
        if(i < wordsCount){
            if(typedWords == shownWords[i] + ' '){
                correctCount += 1;
                document.getElementById('word').textContent = shownWords[i];
                document.getElementById('word').style.color="#006400";
            }
            else if (typedWords != shownWords[i] + ' ') {
                console.log(typedWords)
                incorrectCount += 1;
                document.getElementById('word').textContent = typedWords + '/ ' + shownWords[i];
                document.getElementById('word').style.color="red";

            }
        }
        else if(i == wordsCount){
            console.log(correctCount + " correct")
            console.log(incorrectCount + " incorrect")
        }
        
        document.getElementById("myInput").value=''
        i += 1;

        if(correctCount+incorrectCount == wordsCount) {
            document.getElementById("test").style.display = "none";
            document.getElementById("timer").style.display = "none";
            document.getElementById("myInput").style.display = "none";
            document.getElementById("word").style.display = "none";
            document.getElementById("refresh").style.display = "none";

            document.getElementById('score-screen').style.display = "block";
            document.getElementById('wpm').textContent = (correctCount*(60/time)).toFixed(2) + " WPM" + "     " + correctCount + '/' + (correctCount+incorrectCount);
            document.getElementById('myInput').disabled = true;
            document.getElementById('time').textContent = time.toFixed(2) + " seconds";
            document.getElementById('accuracy').textContent = Math.round((correctCount / (correctCount + incorrectCount) ) * 100) + '% accuracy'
        }
        
    }

    
}