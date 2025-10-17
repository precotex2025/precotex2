import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';
import { InventariosActivosService } from 'src/app/services/activos/inventarios-activos.service';


interface data {
  data: any

}
@Component({
  selector: 'app-dialog-crear-inventario',
  templateUrl: './dialog-crear-inventario.component.html',
  styleUrls: ['./dialog-crear-inventario.component.css']
})
export class DialogCrearInventarioComponent implements OnInit {

  formulario = this.formBuilder.group({
    descripcion: ['', Validators.required],
    sede: ['', Validators.required]
  })

  dataUsuario: Array<any> = [];
  ClaseActivos: Array<any> = [];
  usuario: any = "";
  existeCo: boolean = true;

  Empresa: string = "";

  tipo: any;
  cabecera = '';
  boton = '';

  Cod_Accion = ""
  Cod_Item_Cab = 0
  Cod_Empresa = 0
  Planta = ""
  Piso = 0
  Cod_CenCost = ""
  Nom_Area = ""
  Nom_Responsable = ""
  Nom_Usuario = ""
  Ubicacion = ""
  Cod_Activo = ""
  Clase_Activo = 0

  constructor(public dialogRef: MatDialogRef<DialogCrearInventarioComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private historialInventariosService: InventariosActivosService,
    @Inject(MAT_DIALOG_DATA) public data: data) { }

  ngOnInit(): void {
    console.log(this.data.data);
    this.tipo = this.data.data.tipo;
    this.cabecera = this.data.data.cabecera;
    this.boton = this.data.data.boton;



  }

  onEmpresaChange(event:any) {

  }

  guardarInformacion() {
    if(this.tipo == 1){
      this.historialInventariosService.crearTomaInventario(this.formulario.value
        ).subscribe(
          (result: any) => {
            if(result['status'] == 1){
              this.toastr.success(result.respuesta, 'Cerrar', {
                timeOut: 2500,
              });
              this.dialogRef.close();
            }else{
              this.toastr.error(result.respuesta, 'Cerrar', {
                timeOut: 2500,
              });
            }
          },
          (err: HttpErrorResponse) => {
            this.toastr.error(err.message, 'Cerrar', {
              timeOut: 2500,
            });
          })
    }
    
  }



}