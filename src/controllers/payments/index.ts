import { Request, Response, Router } from 'express';

import { calculatePayments } from '@model/services/payments.service';
import { validateUuidPathVariable } from '@guards/index';

const routes: Router = Router({ mergeParams: true });

const START_DATE_TEST = /^\d{4}-\d{2}$/;

function validateStartDate(startDate: string) {
  return START_DATE_TEST.test(startDate);
}

//  get all
routes.get(
  '/',
  validateUuidPathVariable('companyId'),
  async (req: Request, res: Response) => {
    const { companyId } = req.params;
    const { startDate } = req.query;
    let desiredDate: Date = new Date();
    let currentDate;
    let calculatedPayments, splittedStartDate;

    if (typeof startDate !== 'undefined' && startDate !== null) {
      if (!validateStartDate(startDate as string)) {
        return res
          .status(400)
          .send({ errors: [{ msg: 'Invalid startDate format.' }] });
      }

      splittedStartDate = (startDate as string).split('-');
      desiredDate = new Date(
        Date.UTC(+splittedStartDate[0], +splittedStartDate[1] - 1),
      );
    } else {
      currentDate = new Date();
      desiredDate = new Date(
        Date.UTC(currentDate.getUTCFullYear(), currentDate.getMonth()),
      );
    }

    try {
      calculatedPayments = await calculatePayments(companyId, desiredDate);
    } catch (ex: any) {
      console.error(ex);
      return res.status(500).send({ errors: [{ msg: ex.toString() }] });
    }

    return res.json({ data: calculatedPayments });
  },
);

export default routes;
