import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivosFijosComponent } from './activos-fijos.component';
import { CentrosCostoComponent } from './centros-costo/centros-costo.component';
import { ClaseActivosComponent } from './clase-activos/clase-activos.component';
import { ColorActivosComponent } from './color-activos/color-activos.component';
import { ControlActivosComponent } from './control-activos/control-activos.component';
import { DescripcionActivosComponent } from './descripcion-activos/descripcion-activos.component';
import { HistorialActivosComponent } from './historial-activos/historial-activos.component';
import { AdjuntarDocumentosComponent } from './opciones-activos/adjuntar-documentos/adjuntar-documentos.component';
import { AsignarResponsableComponent } from './opciones-activos/asignar-responsable/asignar-responsable.component';
import { BajaActivosComponent } from './opciones-activos/baja-activos/baja-activos.component';
import { HistorialBajasComponent } from './opciones-activos/baja-activos/historial-bajas/historial-bajas.component';
import { DepreciacionActivoComponent } from './opciones-activos/depreciacion-activo/depreciacion-activo.component';
import { FormatosDiversosComponent } from './opciones-activos/formatos-diversos/formatos-diversos.component';
import { HistorialInventariosComponent } from './opciones-activos/historial-inventarios/historial-inventarios.component';
import { HistorialUbicacionesComponent } from './opciones-activos/historial-ubicaciones/historial-ubicaciones.component';
import { OpcionesActivosComponent } from './opciones-activos/opciones-activos.component';
import { HistorialPrestamosComponent } from './opciones-activos/prestamos-reparaciones/historial-prestamos/historial-prestamos.component';
import { PrestamosReparacionesComponent } from './opciones-activos/prestamos-reparaciones/prestamos-reparaciones.component';
import { ReporteMejorasComponent } from './opciones-activos/reporte-mejoras/reporte-mejoras.component';
import { ResumenGeneralComponent } from './opciones-activos/resumen-general/resumen-general.component';
import { ValorSedeCentroComponent } from './opciones-activos/valor-sede-centro/valor-sede-centro.component';
import { ControlActivosMinimoComponent } from './control-activos-minimo/control-activos-minimo.component';
import { MarcasActivoComponent } from './marcas-activo/marcas-activo.component';
import { ModelosActivoComponent } from './modelos-activo/modelos-activo.component';
import { RepuestosInventariosComponent } from './repuestos-inventarios/repuestos-inventarios.component';
import { UbicacionActivosComponent } from './ubicacion-activos/ubicacion-activos.component';
import { ControlHiloTejeduriaInventarioComponent } from './control-hilo-tejeduria-inventario/control-hilo-tejeduria-inventario.component';

//routing nuevos componentes

export const routes: Routes = [
  {
    path: '',
    component: ActivosFijosComponent,
    children: [
      {
        path: 'ControlActivosFijo',
        component: ControlActivosComponent, // <---
      },
      {
        path: 'ControlActivoResumido',
        component: ControlActivosMinimoComponent, // <---
      },
      {
        path: 'HistorialActivosFijos',
        component: HistorialActivosComponent, // <---
      },
      {
        path: 'DescripcionActivos',
        component: DescripcionActivosComponent, // <---
      },
      {
        path: 'CentrosCosto',
        component: CentrosCostoComponent, // <---
      },
      {
        path: 'ClaseActivos',
        component: ClaseActivosComponent, // <---
      },
      {
        path: 'ColorActivos',
        component: ColorActivosComponent, // <---
      },

      {
        path: 'OpcionesActivos',
        component: OpcionesActivosComponent, // <---
      },

      {
        path: 'AdjuntarDocumentos',
        component: AdjuntarDocumentosComponent, // <---
      },
      {
        path: 'AsignarResponable',
        component: AsignarResponsableComponent, // <---
      },
      {
        path: 'BajaActivos',
        component: BajaActivosComponent, // <---
      },
      {
        path: 'historialBajas',
        component: HistorialBajasComponent, // <---
      },
      {
        path: 'DepreciacionActivo',
        component: DepreciacionActivoComponent, // <---
      },
      {
        path: 'FormatosDiversos',
        component: FormatosDiversosComponent, // <---
      },
      {
        path: 'HistorialActivos',
        component: HistorialActivosComponent, // <---
      },
      {
        path: 'HistorialInventarios',
        component: HistorialInventariosComponent, // <---
      },
      {
        path: 'HistorialUbicaciones',
        component: HistorialUbicacionesComponent, // <---
      },
      {
        path: 'PrestamosReparaciones',
        component: PrestamosReparacionesComponent, // <---
      },
      {
        path: 'ReporteMejoras',
        component: ReporteMejorasComponent, // <---
      },

      {
        path: 'ResumenGeneral',
        component: ResumenGeneralComponent, // <---
      },
      {
        path: 'ValorSedeCentro',
        component: ValorSedeCentroComponent, // <---
      },

      {
        path: 'historialPrestamos',
        component: HistorialPrestamosComponent, // <---
      },
      
      {
        path: 'Marcas',
        component: MarcasActivoComponent, // <---
      },

      {
        path: 'Modelos',
        component: ModelosActivoComponent, // <---
      },

      {
        path: 'repuestosInventario',
        component: RepuestosInventariosComponent, // <---
      },
      
      {
        path: 'Ubicacion',
        component: UbicacionActivosComponent, // <---
      },

      {
        path: 'ControlHiloTejeduriaInventario',
        component: ControlHiloTejeduriaInventarioComponent, // <---
      },      

      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivosFijosRoutingModule { }
