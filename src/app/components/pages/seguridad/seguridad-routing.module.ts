import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciasSeguridadComponent } from './asistencias-seguridad/asistencias-seguridad.component';
import { FactorGestionAprobacionComponent } from './factor-gestion-aprobacion/factor-gestion-aprobacion.component';
import { FactorSolAprobacionComponent } from './factor-sol-aprobacion/factor-sol-aprobacion.component';
import { GestionAgentesComponent } from './gestion-agentes/gestion-agentes.component';
import { GestionSupervisoresComponent } from './gestion-supervisores/gestion-supervisores.component';
import { MontoPagoBonoComponent } from './monto-pago-bono/monto-pago-bono.component';
import { PermisosComponent } from './permisos/permisos.component';
import { ResumenPorPeriodosComponent } from './resumen-por-periodos/resumen-por-periodos.component';

import { SeguridadComponent } from './seguridad.component';
import { SolAgentesComponent } from './sol-agentes/sol-agentes.component';
import { SolSupervisoresComponent } from './sol-supervisores/sol-supervisores.component';
import { UniformeAgentesComponent } from './uniforme-agentes/uniforme-agentes.component';
import { UniformesSupervisoresComponent } from './uniformes-supervisores/uniformes-supervisores.component';
import { GenerarReporteGestionAgeComponent } from './gestion-agentes/generar-reporte-gestion-age/generar-reporte-gestion-age.component';
import { GenerarReporteSupervisoresComponent } from './gestion-supervisores/generar-reporte-supervisores/generar-reporte-supervisores.component';
import { ReportesSolAgentesComponent } from './sol-agentes/reportes-sol-agentes/reportes-sol-agentes.component';
import { ReportesSolSupervisoresComponent } from './sol-supervisores/reportes-sol-supervisores/reportes-sol-supervisores.component';
import { ReportesUniformesAgentesComponent } from './uniforme-agentes/reportes-uniformes-agentes/reportes-uniformes-agentes.component';
import { ReportesUniformesSupComponent } from './uniformes-supervisores/reportes-uniformes-sup/reportes-uniformes-sup.component';
import { ReversionFactorBonoComponent } from './reversion-factor-bono/reversion-factor-bono.component';

//routing nuevos componentes


export const routes: Routes = [
  {
    path: '',
    component: SeguridadComponent,
    children: [
      {
        path: 'Permisos',
        component: PermisosComponent, // <---
      },
      {
        path: 'AsistenciasSeguridad',
        component: AsistenciasSeguridadComponent, // <---
      },
      {
        path: 'GestionAgentes',
        component: GestionAgentesComponent, // <---
      },
      {
        path: 'ReporteGestionAgentes',
        component: GenerarReporteGestionAgeComponent, // <---
      },
      {
        path: 'GestionSupervisores',
        component: GestionSupervisoresComponent, // <---
      },
      {
        path: 'ReporteGestionSupervisores',
        component: GenerarReporteSupervisoresComponent, // <---
      },
      {
        path: 'SolAgentes',
        component: SolAgentesComponent, // <---
      },
      {
        path: 'ReporteSolAgentes',
        component: ReportesSolAgentesComponent, // <---
      },
      {
        path: 'SolSupervisores',
        component: SolSupervisoresComponent, // <---
      },
      {
        path: 'ReporteSolSupervisores',
        component: ReportesSolSupervisoresComponent, // <---
      },

      {
        path: 'ReporteUniformesAgentes',
        component: ReportesUniformesAgentesComponent, // <---
      },
      {
        path: 'ReporteUniformesSup',
        component: ReportesUniformesSupComponent, // <---
      },
      {
        path: 'UniformesAgentes',
        component: UniformeAgentesComponent, // <---
      },
      {
        path: 'UniformesSupervisores',
        component: UniformesSupervisoresComponent, // <---
      },
      {
        path: 'MontoPagoBono',
        component: MontoPagoBonoComponent, // <---
      },
      {
        path: 'FactorGestionAprobacion',
        component: FactorGestionAprobacionComponent, // <---
      },
      {
        path: 'FactorSolAprobacion',
        component: FactorSolAprobacionComponent // <---
      },
      {
        path: 'ResumenPorPeriodo',
        component: ResumenPorPeriodosComponent // <---
      },

      {
        path: 'ReversionFactorBono',
        component: ReversionFactorBonoComponent, // <---
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadRoutingModule { }
