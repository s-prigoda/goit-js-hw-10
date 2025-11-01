console.log('timer');

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;
let userDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDate = selectedDates[0];
    const now = new Date();

    if (chosenDate <= now) {
      iziToast.error({
        title: 'Помилка',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
      userDate = null;
    } else {
      userDate = chosenDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  input.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const diff = userDate - now;

    if (diff <= 0) {
      clearInterval(timerId);
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      input.disabled = false;
      return;
    }

    const timeLeft = convertMs(diff);
    updateTimerUI(timeLeft);
  }, 1000);
});

function updateTimerUI({
  days: daysLeft,
  hours: hoursLeft,
  minutes: minutesLeft,
  seconds: secondsLeft,
}) {
  daysEl.textContent = addZero(daysLeft);
  hoursEl.textContent = addZero(hoursLeft);
  minutesEl.textContent = addZero(minutesLeft);
  secondsEl.textContent = addZero(secondsLeft);
}

function addZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
