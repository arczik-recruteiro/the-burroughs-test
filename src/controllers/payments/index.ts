import { Request, Response, Router } from 'express';
const { Parser } = require('json2csv');

import { calculatePayments } from '@model/services/payments.service';
import { validateUuidPathVariable } from '@guards/index';
import { IPayment } from '@interfaces/index';

const routes: Router = Router({ mergeParams: true });

const START_DATE_TEST = /^\d{4}-\d{2}$/;

function validateStartDate(startDate: string) {
  return START_DATE_TEST.test(startDate);
}

function transformData2CSV(data: { [key: string]: IPayment[] }) {
  const desiredData: IPayment[] = [];
  const fields = [
    'employee.id',
    'employee.fullName',
    'calculationDate',
    'salary.date',
    'salary.value',
    'bonus.date',
    'bonus.value',
  ];
  const json2csvParser = new Parser({ fields });

  for (const k in data) {
    Array.prototype.push.apply(desiredData, data[k]);
  }

  return json2csvParser.parse(desiredData);
}

//  get all
routes.get(
  '/',
  validateUuidPathVariable('companyId'),
  async (req: Request, res: Response) => {
    const { companyId } = req.params;
    const { startDate, asCsv } = req.query;
    let desiredDate: Date = new Date();
    let currentDate;
    let calculatedPayments, splittedStartDate, transformedData;

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

      if ('true' === asCsv) {
        transformedData = transformData2CSV(calculatedPayments);

        res.attachment('data.csv');
        return res.status(200).send(transformedData);
      } else {
        return res.json({ data: calculatedPayments });
      }
    } catch (ex: any) {
      console.error(ex);
      return res.status(500).send({ errors: [{ msg: ex.toString() }] });
    }
  },
);

export default routes;
