let visibleCards = [];
let clickCount = 0;

document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll("div");
    generateCards(cards);
    KeepTrack(cards);

})

function generateCards(cards) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    for (let i = 0; i < cards.length / 2; i+=0.5) {
        let randIndex = getRandomInt(0, cards.length-1);
        while (cards[randIndex].firstElementChild.innerText != "") {
            randIndex++;
            if (randIndex == cards.length) {
                randIndex = 0;
            }
        }
        cards[randIndex].firstElementChild.innerText = alphabet[Math.floor(i)];   
    }


    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function() {
            clickCount++;
            if (cards[i].firstElementChild.style.display == "")
            {
                cards[i].firstElementChild.style.display = "block";
                cards[i].style.backgroundColor = "rgb(194, 121, 78)"

                visibleCards.push({
                    index: i,
                    value: cards[i].firstElementChild.innerText
                });
    
                if (visibleCards.length >= 2) {
                    if (visibleCards[0].value != visibleCards[1].value) {
                        setTimeout(() => {
                            cards[visibleCards[1].index].firstElementChild.style.display = "";
                            cards[visibleCards[0].index].firstElementChild.style.display = "";
                            cards[visibleCards[1].index].style.backgroundColor = "rgb(168, 93, 50)";
                            cards[visibleCards[0].index].style.backgroundColor = "rgb(168, 93, 50)";
                            visibleCards.shift();
                            visibleCards.shift();                       
                        }, 500);
                    } else {
                        cards[visibleCards[1].index].style.backgroundColor = "green";
                            cards[visibleCards[0].index].style.backgroundColor = "green";
                        visibleCards = [];

                    }
                }
            }
        })
    }
}

function KeepTrack(cards) {
    const clicks = document.getElementById("clicks");
    const time = document.getElementById("time");
    let secondsPassed = 0;

    const clickInterval = setInterval(() => {
        clicks.innerText = "Clicks: " + clickCount;        
    }, 10);
    
    const timeInterval = setInterval(() => {
        secondsPassed++;
        time.innerText = "Time: " + secondsPassed + "s";
    }, 1000);

    const winCheckInterval = setInterval(() => {
        const win = Array.from(cards).every(card => {
            return card.style.backgroundColor == "green";
        });

        if (win) {
            clearInterval(winCheckInterval);
            clearInterval(clickInterval);
            clearInterval(timeInterval);
            const winText = document.getElementById("win");
            winText.style.display = "block";
            const restart = document.querySelector("img");
            restart.style.display = "block";
            restart.addEventListener("click", function() {
                winText.style.display = "";
                restart.style.display = "";
                clicks.innerText = "Clicks: 0";
                time.innerText = "Time: 0s";
                cards.forEach(card => {
                    card.style.backgroundColor = "rgb(168, 93, 50)";
                    card.firstElementChild.innerText = "";
                    card.firstElementChild.style.display = "";
                    const clearedCard = card.cloneNode(true);
                    card.parentNode.replaceChild(clearedCard, card);
                });
                clickCount = 0;
                cards = document.querySelectorAll("div");
                generateCards(cards);
                KeepTrack(cards);
            })
        }
    }, 10);

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}