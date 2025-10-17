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
  selector: 'app-sol-supervisores',
  templateUrl: './sol-supervisores.component.html',
  styleUrls: ['./sol-supervisores.component.css']
})
export class SolSupervisoresComponent implements OnInit {

  displayedColumns: string[] = [
    'criterio',
    'puntaje'
  ]
  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataForExcel = [];
  dataForDelete: Array<number> = [];
  agenteSeguridad: any = "";

  dataSol: any = "";

  dataAgentes: Array<any> = [];
  idUsuario: any = '';
  flgActivo: any = '';
  selection = new SelectionModel<data_det>(true, []);
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
    this.factorSolService.getSupervisoresSeg().subscribe({
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

  getDescripcionActivos() {

  }

  generarReporte(){
    this._router.navigate(['pages/seguridad/ReporteSolSupervisores'], {skipLocationChange:true});
  }

  
  agregarDescripcion() {
    if (this.agenteSeguridad != "") {
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
        administrativo: null,
        tipoUsuario: '2'
      };

      this.factorSolService.crearFactorSolBonoSup(datos).subscribe({
        next: (response: any) => {
          console.log(response);
          this.spinnerService.hide();
          this.dataSol = response;
          this.flgActivo = this.dataSol.flgActivo;
          if (this.dataSol != '') {
            //
            this.toastr.info("Se ha creado correctamente el plan sol para el supervisor de seguridad.");
            this.dataSource.data = this.dataSol.segFactorSolBonoDets;
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
      this.toastr.warning("Debe seleccionar el agente de seguridad.");
    }
  }
  seleccionarAgente(event: any) {
    console.log(event);
    if (event != undefined && event != '') {
      this.agenteSeguridad = event;
    } else {
      this.agenteSeguridad = '';
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {

  }

  actualizarPuntaje(event: any, idSolBonoDet: number) {
    console.log(event);
    var puntaje = event.value;
   

    this.spinnerService.show();
    this.factorSolService.updateFactorSolDet(puntaje, idSolBonoDet).subscribe({
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


