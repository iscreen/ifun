export const environment = {
  production: true,
  api: {
    base: '/api',
    version: 'v1',
    versions: {
      v1: 'v1',
      v2: 'v2'
    }
  },
  auth: {
    tokenName: 'ifundToken',
    headerName: 'Authorization'
  },
  httpTimeout: 3000,
};
