import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExceljsService } from 'src/app/services/exceljs.service';
import { AprobacionesFactoresService } from 'src/app/services/seguridad/aprobaciones-factores.service';
interface data_det {
  cantidad: number;
  codTrabajador: string;
  nombreTrabajador: string;
  tipTrabajador: string;
}
@Component({
  selector: 'app-reportes-sol-agentes',
  templateUrl: './reportes-sol-agentes.component.html',
  styleUrls: ['./reportes-sol-agentes.component.css']
})
export class ReportesSolAgentesComponent implements OnInit {
  mesActual: any = "";
  fechaRango1: any = "";
  fechaRango2: any = "";

  displayedColumns: string[] = [
    'tipTrabajador',
    'codTrabajador',
    'nombreTrabajador',
    'cantidad'
  ]

  dataAgentes: Array<any> = [];
  dataAgentesAdmin: Array<any> = [];

  dataSource!: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataForExcel: any = [];
  dataSourceExcel: any = [];

  administrativo: any = "1";

  dataForExcel2: any = [];
  dataSourceExcel2: any = [];
  dataAgentes2: any = [];
  dataAgentesAdmin2: any = [];
  constructor(private _router: Router, private aprobacionesService: AprobacionesFactoresService, private toastr: ToastrService, private exceljsService: ExceljsService,
    private SpinnerService: NgxSpinnerService) {
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

    this.getResumen();
  }

  regresar() {
    this._router.navigate(['pages/seguridad/SolAgentes']);
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

    this.getResumen();
  }


  generarReporte() {
    console.log(this.administrativo);
    if (this.administrativo != '') {
      this.dataForExcel = [];
      this.dataSourceExcel = [];
      this.dataAgentes = [];
      this.dataAgentesAdmin = [];
      var ano = this.mesActual.substring(0, 4);
      var mese = this.mesActual.substring(5, 7);

      var fecha = ano + '/' + mese + '/25';
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

      var fecha1 = ano + '/' + newMes + '/26';

      this.fechaRango1 = fecha1;
      this.SpinnerService.show();
      this.aprobacionesService.getPlanSolAge(this.fechaRango1, this.fechaRango2).subscribe({
        next: (response: any) => {
          console.log(response);
          this.SpinnerService.hide();
          this.dataForExcel = response;
          this.dataAgentes = response;
          this.dataAgentes.forEach((item: any) => {
            let datos = {
              Periodo: mese + '-' + ano,
              ['Usuario Evaluador']: item.administrativo,
              Semana: 'Semana ' + item.item,
              Trabajador: item.nombresTrabajador,
              Tipo: 'Administrativo Operativo',
              ['Inducción puesto / Capacitación']: item.segFactorSolBonoDets[0].puntaje,
              ['EPPs / Uniforme']: item.segFactorSolBonoDets[1].puntaje,
              ['Materiales e insumos rotulados y organizados']: item.segFactorSolBonoDets[2].puntaje,
              ['Area limpia y Ordenadas']: item.segFactorSolBonoDets[3].puntaje,
              ['Zona segura y equipos de emergencia sin obstrucción']: item.segFactorSolBonoDets[4].puntaje,
              Puntaje: item.puntaje
            }
            this.dataAgentesAdmin.push(datos);
          })

          if (this.dataAgentesAdmin.length > 0) {
            this.dataAgentesAdmin.forEach((row: any) => {
              this.dataSourceExcel.push(Object.values(row))
            })

            let reportData = {
              title: 'PLAN SOL (AGENTES)',
              data: this.dataSourceExcel,
              headers: Object.keys(this.dataAgentesAdmin[0])
            }

            this.exceljsService.exportExcel(reportData);
          } else {
            this.toastr.error('No se encontraron registros.', 'Cerrar', {
              timeOut: 2500,
            });
          }
        },
        error: (error) => {
          console.log(error);
          this.dataForExcel = [];
          this.SpinnerService.hide();
          this.toastr.error(error.error.message, 'Cerrar', {
            timeOut: 2500,
          });
        }
      });
    } else {
      this.toastr.info("Debes seleccionar un Tipo");
    }

  }

  generarReporte2() {
    if (this.administrativo != '') {
      this.dataForExcel2 = [];
      this.dataSourceExcel2 = [];
      this.dataAgentes2 = [];
      this.dataAgentesAdmin2 = [];

      this.dataSource.data.forEach((item: any) => {
        let datos = {
          ['Tipo Trabajador']: item.tipTrabajador,
          ['Cod. Trabajador']: item.codTrabajador,
          ['Nombres Trabajador']: item.nombreTrabajador,
          ['Cantidad Evaluaciones']: item.cantidad
        }
        this.dataAgentesAdmin2.push(datos);
      })

      if (this.dataAgentesAdmin2.length > 0) {
        this.dataAgentesAdmin2.forEach((row: any) => {
          this.dataSourceExcel2.push(Object.values(row))
        })

        let reportData = {
          title: 'PLAN SOL (AGENTES)',
          data: this.dataSourceExcel2,
          headers: Object.keys(this.dataAgentesAdmin2[0])
        }

        this.exceljsService.exportExcel(reportData);
      } else {
        this.toastr.error('No se encontraron registros.', 'Cerrar', {
          timeOut: 2500,
        });
      }
    }
  }

  getResumen() {

    this.SpinnerService.show();
    var ano = this.mesActual.substring(0, 4);
    var mese = this.mesActual.substring(5, 7);

    var fecha = ano + '/' + mese + '/25';
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

    var fecha1 = ano + '/' + newMes + '/26';

    this.fechaRango1 = fecha1;
    this.aprobacionesService.getResumenPlanSolAge(this.fechaRango1, this.fechaRango2).subscribe({
      next: (response: any) => {
        console.log(response);
        this.SpinnerService.hide();
        this.dataSource.data = response;
      },
      error: (error) => {
        console.log(error);
        this.dataForExcel = [];
        this.SpinnerService.hide();
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }
}