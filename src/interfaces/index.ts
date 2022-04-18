export interface ICompany {
  id?: string;
  name: string;
  employees?: Array<IEmployee>;
}

export interface IEmployee {
  id?: string;
  fullName: string;
  companyId?: string;
}

export interface IBasePaymentType {
  date: Date | string;
  value: number; // $$
}

export interface ISalary extends IBasePaymentType {}

export interface IBonus extends IBasePaymentType {}

export interface IPayment {
  calculationDate: Date;
  employee: IEmployee;
  salary: ISalary;
  bonus: IBonus;
}
