
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


interface data_det {
  codActivoFijo: number;
  codActivo: number;
  claseActivo: string;
  responsable: string;
  empresa: string;
}

@Component({
  selector: 'app-depreciacion-activo',
  templateUrl: './depreciacion-activo.component.html',
  styleUrls: ['./depreciacion-activo.component.css']
})
export class DepreciacionActivoComponent implements OnInit {

  dataForExcel = [];
  dataForDelete: Array<number> = [];


  displayedColumns: string[] = [
    'codActivo',
    'claseActivo',
    'responsable',
    'empresa',
    'acciones'
  ];

  dataSource!: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor(
    private controlActivoFijoService: ControlActivoFijoService,
    public dialog: MatDialog,
    private _router: Router,
    private toastr: ToastrService) {
      this.dataSource = new MatTableDataSource(); 
  }

  ngOnInit(): void {
  }

  regresar(){
    this._router.navigate(['pages/activos/OpcionesActivos']);
  }

  onChangeFile(event:any){
    console.log(event)
  }

  EliminarRegistro(data:data_det){

  }
}
