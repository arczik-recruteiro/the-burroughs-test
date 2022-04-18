import { Request, Response, Router, RequestHandler } from 'express';

import { findAll, findOne } from '@model/services/company.service';

const routes: Router = Router({ mergeParams: true });

//  get all
routes.get('/', async (req: Request, res: Response) => {
  const data = await findAll();

  console.log('test');

  return res.json({ data });
});

routes.get('/:companyId', async (req: Request, res: Response) => {
  const data = await findOne(req.params.companyId);

  console.log('test', req.params.companyId, data);

  if (typeof data === 'undefined' || data === null) {
    return res.status(404).send();
  }

  return res.json({ data });
});

export default routes;
