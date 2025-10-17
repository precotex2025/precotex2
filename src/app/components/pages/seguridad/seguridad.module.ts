import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguridadComponent } from './seguridad.component';
import { PermisosComponent } from './permisos/permisos.component';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { GestionAgentesComponent } from './gestion-agentes/gestion-agentes.component';
import { GestionSupervisoresComponent } from './gestion-supervisores/gestion-supervisores.component';
import { SolAgentesComponent } from './sol-agentes/sol-agentes.component';
import { SolSupervisoresComponent } from './sol-supervisores/sol-supervisores.component';
import { AsistenciasSeguridadComponent } from './asistencias-seguridad/asistencias-seguridad.component';
import { UniformeAgentesComponent } from './uniforme-agentes/uniforme-agentes.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MontoPagoBonoComponent } from './monto-pago-bono/monto-pago-bono.component';
import { UniformesSupervisoresComponent } from './uniformes-supervisores/uniformes-supervisores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogDetalleAsistenciaComponent } from './asistencias-seguridad/dialog-detalle-asistencia/dialog-detalle-asistencia.component';
import { FactorGestionAprobacionComponent } from './factor-gestion-aprobacion/factor-gestion-aprobacion.component';
import { FactorSolAprobacionComponent } from './factor-sol-aprobacion/factor-sol-aprobacion.component';
import { ResumenPorPeriodosComponent } from './resumen-por-periodos/resumen-por-periodos.component';
import {MatTabsModule} from '@angular/material/tabs';
import { GenerarReporteGestionAgeComponent } from './gestion-agentes/generar-reporte-gestion-age/generar-reporte-gestion-age.component';
import { GenerarReporteSupervisoresComponent } from './gestion-supervisores/generar-reporte-supervisores/generar-reporte-supervisores.component';
import { ReportesSolAgentesComponent } from './sol-agentes/reportes-sol-agentes/reportes-sol-agentes.component';
import { ReportesSolSupervisoresComponent } from './sol-supervisores/reportes-sol-supervisores/reportes-sol-supervisores.component';
import { ReportesUniformesAgentesComponent } from './uniforme-agentes/reportes-uniformes-agentes/reportes-uniformes-agentes.component';
import { ReportesUniformesSupComponent } from './uniformes-supervisores/reportes-uniformes-sup/reportes-uniformes-sup.component';
import {MatRadioModule} from '@angular/material/radio';
import { ReversionFactorBonoComponent } from './reversion-factor-bono/reversion-factor-bono.component';
import { DialogAprobacionObservacionComponent } from './dialogs/dialog-aprobacion-observacion/dialog-aprobacion-observacion.component';
import { MatDividerModule } from '@angular/material/divider';
import { FactorPuntajeReversionComponent } from './reversion-factor-bono/factor-puntaje-reversion/factor-puntaje-reversion.component';
@NgModule({
  declarations: [
    SeguridadComponent,
    PermisosComponent,
    GestionAgentesComponent,
    GestionSupervisoresComponent,
    SolAgentesComponent,
    SolSupervisoresComponent,
    AsistenciasSeguridadComponent,
    UniformeAgentesComponent,
    MontoPagoBonoComponent,
    UniformesSupervisoresComponent,
    DialogDetalleAsistenciaComponent,
    FactorGestionAprobacionComponent,
    FactorSolAprobacionComponent,
    ResumenPorPeriodosComponent,
    GenerarReporteGestionAgeComponent,
    GenerarReporteSupervisoresComponent,
    ReportesSolAgentesComponent,
    ReportesSolSupervisoresComponent,
    ReportesUniformesAgentesComponent,
    ReportesUniformesSupComponent,
    ReversionFactorBonoComponent,
    DialogAprobacionObservacionComponent,
    FactorPuntajeReversionComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatOptionModule,
    MatCardModule,
    NgSelectModule
  ]
})
export class SeguridadModule { }
