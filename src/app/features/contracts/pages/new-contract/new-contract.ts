import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ContractService } from '../../../../core/services/contract.service';

@Component({
  selector: 'app-new-contract',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzInputNumberModule,
    NzDatePickerModule,
  ],
  templateUrl: './new-contract.html',
  styleUrl: './new-contract.scss',
})
export class NewContract {
  private contractService = inject(ContractService);

  loading: boolean = false;

  form = new FormGroup({
    clientName: new FormControl('', Validators.required),
    clientEmail: new FormControl('', [Validators.required, Validators.email]),
    clientPhone: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    totalValue: new FormControl<number | null>(null, Validators.required),
    targetValue: new FormControl<number | null>(null, Validators.required),
    startDate: new FormControl<Date | null>(null, Validators.required),
    monthsDuration: new FormControl<number | null>(null, Validators.required),
  });

  async save() {
    try {
      this.loading = true;
      if (this.form.invalid) {
        return;
      }

      this.contractService.createContract({
        client: {
          id: crypto.randomUUID(),
          cnpjf: '',
          name: this.form.value.clientName!,
          email: this.form.value.clientEmail!,
          phone: this.form.value.clientPhone!,
        },
        description: this.form.value.description!,
        totalValue: this.form.value.totalValue!,
        targetValue: this.form.value.targetValue!,
        startDate: this.form.value.startDate!,
        monthsDuration: this.form.value.monthsDuration!,
      });
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
