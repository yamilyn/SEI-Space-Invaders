export default class Player {

    rightArrow = false;
    leftArrow = false;
    shootBar = false;

    constructor (canvas, velocity, bulletMotion) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletMotion = bulletMotion;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 75;
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = "./assets/images/player.png";

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    draw (scene) {
        if (this.shootBar) {
            this.bulletMotion.shoot(this.x + this.width/2, this.y, 4, 10);
        }

        this.move();
        this.stopAtLimit();
        scene.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    stopAtLimit() {

//----- moves left and right
        if (this.x < 0) {
        this.x = 0;
        }

        if (this.x > this.canvas.width - this.width) {
            this.x = this.canvas.width - this.width;
        }
    }

    move() {
        if (this.rightArrow) {
            this.x += this.velocity;
        }
        else if (this.leftArrow) {
            this.x += -this.velocity;
        }
    }

    keydown = event => {
        if (event.code == "ArrowRight") {
            this.rightArrow = true;
        }

        if (event.code == "ArrowLeft") {
            this.leftArrow = true;
        }

        if (event.code == "Space") {
            this.shootBar = true;
        }
    };

    keyup = event => {
        if (event.code == "ArrowRight") {
            this.rightArrow = false;
        }

        if (event.code == "ArrowLeft") {
            this.leftArrow = false;
        }

        if (event.code == "Space") {
            this.shootBar = false;
        }
    };

}