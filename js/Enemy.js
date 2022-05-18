export default class Enemy {

    constructor(x,y,imageNumber) {
        this.x = x;
        this.y = y;
        this.width = 44;
        this.height = 44;  

        this.image = new Image()
        this.image.src = `./assets/images/enemy${imageNumber}.png`;
    }

    draw(scene) {
        scene.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(xVelocity, yVelocity) {
        this.x += xVelocity;
        this.y += yVelocity;
    }

    collideWith(invader) {
        if (this.x + this.width > invader.x &&
            this.x < invader.x + invader.width &&
            this.y + this.height > invader.y &&
            this.y < invader.y + invader.height) 
        {
            return true;
        }
        else {
            return false;
        }
    }

    collideWithBorder(canvas) {
        if ((this.y + this.height) > canvas.height) {
            return true;
        }
        return false;
    }
}