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

interface data_deta {
  ubicacion: string;
  responsable: string;
  codUsuario: string;
  fechaRegistro: string;
  empresa: string;
  area: string;
  sede: string;
  codCenCost: string;
  nomUsuario: string;
}

@Component({
  selector: 'app-dialog-historial-ubicaciones',
  templateUrl: './dialog-historial-ubicaciones.component.html',
  styleUrls: ['./dialog-historial-ubicaciones.component.css']
})
export class DialogHistorialUbicacionesComponent implements OnInit {
  displayedColumns: string[] = [
    'fechaRegistro',
    'ubicacion',
    'responsable',
    'empresa',
    'sede',
    'area',
    'codCenCost',
    'nomUsuario',
    'codUsuario'
  ];
  dataActivos:Array<any> = [];

  dataSource!: MatTableDataSource<data_deta>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor(public dialogRef: MatDialogRef<DialogHistorialUbicacionesComponent>,
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
    this.spinnerService.show();
      var nombres = item.documento;
      this.controlActivoFijoService.descargarArchivoAdjunto(item, nombres);
      setTimeout(() => {
        this.toastr.success('Se Esta descargando el archivo.', 'Correcto', {
          timeOut: 2500,
        });
        this.spinnerService.hide();  
      }, 1000);
  }

  getActivosFijo() {
    this.controlActivoFijoService.getActivosUbicacion(this.data.codActivoFijo).subscribe({
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
