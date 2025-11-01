console.log('snackbar');
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then(time => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${time}ms`,
        position: 'center',
      });
    })
    .catch(time => {
      iziToast.error({
        message: `❌ Rejected promise in ${time}ms`,
        position: 'center',
      });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
