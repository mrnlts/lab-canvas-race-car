window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  const board = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let car = {
    x: 225,
    y: 550,
    w: 52,
    h: 106
  };

  const carImg = new Image();
  carImg.src = './images/car.png';
  
  function drawCar(){
    ctx.drawImage(carImg, car.x, car.y, car.w, car.h);
  }
  
  document.addEventListener('keydown', event => {
    switch (event.code) {
      case "ArrowLeft":
        if (car.x >=80) {car.x -= 40;} else if (car.x <80) {car.x -= 0;}
        break;
      case "ArrowRight":
        if (car.x <= 380) {car.x += 40;} else if (car.x > 380) {car.x += 0;}
        break;
    }
    clearBoard();
    drawCar();
  });
  
  let randomNum = (Math.random()*260)+80;
  let bigSmall = Math.round(Math.random());

  let obstacle = {
    x: randomNum,
    y: 0,
    w: 100 + 100*bigSmall,
    h: 20
  };

  function clearBoard() {
    ctx.clearRect(0,0,500,700);
  }

  function drawObstacles(){
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
    obstacle.y += 10;
  }

  function drawBoard() {
    setInterval(clearBoard, 100);
    setInterval(drawCar, 100);
    setInterval(drawObstacles, 100);
  }

  function startGame() {
    document.getElementById("canvas").style.visibility = "visible";
    drawCar();
    drawObstacles();
    drawBoard(); 
  }
}