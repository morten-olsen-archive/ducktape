import express from 'express';
import Client from '../Client';

const create = (clients: {[name: string]: Client}) => {
  const app = express();

  app.use('/status', async (req, res) => {
    const clientInfo = await Promise.all(Object.keys(clients).map(async (name) => {
      const client = clients[name];
      let status: boolean | Error;
      try {
        status = await client.healthCheck();
      } catch (err) {
        status = err;
      }
      return {
        name,
        health: status === true,
        error: status instanceof Error ? status : undefined,
        endpoints: client.endpoints,
      }
    }));

    const response = {
      services: clientInfo,
    };

    res.json(response);
  });

  return app;
}

export default create;