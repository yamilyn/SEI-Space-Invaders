# Project - Space Invaders - Game Dev
First game development for the General Assembly Software Engineering Immersive course.

## Introduction
After searching for arcade games options to develop, I decided to go with Space Invaders, a retro game inspired in The War of the Worlds and still very popular. 

#### In action
![Space Invaders Game Dev](/big-idea/space-invaders-screenshot.png)

#### Win
![Space Invaders Screenshot Won](/big-idea/space-invaders-screenshot-won.png)

## Big idea
### Concept Wireframes
![Wireframe - Concept](/big-idea/Page-01-game-project-wireframe.jpg)
![Wireframe - Page 2 - Game over](/big-idea/Page-02-game-project-wireframe.jpg)

### Use Stories:

#### As a game player:
* I want to find a quick instruction for the game.
* I want to find a start button.
* I want to find a FAQ menu with frequently answered questions.
* I want to be able to play by using my keyboard.
* I want to find a share button to share with my friends.
* I want to see my earned points.
* I want to be able to level up to the game.


## Technologies Used
* HTML
* CSS
* Flexbox
* Bootstrap
* JavaScript
* jQuery

#### Dev tools
* Figma
* VSCode
* Google fonts

## Development
### Day 1
**Planning:** Firstly, I outlined the basic functions and features for the game according to the user stories, this included.
According to the wireframes presented, this features included: a start button that has later been changed, instructions for the player, a score board to show the points and level.
The type of game is 2D.

#### 1. The play area: 
* Made using the HTML tag ```<canvas>```.
* As a font, I used 'Press Start 2P' for the title.
* The graphics are from iStock standard license.

#### 2. Characters:
* One player as a defender.
* 4 types of invaders.
* Background: sky space.

#### 3. Winner decision:
* Player fires bullets and hit all enemies (**player wins**).
* Enemy fire a single bullet and hit the player (**enemy wins**).
* Enemy collide with player (**enemy wins**).
* Enemy cross the bottom border (**enemy wins**).

#### 4. Score:
For every bullet hit on a enemy, the player receives **50** points.

#### 5. Methodology approach:
I used this project to explore new concepts in game development using JavaScript. For this I have searched for examples, tutorials and also contacted experienced developers.

#### Initial coding:
The JavaScript project has been divided into 'classes' in order to prevent conflicted code and apply more organisation. There are 7 classes:

1. ```Player```: Functions of the player, size and 'keydown' and 'keyup' ```.addEventListener``` to move the player.
2. ```MovingDirection```: For the enemy moving down the screen.
3. ```Enemy```: For the enemy images, size and collision.
4. ```EnemyMotion```: Functions for the behavior of the enemy, fire bullets, move down and velocity.
5. ```Bullet```: Determine bullet for the player, size, quantity, velocity and collision with enemy.
6. ```BulletMotion```: Functions regarding to the player's bullet, shoot sound, collision detected with enemy for scoring.
7. ```Score```: Regarding the score for the player, to be given when the player bullet collide with the enemy.

### Day 2
1. Committed the code for the enemy moves.
2. Committed the code for the player moves.
3. Committed the code for the action scene (hits, bullets motion and sounds).
4. Integrate a button from Bootstrap to RESTART the game.
5. Integrated a message to show if player wins or lose.
6. Integrated the score points to show on HTML.

#### Enemy decision and map
I have used an array of arrays to draw an enemy map for the canvas. Every enemy has a number which shows on the screen according to the map, the enemy numbered 0 would show and empty space.

This code is in the class ***EnemyMotion.js*** and imported into the ***main.js***.
```
enemyMap = [
        [2,2,2,1,1,4,1,4,4,1],
        [1,3,1,1,4,1,2,3,1,1],
        [1,1,4,1,1,2,1,4,1,2],
        [4,1,2,1,3,1,2,4,3,1],
        [1,1,4,1,1,4,1,2,2,2],
        [2,1,3,1,4,1,3,3,1,1]
    ];
```

I used the code below to generate the number of the enemies in order to show on the game.
This code is in the ***Enemy.js*** class and imported into the class ***EnemyMotion.js***
```
this.image = new Image()
        this.image.src = `/game-folder/assets/images/enemy${imageNumber}.png`;
```

#### Bug detected and solution:
While implementing the start button, I detected that the ```<canvas>``` of the game became a white background.

``` 
// ------ Paused code ------ //
// let started = false;
// $("#start-game-btn").click(function() {
//     if (started == false) {
    
//         setInterval(game,1000/60);

//         started = true;
//     }
// }) 
```

#### Solution:
As a **solution** I decided to change the button for a **restart** instead, that means, when the user enter the page first time, it will start the game automatically. Once the player loses or wins, then the button will show for the user to **restart** the game by clicking it and reloading the page.

```
$("#start-game").show();

$('#start-game').click(function() {
    location.reload();
});
```
It was a DRY approach and easier to apply.

### Day 3
1. Tested the game.
2. Fixed bugs.
3. Added responsive layout.
4. Styled the game with color and background.

#### Bug detected
The layout was not responsive, the score board was coming in front of the game canvas.

## Favorite function

#### Collision detection {[mdn](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)}
This was quite challenging to align the 2D axis to identify the collision for **enemies, player, bullets and border**.

## Parked "nice to have" function
The initial plan was to have a level up function, however I decided to leave only a restart button for now.

## "Nice to have" future integrations
1. For each type of enemy apply a different score point.
2. Apply 'lives' for the player, so the player can lose after hit by three enemy's bullets.
3. Insert loops of enemies to show, so more enemies would appear automatically on top instead of finishing the game.
4. Apply more velocity for next levels.
5. More powerful different enemies, e.g.: some needs 3 shoots to die.

## Contact

Linkedin - [https://www.linkedin.com/in/yamilybenigni/](https://www.linkedin.com/in/yamilybenigni/)



