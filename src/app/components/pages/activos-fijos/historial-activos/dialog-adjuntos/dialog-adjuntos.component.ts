import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
@Component({
  selector: 'app-dialog-adjuntos',
  templateUrl: './dialog-adjuntos.component.html',
  styleUrls: ['./dialog-adjuntos.component.css']
})
export class DialogAdjuntosComponent implements OnInit {
  dataActivos:Array<any> = [];
  file:any;
  guardar:boolean = false;
  constructor(public dialogRef: MatDialogRef<DialogAdjuntosComponent>,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService,
    private controlActivoFijoService: ControlActivoFijoService,
    @Inject(MAT_DIALOG_DATA) public data: data_det) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getActivosFijo();
  }

  closeModal() {
    this.dialogRef.close();
  }
  eliminarArchivo(){
    this.file = null;
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
    this.controlActivoFijoService.getDocumentosActivoFijo(this.data.codActivoFijo).subscribe({
      next: (response: any) => {
        if(response.length == 0){
          this.toastr.info('No se encontraron registros.', 'Cerrar', {
            timeOut: 2500
          });
        }
        this.dataActivos = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Ha ocurrido un error al obtener los adjuntos.', 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  onChangeFile(event:any){
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      console.log(this.file);
      
      
    }
  }

  guardarFotos() {
    if (this.file != null && this.file != undefined) {
      this.guardar = true;
      //guardamos en el form
      const formData = new FormData();

      formData.append('codActivoFijo', this.data.codActivoFijo.toString())
      formData.append('tipoDocumento', 'Fotos')
      formData.append('documento', this.file)
      formData.append('observacion', "")
      console.log(this.file);
        if(this.file != null && this.file != undefined){
          this.spinnerService.show();
          this.controlActivoFijoService.saveFotoActivo(formData).subscribe({
            next: (response: any) => {
              console.log(response);
              if(response.status == 1){
                this.guardar = false;
                this.spinnerService.hide();
                this.toastr.success(response.respuesta, 'Cerrar', {
                  timeOut: 2500,
                });
                this.file = null;
                this.getActivosFijo();
              }else{
                this.guardar = false;
                this.spinnerService.hide();
                this.toastr.warning(response.respuesta, 'Cerrar', {
                  timeOut: 2500,
                });
              }
            },
            error: (error) => {
              console.log(error)
              this.guardar = false;
              this.spinnerService.hide();
              this.toastr.error('Ha ocurrido un error al guardar el documento.', 'Cerrar', {
                timeOut: 2500,
              });
            }
          });
        }else{
          this.guardar = false;
          this.toastr.error('Debes seleccionar un documento a subir.', 'Cerrar', {
            timeOut: 2500,
          });
        }
      
    } else {
      this.guardar = false;
      this.toastr.error('Debes seleccionar una imagen.', 'Cerrar', {
        timeOut: 2500,
      });
    }
  }
}
