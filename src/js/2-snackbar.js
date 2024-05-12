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
      });
    })
    .catch(delay => {
      iziToast.show({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
      });
    });
});
