import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReporteBiComponent } from './reporte-bi.component';
import { HomeComponent } from './home/home.component';
import { LaboratorioTonoComponent } from './laboratorio-tono/laboratorio-tono.component';
import { TintoteriaGeneralComponent } from './tintoteria-general/tintoteria-general.component';
import { TejeduriaComponent } from './tejeduria/tejeduria.component';

export const routes: Routes = [
    {
        path: '',
        component: ReporteBiComponent,
        children: [
            {
                path: 'Home',
                component: HomeComponent,// <---
            },
            {
                path: 'LaboratorioTono',
                component: LaboratorioTonoComponent,// <---
            },
            {
                path: 'TintoreriaGeneral',
                component: TintoteriaGeneralComponent,// <---
            },
            {
              path: 'Tejeduria',
              component: TejeduriaComponent,// <---
          },
        ]
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteBiRoutingModule { }