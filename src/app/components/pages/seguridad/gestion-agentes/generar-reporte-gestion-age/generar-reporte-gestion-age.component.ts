import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExceljsService } from 'src/app/services/exceljs.service';
import { AprobacionesFactoresService } from 'src/app/services/seguridad/aprobaciones-factores.service';

@Component({
  selector: 'app-generar-reporte-gestion-age',
  templateUrl: './generar-reporte-gestion-age.component.html',
  styleUrls: ['./generar-reporte-gestion-age.component.css']
})
export class GenerarReporteGestionAgeComponent implements OnInit {

  mesActual: any = "";
  fechaRango1: any = "";
  fechaRango2: any = "";
  tipoFactor: any = "1";

  dataAgentes:Array<any> = [];

  dataForExcel:any = [];
  dataSourceExcel:any = [];
  constructor(private _router: Router, private aprobacionesService:AprobacionesFactoresService, private toastr:ToastrService, private exceljsService: ExceljsService) { }

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
  }

  regresar(){
    this._router.navigate(['pages/seguridad/GestionAgentes']);
  }
  getAprobacionPeriodo(){
    var ano = this.mesActual.substring(0, 4);
    var mese = this.mesActual.substring(5, 7);

    var fecha = ano + '/' + mese + '/25';
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

    var fecha1 = ano + '/' + newMes + '/26';

    this.fechaRango1 = fecha1;
  }


  generarReporte(){
    var ano = this.mesActual.substring(0, 4);
    var mese = this.mesActual.substring(5, 7);
    this.dataForExcel = [];
    this.dataSourceExcel = [];
    this.aprobacionesService.getAprobacionAge(mese, ano, this.tipoFactor).subscribe({
      next: (response: any) => {
        console.log(response);
        this.dataAgentes = response;
        if(this.dataAgentes.length > 0){
          this.dataAgentes.forEach((item:any) => {
            let datos = {
              Periodo: mese + '-' + ano,
              Trabajador: item.nombresTrabajador,
              [item.segFactorGestionBonoDets[0].descripcion]: item.segFactorGestionBonoDets[0].puntaje,
              [item.segFactorGestionBonoDets[1].descripcion]: item.segFactorGestionBonoDets[1].puntaje,
              [item.segFactorGestionBonoDets[2].descripcion]: item.segFactorGestionBonoDets[2].puntaje,
              [item.segFactorGestionBonoDets[3].descripcion]: item.segFactorGestionBonoDets[3].puntaje,
              ['Puntaje Total']: item.puntaje,
              Estado: item.puntaje >= 13 ? 'APROBADO' : 'DESAPROBADO'
            };
            this.dataForExcel.push(datos);
          });
        }
        console.log(this.dataForExcel);
        if(this.dataForExcel.length > 0){
          this.dataForExcel.forEach((row: any) => {
            this.dataSourceExcel.push(Object.values(row))
          })
          let reportData = {
            title: 'PLAN GESTION (AGENTES)',
            data: this.dataSourceExcel,
            headers: Object.keys(this.dataForExcel[0])
          }
          this.exceljsService.exportExcel(reportData);
        }else{
          this.toastr.error('No se encontraron registros.', 'Cerrar', {
            timeOut: 2500,
          });  
        }
      },
      error: (error) => {
        console.log(error);

        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }
}
