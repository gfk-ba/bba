export const environment = {
  production: true,
  hmr: false,
  apiUrl: '',
  documentPollingTimer: 60000,
  ignoreHttpErrors: [0, 401],
};

export type Environment = typeof environment;
