import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskedInputDirective } from 'src/app/directives/masked-input.directive';

//controles
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete'

import { AlmacenComponent } from './almacen.component';
import { UbicacionBultoConsultaComponent } from './ubicacion-bulto-consulta/ubicacion-bulto-consulta.component';
import { GeneraGrupoConsultaComponent } from './genera-grupo-consulta/genera-grupo-consulta.component';
import { UbicaReubicaGrupoComponent } from './ubica-reubica-grupo/ubica-reubica-grupo.component';
import { AlmacenRoutingModule } from './almacen-routing.module';
import { GeneraGrupoConsultaDetalleComponent } from './genera-grupo-consulta/genera-grupo-consulta-detalle/genera-grupo-consulta-detalle.component';
import { PresentacionComponent } from './presentacion/presentacion.component';

//Almacen Tela Cruda
import { VisorPermanenciaTelaCrudaComponent } from './visor-permanencia-tela-cruda/visor-permanencia-tela-cruda.component';

@NgModule({
  declarations: [
    AlmacenComponent,
    UbicacionBultoConsultaComponent,
    GeneraGrupoConsultaComponent,
    GeneraGrupoConsultaDetalleComponent,
    UbicaReubicaGrupoComponent,
    PresentacionComponent,
    VisorPermanenciaTelaCrudaComponent,
    MaskedInputDirective
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NgSelectModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AlmacenModule { }
