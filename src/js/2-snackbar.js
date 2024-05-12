import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formInput = document.querySelector('.form');
const usersNumberDelay = document.querySelector('input[type="number"]');
const radioButtons = document.querySelectorAll('input[type="radio"]');

function createPromise(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioButtons[0].checked && radioButtons[0].value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

formInput.addEventListener('submit', function (event) {
  event.preventDefault();
  const delay = parseInt(usersNumberDelay.value);

  createPromise(delay)
    .then(delay => {
      iziToast.show({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        backgroundColor: 'green',
        position: 'topRight',
        titleColor: 'black',
        titleSize: '16px',
        titleLineHeight: '1.5',
        messageColor: 'white',
        messageSize: '16px',
        messageLineHeight: '1.5',
      });
    })
    .catch(delay => {
      iziToast.show({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
        backgroundColor: 'red',
        position: 'topRight',
        titleColor: 'white',
        titleSize: '16px',
        titleLineHeight: '1.5',
        messageColor: 'white',
        messageSize: '16px',
        messageLineHeight: '1.5',
      });
    });
});
