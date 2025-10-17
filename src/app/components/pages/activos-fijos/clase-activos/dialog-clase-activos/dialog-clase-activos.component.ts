import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { CategoriasActivosService } from 'src/app/services/activos/categorias-activos.service';
import { CentroCostoService } from 'src/app/services/activos/centro-costo.service';



interface data {
  data: any

}
@Component({
  selector: 'app-dialog-clase-activos',
  templateUrl: './dialog-clase-activos.component.html',
  styleUrls: ['./dialog-clase-activos.component.css']
})
export class DialogClaseActivosComponent implements OnInit {

  formulario = this.formBuilder.group({
    codCategoria: [0,],
    nombreCategoria: ['', Validators.required],
    fechaRegistro: [new Date(),],
    codUsuario: ['',],
    codEquipo: ['PRXWIND526',]
  })

  dataUsuario: Array<any> = [];
  ClaseActivos: Array<any> = [];
  usuario: any = "";
  existeCo: boolean = true;

  Empresa: string = "";

  tipo: any;
  cabecera = '';
  boton = '';

  constructor(public dialogRef: MatDialogRef<DialogClaseActivosComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private claseActivoService: CategoriasActivosService,
    @Inject(MAT_DIALOG_DATA) public data: data) { }

  ngOnInit(): void {
    console.log(this.data.data);

    this.tipo = this.data.data.tipo;
    this.cabecera = this.data.data.cabecera;
    this.boton = this.data.data.boton;
    var usuario = localStorage.getItem('codUsuario');
    this.formulario.patchValue({
      codUsuario: usuario
    })
    if (this.tipo == 2) {
      this.formulario.patchValue({
        codCategoria: this.data.data.data.codCategoria,
        nombreCategoria: this.data.data.data.nombreCategoria,
        fechaRegistro: this.data.data.data.fechaRegistro,
        codUsuario: this.data.data.data.codUsuario,
        codEquipo: this.data.data.data.codEquipo
      })
    }

  }

  onEmpresaChange(event: any) {

  }

  guardarInformacion() {
    if (this.tipo == 1) {
      this.claseActivoService.saveCategoriasActivo(this.formulario.value
      ).subscribe(
        (result: any) => {
          if (result['codCategoria']) {
            this.toastr.success('Se registro correctamente la clase de activo', 'Cerrar', {
              timeOut: 2500,
            });
            this.dialogRef.close();
          } else {
            this.toastr.error('Ha ocurrido un error al registrar la clase de activo', 'Cerrar', {
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

      this.claseActivoService.updateCategoriasActivo(this.data.data.data.codCategoria, this.formulario.value
      ).subscribe(
        (result: any) => {
          this.toastr.success('Se actualizo correctamente la clase de activo', 'Cerrar', {
            timeOut: 2500,
          });
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('Ha ocurrido un error al actualizar la clase de activo', 'Cerrar', {
            timeOut: 2500,
          });
        })
    }

  }


}