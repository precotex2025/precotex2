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
}

interface data_det2 {
  idPrestamos: number;
  codActivoFijo: number;
  tipo: number;
  responsable: string;
  proveedor: string;
  fechaInicio: string;
  fechaFin: string;
  fechaRegistro: string;
  documentoGuia: string;
  documentoOrden:string;
  documentoContratoPrestamo: string;
  codUsuario: string;
}
@Component({
  selector: 'app-dialog-prestamos-reparaciones',
  templateUrl: './dialog-prestamos-reparaciones.component.html',
  styleUrls: ['./dialog-prestamos-reparaciones.component.css']
})
export class DialogPrestamosReparacionesComponent implements OnInit {

  dataActivos:Array<any> = [];

  displayedColumns: string[] = [
    'codActivoFijo',
    'tipo',
    'responsable',
    'proveedor',
    'fechaInicio',
    'fechaFin',
    'fechaRegistro',
    'codUsuario',
    'documentoGuia',
    'documentoOrden',
    'documentoContratoPrestamo'
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<data_det>;
  constructor(public dialogRef: MatDialogRef<DialogPrestamosReparacionesComponent>,
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

  descargarArchivo(item:any) {
    console.log(item);
    this.toastr.info('Se esta descargando el archivo', 'Información');
    this.controlActivoFijoService.descargarArchivosPrestamo(item, item);
  }

  getActivosFijo() {
    this.controlActivoFijoService.getPrestamosActivo(this.data.codActivoFijo).subscribe({
      next: (response: any) => {
        if(response.length == 0){
          this.toastr.info('No se encontraron registros.', 'Cerrar', {
            timeOut: 2500
          });
        }
        this.dataActivos = response;
        this.dataSource.data = this.dataActivos;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Ha ocurrido un error al obtener los datos.', 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }
}
