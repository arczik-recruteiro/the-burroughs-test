import { prepareData as prepareCompaniesData } from '@model/services/company.service';
import { prepareData as prepareEmployeesData } from '@model/services/employee.servive';

export function initData() {
  prepareCompaniesData();
  prepareEmployeesData();
}
