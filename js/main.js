import EnemyMotion from "./EnemyMotion.js";
import Player from "./Player.js";
import BulletsMotion from "./BulletsMotion.js";
import Score from "./Score.js";

const canvas = document.getElementById('game');
const scene = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600; 

  
const background = new Image();
background.src = '/assets/images/space.png';

const scores = new Score(50,'draw-score');
const bulletsMotion = new BulletsMotion(canvas, 10, "#F85E63", true, scores);
const enemyBullets = new BulletsMotion(canvas, 4, "white", false);
const enemyMotion = new EnemyMotion(canvas, enemyBullets, bulletsMotion);
const player = new Player(canvas, 3, bulletsMotion);

let gameOver = false;
let win = false; 


// ----- Functions  ----- //


function game() {
    checkGameOver();
    scene.drawImage(background,0,0, canvas.width, canvas.height);
    displayMessage();
    if (!gameOver) {
    enemyMotion.draw(scene);
    player.draw(scene);
    bulletsMotion.draw(scene);
    enemyBullets.draw(scene);
    }
}

// ----- Message to be displayed at the end ----- //

function displayMessage() {
    if (gameOver) {
        let text = win ? "You won!" : "Try again";
        let textOffset = win ? 2.9 : 3.2;

        scene.fillStyle = "white";
        scene.font = "25px 'Press Start 2P'";
        scene.align = "center";
        scene.fillText(text, canvas.width / textOffset, canvas.height / 2);

        $("#start-game").show();

        $('#start-game').click(function() {
            location.reload();
        });
    }
}

// ----- Check game over on collision with bullets, enemy or enemy crossed the border ----- //

function checkGameOver() {
    if (gameOver) {
        return;
    }

    if (enemyBullets.collideWith(player)) {
        gameOver = true;
    }

    if(enemyMotion.collideWith(player)) {
        gameOver = true;
    }

    if(enemyMotion.collideWithBorder(canvas)) {
        gameOver = true;
    }

    if (enemyMotion.enemyRows.length === 0) {
        win = true;
        gameOver = true;
    }
}


setInterval(game,1000/60);