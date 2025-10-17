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

import { ReporteBiComponent } from './reporte-bi.component';
import { HomeComponent } from './home/home.component';
import { LaboratorioTonoComponent } from './laboratorio-tono/laboratorio-tono.component';
import { TintoteriaGeneralComponent } from './tintoteria-general/tintoteria-general.component';
import { ReporteBiRoutingModule } from './reporte-bi-routing-module';

@NgModule({
  declarations: [
    ReporteBiComponent,
    HomeComponent,
    LaboratorioTonoComponent,
    TintoteriaGeneralComponent
  ],
  imports: [
    CommonModule,
    ReporteBiRoutingModule,
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
    ReactiveFormsModule
  ]
})
export class ReporteBiModule { }