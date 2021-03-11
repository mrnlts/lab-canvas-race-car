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


  //BOARD
  function drawBoard() {
    document.getElementById("canvas").style.visibility = "visible";
  }
  function clearBoard() {
    ctx.clearRect(0,0,500,700);
  }  
  
  //CAR
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
  
  //OBSTACLES
  let randomNum = (Math.random()*260)+80;
  let bigSmall = Math.round(Math.random());
  class Obstacle {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
  }
  const obstacleArr = [];
  function newObstacle (){
    var newObs = new Obstacle(randomNum, 0, (100+100*bigSmall),20);
    if (obstacleArr.length < 4) {obstacleArr.push(newObs);}
    else if (obstacleArr.length >1) {obstacleArr.shift(); obstacleArr.push(newObs);}
  }
  function drawObstacles () {
    obstacleArr.forEach(function(obs) {ctx.fillStyle = 'red'; ctx.fillRect(obs.x, obs.y, obs.w, obs.h);});
  }
  function moveObstacles (){
    obstacleArr.forEach(obs => obs.y += 1);
  }
  function isCollide() {
    obstacleArr.forEach((currentObs) => {
      return!
      ((car.y + car.h) < (currentObs.y)) || 
      (car.y > (currentObs.y + currentObs.h)) || 
      ((car.x + car.w) < currentObs.x) ||  
      (car.x > (currentObs.x + currentObs.w));
      });
      console.log('crash');
  }     

  //UPDATE
  function update() {
    clearBoard();
    drawBoard();
    drawCar();
    drawObstacles();
    moveObstacles();
    isCollide();
    window.requestAnimationFrame(update);
  }

  //START
  function startGame() {
    update(); 
    newObstacle();
    setInterval(newObstacle, 3000);
    setInterval(disableStartBtn, 2000);
  }
}
window.requestAnimationFrame(update);