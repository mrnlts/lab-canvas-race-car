window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");

  let car = {
    x: 225,
    y: 350,
    w: 52,
    h: 106,
  };

  function drawCar() {
    ctx.drawImage(carImg, car.x, car.y, )
  }
  const carImg = new Image();
  carImg.src = './images/car.png';  
  carImg.onload = () => ctx.drawImage(carImg, car.x, car.y, car.w, car.h);
  
  function startGame() {
    console.log("let's go!")
  }

};

