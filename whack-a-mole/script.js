document.addEventListener("DOMContentLoaded", function() {
    const hammer = document.getElementById("hammer");
    const moleTiles = document.querySelectorAll(".mole");
    const gameOverText = document.getElementById("gameover");
    hammer.addEventListener("click", function() {
        gameOverText.style.display = "none";
        moleTiles.forEach(mole => {
            mole.style.visibility = "hidden";
        });
        hammer.style.display = "none";
        Game(moleTiles);
        
    })
})

function Game(moleTiles) {
    time = 30;
    const timer = document.getElementById("timer");
    const pointCounter = document.getElementById("score");
    pointCounter.innerText = "Points: 0";

    SelectTargetMole(moleTiles, 0);
    timer.innerText = "Timer: " + time + "s";
    interval = setInterval(() => {
        timer.innerText = "Timer: "+ time + "s";
        if (time <= 0) {
            const gameOver = document.getElementById("gameover");
            const hammer = document.getElementById("hammer");
            clearInterval(interval);
            // GAME OVER
            moleTiles.forEach(img => {
                img.style.visibility = "hidden";
                img.removeEventListener("click", img.whackHandler, { once: true });
            })
            gameOver.style.display = "block";
            hammer.style.display = "block";
            
        }
        time--;
    }, 1000);
}

function SelectTargetMole(moleTiles, points) {
    curMoleIndex = getRandomInt(0, moleTiles.length - 1);
    curMole = moleTiles[curMoleIndex];
    curMole.src = "Rise_attack.gif";
    curMole.style.visibility = "visible";
    setTimeout(function() {
        curMole.src = "Moel.gif";
    }, 400)
    const whackHandler = Whack.bind(null, moleTiles, curMole, points);
    curMole.whackHandler = whackHandler;
    curMole.addEventListener("click", whackHandler, { once: true });
}


function Whack(moleTiles, curMole, points) {
    score = document.getElementById("score");
    curMole.style.visibility = "hidden";
    curMole.src = "";
    points++;
    score.innerHTML = "Score: " + points;
    SelectTargetMole(moleTiles, points);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}