const startBtn = document.getElementById("start");
const typeWrap = document.getElementById("wrap");
const sentence = document.getElementById("sentence");
const typeForm = document.getElementById("typing");
const typeInput = typeForm.querySelector("input");
const score = document.querySelector("#score > span");
const time = document.querySelector("#time > span");
const againBtn = document.querySelector("button");

function randomAdvice() {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((value) => value.slip.advice)
    .then((advice) => (sentence.innerText = advice));
}

function countDown() {
  time.innerText = 15;

  let counter = time.innerText;
  let scoreCounter = score.innerText;
  let startTimer = setInterval(timer, 1000);

  function timer() {
    if (counter < 0) {
      time.innerText = counter;
      clearInterval(startTimer);
      reset();
    } else if (scoreCounter !== score.innerText) {
      clearInterval(startTimer);
    } else {
      time.innerText = counter;
      counter -= 1;
    }
  }
}

function start() {
  startBtn.style.display = "none";
  typeWrap.style.display = "block";
  typeInput.disabled = false;
  randomAdvice();
  countDown();
}

function submit(event) {
  event.preventDefault();

  if (sentence.innerText === typeInput.value) {
    let scoreNumber = Number(score.innerText);
    scoreNumber += 1;
    score.innerText = parseInt(scoreNumber);
  }
  typeInput.value = "";
  countDown();
  randomAdvice();
}

function reset() {
  alert(`당신의 점수는 ${score.innerText}점입니다.`);
  score.innerText = 0;
  time.innerText = 15;
  typeInput.disabled = true;
}

startBtn.addEventListener("click", start);
typeForm.addEventListener("submit", submit);
againBtn.addEventListener("click", start);
