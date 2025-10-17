import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';


interface data {
  data: any

}


@Component({
  selector: 'app-dialog-modelo-activo',
  templateUrl: './dialog-modelo-activo.component.html',
  styleUrls: ['./dialog-modelo-activo.component.css']
})
export class DialogModeloActivoComponent implements OnInit {

  formulario = this.formBuilder.group({
    idModelo: [0,],
    modelo: ['', Validators.required]
  })

  dataUsuario: Array<any> = [];
  ClaseActivos: Array<any> = [];
  usuario: any = "";
  existeCo: boolean = true;

  Empresa: string = "";

  tipo: any;
  cabecera = '';
  boton = '';

  constructor(public dialogRef: MatDialogRef<DialogModeloActivoComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private controlActivoFijoService: ControlActivoFijoService,
    @Inject(MAT_DIALOG_DATA) public data: data) { }

  ngOnInit(): void {
    console.log(this.data.data);

    this.tipo = this.data.data.tipo;
    this.cabecera = this.data.data.cabecera;
    this.boton = this.data.data.boton;

    if (this.tipo == 2) {
      this.formulario.patchValue({
        idModelo: this.data.data.data.idModelo,
        modelo: this.data.data.data.modelo
      })
    }

  }


  guardarInformacion() {
    if(this.tipo == 1){
      this.controlActivoFijoService.saveModeloActivo(this.formulario.value
        ).subscribe(
          (result: any) => {
            if(result['idModelo']){
              this.toastr.success('Se registro correctamente la descripción', 'Cerrar', {
                timeOut: 2500,
              });
              this.dialogRef.close();
            }else{
              this.toastr.error('Ha ocurrido un error al registrar descripción', 'Cerrar', {
                timeOut: 2500,
              });
            }
          },
          (err: HttpErrorResponse) => {
            this.toastr.error(err.message, 'Cerrar', {
              timeOut: 2500,
            });
          })
    }else{

      this.controlActivoFijoService.updateModeloActivo(this.data.data.data.idModelo, this.formulario.value
        ).subscribe(
          (result: any) => {
              this.toastr.success('Se actualizo correctamente la descripción', 'Cerrar', {
                timeOut: 2500,
              });
              this.dialogRef.close();
            
          },
          (err: HttpErrorResponse) => {
            this.toastr.error('Ha ocurrido un error al actualizar el registro', 'Cerrar', {
              timeOut: 2500,
            });
          })
    }
    
  }


}