import { v4 as uuid } from 'uuid';
import faker from '@faker-js/faker';

import { ICompany, IEmployee } from '@interfaces/index';
import * as CompanyService from './company.service';

let mockData: Array<IEmployee> = [];

export function findAll(
  {
    companyId,
  }: {
    companyId: string | null | undefined;
  } = { companyId: null },
): Promise<Array<IEmployee>> {
  return Promise.resolve(
    typeof companyId === 'undefined' || companyId === null
      ? mockData
      : mockData.filter((c: IEmployee) => c.companyId === companyId),
  );
}

export function findOne(id: string): Promise<IEmployee | undefined | null> {
  return Promise.resolve(mockData.find((i: IEmployee) => i.id === id));
}

export async function prepareData() {
  const companies: Array<ICompany> = await CompanyService.findAll();

  Array.prototype.push.apply(mockData, [
    {
      // id: uuid(),
      id: '53a26db8-f53e-4cc3-8905-931ccfe17845',
      fullName: faker.name.findName(),
      companyId: companies[0]?.id,
    },
    {
      // id: uuid(),
      id: '78a7ccae-52bd-4012-8592-7c0830cc0ed0',
      fullName: faker.name.findName(),
      companyId: companies[0]?.id,
    },
    {
      // id: uuid(),
      id: '7707a49c-9b3a-434d-afb5-d231286508ce',
      fullName: faker.name.findName(),
      companyId: companies[1]?.id,
    },
    {
      // id: uuid(),
      id: '7a965d47-44b4-4e27-bf45-7f6340248174',
      fullName: faker.name.findName(),
      companyId: companies[1]?.id,
    },
    {
      // id: uuid(),
      id: 'd3dc60b5-45ab-4146-baa2-b10d7d718f86',
      fullName: faker.name.findName(),
      companyId: companies[1]?.id,
    },
  ]);
}
