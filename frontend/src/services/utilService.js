export const utilService = {
  getRandomInt,
  isDev
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
  //The maximum is exclusive and the minimum is inclusive
}

function isDev() {
  return process.env.NODE_ENV === 'development';
}
