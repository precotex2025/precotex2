
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';


interface data_det {
  codActivoFijo: number;
  codActivo: number;
  claseActivo: string;
  responsable: string;
  empresa: string;
}

@Component({
  selector: 'app-prestamos-reparaciones',
  templateUrl: './prestamos-reparaciones.component.html',
  styleUrls: ['./prestamos-reparaciones.component.css']
})
export class PrestamosReparacionesComponent implements OnInit {

  dataForExcel = [];
  dataForDelete: Array<number> = [];

  formulario = this.formBuilder.group({
    codActivoFijo: ['', Validators.required],
    tipo: ['', Validators.required],
    responsable: ['', Validators.required],
    proveedor: ['', Validators.required],
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
    codUsuario: ['', Validators.required],
  })

  prestamos:any = '';
  reparaciones:any = '';
  activo:any;

  file:any;
  file2:any;
  file3:any;
  constructor(
    private controlActivoFijoService: ControlActivoFijoService,
    public dialog: MatDialog,
    private _router: Router,
    private SpinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.formulario.patchValue({
      codUsuario: localStorage.getItem('codUsuario')
    });
  }

  regresar(){
    this._router.navigate(['pages/activos/OpcionesActivos']);
  }

  onChangeFile(event:any){
    console.log(event)
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
    }
  }

  onChangeFile2(event:any){
    console.log(event)
    if (event.target.files && event.target.files[0]) {
      this.file2 = event.target.files[0];
    }
  }

  onChangeFile3(event:any){
    console.log(event)
    if (event.target.files && event.target.files[0]) {
      this.file3 = event.target.files[0];
    }
  }
  eliminarArchivo(){
    this.file = null;
  }
  eliminarArchivo2(){
    this.file2 = null;
  }
  eliminarArchivo3(){
    this.file3 = null;
  }

  guardarPrestamo(){
    console.log(this.formulario.value);
    if(this.formulario.valid){
      this.formulario.patchValue({
        codActivoFijo: this.activo.codActivoFijo
      });
      this.SpinnerService.show();
      var codActivoFijo = this.formulario.get('codActivoFijo')?.value;
      var tipo = this.formulario.get('tipo')?.value;
      var responsable = this.formulario.get('responsable')?.value;
      var proveedor = this.formulario.get('proveedor')?.value;
      var fechaInicio = this.formulario.get('fechaInicio')?.value;
      var fechaFin = this.formulario.get('fechaFin')?.value;
      var codUsuario = this.formulario.get('codUsuario')?.value;
      var formData = new FormData();
      formData.append('codActivoFijo', codActivoFijo!);
      formData.append('tipo', tipo!);
      formData.append('responsable', responsable!);
      formData.append('proveedor', proveedor!);
      formData.append('fechaInicio', fechaInicio!);
      formData.append('fechaFin', fechaFin!);
      formData.append('codUsuario', codUsuario!);
      formData.append('documentoGuia', this.file);
      formData.append('documentoOrden', this.file2);
      formData.append('documentoContratoPrestamo', this.file3);

      this.controlActivoFijoService.createPrestamo(formData).subscribe({
        next: (response: any) => {
            console.log(response)
            if(response.status == 1){
              this.toastr.success(response.respuesta, 'Correcto');
              this.formulario.reset();
              this.activo = null;
              this.file = null;
              this.file2 = null;
              this.file3 = null;
              this.SpinnerService.hide();
            }else{
              this.toastr.warning(response.respuesta, 'Error');
              this.SpinnerService.hide();
            }
        },
        error: (error) => {
          console.log(error)
          this.SpinnerService.hide();
        }
      });
    }else{
      this.toastr.warning('Completa los campos obligatorios', 'Error Validación');
    }
  }

  changeTipo(event:any){
    console.log(event);
    if(event.value == '1'){
      this.prestamos = true;
      this.reparaciones = false;
    }else{
      this.prestamos = false;
      this.reparaciones = true;
    }
  }

  changeCodActivo(event:any){
    var valor = event.target.value;
    if(valor != '' && valor.length == 9){
      this.controlActivoFijoService.ObtenerActivoFijoCodigo(valor).subscribe({
        next: (response: any) => {
            console.log(response)
            if(response != null){
              this.toastr.info("Registro encontrado", 'Información');
              this.activo = response;
            }else{
              
            }
        },
        error: (error) => {
          console.log(error)
          this.formulario.patchValue({
            codActivoFijo: ''
          })
          this.activo = null;
        }
      });
    }
    
  }

  irHistorial(){
    this._router.navigate(['/pages/activos/historialPrestamos']);   
  }

}
