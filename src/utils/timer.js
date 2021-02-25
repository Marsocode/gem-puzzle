export default function Timer(callback, delay) {
  let timerId;
  const remaining = delay;

  this.pause = () => {
    window.clearTimeout(timerId);
  };

  this.resume = () => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(callback, remaining);
  };

  this.resume();
}