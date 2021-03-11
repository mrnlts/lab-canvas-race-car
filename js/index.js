window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  const board = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  function drawBoard() {
    document.getElementById("canvas").style.visibility = "visible";
  }

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
  });
  
  let randomNum = (Math.random()*260)+80;
  let bigSmall = Math.round(Math.random());

  let obstacle = {
    x: randomNum,
    y: 0,
    w: 100 + 100*bigSmall,
    h: 20
  };

  // function newObstacle (){
  //   obstacle.y += 10;
  // }

  function drawObstacle () {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
  }

  function moveObstacles (){
    obstacle.y += 1;
    drawCar();
  }

  function clearBoard() {
    ctx.clearRect(0,0,500,700);
  }

  function update() {
    clearBoard();
    drawBoard();
    drawCar();
    drawObstacle();
    moveObstacles();
    window.requestAnimationFrame(update);
  }

  function startGame() {
    update(); 
  }

  
}
window.requestAnimationFrame(update);