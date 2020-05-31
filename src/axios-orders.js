import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-project-9a0f3.firebaseio.com/',
});

export default instance;
