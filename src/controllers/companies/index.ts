import { Request, Response, Router } from 'express';

import { findAll, findOne } from '@model/services/company.service';
import { validateUuidPathVariable } from '@guards/index';

const routes: Router = Router({ mergeParams: true });

//  get all
routes.get('/', async (req: Request, res: Response) => {
  const data = await findAll();

  return res.json({ data });
});

routes.get(
  '/:companyId',
  validateUuidPathVariable('companyId'),
  async (req: Request, res: Response) => {
    const data = await findOne(req.params.companyId);

    if (typeof data === 'undefined' || data === null) {
      return res.status(404).send();
    }

    return res.json({ data });
  },
);

export default routes;
