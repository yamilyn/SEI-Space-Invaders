export default class Score {
    constructor (hitValue, scoreElementId) {
        this.hitValue = hitValue;
        this.scoreElementId = scoreElementId;
        this.value = 0;
    }

    scoreCollision() {
        this.value = this.value + this.hitValue;
        this.displayScore();
    }

    displayScore() {
        let scoreElement = document.getElementById(this.scoreElementId);
        scoreElement.innerHTML = this.value;
    }

    reset() {
        this.value = 0;
    }
}