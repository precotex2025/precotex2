import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AprobacionesFactoresService } from 'src/app/services/seguridad/aprobaciones-factores.service';
import { DialogAprobacionObservacionComponent } from '../dialogs/dialog-aprobacion-observacion/dialog-aprobacion-observacion.component';

interface data_det {
  idFactorSolBono: number;
  codTrabajador: string;
  tipTrabajador: string;
  tipoUsuario: string;
  codCategoria: string;
  tipoFactor: string;
  administrativo: string;
  fechaRegistro: string;
  idUsuarioEvaluador: number;
  puntaje: number;
  item: number;
  aprobacionSoporte: string;
  aprobacionDirectora: string;
  aprobacionJefe: string;
  ano: string;
  mes: string;
  semana: string;
  flgEstado: string;
  flgActivo: string;
  nombresTrabajador: string;
  segFactorSolBonoDets: string;
}

@Component({
  selector: 'app-factor-sol-aprobacion',
  templateUrl: './factor-sol-aprobacion.component.html',
  styleUrls: ['./factor-sol-aprobacion.component.css']
})
export class FactorSolAprobacionComponent implements OnInit {

  displayedColumns: string[] = [
    'nombresTrabajador',
    'factor1',
    'factor2',
    'factor3',
    'factor4',
    'factor5',
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





  columnsToDisplay: string[] = this.displayedColumns.slice();
  columnsToDisplay2: string[] = this.displayedColumns2.slice();

  dataForExcel = [];
  dataForDelete: Array<number> = [];
  agenteSeguridad: any = "";
  mesActual: any = "";
  fechaRango1: any = "";
  fechaRango2: any = "";
  dataAgentes: Array<any> = [];


  dataSource!: MatTableDataSource<data_det>;
  dataSource11!: MatTableDataSource<data_det>;
  dataSource12!: MatTableDataSource<data_det>;
  dataSource13!: MatTableDataSource<data_det>;

  dataSource2!: MatTableDataSource<data_det>;
  dataSourceo!: MatTableDataSource<data_det>;
  dataSource12o!: MatTableDataSource<data_det>;
  dataSource13o!: MatTableDataSource<data_det>;

  idUsuario:any;

  dataSupervisores: MatTableDataSource<data_det> = new MatTableDataSource();
  constructor(
    public dialog: MatDialog,
    private spinnerService: NgxSpinnerService,
    private factorAprobaciones: AprobacionesFactoresService,
    private toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource();
    this.dataSource2 = new MatTableDataSource();
    this.dataSource11 = new MatTableDataSource();
    this.dataSource12 = new MatTableDataSource();
    this.dataSource13 = new MatTableDataSource();
    this.dataSourceo = new MatTableDataSource();
    this.dataSource12o = new MatTableDataSource();
    this.dataSource13o = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('idUsuario');
    
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

    this.getAprobacionPeriodo();
  }

  getAprobacionPeriodo() {
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
    this.factorAprobaciones.getPlanSolAge(this.fechaRango1, this.fechaRango2).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getAprobacionSup();
        this.dataForExcel = response;
        this.dataSource.data = this.dataForExcel.filter((element: any) => {
          return element.administrativo == "1" && element.item == 1
        });

        this.dataSource2.data = this.dataForExcel.filter((element: any) => {
          return element.administrativo == "2" && element.item == 1
        });

        console.log(this.dataForExcel);
        this.dataSource11.data = this.dataForExcel.filter((element: any) => {
          return element.administrativo == "1" && element.item == 2
        });

        this.dataSourceo.data = this.dataForExcel.filter((element: any) => {
          return element.administrativo == "2" && element.item == 2
        });


        this.dataSource12.data = this.dataForExcel.filter((element: any) => {
          return element.administrativo == "1" && element.item == 3
        });

        this.dataSource12o.data = this.dataForExcel.filter((element: any) => {
          return element.administrativo == "2" && element.item == 3
        });

        this.dataSource13.data = this.dataForExcel.filter((element: any) => {
          return element.administrativo == "1" && element.item == 4
        });

        this.dataSource13o.data = this.dataForExcel.filter((element: any) => {
          return element.administrativo == "2" && element.item == 4
        });


        if (this.dataForExcel.length == 0) {
          this.toastr.info("Aún no se ha creado el registro para el periodo solicitado, regresa el día 21 del periodo seleccionado");
        }
      },
      error: (error) => {
        console.log(error);
        this.dataForExcel = [];
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  getAprobacionSup() {

    this.factorAprobaciones.getSolAprobacionSup(this.fechaRango1, this.fechaRango2).subscribe({
      next: (response: any) => {
        console.log(response);

        this.dataSupervisores.data = response;

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
  changeAprobacion(event: any, campo: string, idFactorBono: number) {
    let datos = {
      valor: event.value,
      campo: campo,
      idFactorBono: idFactorBono,
      observaciones: ''
    };
    console.log(event);
    if (event.value == '0') {
      let dialogRef = this.dialog.open(DialogAprobacionObservacionComponent, {
        disableClose: true,
        panelClass: 'my-class',
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        console.log(result);
        if (result == 'false') {
          this.getAprobacionPeriodo();
        } else {
          let datos = {
            valor: event.value,
            campo: campo,
            idFactorBono: idFactorBono,
            observaciones: result
          };
          this.spinnerService.show();
          this.factorAprobaciones.guardarAprobacionSol(datos).subscribe({
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
      })
    } else {
      this.spinnerService.show();
      this.factorAprobaciones.guardarAprobacionSol(datos).subscribe({
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


}
