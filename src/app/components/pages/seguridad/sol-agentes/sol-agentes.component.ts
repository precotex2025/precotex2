import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


import { SelectionModel } from '@angular/cdk/collections';

import { MatPaginator } from '@angular/material/paginator';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';

import { ColorActivosService } from 'src/app/services/activos/color-activos.service';
import { FactorPlanSolService } from 'src/app/services/seguridad/factor-plan-sol.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


interface data_det {
  idGestionBonoDet: number;
  idFactorBono: number;
  criterio: string;
  puntaje: number;
  puntajeMaximo: number;
  flgEstado: string;
}

@Component({
  selector: 'app-sol-agentes',
  templateUrl: './sol-agentes.component.html',
  styleUrls: ['./sol-agentes.component.css']
})
export class SolAgentesComponent implements OnInit {

  displayedColumns: string[] = [
    'criterio',
    'puntaje',
    'puntajeMaximo'
  ]
  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataSol:any = "";
  dataForExcel = [];
  dataForDelete: Array<number> = [];
  agenteSeguridad: any = "";

  dataAgentes: Array<any> = [];
  idUsuario:any = "";
  administrativo: any = "1";
  constructor(
    private factorSolService: FactorPlanSolService,
    public dialog: MatDialog,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private _router:Router,
  ) { this.dataSource = new MatTableDataSource(); }


  ngOnInit(): void {
    this.getSegAgentes();
  }


  getSegAgentes() {
    this.factorSolService.getAgentesSeg().subscribe({
      next: (response: any) => {
        console.log(response);
        if (response != null) {
          this.dataAgentes = response;
        }

      },
      error: (error) => {
        console.log(error);
        this.dataAgentes = [];
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  seleccionarAgente(event: any) {
    console.log(event);
    if (event != undefined && event != '') {
      this.agenteSeguridad = event;
    } else {
      this.agenteSeguridad = '';
    }
  }

  generarReporte(){
    this._router.navigate(['pages/seguridad/ReporteSolAgentes'], {skipLocationChange:true});
  }

  

  agregarDescripcion() {
    if (this.agenteSeguridad != "") {
      if (this.administrativo != '') {
        this.dataSource.data = [];
        this.spinnerService.show();
        console.log(this.agenteSeguridad);
        this.idUsuario = localStorage.getItem('idUsuario')!;
        let datos = {
          codTrabajador: this.agenteSeguridad.codTrabajador,
          codCategoria: this.agenteSeguridad.codCategoria,
          tipTrabajador: this.agenteSeguridad.tipTrabajador,
          nombresTrabajador: this.agenteSeguridad.nombreTrabajador,
          idUsuarioEvaluador: this.idUsuario,
          administrativo :this.administrativo,
          tipoUsuario: '1'
        };

        this.factorSolService.createFactorSolAgente(datos).subscribe({
          next: (response: any) => {
            console.log(response);
            this.spinnerService.hide();
            this.dataSol = response;
            if (this.dataSol != '') {
              //

              this.dataSource.data = this.dataSol.segFactorSolBonoDets;
              if(this.dataSource.data.length == 0){
                this.toastr.warning("Ya se crearon anteriormente las 4 evaluaciones del período para este agente de seguridad.");
              }else{
                this.toastr.info("Se ha creado correctamente el plan sol para el agente de seguridad.");
              }

            } else {
              this.spinnerService.hide();
            }
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
      } else {
        this.toastr.warning("Debe seleccionar el tipo.");
      }

    } else {
      this.toastr.warning("Debe seleccionar el agente de seguridad.");
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {

  }


  actualizarPuntaje(event:any, idSolBonoDet: number, puntajeMaximo: number){
    if(event.target.value != null && event.target.value != undefined){
      this.spinnerService.show();
        this.factorSolService.updateFactorSolDet(event.target.value, idSolBonoDet).subscribe({
          next: (response:any) => {
            console.log(response);
            this.spinnerService.hide();
            if(response.status == 1){
              this.toastr.info(response.respuesta);
            }else{
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


