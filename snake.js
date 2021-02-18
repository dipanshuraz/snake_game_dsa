function init() {
  canvas = document.getElementById('mycanvas');
  W = H = canvas.width = canvas.height = 700;
  pen = canvas.getContext('2d');
  cs = 66;
  gameOver = false;
  score = 5;

  foodImage = new Image();
  foodImage.src = './Assets/apple.png';

  winImage = new Image();
  winImage.src = './Assets/trophy.png';

  food = getRandomFood();

  snake = {
    initLen: 5,
    color: 'blue',
    cells: [],
    direction: 'right',
    createSnake: function () {
      for (var i = this.initLen; i > 0; i--) {
        this.cells.push({ x: i, y: 0 });
      }
    },
    drawSnake: function () {
      for (var i = 0; i < this.cells.length; i++) {
        pen.fillStyle = this.color;
        pen.fillRect(
          this.cells[i].x * cs,
          this.cells[i].y * cs,
          cs - 2,
          cs - 2
        );
      }
    },
    updateSnake: function () {
      var headX = this.cells[0].x;
      var headY = this.cells[0].y;

      if (headX == food.x && headY == food.y) {
        food = getRandomFood();
        score += 1;
      } else {
        this.cells.pop();
      }

      var nextX, nextY;

      if (this.direction == 'right') {
        nextX = headX + 1;
        nextY = headY;
      } else if (this.direction == 'left') {
        nextX = headX - 1;
        nextY = headY;
      } else if (this.direction == 'down') {
        nextX = headX;
        nextY = headY + 1;
      } else {
        nextX = headX;
        nextY = headY - 1;
      }

      // Touch the wall
      var lastX = Math.round(W / cs);
      var lastY = Math.round(H / cs);

      if (
        this.cells[0].x < 0 ||
        this.cells[0].y < 0 ||
        this.cells[0].x > lastX ||
        this.cells[0].y > lastY
      ) {
        gameOver = true;
      }

      this.cells.unshift({ x: nextX, y: nextY });
    },
  };
  snake.createSnake();

  function keyPressed(e) {
    if (e.key == 'ArrowRight') {
      snake.direction = 'right';
    } else if (e.key == 'ArrowLeft') {
      snake.direction = 'left';
    } else if (e.key == 'ArrowDown') {
      snake.direction = 'down';
    } else {
      snake.direction = 'up';
    }
  }
  document.addEventListener('keydown', keyPressed);
}

function draw() {
  pen.clearRect(0, 0, W, H);
  snake.drawSnake();
  pen.fillStyle = food.color;
  pen.drawImage(foodImage, food.x * cs, food.y * cs, cs, cs);

  pen.drawImage(winImage, 24, 18, cs, cs);
  pen.fillStyle = 'blue';
  pen.font = '24px Roboto';
  pen.fillText(score, 50, 50);
}

function update() {
  snake.updateSnake();
}

function getRandomFood() {
  var foodX = Math.round((Math.random() * (W - cs)) / cs);
  var foodY = Math.round((Math.random() * (H - cs)) / cs);
  var food = { x: foodX, y: foodY, color: 'red' };
  return food;
}

function gameloop() {
  if (gameOver) {
    clearInterval(f);
    alert('Game Over ');
    return;
  }
  draw();
  update();
}

init();

var f = setInterval(gameloop, 110);
