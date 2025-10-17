
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ExceljsService } from 'src/app/services/exceljs.service';


interface data_det {
  empresa:string;
  piso:string;
  area:string;
  centroCosto:string;
  responsable:string;
  codUsuario:string;
  claseActivo:string;
  codActivoPadre:string;
  precioTotal:string;
  codActivo:string;
  descripcion:string;
  descripcionMejora:string;
  marca:string;
  modelo:string;
  serie:string;
  color:string;
  medida:string;
  serieMotor:string;
  serieChasis:string;
  placa:string;
  tipoCombustible:string;
  tipoCaja:string;
  cantidadAsiento:string;
  cantidadEje:string;
  anoFabricacion:string;
  usoDesuso:string;
  observacion:string;
  fecRegistro:string;
}

@Component({
  selector: 'app-reporte-mejoras',
  templateUrl: './reporte-mejoras.component.html',
  styleUrls: ['./reporte-mejoras.component.css']
})
export class ReporteMejorasComponent implements OnInit {
  dataForExcel:any = [];
  dataForDelete: Array<number> = [];


  displayedColumns: string[] = [
    'empresa',
    'piso',
    'area',
    'centroCosto',
    'responsable',
    'codUsuario',
    'claseActivo',
    'codActivoPadre',
    'precioTotal',
    'codActivo',
    'descripcion',
    'descripcionMejora',
    'marca',
    'modelo',
    'serie',
    'color',
    'medida',
    'serieMotor',
    'serieChasis',
    'placa',
    'tipoCombustible',
    'tipoCaja',
    'cantidadAsiento',
    'cantidadEje',
    'anoFabricacion',
    'usoDesuso',
    'observacion',
    'fecRegistro'
  ];

  dataSource!: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  Fecha_Auditoria: any = ""
  Fecha_Auditoria2: any = ""

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(
    private controlActivoFijoService: ControlActivoFijoService,
    public dialog: MatDialog,
    private _router: Router,
    private SpinnerService: NgxSpinnerService,
    private exceljsService: ExceljsService,
    private toastr: ToastrService) {
      this.dataSource = new MatTableDataSource(); 
  }

  ngOnInit(): void {
  }

  regresar(){
    this._router.navigate(['pages/activos/OpcionesActivos']);
  }

  onChangeFile(event:any){
    console.log(event)
  }

  EliminarRegistro(data:data_det){

  }

  clearDate(event: any) {
    event.stopPropagation();
    this.range.controls['start'].setValue(new Date())
    this.range.controls['end'].setValue(new Date())
  }


  buscarReporteControlActivos() {
    this.dataSource.data = [];

    this.SpinnerService.show();

    this.Fecha_Auditoria = this.range.get('start')?.value
    this.Fecha_Auditoria2 = this.range.get('end')?.value


    if (this.Fecha_Auditoria != null && this.Fecha_Auditoria2 != null) {
      this.controlActivoFijoService.reporteHistorialMejoras(
        this.Fecha_Auditoria,
        this.Fecha_Auditoria2
      ).subscribe(
        (result: any) => {
          if (result.length > 0) {
            console.log(result)
            this.dataSource.data = result
            this.SpinnerService.hide();
          }
          else {
            this.toastr.error('No existen registros', 'Cerrar', {
              timeOut: 2500,
            });
            this.dataSource.data = []
            this.SpinnerService.hide();
          }
        },
        (err: HttpErrorResponse) => {
          this.SpinnerService.hide();
          this.toastr.error('No existen registros', 'Cerrar', {
            timeOut: 2500,
          });
        })
    } else {
      this.toastr.error('Debes seleccionar un rango de fechas', 'Cerrar', {
        timeOut: 2500,
      });
      this.SpinnerService.hide();
    }
  }

  generateExcel() {
    console.log(this.dataSource.data)

    this.dataForExcel = [];
    if (this.dataSource.data.length == 0) {
      this.toastr.info('No existen registros.', 'Cerrar', {
        timeOut: 2500,
      });
    }
    else {

      this.dataSource.data.forEach((row: any) => {
        this.dataForExcel.push(Object.values(row))
      })

      let reportData = {
        title: 'REPORTE MEJORA DE ACTIVOS',
        data: this.dataForExcel,
        headers: Object.keys(this.dataSource.data[0])
      }

      this.exceljsService.exportExcel(reportData);
      //this.dataSource.data = [];

    }
  }
}
