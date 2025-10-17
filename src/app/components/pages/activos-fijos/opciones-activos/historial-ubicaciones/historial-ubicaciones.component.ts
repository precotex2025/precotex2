
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, Validators } from '@angular/forms';


interface data_det {
  idHistorial: number;
  codActivoFijo: number;
  ubicacion: string;
  responsable: string;
  codUsuario: string;
  fechaRegistro: string;
  flgEstado: string;
}

@Component({
  selector: 'app-historial-ubicaciones',
  templateUrl: './historial-ubicaciones.component.html',
  styleUrls: ['./historial-ubicaciones.component.css']
})
export class HistorialUbicacionesComponent implements OnInit {

  dataForExcel = [];
  dataForDelete: Array<number> = [];
  dataSedes: Array<any> = [];
  dataEmpresas: Array<any> = [];


  displayedColumns: string[] = [
    'ubicacion',
    'responsable',
    'fechaRegistro'
  ];

  formulario = this.formBuilder.group({
    //-----------NUEVO
    idHistorial: [0],
    codActivoFijo: ['',],
    ubicacion: ['', Validators.required],
    responsable: ['', Validators.required],
    sede: ['', Validators.required],
    area: ['', Validators.required],
    codEmpresa: ['', Validators.required],
    codCenCost: ['', Validators.required],
    nomUsuario: ['', Validators.required],
    codUsuario: ['',]
  });

  dataHistorial:Array<any> = [];
  codActivo:string = '';
  dataSource!: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataActivo:any = '';
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
    this.cargarEmpresas();
  }

  regresar(){
    this._router.navigate(['pages/activos/OpcionesActivos']);
  }

  onChangeFile(event:any){
    console.log(event)
  }

  EliminarRegistro(data:data_det){

  }

  obtenerHistorialUbicacion(){
    this.SpinnerService.show();
    this.controlActivoFijoService.getHistorialActivos(this.codActivo).subscribe({
      next: (response: any) => {
          this.getActivoFijo();
          if(response.length > 0){
            this.dataHistorial = response;
            this.dataSource.data = this.dataHistorial;
            this.SpinnerService.hide();
          }else{
            this.toastr.info('No se encontraron registros.', 'Cerrar', {
              timeOut: 2500,
            });
            this.SpinnerService.hide();
            this.dataHistorial = [];
            this.dataSource.data = this.dataHistorial;
          }
      },
      error: (error) => {
        console.log(error)
        this.dataHistorial = [];
        this.dataSource.data = this.dataHistorial;
        this.SpinnerService.hide();
        // this.toastr.error('Ha ocurrido un error al buscar el historial.', 'Cerrar', {
        //   timeOut: 2500,
        // });
      }
    });
  }

  getActivoFijo(){
    this.controlActivoFijoService.ObtenerActivoFijoCodigo(this.codActivo).subscribe({
      next: (response: any) => {

          if(response != null){
            this.dataActivo = response;
            this.formulario.patchValue({
              codEmpresa: this.dataActivo.codEmpresa,
              sede : this.dataActivo.codEstablecimiento,
              codCenCost : this.dataActivo.codCenCost != null ? this.dataActivo.codCenCost.trim() : '',
              area : this.dataActivo.nomArea,
              responsable : this.dataActivo.nomResponsable,
              nomUsuario : this.dataActivo.nomUsuario,
            });
            this.selectEmpresa(this.dataActivo.codEmpresa);
          }else{
            this.formulario.patchValue({
              codEmpresa: '',
              sede : '',
              codCenCost : '',
              area : '',
              nomUsuario : '',
              ubicacion: ''
            });
            this.dataSedes = [];
          }
      },
      error: (error) => {
        console.log(error)
        this.dataActivo = '';
        this.SpinnerService.hide();
      }
    });
  }

  cargarEmpresas() {
    this.controlActivoFijoService.getEmpresas().subscribe({
      next: (response: any) => {
        this.dataEmpresas = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  selectEmpresa(Accion: any) {
    this.controlActivoFijoService.MostrarSedePorEmpresaService(
      Accion
    ).subscribe(
      (result: any) => {
        this.dataSedes = result
      })
  }
  guardarRegistro(){

    if(this.formulario.valid){
      if(this.codActivo != ''){
        this.SpinnerService.show();
        var usuario = localStorage.getItem('codUsuario');
        this.formulario.patchValue({
          codUsuario: usuario,
          codActivoFijo: this.codActivo
        });
        this.controlActivoFijoService.guardarHistorialActivos(this.formulario.value).subscribe({
          next: (response: any) => {
              if(response.status == 1){
                this.toastr.success(response.respuesta, 'Cerrar', {
                  timeOut: 2500,
                });
                this.dataHistorial = [];
                this.dataSource.data = this.dataHistorial;
                this.formulario.reset();
                this.formulario.patchValue({
                  idHistorial: 0
                });
                this.codActivo = '';
                this.SpinnerService.hide();
              }else{
                this.toastr.warning(response.respuesta, 'Cerrar', {
                  timeOut: 2500,
                });
                this.SpinnerService.hide();
              }
          },
          error: (error) => {
            console.log(error)
            this.SpinnerService.hide();
            this.toastr.warning('Ha ocurrido un error al guardar la ubicacion', 'Cerrar', {
              timeOut: 2500,
            });
          }
        });
      }else{
        this.toastr.warning('Debes ingresar el código de activo.', 'Cerrar', {
          timeOut: 2500,
       });  
      }
    }else{
      this.toastr.warning('Debes llenar los campos obligatorios.', 'Cerrar', {
         timeOut: 2500,
      });
    }
  }
}
