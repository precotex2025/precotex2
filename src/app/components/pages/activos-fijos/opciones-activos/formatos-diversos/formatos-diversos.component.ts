
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


interface data_det {
  codActivoFijo: number;
  codActivo: number;
  claseActivo: string;
  responsable: string;
  empresa: string;
}
@Component({
  selector: 'app-formatos-diversos',
  templateUrl: './formatos-diversos.component.html',
  styleUrls: ['./formatos-diversos.component.css']
})
export class FormatosDiversosComponent implements OnInit {

  dataForExcel = [];
  dataForDelete: Array<number> = [];


  displayedColumns: string[] = [
    'codActivo',
    'tipoActivo',
    'claseActivo',
    'nomResponsable',
    'acciones'
  ];

  dataSource!: MatTableDataSource<data_det>;
  formato: string = '';
  columnsToDisplay: string[] = this.displayedColumns.slice();

  formulario = this.formBuilder.group({
    //-----------NUEVO
    codActivo: ['',],
    nroGuia: ['',],
    sede: ['', Validators.required],
    solicitante: ['', Validators.required],
    responsable: ['', Validators.required],
    codCenCost: ['', Validators.required],
    fecha: ['', Validators.required],
    dataActivos: ['', Validators.required],
    motivo: ['', Validators.required],
    observaciones: ['',],
    mantenimiento: ['', Validators.required]
  });

  formulario2 = this.formBuilder.group({
    //-----------NUEVO
    empresa: ['', Validators.required],
    ruc: ['', Validators.required],
    direccion: ['', Validators.required],
    distrito: ['', Validators.required],
    provincia: ['', Validators.required],
    cargoRepresentante: ['', Validators.required],
    representante: ['', Validators.required],
    dniRepresentante: ['', Validators.required],
    partidaElectronica: ['', Validators.required],
    empresaReceptora: ['', Validators.required],
    representateReceptor: ['', Validators.required],
    rucReceptor: ['', Validators.required],
    direccionReceptor: ['', Validators.required],
    distritoReceptor: ['', Validators.required],
    rubro: ['', Validators.required],
    inicioActividades: ['', Validators.required],
    fechaPrestamo: ['', Validators.required],
    fechaFinPrestamo: ['', Validators.required],
    tipoActivo: ['', Validators.required],
    codigoActivo: ['', Validators.required],
    usoExclusivo: ['', Validators.required],
  });

  dataActivos: any = [];
  dataSedes: Array<any> = [];

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

  onChangeFile(event: any) {
    console.log(event)
  }


  changeFormato(event: any) {
    console.log(event);
    this.formato = event.value;
    if (event.value == 4) {
      this.selectEmpresa(1);
    }
  }

  selectEmpresa(Accion: any) {
    this.controlActivoFijoService.MostrarSedePorEmpresaService(
      Accion
    ).subscribe(
      (result: any) => {
        this.dataSedes = result
      })
  }
  EliminarRegistro(data: data_det) {
    this.dataActivos = this.dataActivos.filter((element: any) => {
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
              if (this.dataActivos.length > 0) {
                var array = this.dataActivos.filter((element: any) => {
                  return element.codActivo == response['codActivo']
                });
                if (array.length == 0) {
                  this.dataActivos.push(response);
                  this.formulario.patchValue({
                    codActivo: ''
                  });
                  this.toastr.success('Registro agregado correctamente', 'Cerrar', {
                    timeOut: 2500,
                  });
                  this.dataSource.data = this.dataActivos;
                } else {
                  this.toastr.info('Registro se agrego anteriormente', 'Cerrar', {
                    timeOut: 2000,
                  });
                }
              } else {
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
              if (this.dataActivos.length > 0) {
                response.filter((elemento: any) => {
                  var valor = 0;
                  var array = this.dataActivos.filter((element: any) => {
                    return element.codActivo == elemento['codActivo']
                  })

                  if (array.length == 0) {
                    this.dataActivos.push(elemento);
                  }
                });
              } else {
                response.filter((elemento: any) => {
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

  exportarFormatos() {
    if (this.dataActivos.length > 0) {
      this.formulario.patchValue({
        dataActivos: this.dataActivos
      });
    } else {
      this.toastr.warning('Debes agregar al menos un activo.', 'Cerrar', {
        timeOut: 2500,
      });
      return;
    }

    if (this.formulario.valid) {
      console.log(this.formulario);
      var nombre = 'FormatoBajaActivos.pdf';
      this.toastr.info('Se esta generando el formato.', 'Cerrar', {
        timeOut: 2500,
      });
  
      this.controlActivoFijoService.descargarFormatoBaja(this.formulario.value, nombre);
      this.formulario.reset();
      this.dataActivos = [];
      this.dataSource.data = this.dataActivos;
    } else {
      this.toastr.warning('Completa los campos obligatorios.', 'Cerrar', {
        timeOut: 2500,
      });
    }
  }

  obtenerActivo() {
    var codActivo = this.formulario2.get('codigoActivo')?.value;


    if (codActivo?.length == 9) {
      console.log(codActivo)
      this.controlActivoFijoService.ObtenerActivoFijoCodigo(codActivo).subscribe({
        next: (response: any) => {
          if (response && response != null) {
            this.SpinnerService.hide();
            this.toastr.info('Código de activo válido', 'Cerrar', {
              timeOut: 2500,
            });
            
          }
        },
        error: (error) => {
          console.log(error)
          this.formulario2.patchValue({
            codigoActivo: ''
          })
          this.SpinnerService.hide();
          // this.toastr.error(error.message, 'Cerrar', {
          //   timeOut: 2500,
          // });
        }
      });
    }
  }

  exportarFormatoPrestamo() {
    if (this.formulario2.valid) {
      console.log(this.formulario2.value);
      var nombre = 'FormatoPrestamos.pdf';
      this.toastr.info('Se esta generando el formato.', 'Cerrar', {
        timeOut: 2500,
      });
      this.controlActivoFijoService.downloadPdfPrestamo(this.formulario2.value, nombre);
      this.formulario2.reset();
    } else {
      this.toastr.warning('Completa los campos obligatorios.', 'Cerrar', {
        timeOut: 2500,
      });
    }
  }
}
