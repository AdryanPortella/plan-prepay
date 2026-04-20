export interface IClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  cnpjf: string;
}

export interface IInstallment {
  id: string;
  contractId: string;
  number: number;
  dueDate: Date;
  value: number;
  paid: boolean;
  paidAt: Date;
}

export interface IContract {
  id: string;
  client: IClient;
  description: string;
  totalValue: number;
  targetValue: number;
  startDate: Date;
  monthsDuration: number;
  installments: IInstallment[];
  createdAt: Date;
}
