import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { PRODUCTION_ENV } from './consts';
import { initData } from '@model/index';

import companiesRoutes from '@controllers/companies';
import paymentsRoutes from '@controllers/payments';

// load proper env file
dotenv.config({
  path:
    process.env.NODE_ENV === PRODUCTION_ENV
      ? '.env'
      : `.env.${process.env.NODE_ENV?.toLowerCase()}`,
});

const PORT = process.env.APP_PORT || 3000;
const API_PREFIX = '/api/v1';

const app = express();

/**
 * Initial function for starting an application
 */
const init = async (app: Express) => {
  // helper function
  showRuntimeEnv();
  initData();

  // app
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // routes
  app.get('/test', (req: Request, res: Response) =>
    res.json({ hello: 'world' }),
  );

  app.use(`${API_PREFIX}/companies`, companiesRoutes);
  app.use(`${API_PREFIX}/companies/:companyId/payments`, paymentsRoutes);

  app.listen(PORT, () => {
    console.log(`App has started at port ${PORT}`);
  });
};

init(app);

function showRuntimeEnv() {
  console.log(`\n\n\n\n\

  ENV: ${process.env.NODE_ENV}

\n\n\n\n`);
}
