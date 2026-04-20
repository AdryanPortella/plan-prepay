import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'contracts',
    pathMatch: 'full',
  },
  {
    path: 'contracts',
    loadComponent: () =>
      import('./features/contracts/pages/new-contract/new-contract').then((m) => m.NewContract),
  },
];
