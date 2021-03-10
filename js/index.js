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
    h: 106,
    // moveLeft: function () {return this.x-=40;},
    // moveRight: function () {return this.x+=40;}
  };

  const carImg = new Image();
  carImg.src = './images/car.png';
  // carImg.onload = () => ctx.drawImage(carImg, car.x, car.y, car.w, car.h);  
  
  function drawCar(){
    console.log('drawCar');
    return ctx.drawImage(carImg, car.x, car.y, car.w, car.h);
  }

  
  document.addEventListener('keydown', event => {
    switch (event.code) {
      case "ArrowLeft":
        car.x -= 40;
        break;
      case "ArrowRight":
        car.x += 40;
        break;
    }
    update();
  });

  let randomNum = Math.random()*500;
  // let bigSmall = Math.floor(Math.random());

  let obstacle = {
    x: randomNum,
    y: 0,
    w: 20,
    h: 20
  };

  function drawObstacles(){
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
  }

  function update() {
    ctx.clearRect(0,0,500,700);
    drawCar();
    drawObstacles();
    moveObstacle();
    window.requestAntimationFrame(update);
  }

  function moveObstacle() {
    return obstacle.y += 10;
  }

  function startGame() {
    document.getElementById("canvas").style.visibility = "visible";
    drawCar();
    update();
    drawObstacles();
    moveCar();
    //drawScore();
  }
  
  setInterval(moveObstacle, 800);
  window.requestAntimationFrame(update);
}