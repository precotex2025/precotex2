import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AprobacionesFactoresService } from 'src/app/services/seguridad/aprobaciones-factores.service';
import { DialogAprobacionObservacionComponent } from '../dialogs/dialog-aprobacion-observacion/dialog-aprobacion-observacion.component';

interface data_det {
  codTrabajador: string;
  tipTrabajador: string;
  nombresTrabajador: string;
  flgActivo: string;
  flgEstado: string;
  idFactorBono: string;
  idUsuarioEvaluador: string;
  fechaRegistro: string;
  aprobacionDirectora: string;
  aprobacionJefe: string;
  aprobacionSoporte: string;
  puntaje: string;
  tipoUsuario: string;
  fecDirectora: string;
  fecJefe: string;
  fecSoporte: string;
  segFactorGestionBonoDets: string;
}

@Component({
  selector: 'app-factor-gestion-aprobacion',
  templateUrl: './factor-gestion-aprobacion.component.html',
  styleUrls: ['./factor-gestion-aprobacion.component.css']
})
export class FactorGestionAprobacionComponent implements OnInit {

  displayedColumns: string[] = [
    'nombresTrabajador',
    'factor1',
    'factor2',
    'factor3',
    'factor4',
    'factor5',
    'factor6',
    'puntaje',
    'aprobacionJefe',
    'aprobacionSoporte',
    'aprobacionDirectora',
  ];

  displayedColumns2: string[] = [
    'nombresTrabajador',
    'factor1',
    'factor2',
    'factor3',
    'factor4',
    'puntaje',
    'aprobacionJefe',
    'aprobacionSoporte',
    'aprobacionDirectora',
  ];

  dataSource: MatTableDataSource<data_det>;
  dataSource2!: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  columnsToDisplay2: string[] = this.displayedColumns2.slice();

  dataForExcel = [];
  dataForDelete: Array<number> = [];
  agenteSeguridad: any = "";
  mesActual: any = "";
  fechaRango1: any = "";
  fechaRango2: any = "";
  dataAgentes: Array<any> = [];

  idUsuario:any;
  constructor(
    public dialog: MatDialog,
    private spinnerService: NgxSpinnerService,
    private factorAprobaciones: AprobacionesFactoresService,
    private toastr: ToastrService,
    private _router: Router,
  ) {
    this.dataSource = new MatTableDataSource();
    this.dataSource2 = new MatTableDataSource();
  }


  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('idUsuario');
    console.log(this.idUsuario);
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
    if (mese == '01') {
      newMes = '12';
      ano = ano - 1;
    } else {
      newMes = (mese - 1).toString();
    }
    this.fechaRango2 = fecha;

    if (Number(newMes) < 10) {
      newMes = '0' + newMes;
    }

    var fecha1 = ano + '/' + newMes + '/21';

    this.fechaRango1 = fecha1;

    this.getAprobacionPeriodoAge();
    this.getAprobacionPeriodoSup();
  }



  getAprobacionPeriodo() {
    var ano = this.mesActual.substring(0, 4);
    var mese = this.mesActual.substring(5, 7);

    var fecha = ano + '/' + mese + '/20';
    console.log(fecha);
    var newMes = (mese - 1).toString();
    this.fechaRango2 = fecha;

    if (Number(newMes) < 10) {
      newMes = '0' + newMes;
    }

    var fecha1 = ano + '/' + newMes + '/21';

    this.fechaRango1 = fecha1;
    this.factorAprobaciones.getAprobacionAge(mese, ano, '1').subscribe({
      next: (response: any) => {
        console.log(response);
        this.getAprobacionPeriodoSup();
        this.dataSource.data = response;
        //  if(this.dataSource.data.length == 0){
        //   this.toastr.info("Aún no se ha creado el registro para el periodo solicitado, regresa el día 21 del periodo seleccionado");
        //  }
      },
      error: (error) => {
        console.log(error);
        this.dataSource.data = [];
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  changeAprobacion(event: any, campo: string, idFactorBono: number) {
    let datos = {
      valor: event.value,
      campo: campo,
      idFactorBono: idFactorBono,
      observaciones: ''
    };

    if (event.value == '0') {
      let dialogRef = this.dialog.open(DialogAprobacionObservacionComponent, {
        disableClose: true,
        panelClass: 'my-class',
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        console.log(result);
        if (result == 'false') {
          event.value = '';
          this.getAprobacionPeriodo();
        } else {
          let datos = {
            valor: event.value,
            campo: campo,
            idFactorBono: idFactorBono,
            observaciones: result
          };

          this.spinnerService.show();
          this.factorAprobaciones.guardarAprobacionGestion(datos).subscribe({
            next: (response: any) => {
              console.log(response);
              this.spinnerService.hide();
              if (response.status == 1) {
                this.toastr.info(response.respuesta);
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
      })
    } else {
      console.log(datos);
      this.spinnerService.show();
      this.factorAprobaciones.guardarAprobacionGestion(datos).subscribe({
        next: (response: any) => {
          console.log(response);
          this.spinnerService.hide();
          if (response.status == 1) {
            this.toastr.info(response.respuesta);
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

  getAprobacionPeriodoAge() {
    var ano = this.mesActual.substring(0, 4);
    var mese = this.mesActual.substring(5, 7);

    var fecha = ano + '/' + mese + '/20';
    console.log(fecha);
    console.log(mese);

    var newMes = '';
    if (mese == '01') {
      newMes = '12';
      ano = ano - 1;
    } else {
      newMes = (mese - 1).toString();
    }
    this.fechaRango2 = fecha;

    if (Number(newMes) < 10) {
      newMes = '0' + newMes;
    }

    var fecha1 = ano + '/' + newMes + '/21';

    this.fechaRango1 = fecha1;
    this.factorAprobaciones.getAprobacionAge(mese, ano, '1').subscribe({
      next: (response: any) => {
        console.log(response);

        this.dataSource.data = response;
        //  if(this.dataSource.data.length == 0){
        //   this.toastr.info("Aún no se ha creado el registro para el periodo solicitado, regresa el día 21 del periodo seleccionado");
        //  }
      },
      error: (error) => {
        console.log(error);
        this.dataSource.data = [];
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  getAprobacionPeriodoSup() {
    var ano = this.mesActual.substring(0, 4);
    var mese = this.mesActual.substring(5, 7);

    this.factorAprobaciones.getAprobacionSup(mese, ano).subscribe({
      next: (response: any) => {
        console.log(response);

        this.dataSource2.data = response;

      },
      error: (error) => {
        console.log(error);
        this.dataSource2.data = [];
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

}
