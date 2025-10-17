import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExceljsService } from 'src/app/services/exceljs.service';
import { AprobacionesFactoresService } from 'src/app/services/seguridad/aprobaciones-factores.service';
import { FactorPuntajeReversionComponent } from './factor-puntaje-reversion/factor-puntaje-reversion.component';

interface data_det {
  id: number;
  idFactorBono: number;
  administrativo: string;
  ano: string;
  mes: string;
  idUsuarioEvaluador: string;
  fechaRegistro: string;
  flgEstado: string;
  tipoUsuario: string;
  tipoFactor: number;
  nombresTrabajador: string;
  observaciones: string;
}

@Component({
  selector: 'app-reversion-factor-bono',
  templateUrl: './reversion-factor-bono.component.html',
  styleUrls: ['./reversion-factor-bono.component.css']
})


export class ReversionFactorBonoComponent implements OnInit {

  mesActual: any = "";
  fechaRango1: any = "";
  fechaRango2: any = "";

  dataReversiones:Array<any> = [];

  dataForExcel:any = [];
  dataSourceExcel:any = [];

  

  displayedColumns: string[] = [
    'nombresTrabajador',
    'tipoUsuario',
    'Periodo',
    'tipoFactor',
    'observaciones',
    'flgEstado',
    'acciones'
  ];

  dataSource!: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();


  constructor(private _router: Router, private aprobacionesService:AprobacionesFactoresService, private toastr:ToastrService, private SpinnerService: NgxSpinnerService,
    public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    const str = new Date().toLocaleString('en-Es', { year: 'numeric', month: '2-digit', day: '2-digit' });
    var dia = str.substring(3, 5);
    var mes = str.substring(0, 2);
    var anio = str.substring(6, 10);
    var totaldia = anio + '-' + mes + '-' + dia;

    this.mesActual = anio + '-' + mes;


    var ano = this.mesActual.substring(0, 4);
    var mese = this.mesActual.substring(5, 7);

    var fecha = ano + '/' + mese + '/20';
    console.log(fecha);
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
    this.generarReporte();
  }

  regresar(){
    this._router.navigate(['pages/seguridad/GestionAgentes']);
  }
  getAprobacionPeriodo(){
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
  }

  updateFactor(data_det: data_det){
    console.log(data_det);
    this.aprobacionesService.reversionPuntajeBono(data_det.idFactorBono, data_det.tipoFactor).subscribe({
      next: (response: any) => {
        console.log(response);
        let dialogRef = this.dialog.open(FactorPuntajeReversionComponent, {
          disableClose: true,
          panelClass: 'my-class',
          minWidth: '95%',
          minHeight: '95%',
          height: '95%',
          data: {
            response,
            tipoFactor: data_det.tipoFactor,
            tipoUsuario: data_det.tipoUsuario
          }
        });
  
        dialogRef.afterClosed().subscribe((result: any) => {
          console.log(result);
          if(result == true){
            this.aprobacionesService.updateReversion(data_det.id).subscribe({
              next: (response: any) => {
                console.log(response);
                this.generarReporte();
                // this.SpinnerService.hide();
                // if(response.length > 0){
                //   this.dataSource.data = response;
                // }else{
                //   this.toastr.error('No se encontraron registros.', 'Cerrar', {
                //     timeOut: 2500,
                //   });  
                // }
                
                
              },
              error: (error) => {
                console.log(error);
                this.SpinnerService.hide();
                this.toastr.error(error.error.message, 'Cerrar', {
                  timeOut: 2500,
                });
              }
            });
          }
        })
        
        
      },
      error: (error) => {
        console.log(error);

        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  generarReporte(){
    var ano = this.mesActual.substring(0, 4);
    var mese = this.mesActual.substring(5, 7);
    this.dataForExcel = [];
    this.dataSourceExcel = [];
    this.SpinnerService.show();
    this.aprobacionesService.getReversionUser(mese, ano).subscribe({
      next: (response: any) => {
        console.log(response);
        this.SpinnerService.hide();
        if(response.length > 0){
          this.dataSource.data = response;
        }else{
          this.toastr.error('No se encontraron registros.', 'Cerrar', {
            timeOut: 2500,
          });  
        }
        
        
      },
      error: (error) => {
        console.log(error);
        this.SpinnerService.hide();
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }
}
