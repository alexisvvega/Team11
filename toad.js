let timer;

const gameImages = [
  "tfour.jpg",
  "tfive.jpg",
  "tsix.jpg"
];

function switchScreen(showScreenID) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));

  const showScreen = document.getElementById(showScreenID);
  showScreen.classList.add('active');
}

document.getElementById('submit').addEventListener('click', function(event) {
  event.preventDefault(); 
  switchScreen('resultScreen');
});

let timeRemaining = 20;

function updateTimer() {
    if (timeRemaining >= 0) {
        document.getElementById("timerDisplay").textContent = `00:${timeRemaining.toString().padStart(2, '0')}`;
        timeRemaining--;
    } else {
      clearInterval(timer); 
      switchScreen('resultScreen'); 
  }
}

function resetTimer() {
  timeRemaining = 20;
  document.getElementById("timerDisplay").textContent = `00:${timeRemaining.toString().padStart(2, '0')}`;

  if (timer) {
      clearInterval(timer);  
  }

  timer = setInterval(updateTimer, 1000);
}

function handleSubmit() {
  clearInterval(timer);
  const userInput = document.getElementById("userInput").value;
  const resultMessage = document.getElementById("resultMessage");
  const resultImage = document.getElementById("gamepic");

  const gamepic = resultImage.src.split('/').pop();

  if (gamepic === "tfour.jpg" && userInput == 4) {
    resultImage.src = "clappingtoad.jpg";
    resultMessage.textContent = "Congratulations! You\'ve found all the Toads!";
  } else if (gamepic === "tfive.jpg" && userInput == 5) {
    resultImage.src = "clappingtoad.jpg";
    resultMessage.textContent = "Congratulations! You\'ve found all the Toads!";
  } else if (gamepic === "tsix.jpg" && userInput == 5) {
    resultImage.src = "clappingtoad.jpg";
    resultMessage.textContent = "Congratulations! You\'ve found all the Toads!";
  } else {
    resultImage.src = "sadtoad.jpg";
    resultMessage.textContent = "Sorry, you didn\'t find all the Toads. He\'s still waiting for you to find him :(";
  }

  switchScreen("resultScreen"); 
}

function startGame() {
  const randomIndex = Math.floor(Math.random() * gameImages.length);
  const selectedImage = gameImages[randomIndex];

  const gamepic = document.getElementById("gamepic");
  gamepic.src = selectedImage;

  switchScreen("gameScreen");

  resetTimer();
}

function restartGame() {
  clearInterval(timer);
  const userInput = document.getElementById("userInput");
  userInput.value = ""; 

  switchScreen("startScreen"); 
  resetTimer();
}
