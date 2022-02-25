import axios from 'axios';

export const utilService = {
  getRandomInt,
  isDev,
  createFileFormData,
  uploadFile,
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

function createFileFormData(key, file) {
  var formData = new FormData();
  formData.append(key, file);
  return formData;
}

function uploadFile(url, file) {
  return axios.post(url, file, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
