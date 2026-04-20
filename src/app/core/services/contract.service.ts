import { Injectable } from '@angular/core';
import { IContract, IInstallment } from '../../shared/models/contract.model';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private contracts: IContract[] = [];

  getContracts(): IContract[] {
    return this.contracts;
  }

  getContractById(id: string): IContract | undefined {
    return this.contracts.find((c) => c.id === id);
  }

  createContract(contract: Omit<IContract, 'id' | 'installments' | 'createdAt'>): IContract {
    const newContract: IContract = {
      ...contract,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      installments: this.generateInstallments(
        contract.targetValue,
        contract.monthsDuration,
        contract.startDate,
      ),
    };

    this.contracts.push(newContract);
    return newContract;
  }

  //   verificar a tipagem correta.
  private generateInstallments(targetValue: number, months: number, startDate: Date): any {
    const installmentValue = targetValue / months;

    return Array.from({ length: months }, (_, i) => {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);

      return {
        id: crypto.randomUUID(),
        contractId: '',
        number: i + 1,
        dueDate,
        value: installmentValue,
        paid: false,
      };
    });
  }
}
