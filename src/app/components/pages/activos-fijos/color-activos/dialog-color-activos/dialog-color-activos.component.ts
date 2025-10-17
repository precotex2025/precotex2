import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { CategoriasActivosService } from 'src/app/services/activos/categorias-activos.service';
import { CentroCostoService } from 'src/app/services/activos/centro-costo.service';
import { ColorActivosService } from 'src/app/services/activos/color-activos.service';


interface data {
  data: any

}

@Component({
  selector: 'app-dialog-color-activos',
  templateUrl: './dialog-color-activos.component.html',
  styleUrls: ['./dialog-color-activos.component.css']
})
export class DialogColorActivosComponent implements OnInit {

  formulario = this.formBuilder.group({
    codColor: [0,],
    desColor: ['', Validators.required]
  })

  dataUsuario: Array<any> = [];
  ClaseActivos: Array<any> = [];
  usuario: any = "";
  existeCo: boolean = true;

  Empresa: string = "";

  tipo: any;
  cabecera = '';
  boton = '';

  constructor(public dialogRef: MatDialogRef<DialogColorActivosComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private colorActivoService: ColorActivosService,
    @Inject(MAT_DIALOG_DATA) public data: data) { }

  ngOnInit(): void {
    console.log(this.data.data);

    this.tipo = this.data.data.tipo;
    this.cabecera = this.data.data.cabecera;
    this.boton = this.data.data.boton;
    //var usuario = localStorage.getItem('codUsuario');
    
    if (this.tipo == 2) {
      this.formulario.patchValue({
        codColor: this.data.data.data.codColor,
        desColor: this.data.data.data.desColor
      })
    }

  }

  onEmpresaChange(event: any) {

  }

  guardarInformacion() {
    if (this.tipo == 1) {
      this.colorActivoService.saveColorActivo(this.formulario.value
      ).subscribe(
        (result: any) => {
          if (result['codColor']) {
            this.toastr.success('Se registro correctamente el color', 'Cerrar', {
              timeOut: 2500,
            });
            this.dialogRef.close();
          } else {
            this.toastr.error('Ha ocurrido un error al registrar el color', 'Cerrar', {
              timeOut: 2500,
            });
          }
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(err.message, 'Cerrar', {
            timeOut: 2500,
          });
        })
    } else {

      this.colorActivoService.updateColorActivo(this.data.data.data.codColor, this.formulario.value
      ).subscribe(
        (result: any) => {
          this.toastr.success('Se actualizo correctamente el color', 'Cerrar', {
            timeOut: 2500,
          });
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('Ha ocurrido un error al actualizar el color', 'Cerrar', {
            timeOut: 2500,
          });
        })
    }

  }


}