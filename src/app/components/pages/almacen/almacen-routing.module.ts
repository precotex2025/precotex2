import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlmacenComponent } from './almacen.component';
import { UbicacionBultoConsultaComponent } from './ubicacion-bulto-consulta/ubicacion-bulto-consulta.component';
import { GeneraGrupoConsultaComponent } from './genera-grupo-consulta/genera-grupo-consulta.component';
import { UbicaReubicaGrupoComponent } from './ubica-reubica-grupo/ubica-reubica-grupo.component';
import { GeneraGrupoConsultaDetalleComponent } from './genera-grupo-consulta/genera-grupo-consulta-detalle/genera-grupo-consulta-detalle.component';
import { PresentacionComponent } from 'src/app/components/pages/almacen/presentacion/presentacion.component';
import { VisorPermanenciaTelaCrudaComponent } from './visor-permanencia-tela-cruda/visor-permanencia-tela-cruda.component';

export const routes: Routes = [
  {
    path: '',
    component: AlmacenComponent,
    children: [
      {
        path: 'Presentacion',
        component: PresentacionComponent,// <---
      },
      {
        path: 'UbicacionBultoConsulta',
        component: UbicacionBultoConsultaComponent, // <---
      },
      {
        path: 'GeneracionGrupoConsulta',
        component: GeneraGrupoConsultaComponent, // <---
        children: [
          {
            path: 'GeneracionGrupoConsulta/GeneraGrupoConsultaDetalle',
            component: GeneraGrupoConsultaDetalleComponent,
          } 
        ]
   
      },
      {
        path: 'UbicaReubicaGrupo',
        component: UbicaReubicaGrupoComponent, // <---
      },     
      {
        path: 'GeneraGrupoConsultaDetalle',
        component: GeneraGrupoConsultaDetalleComponent,
      },  
      {
        path: 'VisorPermanenciaTelaCruda',
        component: VisorPermanenciaTelaCrudaComponent, // <---
      }  
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlmacenRoutingModule { }
