import axios from 'axios';

export const amocrmApiUrl = process.env.amocrmApiUrl;

export const createAmocrmInstance = (baseURL: string, token: string) =>
  axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
