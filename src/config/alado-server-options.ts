import { AladoServerOptions } from 'alado';

export const aladoServerOptions: AladoServerOptions = {
  port: 3000,
  cors: {
    enable: true,
    allowedOrigin: '*',
    allowedHeaders: ['Authorization'],
    exposeHeaders: ['x-total-count'],
  },
  openApiDoc: {
    enable: true,
    route: '/',
    info: {
      title: 'Alado Example API',
      description: 'Simple API that shows how to deal with Alado.js',
      version: '1.0.0',
    },
  },
};
