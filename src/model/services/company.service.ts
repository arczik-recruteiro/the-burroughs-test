import { v4 as uuid } from 'uuid';
import faker from '@faker-js/faker';

import { ICompany } from '@interfaces/index';

let mockData: Array<ICompany> = [];

export function findAll(): Promise<Array<ICompany>> {
  return Promise.resolve(mockData);
}

export function findOne(id: string): Promise<ICompany | undefined | null> {
  return Promise.resolve(mockData.find((i: ICompany) => i.id === id));
}

export function prepareData() {
  mockData = [
    {
      // id: uuid(),
      // fixed value 'coz it's easier to develop
      id: 'b165feef-04be-4d97-9f13-2aa2f336d800',
      name: faker.company.companyName(),
    },
    {
      // id: uuid(),
      id: '183f9748-11e3-4415-9a75-0ecd3379fea1',
      name: faker.company.companyName(),
    },
  ];
}
