var res;
var words;

document.getElementById("Romanian").addEventListener("click", async function() {
  res = await fetch('https://horix21.github.io/SomethingType/js/romanian_words.json');
  words = await res.json();
  setWords(wordsCount)
  document.getElementById("settingsMenu").style.display = "none";
  ok = 1;
});
document.getElementById("English").addEventListener("click", async function() {
  res = await fetch('https://horix21.github.io/SomethingType/js/english_words.json');
  words = await res.json();
  setWords(wordsCount)
  document.getElementById("settingsMenu").style.display = "none";
  ok = 1;
});

res = await fetch('https://horix21.github.io/SomethingType/js/english_words.json');
words = await res.json();

var stoptime = true;
var correctCount = 0;
var incorrectCount = 0;
var i = 0;
var typedWords = "";
var j = 0;
var k = 0;
var counter = 0;
var starting = 0;
var time = 0;
var shownWords = [];
var wordsCount = 0;
var clickCount = 0;
var sec = 0;
var min = 0;
var mil = 0;
var charNumber = 0;
var typingWord = "";
var typed = "";
var node;

var ok = 1;
document.addEventListener("keydown", function (e) {
  if(e.key == "Escape") {
    openMenu();
  }
});

document.getElementById("menu-button").addEventListener("click", () => {
  openMenu();
});

function openMenu() {
  if(ok == 1){
    document.getElementById("settingsMenu").style.display = "block";
    document.getElementById("myInput").setAttribute('disabled', 'disabled');
    ok += 1;
  }
  
  if (ok == 0){
    document.getElementById("settingsMenu").style.display = "none";
    ok += 1;
    document.getElementById("myInput").removeAttribute('disabled', 'disabled');
    
    
  }
  
  if (ok == 2){
    ok = 0;
  }
}

function endTest() {
  document.getElementById("test").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("myInput").style.display = "none";
  document.getElementById("word").style.display = "none";
  document.getElementById("refresh").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("logo-img").style.display = "none";
  document.getElementById("menu-button").style.display = "none";

  document.getElementById("score-screen").style.display = "block";
  document.getElementById("wpm").textContent =
    (correctCount * (60 / (time / 1000))).toFixed(2) +
    " WPM" +
    "     " +
    correctCount +
    "/" +
    (correctCount + incorrectCount);
  document.getElementById("myInput").disabled = true;
  document.getElementById("time").textContent =
    (time / 1000).toFixed(2) + " seconds";
  document.getElementById("accuracy").textContent =
    Math.round((correctCount / (correctCount + incorrectCount)) * 100) +
    "% accuracy";
}

document.getElementById("refresh").addEventListener("click", () => {
  document.getElementById("myInput").value = "";
  document.getElementById("myInput").focus();
  document.getElementById("word").textContent = "";
  setWords(wordsCount);
  i = 0;
  charNumber = 0;
  resetTimer();
  correctCount = 0;
  incorrectCount = 0;
});

document.getElementById("myInput").addEventListener("input", () => {
  getVal();
  startTimer();
});

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
      sec = "0" + sec;
    }
    if (min < 10 || min == 0) {
      min = "0" + min;
    }

    if (min > 0) {
      document.getElementById("timer").textContent = min + ":" + sec;
    } else document.getElementById("timer").textContent = sec;

    setTimeout(timerCycle, 1000);
  }
}

function resetTimer() {
  document.getElementById("timer").textContent = 0;
  stoptime = true;

  mil = 0;
  sec = 0;
  min = 0;
  k = 0;
  starting = 0;
  typingWord = "";
  typed = "";
}
setWords(60);
document.getElementById("60w").className = "pressed";

document.getElementById("60w").addEventListener("click", () => {
  setWords(60);
  resetTimer();
  clickCount = 0;
  if (clickCount == 0) {
    document.getElementById("60w").className = "pressed";
    document.getElementById("30w").className = "s30";
    document.getElementById("10w").className = "s10";
  }
  document.getElementById("myInput").focus();
});

document.getElementById("30w").addEventListener("click", () => {
  setWords(30);
  resetTimer();
  clickCount = 1;
  if (clickCount == 1) {
    document.getElementById("60w").className = "s60";
    document.getElementById("30w").className = "pressed";
    document.getElementById("10w").className = "s10";
  }
  document.getElementById("myInput").focus();
});

document.getElementById("10w").addEventListener("click", () => {
  setWords(10);
  resetTimer();
  clickCount = 2;
  if (clickCount == 2) {
    document.getElementById("60w").className = "s60";
    document.getElementById("30w").className = "s30";
    document.getElementById("10w").className = "pressed";
  }
  document.getElementById("myInput").focus();
});

function setWords(wordCount) {
  i = 0;
  correctCount = 0;
  incorrectCount = 0;
  document.getElementById("test-text").innerHTML = "";
  wordsCount = wordCount;

  shownWords = [];

  for (counter = 0; counter <= wordCount - 1; counter++) {
    shownWords[counter] = words[Math.floor(Math.random() * words.length)];
  }
  for (counter = 0; counter <= shownWords.length - 1; counter++) {
    node = document.createElement("word");
    node.textContent = shownWords[counter] + " ";
    document.getElementById("test-text").appendChild(node);
  }
}

i = 0;

function getVal() {
  charNumber++;
  typed = "";

  let hi = document.querySelector("input").value;
  let result = hi.includes(" ");

  typingWord = document.getElementById("myInput").value;

  for (counter = 0; counter <= typingWord.length - 1; counter++) {
    typed = typed + shownWords[i].charAt(counter);
  }

  let color = typed == typingWord;

  if (color) {
    document.getElementById("test-text").children[i].className =
      "right focused-word";
    document.getElementById("myInput").className = "write-box right";
  } 
  if (!color) {
    document.getElementById("test-text").children[i].className =
      "wrong focused-word";
    document.getElementById("myInput").className = "write-box wrong";
  }

  if (result == true) {
    charNumber = 0;
    typedWords = document.getElementById("myInput").value;

    if (i < wordsCount) {
      if (typedWords.slice(0, -1) == shownWords[i]) {
        correctCount += 1;
        document.getElementById("test-text").children[i].className = "right";
      } else if (typedWords.slice(0, -1) != shownWords[i]) {
        incorrectCount += 1;
        document.getElementById("test-text").children[i].className = "wrong";
      }
    }

    document.getElementById("myInput").value = "";
    i += 1;

    if (correctCount + incorrectCount == wordsCount) {
      endTest();
    }
  }
}
