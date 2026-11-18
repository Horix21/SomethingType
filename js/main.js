// SomethingType: a small typing-speed test.

const WORD_LIST_URLS = {
  English: new URL("./english_words.json", import.meta.url),
  Romanian: new URL("./romanian_words.json", import.meta.url),
};
const DEFAULT_LANGUAGE = "English";
const DEFAULT_WORD_COUNT = 60;
const TIMER_TICK_MS = 250;

// Elements that are hidden when the test ends and the score screen appears.
const HIDDEN_AT_END = [
  "test", "timer", "myInput", "word", "refresh",
  "buttons", "logo-img", "menu-button",
];

const $ = (id) => document.getElementById(id);
const input = $("myInput");
const testText = $("test-text");

const state = {
  words: [],        // word list for the selected language
  shown: [],        // words in the current test
  wordCount: DEFAULT_WORD_COUNT,
  index: 0,         // word currently being typed
  correct: 0,
  incorrect: 0,
  startTime: null,  // performance.now() at the first keystroke
  timerId: null,
  menuOpen: false,
};

const wordListCache = new Map();

async function loadWords(language) {
  if (!wordListCache.has(language)) {
    const response = await fetch(WORD_LIST_URLS[language]);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    wordListCache.set(language, await response.json());
  }
  return wordListCache.get(language);
}

async function setLanguage(language) {
  try {
    state.words = await loadWords(language);
  } catch (error) {
    console.error(`Could not load ${language} words:`, error);
    testText.textContent = "Couldn't load the word list. Please try again.";
    return;
  }
  newTest();
}

// ---------- Menu ----------

function setMenuOpen(open) {
  state.menuOpen = open;
  $("settingsMenu").style.display = open ? "block" : "none";
  input.disabled = open;
  if (!open) input.focus();
}

// ---------- Timer ----------

const pad = (n) => String(n).padStart(2, "0");

function formatElapsed(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  if (totalSeconds < 60) return String(totalSeconds);
  return `${pad(Math.floor(totalSeconds / 60))}:${pad(totalSeconds % 60)}`;
}

function startTimer() {
  if (state.startTime !== null) return;
  state.startTime = performance.now();
  state.timerId = setInterval(() => {
    $("timer").textContent = formatElapsed(performance.now() - state.startTime);
  }, TIMER_TICK_MS);
}

function resetTimer() {
  clearInterval(state.timerId);
  state.timerId = null;
  state.startTime = null;
  $("timer").textContent = "0";
}

// ---------- Test lifecycle ----------

function newTest(wordCount = state.wordCount) {
  state.wordCount = wordCount;
  if (state.words.length === 0) return; // word list not loaded yet
  state.index = 0;
  state.correct = 0;
  state.incorrect = 0;
  state.shown = Array.from(
    { length: wordCount },
    () => state.words[Math.floor(Math.random() * state.words.length)]
  );

  testText.replaceChildren(
    ...state.shown.map((word) => {
      const el = document.createElement("span");
      el.textContent = `${word} `;
      return el;
    })
  );

  input.value = "";
  input.className = "write-box";
  $("word").textContent = "";
  resetTimer();
}

function endTest() {
  // Measure before stopping so WPM uses the exact elapsed time.
  const elapsedMs = performance.now() - state.startTime;
  resetTimer();

  const total = state.correct + state.incorrect;
  const wpm = (state.correct * 60000) / elapsedMs;
  const accuracy = Math.round((state.correct / total) * 100);

  HIDDEN_AT_END.forEach((id) => ($(id).style.display = "none"));
  input.disabled = true;

  $("score-screen").style.display = "block";
  $("wpm").textContent = `${wpm.toFixed(2)} WPM     ${state.correct}/${total}`;
  $("time").textContent = `${(elapsedMs / 1000).toFixed(2)} seconds`;
  $("accuracy").textContent = `${accuracy}% accuracy`;
}

function submitWord(typed) {
  const isCorrect = typed === state.shown[state.index];
  if (isCorrect) state.correct++;
  else state.incorrect++;

  testText.children[state.index].className = isCorrect ? "right" : "wrong";
  input.value = "";
  input.className = "write-box";
  state.index++;

  if (state.index === state.wordCount) endTest();
}

function handleInput() {
  if (state.shown.length === 0) return;
  startTimer();

  const typed = input.value;
  if (typed.includes(" ")) {
    submitWord(typed.slice(0, -1));
    return;
  }

  // Live feedback: is what has been typed so far a prefix of the target word?
  const isPrefix = state.shown[state.index].startsWith(typed);
  testText.children[state.index].className =
    `${isPrefix ? "right" : "wrong"} focused-word`;
  input.className = `write-box ${isPrefix ? "right" : "wrong"}`;
}

// ---------- Word-count buttons ----------

const countButtons = document.querySelectorAll("#buttons button");

function selectWordCount(count) {
  countButtons.forEach((button) => {
    const isActive = Number(button.dataset.words) === count;
    button.className = isActive ? "pressed" : `s${button.dataset.words}`;
  });
  newTest(count);
  input.focus();
}

// ---------- Wiring ----------

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenuOpen(!state.menuOpen);
});
$("menu-button").addEventListener("click", () => setMenuOpen(!state.menuOpen));
input.addEventListener("input", handleInput);
$("refresh").addEventListener("click", () => {
  newTest();
  input.focus();
});
$("score-screen").addEventListener("click", () => window.location.reload());
countButtons.forEach((button) =>
  button.addEventListener("click", () =>
    selectWordCount(Number(button.dataset.words))
  )
);
Object.keys(WORD_LIST_URLS).forEach((language) =>
  $(language).addEventListener("click", async () => {
    setMenuOpen(false);
    await setLanguage(language);
  })
);

selectWordCount(DEFAULT_WORD_COUNT);
setLanguage(DEFAULT_LANGUAGE);
