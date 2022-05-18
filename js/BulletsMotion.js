import Bullet from "./Bullet.js"
export default class BulletsMotion {

    bullets = [];
    timeForNextShoot = 0;

    constructor(canvas, maxBullets, bulletColor, soundOn, score = null) {
        this.canvas = canvas;
        this.maxBullets = maxBullets;
        this.bulletColor = bulletColor;
        this.soundOn = soundOn;
        this.score = score;

        this.shootSound = new Audio("/assets/sounds/shoot.wav");
        this.shootSound.volume = 0.4;
    }

    draw(scene) {
        this.bullets = this.bullets.filter(bullet => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height);

        this.bullets.forEach((bullet) => bullet.draw(scene));
        if (this.timeForNextShoot > 0) {
            this.timeForNextShoot--;
        }
    }

    collideWith(invader) {
        const bulletHitInvader = this.bullets.findIndex(bullet => bullet.collideWith(invader));

        if (bulletHitInvader >= 0) {
            this.bullets.splice(bulletHitInvader, 1);
            if (this.score !== null) {
                this.score.scoreCollision();
            }
            return true;
        }
        return false;

    }

    shoot(x, y, velocity, timeForNextShoot = 0) {
        if (this.timeForNextShoot <= 0 && this.bullets.length < this.maxBullets) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            if (this.soundOn) {
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.timeForNextShoot = timeForNextShoot;
        }

    }
}