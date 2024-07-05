let inputDir = {x: 0, y: 0};
const moveSound=new Audio("movement.mp3");
const foodSound=new Audio("food.mp3");
const gameoverSound=new Audio("gameover.mp3");
const music=new Audio("music.mp3");
let speed=9;
let lastPaintTime=0;
let score=0;
let hiscoreval;



let snakeArr = [
    {x: 9, y: 8}
]

let food = {x: 13, y: 15};


function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed)
        {
            return;
        }

        lastPaintTime=ctime;
        gameEngine();
    
}

function isCollide(snake){
    
      for(let i=1;i<snakeArr.length;i++)
        {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y)
                {
                    return true;
                }
        }

      if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
         return true;
}

function gameEngine(){

    //updating snake array and food

    if(isCollide(snakeArr)){
        gameoverSound.play();
        music.pause();
        inputDir = {x: 0, y: 0};
        alert("Game over. press any key to play again!");
        music.play();
        score=0;
        
        
    }

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score+=1;
        if(score>hiscoreval)
            {   hiscoreval = score;
                localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "HighScore: " + hiscoreval;

            }
        
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()) , y: Math.round(a + (b-a)* Math.random())}
    }


    for(let i=snakeArr.length - 2;i>=0;i--)
        {
            const element = snakeArr[i];
            snakeArr[i+1]=  {...snakeArr[i]};
        }

        snakeArr[0].x += inputDir.x;
        snakeArr[0].y +=inputDir.y;
    //diaplay the snake

    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index==0)
            {
                snakeElement.classList.add('head');
            }

        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    })

    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



// Ensure you are selecting the correct element

let hiscoreBox = document.getElementById("hiscoreBox");

if (hiscoreBox) {
    let hiscore = localStorage.getItem("hiscore");
    let hiscoreval;

    if (hiscore === null) {
        hiscoreval = 0;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
    } else {
        hiscoreval = JSON.parse(hiscore);
        hiscoreBox.innerHTML = "HighScore: " + hiscore; 
    }

  
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x: 0, y: 1};
    music.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log('ArrowUp');
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            console.log('ArrowDown');
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        
        case "ArrowLeft":
                console.log('ArrowLeft');
                inputDir.x= -1;
                inputDir.y= 0;
                break;

        case "ArrowRight":
                console.log('ArrowRight');
                inputDir.x= 1;
                inputDir.y= 0;
                break;

        default:
              break;
    }
})