const res = await fetch('https://horix21.github.io/SomethingType/js/words.json');
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
var y = 0;
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
var wordsTyped = "";
var charNumber = 0;
var totalCharNumber
var typingWord = "";

function endTest() { 
    document.getElementById("test").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("myInput").style.display = "none";
    document.getElementById("word").style.display = "none";
    document.getElementById("refresh").style.display = "none";
    document.getElementById("buttons").style.display = "none";
    document.getElementById('logo-img').style.display = "none";
    

    document.getElementById('score-screen').style.display = "block";
    document.getElementById('wpm').textContent = (correctCount*(60/(time/1000))).toFixed(2) + " WPM" + "     " + correctCount + '/' + (correctCount+incorrectCount);
    document.getElementById('myInput').disabled = true;
    document.getElementById('time').textContent = (time/1000).toFixed(2) + " seconds";
    document.getElementById('accuracy').textContent = Math.round((correctCount / (correctCount + incorrectCount) ) * 100) + '% accuracy'
}

document.getElementById('refresh').addEventListener('click', () => {
    
    document.getElementById('myInput').value = '';
    document.getElementById('myInput').focus();
    document.getElementById('word').textContent = '';
    setWords(wordsCount);
    i = 0;
    wordsTyped = "";
    charNumber = 0;
    
    resetTimer();
    correctCount = 0; incorrectCount = 0;

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

        mil = Date.now() - starting - 1000 * sec; 
        time = Date.now() - starting;

        if (mil >= 1000) {
            mil = 0;
            sec++;
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
    k = 0;
    starting = 0;
}
setWords(60);

document.getElementById('60w').addEventListener('click', () => {
    setWords(60);
    resetTimer();
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
    resetTimer();
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
    resetTimer();
    clickCount = 2;
    if (clickCount == 2) {
        document.getElementById('60w').style.color = "#000000";
        document.getElementById('30w').style.color = "#000000";
        document.getElementById('10w').style.color = "#e2b714";
    }
    document.getElementById('myInput').focus();
})



function setWords(wordCount) {
    totalCharNumber = 0;
    document.getElementById('greenText').innerHTML = '';
    wordsCount = wordCount;

    showing = '';
    shownWords = [];

    for(m = 0; m <= wordCount - 1; m++)
    {
        shownWords[m] = words[Math.floor(Math.random() * words.length)];
    }
    for(m = 0; m <= shownWords.length - 1; m++){
        var node = document.createElement("letter");
        node.textContent = shownWords[m] + " ";
        document.getElementById("greenText").appendChild(node);
        //document.getElementById('greenText').textContent = document.getElementById('word-active').children[m].value
        //console.log(document.getElementById('greenText').children[m].textContent)
        
        
    }
    
    //console.log(document.getElementById('greenText').children[1].textContent)
    
}



i = 0;

function getVal() {
    totalCharNumber++;
    charNumber++;

    let hi = document.querySelector('input').value;
    let result = hi.includes(' ');
    let color = document.getElementById('greenText').children[i].textContent.includes(document.getElementById('myInput').value)

    console.log(document.getElementById('myInput').value + ' ' + document.getElementById('greenText').children[i].textContent)
    if(color) {
        document.getElementById("greenText").children[i].className = "right focused-word"
        document.getElementById("myInput").className = "write-box right"
        //console.log(document.getElementById('myInput').className)
    }
    if(!color) {
        document.getElementById('greenText').children[i].className = "wrong focused-word"
        document.getElementById('myInput').className = "write-box wrong"
    }
    

    if(result == true){
        charNumber = 0;
        typedWords = document.getElementById("myInput").value;
        wordsTyped += document.getElementById('myInput').value;
        //console.log(typedWords.slice(0, -1));
        if(i < wordsCount ){
            
            if(typedWords.slice(0, -1) == shownWords[i]){
                correctCount += 1;
                document.getElementById('greenText').children[i].className = "right";
                //document.getElementById('greenText').children[i + 1].className = "focused-word";
            }
            else if (typedWords.slice(0, -1) != shownWords[i]) {
                incorrectCount += 1;
                document.getElementById('greenText').children[i].className = "wrong";
            }
        }

        document.getElementById("myInput").value='';
        i += 1;

        if(correctCount+incorrectCount == wordsCount ) {
            endTest();
        }
    }
}