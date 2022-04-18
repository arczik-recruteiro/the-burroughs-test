import { Request, Response, Router, RequestHandler } from 'express';

import { calculatePayments } from '@model/services/payments.service';
import { DATE } from '@faker-js/faker/definitions/date';

const routes: Router = Router({ mergeParams: true });

//  get all
routes.get('/', async (req: Request, res: Response) => {
  const { companyId } = req.params;
  // const calculationDate = new Date(new Date().toUTCString());
  const d = new Date();
  const calculatedPayments = await calculatePayments(
    companyId,
    new Date(Date.UTC(d.getUTCFullYear(), d.getMonth())),
  );

  return res.json({ data: calculatedPayments });
});

export default routes;
