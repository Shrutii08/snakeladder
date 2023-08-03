const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-Score");
const controls = document.querySelectorAll(".controls i");

let gameover = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let snakeBody = [];
let velocityX = 0 , velocityY = 0;
let setIntervalId;
let score = 0;

//getting high score from local storage

let highScore = localStorage.getItem("high-Score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {

    //passing 0-30 value as food position 
    foodX = Math.floor(Math.random() * 30) +1;
    foodY = Math.floor(Math.random() * 30) +1;
}

const handleGameover = () => {
    //clearing timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = e => {

//change in velocity based on press key

    if(e.key === "ArrowUp" && velocityY != 1){
            velocityX = 0;
            velocityY = -1;

    }else if(e.key === "ArrowDown" && velocityY !=-1){
                velocityX = 0;
                velocityY = 1;
    }
     else if(e.key === "ArrowLeft" && velocityX !=1){
            velocityX = -1;
            velocityY = 0;
    }
    else if(e.key === "ArrowRight" && velocityX !=-1){
        velocityX = 1;
        velocityY = 0;
    } 
}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
            if(gameover) return handleGameover();
            let html = `<div class = "food" style="grid-area: ${foodY} / ${foodX}"></div>`;

            //checking if snake hit the food
            if(snakeX === foodX && snakeY === foodY){
            updateFoodPosition();
            snakeBody.push([foodY , foodX]);
            score++;
            highScore = score >= highScore ? score : highScore;
            localStorage.setItem("high-score", highScore);
            scoreElement.innerText = `Score: ${score}`;
            highScoreElement.innerText = `High Score: ${highScore}`;
    }
    // //updating snake's head position based on current velocity

    snakeX += velocityX;
    snakeY +=velocityY;

    for(let i = snakeBody.length -1; i > 0; i--){
                 snakeBody[i] = snakeBody[i-1];
             }
             snakeBody[0] = [snakeX, snakeY];

// checking if snakes head is out of wall if its so setting game over to true

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        return gameover= true;
    }

    for(let i=0; i< snakeBody.length; i++){

        //adding div for ach part of snake's body

        html += `<div class = "head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        //checking if snake head hit the body,if so get gameover to true
        if(i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] ===  snakeBody[i][0]){
            gameover = true;

        }
    }
    
    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame , 100);
document.addEventListener("keyup", changeDirection);





// const playBoard = document.querySelector(".play-board");
// const scoreElement = document.querySelector(".score");
// const highScoreElement = document.querySelector(".high-Score");

// let gameover = false;
// let foodX, foodY;
// let snakeX = 5, snakeY = 10;
// let snakeBody = [];
// let velocityX = 0, velocityY = 0;
// let setIntervalId;
// let score = 0;

// //getting high score from local storage

// let highScore = localStorage.getItem("high-score") || 0;
// highScoreElement.innerText = `High Score: ${highScore}`;

// const updateFoodPosition = () => {
//     // passing 1-30 value as food position (instead of 0-30)
//     foodX = Math.floor(Math.random() * 30) + 1;
//     foodY = Math.floor(Math.random() * 30) + 1;
// };

// const handleGameover = () => {
//     // clearing timer without reloading the page
//     clearInterval(setIntervalId);
//     alert("Game Over! Press OK to replay...");
//     // After alert, reset the game
//     resetGame();
// };

// const resetGame = () => {
//     gameover = false;
//     snakeX = 5;
//     snakeY = 10;
//     snakeBody = [];
//     velocityX = 0;
//     velocityY = 0;
//     score = 0;
//     updateFoodPosition();
//     setIntervalId = setInterval(initGame, 100);
//     scoreElement.innerText = `Score: ${score}`;
// };

// const changeDirection = (e) => {
//     // change in velocity based on pressed key
//     if (e.key === "ArrowUp" && velocityY !== 1) {
//         velocityX = 0;
//         velocityY = -1;
//     } else if (e.key === "ArrowDown" && velocityY !== -1) {
//         velocityX = 0;
//         velocityY = 1;
//     } else if (e.key === "ArrowLeft" && velocityX !== 1) {
//         velocityX = -1;
//         velocityY = 0;
//     } else if (e.key === "ArrowRight" && velocityX !== -1) {
//         velocityX = 1;
//         velocityY = 0;
//     }
// };

// const initGame = () => {
//     if (gameover) return handleGameover();
//     let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

//     // checking if snake hit the food
//     if (snakeX === foodX && snakeY === foodY) {
//         updateFoodPosition();
//         snakeBody.push([foodX, foodY]);
//         score++;
//         highScore = score >= highScore ? score : highScore;
//         localStorage.setItem("high-score", highScore);
//         scoreElement.innerText = `Score: ${score}`;
//         highScoreElement.innerText = `High Score: ${highScore}`;
//     }

//     // snakeBody[0] = [snakeX, snakeY];
//     // // setting the first element of the snake body to the current position

//     // updating snake's head position based on current velocity
//     snakeX += velocityX;
//     snakeY += velocityY;

//     let html = "";

//     for (let i = 0; i < snakeBody.length; i++) {
//         // adding div for each part of the snake's body
//         html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

//         // checking if snake head hit the body, if so set gameover to true
//         if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
//             gameover = true;
//         }
//     }

//     // add the head of the snake to the snakeBody array
//     snakeBody.unshift([snakeX, snakeY]);

//     // remove the tail of the snake if it's not eating food
//     if (!(snakeX === foodX && snakeY === foodY)) {
//         snakeBody.pop();
//     }

//     playBoard.innerHTML = htmlMarkup + html;
// };

// updateFoodPosition();
// setIntervalId = setInterval(initGame, 100);
// document.addEventListener("keyup", changeDirection);
