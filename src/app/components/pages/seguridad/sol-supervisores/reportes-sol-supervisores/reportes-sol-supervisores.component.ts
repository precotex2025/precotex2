import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExceljsService } from 'src/app/services/exceljs.service';
import { AprobacionesFactoresService } from 'src/app/services/seguridad/aprobaciones-factores.service';

@Component({
  selector: 'app-reportes-sol-supervisores',
  templateUrl: './reportes-sol-supervisores.component.html',
  styleUrls: ['./reportes-sol-supervisores.component.css']
})
export class ReportesSolSupervisoresComponent implements OnInit {
  mesActual: any = "";
  fechaRango1: any = "";
  fechaRango2: any = "";

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
    this._router.navigate(['pages/seguridad/SolSupervisores']);
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


  generarReporte(){
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

    this.dataForExcel = [];
    this.dataSourceExcel = [];
    
    this.aprobacionesService.getSolAprobacionSup(this.fechaRango1, this.fechaRango2).subscribe({
      next: (response: any) => {
        console.log(response);

        this.dataAgentes = response;

        if(this.dataAgentes.length > 0){
          this.dataAgentes.forEach((item:any) => {
            let datos = {
              Periodo: mese + '-' + ano,
              Trabajador: item.nombresTrabajador,
              ['Realizar el PLAN SOL de forma semanal']: item.segFactorSolBonoDets[0].puntaje == 5 ? 'SI' : 'NO',
              ['Ingresar las calificaciones del PLAN SOL']: item.segFactorSolBonoDets[1].puntaje == 5 ? 'SI' : 'NO',
              ['Mantener actualizados los resultados en las pizarras']: item.segFactorSolBonoDets[2].puntaje == 5 ? 'SI' : 'NO',
              ['Eelevar reportes del PLAN SOL a Jefetura y Gerencia']: item.segFactorSolBonoDets[3].puntaje == 5 ? 'SI' : 'NO',
              Puntaje: item.puntaje,
              Estado: item.puntaje == 20 ? 'APROBADO' : 'DESAPROBADO'
            }
            this.dataForExcel.push(datos);

          })

          
          this.dataForExcel.forEach((row: any) => {
            this.dataSourceExcel.push(Object.values(row))
          })
    
          let reportData = {
            title: 'PLAN SOL (SUPERVISORES)',
            data: this.dataSourceExcel,
            headers: Object.keys(this.dataForExcel[0])
          }
    
          this.exceljsService.exportExcel(reportData);
        }else{  
          this.toastr.warning('No se encontraron registros.', 'Cerrar', {
            timeOut: 2500,
          });  
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
}
