document.addEventListener("DOMContentLoaded", function() {
    const checkerBtn = document.querySelector("button"); 
    const adText = document.getElementById("ad");
    const answerText = document.getElementById("answer");
    const input = document.querySelector("textarea");

    checkerBtn.addEventListener('click', async function() {
        adText.style.display = "block";
        adText.innerText = "...";
        answerText.innerText = "...";
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            let response = await fetch(
                'https://api.isevenapi.xyz/api/iseven/' + input.value + '/',
                { signal: controller.signal }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
                let errorMessage;
                try {
                    errorMessage = await response.json();
                } catch {
                    errorMessage = await response.text();
                }
                answerText.innerText = errorMessage.error;
                return;
            }

            let isEven = await response.json();
            adText.innerText = isEven.ad;
            answerText.innerText = isEven.iseven ? "Is\nEven" : "Is\nOdd";

        } catch (error) { // Amikor az API errort ad ki, azt nem közli a klienssel, emiatt az üzeneteket itt kell közölnöm
            if (Number.isInteger(Number(input.value)) && input.value != "") {
                answerText.innerText = "Is\nOut of Range. Upgrade to isEven API Premium or Enterprise."
            } else {
                answerText.innerText = "Is\nwhat is this I don't even";
            }
        }
    });

})