window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  const board = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const car = {
    x: 225,
    y: 550,
    w: 52,
    h: 106
  };

  const carImg = new Image();
  carImg.src = './images/car.png';


  //BOARD
  function drawBoard() {
    document.getElementById("game-board").style.visibility = "visible";
  }
  const score = document.getElementById("score");
  let counter = 0;
  function addNum() {
    counter++;
    score.innerText = `Score: ${counter}`;
  }
  function clearBoard() {
    ctx.clearRect(0, 0, 500, 700);
  }

  //CAR
  function drawCar() {
    ctx.drawImage(carImg, car.x, car.y, car.w, car.h);
  }
  document.addEventListener('keydown', event => {
    switch (event.code) {
      case "ArrowLeft":
        if (car.x >= 80) { car.x -= 40; } else if (car.x < 80) { car.x -= 0; }
        break;
      case "ArrowRight":
        if (car.x <= 380) { car.x += 40; } else if (car.x > 380) { car.x += 0; }
        break;
    }
  });

  //OBSTACLES
  function randomNum() { return (Math.random() * 260) + 80; randomNum() }
  function bigSmall() { return Math.round(Math.random()); bigSmall() }
  class Obstacle {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
  }
  const obstacleArr = [];
  function newObstacle() {
    var newObs = new Obstacle(randomNum(), 0, (100 + 100 * bigSmall()), 20);
    if (obstacleArr.length < 4) { obstacleArr.push(newObs); }
    else if (obstacleArr.length > 1) { obstacleArr.shift(); obstacleArr.push(newObs); }
  }
  function drawObstacles() {
    obstacleArr.forEach(function (obs) { ctx.fillStyle = 'red'; ctx.fillRect(obs.x, obs.y, obs.w, obs.h); });
  }
  function moveObstacles() {
    obstacleArr.forEach(obs => obs.y += 1);
  }

  // function isCollide() {
  //   obstacleArr.forEach((obs) => {
  //     if (obs.y === car.y) {
  //       gameOver();
  //     }
  //   }
  //   );
  // }

  //UPDATE & INTERVALS
  function update() {
    clearBoard();
    drawBoard();
    drawCar();
    drawObstacles();
    moveObstacles();
    // isCollide();
    window.requestAnimationFrame(update);
  }

  //START
  function startGame() {
    update();
    newObstacle();
    const obsInterval = setInterval(newObstacle, 3000);
    const numInterval = setInterval(addNum, 500);
    isCollide();
    window.requestAnimationFrame(update);
  }

  //GAME OVER
  function gameOver() {
    clearInterval(obsInterval);
    clearInterval(numInterval);
    printGameOver();
  }

  // function printGameOver() {
  //   console.log("that's all folks!");
  //   document.getElementById("game-board").style.visibility = "hidden";
  //   document.getElementById("game-over").style.visibility = "visible";
  //   function printFinalScore() {
  //     document.getElementById("final-score").innerText = `${finalScore} points`;
  //   }
  //   printFinalScore();
  // }
}