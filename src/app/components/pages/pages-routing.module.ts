import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivosFijosComponent } from './activos-fijos/activos-fijos.component';

import { PagesComponent } from './pages.component';
import { PrincipalComponent } from './principal/principal.component';
import { TextMaskModule } from 'angular2-text-mask';





//routing nuevos componentes


export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'principal',
        component: PrincipalComponent, // <---
      },
      {
        path: '',
        component: PrincipalComponent,
        pathMatch: 'full',
      },
      {
        path: 'activos',
        loadChildren: () => import('./activos-fijos/activos-fijos.module')
        .then(m => m.ActivosFijosModule),
      },
      {
        path: 'seguridad',
        loadChildren: () => import('./seguridad/seguridad.module')
        .then(m => m.SeguridadModule),
      },
      {
        path: 'almacen',
        loadChildren: () => import('./almacen/almacen.module')
        .then(m => m.AlmacenModule),
      },     
      {
        path: 'reporteBi',
        loadChildren: () => import('./reporte-bi/reporte-bi.module')
        .then(m => m.ReporteBiModule),
      },      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TextMaskModule],
  exports: [RouterModule],
})
export class PagesRoutingModule { }








