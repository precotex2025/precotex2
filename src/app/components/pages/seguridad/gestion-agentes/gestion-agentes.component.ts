import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


import { SelectionModel } from '@angular/cdk/collections';

import { MatPaginator } from '@angular/material/paginator';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';

import { ColorActivosService } from 'src/app/services/activos/color-activos.service';
import { FactorGestionService } from 'src/app/services/seguridad/factor-gestion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


interface data_det {
  idGestionBonoDet: number;
  idFactorBono: number;
  criterio: string;
  descripcion: string;
  idFactorBonoNavigation: string;
  idUsuarioEvaluador: number,
  puntaje: number;
  puntajeMaximo: number;
  flgEstado: string;
}

@Component({
  selector: 'app-gestion-agentes',
  templateUrl: './gestion-agentes.component.html',
  styleUrls: ['./gestion-agentes.component.css']
})
export class GestionAgentesComponent implements OnInit {
  displayedColumns: string[] = [
    'criterio',
    'descripcion',
    'puntaje',
    'puntajeMaximo'
  ]
  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataForExcel = [];
  dataForDelete: Array<number> = [];
  agenteSeguridad: any = "";
  tipoFactor: any = "";

  dataAgentes: Array<any> = [];
  dataGestion: any = '';
  flgActivo: any = '';
  selection = new SelectionModel<data_det>(true, []);
  idUsuario = "";
  constructor(
    private factorGestionService: FactorGestionService,
    public dialog: MatDialog,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private _router: Router,
  ) { this.dataSource = new MatTableDataSource(); }


  ngOnInit(): void {
    this.getSegAgentes();
  }


  getSegAgentes() {
    this.factorGestionService.getAgentesSeg().subscribe({
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

  agregarDescripcion() {
    const str = new Date().toLocaleString('en-Es', { year: 'numeric', month: '2-digit', day: '2-digit' });
    var dia = str.substring(3, 5);
    var mes = str.substring(0, 2);
    var anio = str.substring(6, 10);

    if (this.agenteSeguridad != "" && this.tipoFactor != "") {
      //  if (dia == "20") {
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
        tipoFactor: this.tipoFactor,
        tipoUsuario: '1'
      };

      this.factorGestionService.createFactorGestion(datos).subscribe({
        next: (response: any) => {
          console.log(response);
          this.spinnerService.hide();
          if (response != null) {
            this.spinnerService.hide();
            this.dataGestion = response;
            this.flgActivo = response.flgActivo;
            if (this.dataGestion != '') {
              this.toastr.info("Se ha creado correctamente el plan gestión para el agente de seguridad.");

              this.dataSource.data = this.dataGestion.segFactorGestionBonoDets;
            } else {
              this.spinnerService.hide();
            }
          }else{
            this.toastr.warning("Solamente puedes crear el plan gestión los días 20 de cada Mes.");
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
      //} else {
      //  this.toastr.warning("El plan de gestión solamente puedes crearlo el día 20 de cada mes.");
      //}

    } else {
      this.toastr.warning("Debe seleccionar el agente de seguridad y el Tipo de Calificación.");
    }
  }

  generarReporte() {
    this._router.navigate(['pages/seguridad/ReporteGestionAgentes'], { skipLocationChange: true });
  }

  actualizarPuntaje(event: any, idGestionBonoDet: number, puntajeMaximo: number) {
    console.log(event);
    console.log(idGestionBonoDet);
    if (event != null && event != undefined) {
      var puntaje = Number(event.target.value);

      if (puntaje >= 0 && puntaje <= puntajeMaximo) {
        this.spinnerService.show();
        this.factorGestionService.updateFactorGestionDet(puntaje, idGestionBonoDet).subscribe({
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
      } else {
        event.target.value = '';
        this.toastr.warning("Debes insertar un puntaje válido y menor al puntaje máximo.");
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  seleccionarAgente(event: any) {
    console.log(event);
    if (event != undefined && event != '') {
      this.agenteSeguridad = event;
    } else {
      this.agenteSeguridad = '';
    }
  }

}


