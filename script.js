const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

let initialTime = localStorage.getItem("initialTime") ? Number(localStorage.getItem("initialTime")) : 10 ;
let score = localStorage.getItem("score") ? Number(localStorage.getItem("score")) : 0;
let difficulty = localStorage.getItem("difficulty") ?? "easy";
let increaseInTimeByDifficulty = localStorage.getItem("increaseInTimeByDifficulty") ? Number(localStorage.getItem("increaseInTimeByDifficulty")) : 5;

timeEl.textContent = `${initialTime}s`;
scoreEl.textContent = score;
difficultySelect.value = difficulty;

const getRandomWord = () => {
  return (words) => {
    return words[Math.floor(Math.random() * words.length)];
  }  
}

const showRandomWord = (randomWord) => {
  word.textContent = randomWord;
}

const pipe = (...fns) => (...x) => fns.reduce((f, g) => {
  if (Array.isArray(f)) {
    return typeof g() === "function" ? g()(...f) : g(...f);
  } else {
    return typeof g() === "function" ?  g()(f) : g(f);
  }
}, x);

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
]

const showRandomWordPipeline = pipe(
  getRandomWord,
  showRandomWord
);

const checkWordSanitary = (e) => {
  if (e.target.value === word.innerText) {
    resetScore();
    resetTime();
    showRandomWordPipeline(words);
    e.target.value = "";
  }
}

const resetTime = () => {
  initialTime += increaseInTimeByDifficulty;
  localStorage.setItem("initialTime", initialTime);
}

const resetScore = () => {
  score++;
  localStorage.setItem("score", score);
  scoreEl.textContent = score;
}

const resetScoreAndTimeForNewGame = () => {
  setTimeout(() => {
    localStorage.setItem("initialTime", 10);
    localStorage.setItem("score", 0);    
  });
}

const gameOver = () => {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = 'flex';
  resetScoreAndTimeForNewGame();
}

const startTime = setInterval(() => {
  if (initialTime <= 0) {
    clearInterval(startTime);
    gameOver();
  }
  timeEl.textContent = `${initialTime}s`;
  initialTime--;
  localStorage.setItem("initialTime", initialTime);
},1000);

showRandomWordPipeline(words);

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

text.addEventListener("input", e => {
  checkWordSanitary(e);
});

difficultySelect.addEventListener("change", e => {
  switch (e.target.value) {
    case "easy":
      localStorage.setItem("difficulty", "easy");
      increaseInTimeByDifficulty = 5
      localStorage.setItem("increaseInTimeByDifficulty", 5);
      break;
  
    case "medium":
      localStorage.setItem("difficulty", "medium");
      increaseInTimeByDifficulty = 3
      localStorage.setItem("increaseInTimeByDifficulty", 3);
      break;
  
    case "hard":
      localStorage.setItem("difficulty", "hard");
      increaseInTimeByDifficulty = 2
      localStorage.setItem("increaseInTimeByDifficulty", 2);
      break;

    default:
      increaseInTimeByDifficulty = 5
      break;
  }
});


// const word = document.getElementById('word');
// const text = document.getElementById('text');
// const scoreEl = document.getElementById('score');
// const timeEl = document.getElementById('time');
// const endgameEl = document.getElementById('end-game-container');
// const settingsBtn = document.getElementById('settings-btn');
// const settings = document.getElementById('settings');
// const settingsForm = document.getElementById('settings-form');
// const difficultySelect = document.getElementById('difficulty');

// // List of words for game
// const words = [
//   'sigh',
//   'tense',
//   'airplane',
//   'ball',
//   'pies',
//   'juice',
//   'warlike',
//   'bad',
//   'north',
//   'dependent',
//   'steer',
//   'silver',
//   'highfalutin',
//   'superficial',
//   'quince',
//   'eight',
//   'feeble',
//   'admit',
//   'drag',
//   'loving'
// ];

// // Init word
// let randomWord;

// // Init score
// let score = 0;

// // Init time
// let time = 10;

// // Set difficulty to value in ls or medium
// let difficulty =
//   localStorage.getItem('difficulty') !== null
//     ? localStorage.getItem('difficulty')
//     : 'medium';

// // Set difficulty select value
// difficultySelect.value =
//   localStorage.getItem('difficulty') !== null
//     ? localStorage.getItem('difficulty')
//     : 'medium';

// // Focus on text on start
// text.focus();

// // Start counting down
// const timeInterval = setInterval(updateTime, 1000);

// // Generate random word from array
// function getRandomWord() {
//   return words[Math.floor(Math.random() * words.length)];
// }

// // Add word to DOM
// function addWordToDOM() {
//   randomWord = getRandomWord();
//   word.innerHTML = randomWord;
// }

// // Update score
// function updateScore() {
//   score++;
//   scoreEl.innerHTML = score;
// }

// // Update time
// function updateTime() {
//   time--;
//   timeEl.innerHTML = time + 's';

//   if (time === 0) {
//     clearInterval(timeInterval);
//     // end game
//     gameOver();
//   }
// }

// // Game over, show end screen
// function gameOver() {
//   endgameEl.innerHTML = `
//     <h1>Time ran out</h1>
//     <p>Your final score is ${score}</p>
//     <button onclick="location.reload()">Reload</button>
//   `;

//   endgameEl.style.display = 'flex';
// }

// addWordToDOM();

// // Event listeners

// // Typing
// text.addEventListener('input', e => {
//   const insertedText = e.target.value;

//   if (insertedText === randomWord) {
//     addWordToDOM();
//     updateScore();

//     // Clear
//     e.target.value = '';

//     if (difficulty === 'hard') {
//       time += 2;
//     } else if (difficulty === 'medium') {
//       time += 3;
//     } else {
//       time += 5;
//     }

//     updateTime();
//   }
// });

// // Settings btn click
// settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// // Settings select
// settingsForm.addEventListener('change', e => {
//   difficulty = e.target.value;
//   localStorage.setItem('difficulty', difficulty);
// });
