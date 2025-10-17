
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


interface data_det {
  codActivoFijo: number;
  codActivo: string;
  tipoActivo: string;
  claseActivo: string;
  nomResponsable: string;
  empresa: string;
}

@Component({
  selector: 'app-adjuntar-documentos',
  templateUrl: './adjuntar-documentos.component.html',
  styleUrls: ['./adjuntar-documentos.component.css']
})
export class AdjuntarDocumentosComponent implements OnInit {
  dataForExcel = [];
  dataForDelete: Array<number> = [];
  @ViewChild('inputFile') inputFile!: ElementRef;

  formulario = this.formBuilder.group({
    //-----------NUEVO
    idDocumento: [0],
    codActivo: ['',],
    nroGuia: ['',],
    tipoDocumento: ['', Validators.required],
    documento: ['',],
    observacion: ['',]
  });

  displayedColumns: string[] = [
    'codActivo',
    'tipoActivo',
    'claseActivo',
    'nomResponsable',
    'acciones'
  ];

  submitForm = false;

  dataActivos: Array<any> = [];

  dataSource!: MatTableDataSource<data_det>;

  file:any;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor(
    private controlActivoFijoService: ControlActivoFijoService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _router: Router,
    private SpinnerService: NgxSpinnerService,
    private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
  }

  regresar() {
    this._router.navigate(['pages/activos/OpcionesActivos']);
  }


  EliminarRegistro(data: data_det) {
    this.dataActivos = this.dataActivos.filter(element => {
      return element.codActivoFijo !== data.codActivoFijo
    });

    this.dataSource.data = this.dataActivos;
  }
  agregarDataTabla() {
    if (this.formulario.get('codActivo')?.value != '' || this.formulario.get('nroGuia')?.value) {
      var codActivo = this.formulario.get('codActivo')?.value
      this.SpinnerService.show();
      if (codActivo != '') {
        this.controlActivoFijoService.ObtenerActivoFijoCodigo(codActivo).subscribe({
          next: (response: any) => {
            if (response && response != null) {
              var valor = 0;
              this.SpinnerService.hide();
              if(this.dataActivos.length > 0){
                var array = this.dataActivos.filter(element => {
                  return element.codActivo == response['codActivo']
                });
                if(array.length == 0){
                  this.dataActivos.push(response);
                    this.formulario.patchValue({
                      codActivo: ''
                  });
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
                this.formulario.patchValue({
                  codActivo: ''
                });
                this.toastr.success('Registro agregado correctamente', 'Cerrar', {
                  timeOut: 2500,
                });
              }
              
      
            }
          },
          error: (error) => {
            console.log(error)
            this.SpinnerService.hide();
            // this.toastr.error(error.message, 'Cerrar', {
            //   timeOut: 2500,
            // });
          }
        });
      }

      if (this.formulario.get('nroGuia')?.value != '') {
        this.controlActivoFijoService.ObtenerActivoFijoGuia(this.formulario.get('nroGuia')?.value).subscribe({
          next: (response: any) => {
            if (response.length > 0 && response != null) {
              this.SpinnerService.hide();
              if(this.dataActivos.length > 0){
                response.filter((elemento:any) => {
                  var valor = 0;
                    var array = this.dataActivos.filter(element => {
                      return element.codActivo == elemento['codActivo']
                    })

                  if(array.length == 0){
                    this.dataActivos.push(elemento);
                  }
                });
              }else{
                response.filter((elemento:any) => {
                  this.dataActivos.push(elemento);
                })
              }
              
              this.toastr.success('Registros agregados', 'Cerrar', {
                timeOut: 2500,
              });

              this.dataSource.data = this.dataActivos;
              this.formulario.patchValue({
                nroGuia: ''
              })
            } else {
              this.SpinnerService.hide();
              this.toastr.warning('No se encontraron registros.', 'Cerrar', {
                timeOut: 2500,
              });
            }
          },
          error: (error) => {
            console.log(error)
            this.SpinnerService.hide();
            // this.toastr.error(error.message, 'Cerrar', {
            //   timeOut: 2500,
            // });
          }
        });

      }
    }
  }
  changeCodActivo() {
    if (this.formulario.get('codActivo')?.value != '') {
      this.formulario.patchValue({
        nroGuia: ''
      })
    }
  }
  changeGuia() {
    if (this.formulario.get('nroGuia')?.value != '') {
      this.formulario.patchValue({
        codActivo: ''
      })
    }
  }
  guardarRegistro() {
    this.submitForm = true;
    if (this.formulario.valid) {

      this.submitForm = false;
      //guardamos en el form
      const formData = new FormData();
      var tipoDocumento = this.formulario.get('tipoDocumento')?.value;
      var observacion = this.formulario.get('observacion')?.value;
      var dataActivos = JSON.stringify(this.dataActivos);
      formData.append('dataActivos', dataActivos)
      formData.append('tipoDocumento', tipoDocumento != undefined ? tipoDocumento : '')
      formData.append('documento', this.file)
      formData.append('observacion', observacion != undefined ? observacion : '')
      if(this.dataActivos.length > 0){
        if(this.file != null && this.file != undefined){
          this.SpinnerService.show();
          this.controlActivoFijoService.guardarAdjuntosActivo(formData).subscribe({
            next: (response: any) => {
              console.log(response);
              if(response.status == 1){
                this.SpinnerService.hide();
                this.toastr.success(response.respuesta, 'Cerrar', {
                  timeOut: 2500,
                });
                this.formulario.reset();
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
          this.toastr.error('Debes seleccionar un documento a subir.', 'Cerrar', {
            timeOut: 2500,
          });
        }
      }else{
        this.toastr.error('Debes agregar al menos un activo fijo para asociar con el documento.', 'Cerrar', {
          timeOut: 2500,
        });
      }
      
      
    } else {
      this.toastr.error('Debes llenar los campos obligatorios.', 'Cerrar', {
        timeOut: 2500,
      });
    }
  }
  onChangeFile(event:any){
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      console.log(this.file);
      
      
    }
  }

  eliminarArchivo(){
    this.file = null;
  }
  get f() { return this.formulario.controls; }
}
