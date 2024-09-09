//game constants and variables
let direction = { x: 0, y: 0 };
let foodSound = new Audio("assets/eating-sound.mp3");
let bgMusic = new Audio("assets/bg-game-music.mp3");
let moveSound = new Audio("assets/snake-moving.wav");
let gameOverSound = new Audio("assets/game-over.mp3");
let speed = 9;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let foodArr = [{ x: 6, y: 7 }];
let score = 0;
let food = { x: 6, y: 7 };
let inputDir = { x: 0, y: 0 };
let hiscoreval = 0;

//game functions
function main(cTime) {
  window.requestAnimationFrame(main);
  if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = cTime;
  gameEngine();
  console.log(cTime);
}

function isCollide(sarr) {
  // if snake bump into itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  //if snake bump into the wall
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18 ||
    snakeArr[0].y <= 0
  )
    return true;
  return false;
}
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "High Score: " + hiscore;
}

function gameEngine() {
  // Part 1 updating the snake variable array
  // Part 2 display the food
  // Part 3 display the snake
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    bgMusic.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game over press any key to play again.");
    snakeArr = [{ x: 13, y: 15 }];
    bgMusic.play();
    score = 0;
  }
  // if snake has eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "High Score: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2,
      b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    console.log("index", index);
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) snakeElement.classList.add("head");
    else snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start the game
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});

const upDir = document.getElementById("upArrow");
const downDir = document.getElementById("downArrow");
const leftDir = document.getElementById("leftArrow");
const rightDir = document.getElementById("rightArrow");

upDir.addEventListener("click", () => {
  inputDir.x = 0;
  inputDir.y = -1;
});

downDir.addEventListener("click", () => {
  inputDir.x = 0;
  inputDir.y = 1;
});

leftDir.addEventListener("click", () => {
  inputDir.x = -1;
  inputDir.y = 0;
});

rightDir.addEventListener("click", () => {
  inputDir.x = 1;
  inputDir.y = 0;
});

const buttonInc = document.getElementById("increament");
const buttonDec = document.getElementById("decreament");

buttonInc.addEventListener("click", () => {
  speed = speed + 1;
  speedText.innerHTML = speed;
});

buttonDec.addEventListener("click", () => {
  speed = speed - 1;
  speedText.innerHTML = speed;
});

const lightTheme = document.getElementById("light");
const darkTheme = document.getElementById("dark");
const blueTheme = document.getElementById("blue");

lightTheme.addEventListener("click", () => {
  document.body.classList.remove("dark-theme");
  document.body.classList.remove("blue-theme");
  //document.body.classList.add(":root");
});

darkTheme.addEventListener("click", () => {
  document.body.classList.remove("blue-theme");
  document.body.classList.add("dark-theme");
});

blueTheme.addEventListener("click", () => {
  document.body.classList.add("blue-theme");
});
