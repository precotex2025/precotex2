
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';


interface data_det {
  codActivoFijo: number;
  codActivo: number;
  claseActivo: string;
  responsable: string;
  empresa: string;
}

@Component({
  selector: 'app-baja-activos',
  templateUrl: './baja-activos.component.html',
  styleUrls: ['./baja-activos.component.css']
})
export class BajaActivosComponent implements OnInit {
  dataForExcel = [];
  dataForDelete: Array<number> = [];
  file:any;

  displayedColumns: string[] = [
    'codActivo',
    'tipoActivo',
    'claseActivo',
    'nomResponsable',
    'acciones'
  ];

  dataActivos:Array<any> = [];
  codActivo:string = '';
  tipoBaja:any = '';
  observacionBaja: string = '';
  mostrarError:boolean = false;
  dataSource!: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor(
    private controlActivoFijoService: ControlActivoFijoService,
    public dialog: MatDialog,
    private SpinnerService: NgxSpinnerService,
    private _router: Router,
    private toastr: ToastrService) {
      this.dataSource = new MatTableDataSource(); 
  }

  ngOnInit(): void {
  }
  eliminarArchivo(){
    this.file = null;
  }
  regresar(){
    this._router.navigate(['pages/activos/OpcionesActivos']);
  }

  onChangeFile(event:any){
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];

    }
  }

  EliminarRegistro(data:data_det){
    this.dataActivos = this.dataActivos.filter(element => {
      return element.codActivoFijo !== data.codActivoFijo
    });

    this.dataSource.data = this.dataActivos;
  }

  agregarDataTabla() {

      if (this.codActivo != '') {
        this.controlActivoFijoService.ObtenerActivoFijoCodigo(this.codActivo).subscribe({
          next: (response: any) => {
            if (response && response != null) {
              var valor = 0;

              if(this.dataActivos.length > 0){
                var array = this.dataActivos.filter(element => {
                  return element.codActivo == response['codActivo']
                });
                if(array.length == 0){
                  this.dataActivos.push(response);
                  this.codActivo = '';
                  this.toastr.success('Registro agregado correctamente', 'Cerrar', {
                    timeOut: 2500,
                  });
                  this.dataSource.data = this.dataActivos;
                }else{
                  this.toastr.info('Registro se agrego anteriormente', 'Cerrar', {
                    timeOut: 2000,
                  });
                }
              }else{
                this.dataActivos.push(response);
                this.dataSource.data = this.dataActivos;
                this.codActivo = '';
                this.toastr.success('Registro agregado correctamente', 'Cerrar', {
                  timeOut: 2500,
                });
              }
            }
          },
          error: (error) => {
            console.log(error)
          }
        });
      }else{
        this.toastr.warning('Debes insertar el código del activo para agregar.', 'Cerrar', {
          timeOut: 2500,
        });
      }
  }

  guardarBajaActivos(){
    if(this.tipoBaja != ''){
      if(this.dataActivos.length > 0){
        if(this.file != undefined && this.file != null){
          const formData = new FormData();
          var dataActivos = JSON.stringify(this.dataActivos);
          formData.append('dataActivos', dataActivos)
          formData.append('tipoBaja', this.tipoBaja )
          formData.append('documento', this.file)
          formData.append('observacionBaja', this.observacionBaja);

          this.SpinnerService.show();
          this.controlActivoFijoService.guardarActasBajaActivo(formData).subscribe({
            next: (response: any) => {
              console.log(response);
              if(response.status == 1){
                this.SpinnerService.hide();
                this.toastr.success(response.respuesta, 'Cerrar', {
                  timeOut: 2500,
                });
                this.tipoBaja = '';
                this.observacionBaja = '';
                this.dataActivos = [];
                this.dataSource.data = this.dataActivos;
                this.file = null;
              }else{
                this.SpinnerService.hide();
                this.toastr.warning(response.respuesta, 'Cerrar', {
                  timeOut: 2500,
                });
              }
            },
            error: (error) => {
              console.log(error)
              this.SpinnerService.hide();
              this.toastr.error('Ha ocurrido un error al guardar el documento.', 'Cerrar', {
                timeOut: 2500,
              });
            }
          });
        }else{
          this.toastr.warning('Adjuntar el acta de baja es obligatorio.', 'Cerrar', {
            timeOut: 2500,
          });  
        }
      }else{
        this.toastr.warning('Debes agregar al menos un activo para realizar la baja', 'Cerrar', {
          timeOut: 2500,
        });
      }
    }else{
      this.toastr.warning('Debes seleccionar el tipo de baja', 'Cerrar', {
        timeOut: 2500,
      });
      this.mostrarError = true;
    }
    
  }

  irHistorial(){
    this._router.navigate(['/pages/activos/historialBajas']);   
  }
}
