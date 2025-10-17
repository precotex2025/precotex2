import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


import { SelectionModel } from '@angular/cdk/collections';

import { MatPaginator } from '@angular/material/paginator';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';

import { ColorActivosService } from 'src/app/services/activos/color-activos.service';
import { FactorAsistenciasService } from 'src/app/services/seguridad/factor-asistencias.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogDetalleAsistenciaComponent } from './dialog-detalle-asistencia/dialog-detalle-asistencia.component';


interface data_det {
  idFactorAsistencia: number;
  codTrabajador:string;
  tipTrabajador: string;
  tipoUsuario: string;
  fechaRegistro: string;
  ano: string;
  mes: string;
  inasistencias: string;
  tardanzas: string;
  faltasJustificadas: string;
  flgEstado: string;
  nombresTrabajador:string;
  codCategoria:string;
  minTardanza: number;
}

@Component({
  selector: 'app-asistencias-seguridad',
  templateUrl: './asistencias-seguridad.component.html',
  styleUrls: ['./asistencias-seguridad.component.css']
})
export class AsistenciasSeguridadComponent implements OnInit {

  displayedColumns: string[] = [
    'nombresTrabajador',
    'tardanzas',
    'minTardanza',
    'inasistencias',
    'faltasJustificadas',
    'flgEstado',
    'acciones'
  ];

  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataForExcel = [];
  dataForDelete: Array<number> = [];
  agenteSeguridad:any = "";
  mesActual:any = "";
  fechaRango1:any = "";
  fechaRango2:any = "";
  dataAgentes:Array<any> = [];
  constructor(
    private colorActivoService: ColorActivosService,
    public dialog: MatDialog,
    private spinnerService:NgxSpinnerService,
    private factorAsistencia: FactorAsistenciasService,
    private toastr: ToastrService,
) { this.dataSource = new MatTableDataSource(); }


  ngOnInit(): void {
    const str = new Date().toLocaleString('en-Es', { year: 'numeric', month: '2-digit', day: '2-digit' }); 
    var dia = str.substring(3,5);
    var mes = str.substring(0,2);
    var anio = str.substring(6,10);
    var totaldia = anio + '-' + mes + '-' + dia;
    
    this.mesActual = anio + '-' + mes;
    console.log(totaldia);
    this.getAsistenciasBono();
    



   
  }


  getAsistenciasBono(){
    var ano = this.mesActual.substring(0, 4);
    var mese = this.mesActual.substring(5, 7);

    var fecha = ano + '/' + mese + '/20';
    console.log(fecha);
    console.log(mese);

    var newMes = '';
    if(mese == '01'){
      newMes = '12';
      ano = ano-1;
    }else{
      newMes = (mese - 1).toString();
    }
    this.fechaRango2 = fecha;

    if (Number(newMes) < 10) {
      newMes = '0' + newMes;
    }

    var fecha1 = ano + '/' + newMes + '/21';

    this.fechaRango1 = fecha1;
        
    console.log(this.fechaRango1);
    console.log(this.fechaRango2);

    this.spinnerService.show();
    this.factorAsistencia.getFactorAsistencia(fecha).subscribe({
      next: (response:any) => {
        console.log(response);
        this.spinnerService.hide();
        this.dataSource.data = response;
         if(this.dataSource.data.length == 0){
          this.toastr.info("Aún no se ha creado el registro para el periodo solicitado, regresa el día 21 del periodo seleccionado");

         }
        //   this.spinnerService.hide();
        // }
      },
      error: (error) => {
        console.log(error);
        this.dataSource.data = [];
        this.spinnerService.hide();
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  detalleTardanza(codTrabajador:any, tipTrabajador:any){
    let datos = {
      fecha1: this.fechaRango1,
      fecha2: this.fechaRango2,
      codTrabajador: codTrabajador,
      tipTrabajador: tipTrabajador
    }
    let dialogRef = this.dialog.open(DialogDetalleAsistenciaComponent, {
      disableClose: true,
      panelClass: 'my-class',
      data: {
        data: datos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      
 
    })
  }

  changePeriodo(event:any){
    console.log(event.target.value);
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}



