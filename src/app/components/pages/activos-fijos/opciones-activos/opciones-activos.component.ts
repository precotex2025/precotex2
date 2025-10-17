
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones-activos',
  templateUrl: './opciones-activos.component.html',
  styleUrls: ['./opciones-activos.component.css']
})
export class OpcionesActivosComponent implements OnInit {

  dataForExcel = [];
  dataForDelete: Array<number> = [];

  constructor(
    private controlActivoFijoService: ControlActivoFijoService,
    public dialog: MatDialog,
    private _router: Router,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
  }
  adjuntarDocumentos() {
    this._router.navigate(['/pages/activos/AdjuntarDocumentos']);
  }
  bajaActivos() {
    this._router.navigate(['/pages/activos/BajaActivos']);
  }
  reporteMejoras() {
    this._router.navigate(['/pages/activos/ReporteMejoras']);
  }
  formatosDiversos() {
    this._router.navigate(['/pages/activos/FormatosDiversos']);
  }
  depreciacionActivos() {
    this._router.navigate(['/pages/activos/DepreciacionActivo']);
  }
  historialUbicaciones() {
    this._router.navigate(['/pages/activos/HistorialUbicaciones']);
  }
  valorSede() {
    this._router.navigate(['/pages/activos/ValorSedeCentro']);
  }
  resumenGeneral() {
    this._router.navigate(['/pages/activos/ResumenGeneral']);
  }
  historialInventarios() {
    this._router.navigate(['/pages/activos/HistorialInventarios']);
  }
  asignarResponsable() {
    this._router.navigate(['/pages/activos/AsignarResponable']);
  }
  prestamosReparaciones() {
    this._router.navigate(['/pages/activos/PrestamosReparaciones']);
  }
  historialActivos() {
    this._router.navigate(['/pages/activos/HistorialActivos']);
  }
}
