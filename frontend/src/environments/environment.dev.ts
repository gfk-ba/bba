import 'zone.js/dist/zone-error';

export const environment = {
  production: false,
  hmr: true,
  apiUrl: 'http://localhost:3001',
  documentPollingTimer: 20000,
  ignoreHttpErrors: [0, 401],
};

export type Environment = typeof environment;
