const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'images/bg-new.png';

const food = new Image();
food.src = 'images/apple.png';

const box = 32; //ширина или высота обной ячейки
let score = 0; //хранит счет игры

let foodCoordinate = { //координаты для появления еды
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box
};

const snakeCoordinate = [];
snakeCoordinate[0] = {
  x: 9 * box,
  y: 10 * box
};

//Движение змейки

document.addEventListener('keydown', direction);
let dir;

function direction(e) {
  if (e.keyCode == 37 && dir != 'right') {
    dir = 'left';
  } else if (e.keyCode == 38 && dir != 'down') {
    dir = 'up';
  } else if (e.keyCode == 39 && dir != 'left') {
    dir = 'right';
  } else if (e.keyCode == 40 && dir != 'up') {
    dir = 'down';
  }
};

function eatTail(head, arr) {
  arr.forEach((item) => {
    if (head.x == item.x && head.y == item.y) {
      clearInterval(game);
    }
  })
}

function drawGame() { //эту функцию надо вызывать каждые 100 мс
  ctx.clearRect(0, 0, 706, 725);

  ctx.drawImage(ground, 0, 0); //указываем что хотим отобразить и координаты
  ctx.drawImage(food, foodCoordinate.x, foodCoordinate.y);
  snakeCoordinate.forEach((item, i) => {
    //рисую квадрат
    ctx.fillStyle = i == 0 ? '#EC2C66' : '#F1618C';
    ctx.fillRect(item.x, item.y, box, box); //где находится, затем ширину и высоту
  });

  ctx.fillStyle = '#EC2C66';
  ctx.font = '40px Arial';
  ctx.fillText(score, box * 9.3, box * 2.7);

  let snakeX = snakeCoordinate[0].x;
  let snakeY = snakeCoordinate[0].y;


  //змейка ест еду
  if (snakeX == foodCoordinate.x && snakeY == foodCoordinate.y) {
    score++;
    foodCoordinate = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box
    }
  } else {
    snakeCoordinate.pop();
  }

  if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > 17 * box) {
    clearInterval(game);
  }

  if (dir == 'left') snakeX -= box;
  if (dir == 'right') snakeX += box;
  if (dir == 'up') snakeY -= box;
  if (dir == 'down') snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  eatTail(newHead, snakeCoordinate);
  snakeCoordinate.unshift(newHead);
};

const game = setInterval(drawGame, 100);
