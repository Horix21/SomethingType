const res = await fetch('/js/words.geojson');
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
var mil = 0;
var x = 0;
var charList = [];
var showing = "";

document.getElementById('refresh').addEventListener('click', () => {
    
    document.getElementById('myInput').value = '';
    document.getElementById('myInput').focus();
    document.getElementById('word').textContent = '';
    setWords(wordsCount);
    i = 0;
    resetTimer();
    
})


document.getElementById('myInput').addEventListener('input', () => {
    getVal();
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
        if (k < 1) {
            starting = Date.now();
            k++;
        }
        
        mil = parseInt(mil);
        sec = parseInt(sec);
        min = parseInt(min);

        mil = Date.now() - starting; 
        time = Date.now() - starting;
        console.log(mil + ' ' + sec);

        if (mil > 1000) {
            
            sec++;
            mil = 0;
        }
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

function resetTimer() {
    document.getElementById('timer').textContent = 0;
    stoptime = true;
    mil = 0
    sec = 0;
    min = 0;
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
    document.getElementById('myInput').focus();
})

document.getElementById('30w').addEventListener('click', () => {
    setWords(30);
    clickCount = 1;
    if (clickCount == 1) {
        document.getElementById('60w').style.color = "#000000";
        document.getElementById('30w').style.color = "#e2b714";
        document.getElementById('10w').style.color = "#000000";
    }
    document.getElementById('myInput').focus();
})

document.getElementById('10w').addEventListener('click', () => {
    setWords(10);
    clickCount = 2;
    if (clickCount == 2) {
        document.getElementById('60w').style.color = "#000000";
        document.getElementById('30w').style.color = "#000000";
        document.getElementById('10w').style.color = "#e2b714";
    }
    document.getElementById('myInput').focus();
})



function setWords(wordCount) {
    wordsCount = wordCount;

    document.getElementById('greenText').textContent = '';
    showing = '';
    shownWords = [];

    for(m = 0; m <= wordCount - 1; m++)
    {
        shownWords[m] = words[Math.floor(Math.random() * words.length)];
    }
    for (m = 0; m < shownWords.length; m++) {
        showing += ' ' + shownWords[m];

        if ((m + 1) % 17 == 0) {
            showing += '<br>';
        }
    }
    document.getElementById('greenText').innerHTML = showing;
}


i = 0;
function getVal() {
    
    let hi = document.querySelector('input').value;
    let result = hi.includes(' ');
    
   
    
    if(result == true){
        typedWords = document.getElementById("myInput").value;
        if(i < wordsCount ){
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
        else if(i == wordsCount - 1){
            console.log(correctCount + " correct")
            console.log(incorrectCount + " incorrect")
        }
        
        document.getElementById("myInput").value='';
        i += 1;

        if(correctCount+incorrectCount == wordsCount ) {
            document.getElementById("test").style.display = "none";
            document.getElementById("timer").style.display = "none";
            document.getElementById("myInput").style.display = "none";
            document.getElementById("word").style.display = "none";
            document.getElementById("refresh").style.display = "none";
            document.getElementById("buttons").style.display = "none";
            

            document.getElementById('score-screen').style.display = "block";
            document.getElementById('wpm').textContent = (correctCount*(60/(time/1000))).toFixed(2) + " WPM" + "     " + correctCount + '/' + (correctCount+incorrectCount);
            document.getElementById('myInput').disabled = true;
            document.getElementById('time').textContent = (time/1000).toFixed(2) + " seconds";
            document.getElementById('accuracy').textContent = Math.round((correctCount / (correctCount + incorrectCount) ) * 100) + '% accuracy'
        }
    }
}