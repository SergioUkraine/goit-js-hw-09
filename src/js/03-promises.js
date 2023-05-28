import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({ useIcon: false,});

const form = document.querySelector('.form');

let params = {
  delay: null,
  step: null,
  amount: null,
};

form.addEventListener('submit', onSubmitForm);
form.addEventListener('change', onChangeForm);

function onSubmitForm(e) {
  e.preventDefault();
  makeArrayPromises(params);
}

function onChangeForm(e) {
  const name = e.target.name;
  const value = Number.parseInt(e.target.value);
  params[name] = value;
}

function makeArrayPromises({ delay, step, amount }) {
  let count = 1;
  while (count <= amount)
  {    
    createPromise(count, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
    count++;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}