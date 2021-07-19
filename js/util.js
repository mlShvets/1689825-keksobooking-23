const CLOSE_KEYS = ['Escape', 'Esc'];

const isEscEvent = (evt) => evt.key === CLOSE_KEYS[0] || evt.key === CLOSE_KEYS[1];

const debounce = (callback, timeoutDelay) => {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscEvent, debounce };


