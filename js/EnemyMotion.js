import Enemy from "./Enemy.js"
import MovingDirection from "./MovingDirection.js";

export default class EnemyMotion {

    enemyMap = [
        [2,2,2,1,1,4,1,4,4,1],
        [1,3,1,1,4,1,2,3,1,1],
        [1,1,4,1,1,2,1,4,1,2],
        [4,1,2,1,3,1,2,4,3,1],
        [1,1,4,1,1,4,1,2,2,2],
        [2,1,3,1,4,1,3,3,1,1]
    ];

    enemyRows = [];

    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 1;
    defaultYVelocity = 1;
    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;
    shootBulletTimerDefault = 100;
    shootBulletTimer = this.shootBulletTimerDefault;

    constructor(canvas, enemyBullets, bulletsMotion) {
        this.canvas = canvas;
        this.enemyBullets = enemyBullets;
        this.bulletsMotion = bulletsMotion;
        this.enemySound = new Audio("/assets/sounds/enemy-death.wav");
        this.enemySound.volume = 0.4;
        this.createEnemies();
    }

    draw(scene) {
        this.decreaseMoveDownTimer();
        this.updateVelocityAndDirection();
        this.clashDetection();
        this.drawEnemies(scene);
        this.resetMoveDownTimer();
        this.shootBullet();
    }

    clashDetection() {
        this.enemyRows.forEach((enemyRow) => {
            enemyRow.forEach((enemy, enemyIndex) => {
                if (this.bulletsMotion.collideWith(enemy)) {
                    this.enemySound.currentTime = 0;
                    this.enemySound.play();
                    enemyRow.splice(enemyIndex, 1);
                }
            });
        });

        this.enemyRows = this.enemyRows.filter(enemyRow => enemyRow.length > 0);
    }

    shootBullet() {
        this.shootBulletTimer--;
        if (this.shootBulletTimer <= 0) {
            this.shootBulletTimer = this.shootBulletTimerDefault;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length);
            const enemy = allEnemies[enemyIndex];
            this.enemyBullets.shoot(enemy.x, enemy.y, -3);
        }
    }

    resetMoveDownTimer() {
        if (this.moveDownTimer <= 0) {
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    decreaseMoveDownTimer() {
        if (this.currentDirection === MovingDirection.downLeft ||
            this.currentDirection === MovingDirection.downRight)
            {
            this.moveDownTimer--;
        }
    }
    

    updateVelocityAndDirection() {
        for (const enemyRow of this.enemyRows) {
            if (this.currentDirection == MovingDirection.right) {
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostEnemy = enemyRow[enemyRow.length - 1];
                if(rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
                    this.currentDirection = MovingDirection.downLeft;
                    break;
                }
            }
            else if (this.currentDirection === MovingDirection.downLeft) {
            
                if (this.moveDown(MovingDirection.left)) {
                    break;
                }
            }
            else if (this.currentDirection === MovingDirection.left) {
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;
                const leftMostEnemy = enemyRow[0];
                if (leftMostEnemy.x <= 0) {
                    this.currentDirection = MovingDirection.downRight;
                    break;
                    }
                }
                else if (this.currentDirection === MovingDirection.downRight) {
                    if (this.moveDown(MovingDirection.right)) {
                        break;
                    }
                }
            }
        }
    

    moveDown(newDirection) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDownTimer <= 0) {
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }

    drawEnemies(scene) {
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity);
            enemy.draw(scene);
        });
    }

    createEnemies(){
        this.enemyMap.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) => {
                if (enemyNumber > 0) {
                    this.enemyRows[rowIndex].push(new Enemy(enemyIndex * 50, rowIndex * 45, enemyNumber));
                }
            });
        });
    }  
    collideWith(invader) {
        return this.enemyRows.flat().some(enemy => enemy.collideWith(invader))
    } 
    collideWithBorder(canvas) {
        return this.enemyRows.flat().some(enemy => enemy.collideWithBorder(canvas))
    } 
}
