import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

interface data_det {
  codActivoFijo: number;
  empresa: string;
  sede: string;
  piso: string;
  area: string;
  centroCosto: string;
  responsable: string;
  codUsuario: string;
  claseActivo: string;
  codActivo: string;
  descripcion: string;
  marca: string;
  modelo: string;
  serie: string;
  color: string;
  medida: string;
  serieMotor: string;
  serieChasis: string;
  placa: string;
  tipoCombustible: string;
  tipoCaja: string;
  cantidadAsiento: string;
  cantidadEje: string;
  anoFabricacion: string;
  usoDesuso: string;
  observacion: string;
  fecRegistro: string;
  precioTotal: string;
  depreciacion: string;
  depreciacionMensual: string;
  fechaAlta: string;
  valorActual: string;
}

interface data_deta {
  mes: string;
  anio: string;
  valor: string;
  fecha: string;
  porcentajeDepreciacion: string;
}
@Component({
  selector: 'app-dialog-depreciacion-activo',
  templateUrl: './dialog-depreciacion-activo.component.html',
  styleUrls: ['./dialog-depreciacion-activo.component.css']
})
export class DialogDepreciacionActivoComponent implements OnInit {

  displayedColumns: string[] = [
    'mes',
    'anio',
    'valor',
    'porcentajeDepreciacion'
  ];
  dataActivos:Array<any> = [];

  dataSource!: MatTableDataSource<data_deta>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor(public dialogRef: MatDialogRef<DialogDepreciacionActivoComponent>,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService,
    private controlActivoFijoService: ControlActivoFijoService,
    @Inject(MAT_DIALOG_DATA) public data: data_det) {
      this.dataSource = new MatTableDataSource(); 
    }

  ngOnInit(): void {
    console.log(this.data);
    this.getActivosFijo();
  }

  closeModal() {
    this.dialogRef.close();
  }


  getActivosFijo() {
    this.controlActivoFijoService.getDepreciacionActivo(this.data.codActivoFijo).subscribe({
      next: (response: any) => {
        if(response.length == 0){
          this.toastr.info('No se encontraron registros.', 'Cerrar', {
            timeOut: 2500
          });
        }
        console.log(response);
        this.dataActivos = response;
        this.dataSource.data = this.dataActivos;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Ha ocurrido un error al obtener los adjuntos.', 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }
}
