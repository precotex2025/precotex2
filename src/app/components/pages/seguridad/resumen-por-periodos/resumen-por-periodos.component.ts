import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExceljsFechaService } from 'src/app/services/exceljsfecha.service';
import { AprobacionesFactoresService } from 'src/app/services/seguridad/aprobaciones-factores.service';
import * as _moment from 'moment';
@Component({
  selector: 'app-resumen-por-periodos',
  templateUrl: './resumen-por-periodos.component.html',
  styleUrls: ['./resumen-por-periodos.component.css']
})
export class ResumenPorPeriodosComponent implements OnInit {

  mesActual: any = "";
  fechaRango1: any = "";
  fechaRango2: any = "";

  dataAgentes:Array<any> = [];

  dataForExcel:any = [];
  dataSourceExcel:any = [];
  constructor(private _router: Router, private aprobacionesService:AprobacionesFactoresService, private toastr:ToastrService, private exceljsService: ExceljsFechaService) { }

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

    var nombreFecha = this.fechaRango1 + ' - ' + this.fechaRango2;
    this.dataForExcel = [];
    this.dataSourceExcel = [];
    this.aprobacionesService.getPagosBono(mese, ano).subscribe({
      next: (response: any) => {
        console.log(response);
        this.dataAgentes = response;
        if(this.dataAgentes.length > 0){
          this.dataAgentes.forEach((item:any) => {
            console.log();
            var monto = 0;
            var uniformes = 0;
            if(item['BONO UNIFORMES'] != '' && item['BONO UNIFORMES'] != undefined){
              uniformes = item['BONO UNIFORMES'];
            }else{
              uniformes = 0;
            }

            let total = Number(item['BONO ASISTENCIA Y PUNTUALIDAD'] + item['BONO PLAN GESTION'] + item['BONO PLAN SOL'] + uniformes);
            console.log(total);
            if(!Number.isNaN(total)){
              monto = total;
            }else{
              monto = 0;
            }
            let datos = {
              Periodo: mese + '-' + ano,
              Trabajador: item.Nombres_Trabajador.trim(),
              ['DNI']: item.Nro_Dni,
              ['Fecha Ingreso']: _moment(item.Fec_Ingreso.valueOf()).format('DD/MM/YYYY') ,
              ['Tipo']: item.Cargo.trim() == '1' ? 'AGENTE DE SEGURIDAD' : 'SUPERVISOR DE SEGURIDAD',
              ['Cod. Categoria']: item.Cod_Categoria,
              ['Cod. Trabajador']: item.Tip_Trabajador + item.Cod_Trabajador,
              ['BONO ASISTENCIA Y PUNTUALIDAD']: Number(item['BONO ASISTENCIA Y PUNTUALIDAD']),
              ['BONO PLAN GESTION']:item['BONO PLAN GESTION'] != undefined ? Number(item['BONO PLAN GESTION'].toFixed(2)) : 0,
              ['BONO PLAN SOL']: item['BONO PLAN SOL']  != undefined ? Number(item['BONO PLAN SOL'].toFixed(2)) : 0,
              ['BONO UNIFORMES']: item['BONO UNIFORMES'] != undefined ? Number(item['BONO UNIFORMES'].toFixed(2)) : 0,
              ['TOTAL PAGO']: monto,
              ['Días no Trabajados']: 30 - Number(item.Dias_Trabajados),
              ['Dias Trabajados']: item.Dias_Trabajados
            };
            this.dataForExcel.push(datos);
          });
        }

       
        if(this.dataForExcel.length > 0){
          this.dataForExcel.forEach((row: any) => {
            this.dataSourceExcel.push(Object.values(row))
          })
    
          let reportData = {
            title: 'REPORTE PAGO DE BONOS',
            data: this.dataSourceExcel,
            headers: Object.keys(this.dataForExcel[0])
          }
    
          this.exceljsService.exportExcel(reportData, nombreFecha);
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
