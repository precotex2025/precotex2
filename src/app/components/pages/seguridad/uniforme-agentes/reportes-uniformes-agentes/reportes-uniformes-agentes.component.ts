import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExceljsService } from 'src/app/services/exceljs.service';
import { AprobacionesFactoresService } from 'src/app/services/seguridad/aprobaciones-factores.service';

@Component({
  selector: 'app-reportes-uniformes-agentes',
  templateUrl: './reportes-uniformes-agentes.component.html',
  styleUrls: ['./reportes-uniformes-agentes.component.css']
})
export class ReportesUniformesAgentesComponent implements OnInit {

  mesActual: any = "";
  fechaRango1: any = "";
  fechaRango2: any = "";

  dataAgentes:Array<any> = [];

  dataForExcel:any = [];
  dataSourceExcel:any = [];
  constructor(private _router: Router, private aprobacionesService:AprobacionesFactoresService, private toastr:ToastrService, private exceljsService: ExceljsService,
    private SpinnerService:NgxSpinnerService) { }

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
    this._router.navigate(['pages/seguridad/UniformesAgentes']);
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

    this.dataForExcel = [];
    this.dataSourceExcel = [];
    this.SpinnerService.show();
    this.aprobacionesService.reporteFactorUniformeAge(this.fechaRango1, this.fechaRango2).subscribe({
      next: (response: any) => {
        console.log(response);

        this.dataAgentes = response;
        this.SpinnerService.hide();
        if(this.dataAgentes.length > 0){
          this.dataAgentes.forEach((item:any) => {
            let datos = {
              Fecha: item.fechaRegistro.substring(0,10),
              Trabajador: item.nombresTrabajador,
              ['Camisa/Blusa']: item.camisaBlusa == null || item.camisaBlusa == '0' ? 'NO' : 'SI',
              ['Pantalón']: item.pantalon == null || item.pantalon == '0' ? 'NO' : 'SI',
              ['Calzado']: item.calzado == null || item.calzado == '0' ? 'NO' : 'SI',
              ['Chaleco']: item.chaleco == null || item.chaleco == '0' ? 'NO' : 'SI',
              ['Status']: item.flgEstado == null || item.flgEstado == 'D' ? 'DESAPROBADO' : 'APROBADO',
              Observaciones: item.observaciones
            }
            this.dataForExcel.push(datos);

          })

          
          this.dataForExcel.forEach((row: any) => {
            this.dataSourceExcel.push(Object.values(row))
          })
    
          let reportData = {
            title: 'FACTOR UNIFORME (AGENTES)',
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
        this.SpinnerService.hide();
        console.log(error);
        this.dataForExcel = [];
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }
}
