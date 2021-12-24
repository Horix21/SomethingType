const res = await fetch('/js/words.json');
const words = await res.json();

var currentWords = 0;
var currentInput = "";
var timerconfig = 60;
var stoptime = true;
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
var clickCount = 0;
var sec = 0;
var min = 0;


document.getElementById('myInput').addEventListener('keypress', () => {
    
    startTimer();

})

function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
  function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
    }
}
  
function timerCycle() {
    if (stoptime == false) {
        time++;

        sec = parseInt(sec);
        min = parseInt(min);

        sec++;

        if (sec == 60) {
            min++;
            sec = 0;
        }
        if ((sec < 10 || sec == 0) && min > 0) {
            sec = '0' + sec;
        }
        if (min < 10 || min == 0) {
            min = '0' + min;
        }

        if(min > 0){
            document.getElementById('timer').textContent = min + ':' + sec;
        }
        else
            document.getElementById('timer').textContent = sec;

        setTimeout(timerCycle, 1000);
    }
}
setWords(60);

document.getElementById('60w').addEventListener('click', () => {
    setWords(60);
    clickCount = 0;
    if (clickCount == 0) {
        document.getElementById('60w').style.color = "#e2b714";
        document.getElementById('30w').style.color = "#000000";
        document.getElementById('10w').style.color = "#000000";
    }
})

document.getElementById('30w').addEventListener('click', () => {
    setWords(30);
    clickCount = 1;
    if (clickCount == 1) {
        document.getElementById('60w').style.color = "#000000";
        document.getElementById('30w').style.color = "#e2b714";
        document.getElementById('10w').style.color = "#000000";
    }
})

document.getElementById('10w').addEventListener('click', () => {
    setWords(10);
    clickCount = 2;
    if (clickCount == 2) {
        document.getElementById('60w').style.color = "#000000";
        document.getElementById('30w').style.color = "#000000";
        document.getElementById('10w').style.color = "#e2b714";
    }
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
    
    let hi = document.querySelector('input').value;
    let result = hi.includes(' ');
    
   
    
    if(result == true){
        typedWords = document.getElementById("myInput").value;
        if(i < wordsCount){
            if(typedWords == shownWords[i] + ' '){
                correctCount += 1;
                document.getElementById('word').textContent = shownWords[i];
                document.getElementById('word').style.color = "green";
            }
            else if (typedWords != shownWords[i] + ' ') {
                console.log(typedWords)
                incorrectCount += 1;
                document.getElementById('word').textContent = typedWords + '/ ' + shownWords[i];
                document.getElementById('word').style.color = "red";
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
            document.getElementById("buttons").style.display = "none";
            

            document.getElementById('score-screen').style.display = "block";
            document.getElementById('wpm').textContent = (correctCount*(60/time)).toFixed(2) + " WPM" + "     " + correctCount + '/' + (correctCount+incorrectCount);
            document.getElementById('myInput').disabled = true;
            document.getElementById('time').textContent = time + " seconds";
            document.getElementById('accuracy').textContent = Math.round((correctCount / (correctCount + incorrectCount) ) * 100) + '% accuracy'
        }
        
    }

    
}