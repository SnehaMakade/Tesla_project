import { Routes } from '@angular/router';
import { Step2Guard, Step3Guard } from './guards/stepGuard';

export const routes: Routes = [
    {path: 'step1',
    loadComponent: () => import('./components/model/model.component').then(c => c.ModelComponent)},
    {path: 'step2',
    loadComponent: () => import('./components/config/config.component').then(c => c.ConfigComponent), canActivate: [Step2Guard]},
    {path: 'step3',
    loadComponent: () => import('./components/summary/summary.component').then(c => c.SummaryComponent), canActivate: [Step3Guard] },
    { path: '',   redirectTo: '/step1', pathMatch: 'full' },
];