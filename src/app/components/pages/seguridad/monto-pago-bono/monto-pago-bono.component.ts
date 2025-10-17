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


interface data_det {
  idCriterio: number;
  codCategoria:string;
  factorBono: string;
  montoBono: string;
}
@Component({
  selector: 'app-monto-pago-bono',
  templateUrl: './monto-pago-bono.component.html',
  styleUrls: ['./monto-pago-bono.component.css']
})
export class MontoPagoBonoComponent implements OnInit {

  displayedColumns: string[] = [
    'factorBono',
    'codCategoria',
    'montoBono'
  ]
  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataForExcel = [];
  dataForDelete: Array<number> = [];
  agenteSeguridad:any = "";

  dataAgentes:Array<any> = [];

  constructor(
    private factorService: FactorPlanSolService,
    public dialog: MatDialog,

    private toastr: ToastrService,
) { this.dataSource = new MatTableDataSource(); }


  ngOnInit(): void {
    this.getMontosBono();
  }


  getMontosBono(){
    this.factorService.getMontosBono().subscribe({
      next: (response:any) => {
        console.log(response);
        if(response != null){
            this.dataSource.data = response;
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



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {

  }

}
