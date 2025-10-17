import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


import { SelectionModel } from '@angular/cdk/collections';

import { MatPaginator } from '@angular/material/paginator';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';
import * as _moment from 'moment';
import { ColorActivosService } from 'src/app/services/activos/color-activos.service';
import { FactorUniformesService } from 'src/app/services/seguridad/factor-uniformes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


interface data_det {
  idFactorUniforme: number;
  codTrabajador:string;
  tipTrabajador: string;
  nombresTrabajador: string;
  tipoUsuario: string;
  fechaRegistro: string;
  idUsuarioEvaluador: string;
  camisaBlusa: string;
  pantalon: string;
  chaleco: string;
  observaciones: string;
  flgEstado: string;
}

@Component({
  selector: 'app-uniforme-agentes',
  templateUrl: './uniforme-agentes.component.html',
  styleUrls: ['./uniforme-agentes.component.css']
})
export class UniformeAgentesComponent implements OnInit {

  displayedColumns: string[] = [
    'codTrabajador',
    //'dni',
    'camisaBlusa',
    'pantalon',
    'calzado',
    //'chaleco',
    'flgEstado',
    'observaciones'
  ];


  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataForData = [];
  dataForDelete: Array<number> = [];
  agenteSeguridad:any = "";
  fecha: string = '';
  dataEstablecimientos:Array<any> = [];
  selection = new SelectionModel<data_det>(true, []);
  constructor(
    private factorUniformeService: FactorUniformesService,
    public dialog: MatDialog,
    private _router: Router,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
) { this.dataSource = new MatTableDataSource(); }


  ngOnInit(): void {
    var actual = new Date();
    var fecha = _moment(actual.valueOf()).format('DD/MM/YYYY HH:mm:ss');
    var fecha_mes = _moment(actual.valueOf()).format('DD/MM/YYYY');

    console.log(fecha);
    this.fecha = fecha_mes;
    this.getRhEstablecimientos()
    this.agregarDescripcion();
  }

  applyFilter(event: any) {
    console.log(event);
    if (event != undefined && event != '') {
      const filterValue = event.codEstablecimiento;
      this.dataSource.data = this.dataForData.filter((element: any) => {
        return element.codEstablecimiento == filterValue;
      });
    } else {
      this.dataSource.data = this.dataForData;
    }

  }

  getRhEstablecimientos(){
    this.factorUniformeService.getEstablecimientos().subscribe({
      next: (response: any) => {
        console.log(response);
        this.dataEstablecimientos = response;
        this.spinnerService.hide();
        
      },
      error: (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  changeCheck(event:any, campo:string, idFactorUniforme: number){
    console.log(event);
    var valor = "0";
    if(event.checked == false){
      valor = "0";
    }else{
      valor = "1";
    }

    let datos = {
      valor: valor,
      campo: campo,
      idFactorUniforme: idFactorUniforme
    };

    this.spinnerService.show();
    this.factorUniformeService.updateFactorUniforme(datos).subscribe({
      next: (response: any) => {
        console.log(response);
        this.spinnerService.hide();
        if (response.status == 1) {
          this.toastr.success(response.respuesta);
        } else {
          this.toastr.warning(response.respuesta);
          this.spinnerService.hide();
        }
      },
      error: (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  irReportes(){
    this._router.navigate(['pages/seguridad/ReporteUniformesAgentes'], {skipLocationChange:true});
  }

  agregarDescripcion(){
    this.spinnerService.show();
    this.factorUniformeService.getFactorUniformeAge().subscribe({
      next: (response: any) => {
        console.log(response);
        this.spinnerService.hide();
        if (response != '') {
          this.dataForData = response;
          this.dataSource.data = response;
        } else {
          this.spinnerService.hide();
        }
      },
      error: (error) => {
        console.log(error);
        this.dataSource.data = [];
        this.dataForData = [];
        this.spinnerService.hide();
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  changeObservacion(event:any, idFactorUniforme: number){
    console.log(event)

    let datos = {
      valor: event.target.value,
      campo: 'observacion',
      idFactorUniforme: idFactorUniforme
    };

    this.spinnerService.show();
    this.factorUniformeService.updateFactorUniformeObs(datos).subscribe({
      next: (response: any) => {
        console.log(response);
        this.spinnerService.hide();
        if (response.status == 1) {
          this.toastr.success(response.respuesta);
        } else {
          this.toastr.warning(response.respuesta);
          this.spinnerService.hide();
        }
      },
      error: (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }
}


