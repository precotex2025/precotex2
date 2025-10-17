import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FactorAsistenciasService } from 'src/app/services/seguridad/factor-asistencias.service';

interface data {
  data: any

}

interface data_det {
  codConcepasist: string;
  codTrabajador:string;
  tipTrabajador: string;
  codFabrica: string;
  codMotivoDm: string;
  entSal: string;
  fecInicio: string;
  fecFin: string;
  fecRegistro: string;
  flgStatus: string;
  minutosRefrigerio: string;
  origen:string;
  secuencia:string;
  tipRegistro: string;
  tgOperario: string;
}

@Component({
  selector: 'app-dialog-detalle-asistencia',
  templateUrl: './dialog-detalle-asistencia.component.html',
  styleUrls: ['./dialog-detalle-asistencia.component.css']
})
export class DialogDetalleAsistenciaComponent implements OnInit {

  displayedColumns: string[] = [
    'codConcepasist',
    'fecRegistro',
    'fecInicio',
    'fecFin'
  ];

  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(public dialogRef: MatDialogRef<DialogDetalleAsistenciaComponent>,
    public dialog: MatDialog,
    private spinnerService: NgxSpinnerService,
    private asistenciasService: FactorAsistenciasService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: data) { 
      this.dataSource = new MatTableDataSource();
    }

  ngOnInit(): void {
    console.log(this.data)
    this.getOperariosRegistros();
  }
  
  getOperariosRegistros(){
    this.spinnerService.show();
    this.asistenciasService.getOperarioRegistros(this.data.data.fecha1, this.data.data.fecha2, this.data.data.codTrabajador, this.data.data.tipTrabajador).subscribe({
      next: (response:any) => {
        console.log(response);
        this.spinnerService.hide();
        this.dataSource.data = response;
        //  if(this.dataSource.data.length == 0){
        //   this.toastr.info("Aún no se ha creado el registro para el periodo solicitado, regresa el día 21 del periodo seleccionado");

        //  }
        
      },
      error: (error) => {
        console.log(error);
        //this.dataSource.data = [];
        this.spinnerService.hide();
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }
}
