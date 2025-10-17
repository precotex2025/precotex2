import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';
import { DialogNietosActivosComponent } from './dialog-nietos-activos/dialog-nietos-activos.component';


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
  empresa:string;
  piso:string;
  area:string;
  centroCosto:string;
  responsable:string;
  codUsuario:string;
  claseActivo:string;
  codActivoPadre:string;
  precioTotal:string;
  tipoActivo:string;
  codActivo:string;
  descripcion:string;
  descripcionMejora:string;
  marca:string;
  modelo:string;
  serie:string;
  color:string;
  medida:string;
  serieMotor:string;
  serieChasis:string;
  placa:string;
  tipoCombustible:string;
  tipoCaja:string;
  cantidadAsiento:string;
  cantidadEje:string;
  anoFabricacion:string;
  usoDesuso:string;
  observacion:string;
  fecRegistro:string;
}
@Component({
  selector: 'app-dialog-familiares-activo',
  templateUrl: './dialog-familiares-activo.component.html',
  styleUrls: ['./dialog-familiares-activo.component.css']
})
export class DialogFamiliaresActivoComponent implements OnInit {
  dataActivos:Array<any> = [];

  
  displayedColumns: string[] = [
    'acciones',
    'empresa',
    'piso',
    'area',
    'centroCosto',
    'responsable',
    'codUsuario',
    'claseActivo',
    'codActivoPadre',
    'precioTotal',
    'tipoActivo',
    'codActivo',
    'descripcion',
    'descripcionMejora',
    'marca',
    'modelo',
    'serie',
    'color',
    'medida',
    'serieMotor',
    'serieChasis',
    'placa',
    'tipoCombustible',
    'tipoCaja',
    'cantidadAsiento',
    'cantidadEje',
    'anoFabricacion',
    'usoDesuso',
    'observacion',
    'fecRegistro'
  ];

  dataSource!: MatTableDataSource<data_det2>;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(public dialogRef: MatDialogRef<DialogFamiliaresActivoComponent>,
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
    this.controlActivoFijoService.getFamiliaActivoFijo(this.data.codActivo).subscribe({
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
        this.toastr.error('Ha ocurrido un error al obtener los adjuntos.', 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  getNietos(data_det: data_det2){
        let dialogRef = this.dialog.open(DialogNietosActivosComponent, {
          disableClose: true,
          panelClass: 'my-class',
          data: data_det,
          minWidth:'90%',
          maxHeight: '90vh'
        });
    
        dialogRef.afterClosed().subscribe(result => {
    
        })
  }
}
