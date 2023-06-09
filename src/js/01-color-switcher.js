const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
btnStop.setAttribute('disabled','');


btnStart.addEventListener('click', () => {
    changeColor.start()
});

btnStop.addEventListener('click', () => {
    changeColor.stop()
});


const changeColor = {
    bgColorInterval: null,

    start() {
        toggleButtonsDisabled();
        this.bgColorInterval = setInterval(() => {
            const color = getRandomHexColor();
            changeBackgroundColor(color);
            this.isActive = true;
        }, 1000);
    },
    
    stop() {
        clearInterval(this.bgColorInterval);
        toggleButtonsDisabled();
    }
};

function toggleButtonsDisabled() {
    btnStart.toggleAttribute('disabled');
    btnStop.toggleAttribute('disabled');
}

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
