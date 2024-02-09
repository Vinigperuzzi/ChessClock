const message = prompt("Informe a mensagem que deseja exibir: ");
const scrollingText = document.querySelector(".scrolling-text");
scrollingText.innerText = message;
let speed = prompt('Qual a velocidade que deseja passar o texto (5 a 15):');
if (speed < 5){
    speed = 5;
} else if (speed > 15){
    speed = 15;
}

function slideText() {
    const screenWidth = document.body.clientWidth;
    const textWidth = scrollingText.clientWidth;
    let currentPosition = screenWidth;

    function moveText() {
        currentPosition -= parseInt(speed, 10);

        scrollingText.style.left = currentPosition + 'px';

        if (currentPosition < -textWidth) {
            currentPosition = screenWidth;
        }
        requestAnimationFrame(moveText);
    }
    moveText();
}

slideText();