import { isEscEvent } from './util.js';


const closeMessage = (message) => {
  message.remove();
};


const showMessageSendSuccess = () => {
  const body = document.querySelector('body');
  const successMessage = document.querySelector('#success').content.querySelector('.success');
  const messageElement = successMessage.cloneNode(true);
  body.append(messageElement);

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      closeMessage(messageElement);
    }
  });

  document.addEventListener('click', () => {
    closeMessage(messageElement);
  });
};


const showMessageSendError = () => {
  const body = document.querySelector('body');
  const errorMessage = document.querySelector('#error').content.querySelector('.error');
  const messageElement = errorMessage.cloneNode(true);
  const errorButton = messageElement.querySelector('.error__button');
  body.append(messageElement);

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      closeMessage(messageElement);
    }
  });

  document.addEventListener('click', () => {
    closeMessage(messageElement);
  });

  errorButton.addEventListener('click', () => {
    closeMessage(messageElement);
  });
};


const showMessageGetError = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
};

export { showMessageGetError, showMessageSendSuccess, showMessageSendError };

