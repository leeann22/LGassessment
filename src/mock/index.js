import { createServer } from 'miragejs';

import data from './data.json';

export function makeServer() {
  let server = createServer({
    routes() {
      this.namespace = 'api';
  
      this.get('/posts', () => {
        return data;
      });
    },
  });

  return server;
}

