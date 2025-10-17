import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { CentroCostoService } from 'src/app/services/activos/centro-costo.service';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

interface data {
  data: any
}

@Component({
  selector: 'app-dialog-centro-costo',
  templateUrl: './dialog-centro-costo.component.html',
  styleUrls: ['./dialog-centro-costo.component.css']
})
export class DialogCentroCostoComponent implements OnInit {
  formulario = this.formBuilder.group({
    id: [0,],
    codCentroCosto: ['', Validators.required],
    desArea: ['', Validators.required],
    idArea: [0, Validators.required],
    codCc: ['', Validators.required]
  })

  dataAreas: Array<any> = [];
  dataUsuario: Array<any> = [];
  ClaseActivos: Array<any> = [];
  usuario: any = "";
  existeCo: boolean = true;

  Empresa: string = "";

  tipo: any;
  cabecera = '';
  boton = '';

  constructor(public dialogRef: MatDialogRef<DialogCentroCostoComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private controlActivoFijoService: ControlActivoFijoService,
    private centroCostoService: CentroCostoService,
    @Inject(MAT_DIALOG_DATA) public data: data) { }

  ngOnInit(): void {
    console.log(this.data.data);

    this.tipo = this.data.data.tipo;
    this.cabecera = this.data.data.cabecera;
    this.boton = this.data.data.boton;

    if (this.tipo == 2) {
      this.formulario.patchValue({
        id: this.data.data.data.id,
        codCentroCosto: this.data.data.data.codCentroCosto,
        desArea: this.data.data.data.desArea,
        idArea: this.data.data.data.idArea,
        codCc: this.data.data.data.codCc
      });
    }

    this.cargarAreas()

  }

  onEmpresaChange(event:any) {

  }

  guardarInformacion() {
    if(this.tipo == 1){
      this.centroCostoService.saveCentroCosto(this.formulario.value
        ).subscribe(
          (result: any) => {
            if(result['id']){
              this.toastr.success('Se registro correctamente el centro de costo', 'Cerrar', {
                timeOut: 2500,
              });
              this.dialogRef.close();
            }else{
              this.toastr.error('Ha ocurrido un error al registrar el centro de costo', 'Cerrar', {
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

      this.centroCostoService.updateCentroCosto(this.data.data.data.id, this.formulario.value
        ).subscribe(
          (result: any) => {
              this.toastr.success('Se actualizo correctamente el centro de costo', 'Cerrar', {
                timeOut: 2500,
              });
              this.dialogRef.close();
          },
          (err: HttpErrorResponse) => {
            this.toastr.error('Ha ocurrido un error al actualizar el centro de costo', 'Cerrar', {
              timeOut: 2500,
            });
          })
    }
    
  }

  cargarAreas() {
    this.controlActivoFijoService.getAreas().subscribe({
      next: (response: any) => {
        this.dataAreas = response;
        console.log(this.dataAreas)
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  selectArea(item: any){
    console.log(item)
    console.log(item.idArea)
    this.formulario.patchValue({
      idArea: item.idArea
    });
  }

}