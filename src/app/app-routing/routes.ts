import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '',  loadChildren: '../item.module#ItemModule' },
];
