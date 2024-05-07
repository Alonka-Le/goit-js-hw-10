import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputTimer = document.querySelector('input[type="text"]');
const startButton = document.querySelector('[data-start]');
let countdownInterval;

startButton.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: 'red',
        position: 'topRight',
        titleColor: 'white',
        titleSize: '16px',
        titleLineHeight: '1.5',
        messageColor: 'white',
        messageSize: '16px',
        messageLineHeight: '1.5',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(inputTimer, options);

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

function addLeadingZero({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = days
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-hours]').textContent = hours
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-minutes]').textContent = minutes
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = seconds
    .toString()
    .padStart(2, '0');

  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(countdownInterval);
    startButton.disabled = true;
    inputTimer.disabled = false;
  }
}

startButton.addEventListener('click', () => {
  const targetDate = new Date(inputTimer.value).getTime();
  countdownInterval = setInterval(() => {
    const currentTime = Date.now();
    const timeRemaining = Math.max(targetDate - currentTime, 0);
    addLeadingZero(convertMs(timeRemaining));
  }, 1000);
  startButton.disabled = true;
  inputTimer.disabled = true;
});
