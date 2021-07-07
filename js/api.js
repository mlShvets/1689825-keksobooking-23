import { clearForm } from './form.js';
import { showMessageGetError } from './messages.js';

const GET_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((ads) => {
      onSuccess(ads);
    })
    .catch((error) => {
      showMessageGetError(`При загрузке данных произошла ошибка: "${error}"`);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        clearForm();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    })
    .catch(() => {
      onFail();
    });
};


export { getData, sendData };
