import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivosFijosComponent } from './activos-fijos.component';
import { ControlActivosComponent } from './control-activos/control-activos.component';
import { HistorialActivosComponent } from './historial-activos/historial-activos.component';
import { ActivosFijosRoutingModule } from './activos-fijos-routing.module';
import { DialogAgregarDescripcionComponent } from './control-activos/dialog-agregar-descripcion/dialog-agregar-descripcion.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDatepickerModule  }  from '@angular/material/datepicker'; 
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {  } from '@angular/material/datepicker';

import { MY_DATE_FORMATS } from 'src/app/my-date-formats';
import { DescripcionActivosComponent } from './descripcion-activos/descripcion-activos.component';
import { CentrosCostoComponent } from './centros-costo/centros-costo.component';
import { DialogCentroCostoComponent } from './centros-costo/dialog-centro-costo/dialog-centro-costo.component';
import { ClaseActivosComponent } from './clase-activos/clase-activos.component';
import { DialogClaseActivosComponent } from './clase-activos/dialog-clase-activos/dialog-clase-activos.component';
import { ColorActivosComponent } from './color-activos/color-activos.component';
import { DialogColorActivosComponent } from './color-activos/dialog-color-activos/dialog-color-activos.component';
import { OpcionesActivosComponent } from './opciones-activos/opciones-activos.component';
import { AdjuntarDocumentosComponent } from './opciones-activos/adjuntar-documentos/adjuntar-documentos.component';
import { BajaActivosComponent } from './opciones-activos/baja-activos/baja-activos.component';
import { ReporteMejorasComponent } from './opciones-activos/reporte-mejoras/reporte-mejoras.component';
import { FormatosDiversosComponent } from './opciones-activos/formatos-diversos/formatos-diversos.component';
import { DepreciacionActivoComponent } from './opciones-activos/depreciacion-activo/depreciacion-activo.component';
import { HistorialUbicacionesComponent } from './opciones-activos/historial-ubicaciones/historial-ubicaciones.component';
import { ValorSedeCentroComponent } from './opciones-activos/valor-sede-centro/valor-sede-centro.component';
import { ResumenGeneralComponent } from './opciones-activos/resumen-general/resumen-general.component';
import { HistorialInventariosComponent } from './opciones-activos/historial-inventarios/historial-inventarios.component';
import { AsignarResponsableComponent } from './opciones-activos/asignar-responsable/asignar-responsable.component';
import { PrestamosReparacionesComponent } from './opciones-activos/prestamos-reparaciones/prestamos-reparaciones.component';
import { DialogCrearInventarioComponent } from './opciones-activos/historial-inventarios/dialog-crear-inventario/dialog-crear-inventario.component';
import { DialogAdjuntosComponent } from './historial-activos/dialog-adjuntos/dialog-adjuntos.component';
import { DialogHistorialUbicacionesComponent } from './historial-activos/dialog-historial-ubicaciones/dialog-historial-ubicaciones.component';
import { DialogPrestamosReparacionesComponent } from './historial-activos/dialog-prestamos-reparaciones/dialog-prestamos-reparaciones.component';
import { DialogFamiliaresActivoComponent } from './historial-activos/dialog-familiares-activo/dialog-familiares-activo.component';

import localeEsPe from '@angular/common/locales/es-PE'
import { LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';


import {MAT_DATE_LOCALE} from '@angular/material/core';
import { DialogNietosActivosComponent } from './historial-activos/dialog-familiares-activo/dialog-nietos-activos/dialog-nietos-activos.component';
import { HistorialPrestamosComponent } from './opciones-activos/prestamos-reparaciones/historial-prestamos/historial-prestamos.component';
import { HistorialBajasComponent } from './opciones-activos/baja-activos/historial-bajas/historial-bajas.component';
import { DialogDepreciacionActivoComponent } from './historial-activos/dialog-depreciacion-activo/dialog-depreciacion-activo.component';
import { ControlActivosMinimoComponent } from './control-activos-minimo/control-activos-minimo.component';
import { DialogGestionInventarioComponent } from './opciones-activos/historial-inventarios/dialog-gestion-inventario/dialog-gestion-inventario.component';
import { ControlActivosInventarioComponent } from './control-activos-inventario/control-activos-inventario.component';
import { MarcasActivoComponent } from './marcas-activo/marcas-activo.component';
import { ModelosActivoComponent } from './modelos-activo/modelos-activo.component';
import { DialogMarcasActivoComponent } from './marcas-activo/dialog-marcas-activo/dialog-marcas-activo.component';
import { DialogModeloActivoComponent } from './modelos-activo/dialog-modelo-activo/dialog-modelo-activo.component';
import { RepuestosInventariosComponent } from './repuestos-inventarios/repuestos-inventarios.component';
import { UbicacionActivosComponent } from './ubicacion-activos/ubicacion-activos.component';
import { DialogUbicacionActivosComponent } from './ubicacion-activos/dialog-ubicacion-activos/dialog-ubicacion-activos.component';

import { ControlHiloTejeduriaInventarioComponent } from './control-hilo-tejeduria-inventario/control-hilo-tejeduria-inventario.component';

import { TextMaskModule } from 'angular2-text-mask';

registerLocaleData(localeEsPe, 'es')

@NgModule({
  declarations: [
    ActivosFijosComponent,
    ControlActivosComponent,
    HistorialActivosComponent,
    DialogAgregarDescripcionComponent,
    DescripcionActivosComponent,
    CentrosCostoComponent,
    DialogCentroCostoComponent,
    ClaseActivosComponent,
    DialogClaseActivosComponent,
    ColorActivosComponent,
    DialogColorActivosComponent,
    OpcionesActivosComponent,
    AdjuntarDocumentosComponent,
    BajaActivosComponent,
    ReporteMejorasComponent,
    FormatosDiversosComponent,
    DepreciacionActivoComponent,
    HistorialUbicacionesComponent,
    ValorSedeCentroComponent,
    ResumenGeneralComponent,
    HistorialInventariosComponent,
    AsignarResponsableComponent,
    PrestamosReparacionesComponent,
    DialogCrearInventarioComponent,
    DialogAdjuntosComponent,
    DialogHistorialUbicacionesComponent,
    DialogPrestamosReparacionesComponent,
    DialogFamiliaresActivoComponent,
    DialogNietosActivosComponent,
    HistorialPrestamosComponent,
    HistorialBajasComponent,
    DialogDepreciacionActivoComponent,
    ControlActivosMinimoComponent,
    DialogGestionInventarioComponent,
    ControlActivosInventarioComponent,
    MarcasActivoComponent,
    ModelosActivoComponent,
    DialogMarcasActivoComponent,
    DialogModeloActivoComponent,
    RepuestosInventariosComponent,
    UbicacionActivosComponent,
    DialogUbicacionActivosComponent,
    ControlHiloTejeduriaInventarioComponent
  ],
  imports: [
    CommonModule,
    ActivosFijosRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    MatCheckboxModule,
    NgSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    TextMaskModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {provide: LOCALE_ID, useValue: 'es-PE' }
  ]
})
export class ActivosFijosModule { }
