import { Api } from './Api.js';

// rename to yandexCogortaApi
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'cfdee319-1eac-4a79-8e55-692d828c875e',
    'Content-Type': 'application/json',
  },
});

export { api };
