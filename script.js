document.addEventListener("DOMContentLoaded", function() {
    const playBtn = document.querySelector("button");
    const moleTiles = document.querySelectorAll("img");
    playBtn.addEventListener("click", function() {
        playBtn.style.display = "none";
        Game(moleTiles);
        
    })
})

function Game(moleTiles) {
    time = 30;
    const timer = document.getElementById("timer");

    SelectTargetMole(moleTiles, 0);

    interval = setInterval(() => {
        timer.innerText = "Timer: "+ time + "s";
        if (time <= 0) {
            const gameOver = document.getElementById("gameover");
            clearInterval(interval);
            // GAME OVER
            moleTiles.forEach(img => {
                img.src = "Moel.gif";
                img.style.visibility = "visible";
                curMole.removeEventListener("click", img.whackHandler, { once: true });
            })
            gameOver.style.display = "block";
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
    }, 600)
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