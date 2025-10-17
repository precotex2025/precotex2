
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ExceljsService } from 'src/app/services/exceljs.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { ExceljsvalorService } from 'src/app/services/exceljsvalor.service';


interface data_det {
  empresa:string;
  area:string;
  centroCosto:string;
  precioTotal:string;
  valorActual:string;
  codActivo:string;
  descripcion:string;
}
@Component({
  selector: 'app-valor-sede-centro',
  templateUrl: './valor-sede-centro.component.html',
  styleUrls: ['./valor-sede-centro.component.css']
})
export class ValorSedeCentroComponent implements OnInit {
  dataForExcel:any = [];
  dataForDelete: Array<number> = [];


  displayedColumns: string[] = [
    "empresa",
    "area",
    "centroCosto",
    "precioTotal",
    "valorActual",
    "codActivo",
    "descripcion"
  ];

  codEmpresa: string = '';
  sede: string = '';
  area: string = '';
  codCenCost: string = '';

  valorTotal:any = 0;
  precioCompra:any = 0;
  dataEmpresas: Array<any> = [];
  dataSedes: Array<any> = [];
  dataSource!: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor(
    private controlActivoFijoService: ControlActivoFijoService,
    public dialog: MatDialog,
    private exceljsService: ExceljsvalorService,
    private SpinnerService: NgxSpinnerService,
    private _router: Router,
    private toastr: ToastrService) {
      this.dataSource = new MatTableDataSource(); 
  }

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  regresar(){
    this._router.navigate(['pages/activos/OpcionesActivos']);
  }

  onChangeFile(event:any){
    console.log(event)
  }

  EliminarRegistro(data:data_det){

  }

  selectEmpresa(Accion: any) {
    this.codCenCost = "";
    this.controlActivoFijoService.MostrarSedePorEmpresaService(
      Accion
    ).subscribe(
      (result: any) => {
        this.dataSedes = result
      })
  }

  cargarEmpresas() {
    this.controlActivoFijoService.getEmpresas().subscribe({
      next: (response: any) => {
        this.dataEmpresas = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  changeCentroCosto(){
    if(this.codCenCost != ''){
      this.codEmpresa = '';
      this.sede = '';
    }
  }

  buscarReporteControlActivos() {
    this.dataSource.data = [];

    this.SpinnerService.show();

    if (this.codEmpresa != "" || this.codCenCost != "" || this.sede != "" || this.area != "") {
      this.valorTotal = 0;
      this.controlActivoFijoService.reporteValorCentro(
        this.codEmpresa,
        this.sede,
        this.codCenCost,
        this.area
      ).subscribe(
        (result: any) => {
          if (result.length > 0) {
            console.log(result)
            this.dataSource.data = result
            this.SpinnerService.hide();
            result.forEach((element:data_det) => {
              this.valorTotal += Number(element.valorActual);
              this.precioCompra += Number(element.precioTotal);
            });
          }
          else {
            this.valorTotal = 0;
            this.precioCompra = 0;
            this.toastr.error('No existen registros', 'Cerrar', {
              timeOut: 2500,
            });
            this.dataSource.data = []
            this.SpinnerService.hide();
          }
        },
        (err: HttpErrorResponse) => {
          this.valorTotal = 0;
          this.precioCompra = 0;
          this.SpinnerService.hide();
          this.toastr.error('No existen registros', 'Cerrar', {
            timeOut: 2500,
          });
        })
    } else {
      this.toastr.error('Debes seleccionar un filtro de búsqueda', 'Cerrar', {
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
        title: 'REPORTE VALOR POR SEDE O CENTRO',
        data: this.dataForExcel,
        headers: Object.keys(this.dataSource.data[0])
      }

      this.exceljsService.exportExcel(reportData, this.valorTotal);
      //this.dataSource.data = [];

    }
  }
}
