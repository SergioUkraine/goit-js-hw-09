import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

setDisableBtnStart();
let chosenDate = null;
let countDownInterval = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (countDown.isActive)
        {
            countDown.stop();
        }

        if (selectedDates[0] < new Date) {
            setDisableBtnStart();
            countDown.failureMessage();
            return;
        }
        removeDisableBtnStart();
        chosenDate = selectedDates[0];
    },
};

flatpickr(refs.inputDate, options);

const countDown = {
    isActive: false,
    start() {
        if (this.isActive) { return; }
        setDisableBtnStart();
        this.isActive = true;
        countDownInterval = setInterval(() => {
            let deltaTime = chosenDate - new Date;
            let convertedDeltaTime = convertMs(deltaTime);
            if (deltaTime < 0){
                this.finish();
                return;
            };
            updateClockTime(convertedDeltaTime);
        }, 1000);
    },
    stop() {
        clearInterval(countDownInterval);
        updateClockTime(convertMs(0));
        this.isActive = false;
    },
    finish() {
        clearInterval(countDownInterval);
        updateClockTime(convertMs(0));
        this.isActive = false;
        Report.success('Time is over!','','OK');
    },
    failureMessage() {
        Notify.failure('Please choose a date in the future');
    },
}

refs.btnStart.addEventListener('click', () => {
    countDown.start();
});


function setDisableBtnStart() {
    refs.btnStart.setAttribute('disabled', '');
}

function removeDisableBtnStart() {
    refs.btnStart.removeAttribute('disabled');
}

 
function updateClockTime({days, hours, minutes, seconds }) {
    refs.days.textContent = days.toString().padStart(2, "0");
    refs.hours.textContent = hours.toString().padStart(2, "0");
    refs.minutes.textContent = minutes.toString().padStart(2, "0");
    refs.seconds.textContent = seconds.toString().padStart(2, "0");
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}



