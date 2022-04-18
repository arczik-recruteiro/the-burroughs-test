import { Request, Response, Router } from 'express';

import { calculatePayments } from '@model/services/payments.service';
import { validateUuidPathVariable } from '@guards/index';

const routes: Router = Router({ mergeParams: true });

//  get all
routes.get(
  '/',
  validateUuidPathVariable('companyId'),
  async (req: Request, res: Response) => {
    const { companyId } = req.params;
    const d = new Date();
    let calculatedPayments;

    try {
      calculatedPayments = await calculatePayments(
        companyId,
        new Date(Date.UTC(d.getUTCFullYear(), d.getMonth())),
      );
    } catch (ex: any) {
      console.error(ex);
      return res.status(500).send({ errors: [{ msg: ex.toString() }] });
    }

    return res.json({ data: calculatedPayments });
  },
);

export default routes;
