import faker from '@faker-js/faker';

import { IEmployee, IPayment } from '@interfaces/index';
import * as CompanyService from './company.service';
import * as EmployeeService from './employee.servive';

export function getLastDayOfheMonth(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));
}

export function formatOutputDate(date: Date): string {
  return `${date.getUTCFullYear()}-${
    date.getUTCMonth() + 1
  }-${date.getUTCDate()}`;
}

export function findSalaryDate(inputDate: Date): Date {
  const desiredDate: Date = getLastDayOfheMonth(inputDate);

  switch (desiredDate.getUTCDay()) {
    case 0: // Sunday
      desiredDate.setUTCDate(desiredDate.getUTCDate() - 2);
      break;
    case 6: // Saturday
      desiredDate.setUTCDate(desiredDate.getUTCDate() - 1);
      break;
    default: // no op
      break;
  }

  return desiredDate;
}

export function findBonusDate(inputDate: Date): Date {
  const desiredDate: Date = new Date(
    Date.UTC(inputDate.getUTCFullYear(), inputDate.getUTCMonth() + 1, 15),
  );

  switch (desiredDate.getUTCDay()) {
    case 0: // Sunday
      desiredDate.setUTCDate(desiredDate.getUTCDate() + 3);
      break;
    case 6: // Saturday
      desiredDate.setUTCDate(desiredDate.getUTCDate() + 4);
      break;
    default:
      break;
  }

  return desiredDate;
}

export function calculatePaymentForEmployee(
  employee: IEmployee,
  startDate: Date,
  monthsRange: number = 12,
): Array<IPayment> {
  const result: Array<IPayment> = [];
  let currentDate: Date = new Date(startDate),
    i: number;

  for (i = 0; i < monthsRange; ++i) {
    i !== 0 && currentDate.setMonth(currentDate.getUTCMonth() + 1);

    result.push({
      calculationDate: currentDate,
      salary: {
        date: formatOutputDate(findSalaryDate(currentDate)),
        value: faker.datatype.float({ min: 10, max: 100 }),
      },
      bonus: {
        date: formatOutputDate(findBonusDate(currentDate)),
        value: faker.datatype.float({ min: 0, max: 50 }),
      },
      employee,
    });
  }

  return result;
}

export async function calculatePayments(
  companyId: string,
  startDate: Date,
): Promise<{ [key: string]: Array<IPayment> }> {
  let employees: Array<IEmployee>;
  let result: { [key: string]: Array<IPayment> } = {};
  const company = await CompanyService.findOne(companyId);

  if (typeof company === 'undefined' || company === null) {
    throw 'Company does not exist.';
  }

  employees = await EmployeeService.findAll({ companyId });

  result = employees.reduce<{ [key: string]: Array<IPayment> }>(
    (acc: { [key: string]: Array<IPayment> }, employee: IEmployee) => {
      acc[`${employee!.id}`] = calculatePaymentForEmployee(employee, startDate);

      return acc;
    },
    result,
  );

  return result;
}
