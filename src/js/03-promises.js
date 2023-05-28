import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({ useIcon: false,});

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  btnSubmit: document.querySelector('[type="submit"]'),
};

let params = {
  delay: null,
  step: null,
  amount: null,
};

function init() {
  refs.delay.value = 1000;
  refs.step.value = 500;
  refs.amount.value = 5;

  params.delay = refs.delay.value;
  params.step = refs.step.value;
  params.amount = refs.amount.value;

  console.log(params);
}

init();


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


refs.btnSubmit.addEventListener('click', onClickBtnSubmit);
refs.form.addEventListener('change', onChangeForm);


function onClickBtnSubmit(e) {
  e.preventDefault();
  makeArrayPromises(params);
}

function onChangeForm(e) {
  const name = e.target.name;
  const value = e.target.value;
  params[name] = value;
  console.log(params);
}

function makeArrayPromises({delay, step, amount}) {
  let count = 1;

  while (count <= amount)
  {    
    console.log(`delay = ${delay}`);
    createPromise(count, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay = +delay + +step;
    count++;
  }
}