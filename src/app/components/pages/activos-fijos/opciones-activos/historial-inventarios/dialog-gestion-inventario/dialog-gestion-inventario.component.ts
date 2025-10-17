import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { InventariosActivosService } from 'src/app/services/activos/inventarios-activos.service';


interface data {
  data: any

}

interface data_det {
  idInventario: number;
  descripcion: string;
  fechaRegistro: string;
  flgEstado: string;
  sede: string;
}
@Component({
  selector: 'app-dialog-gestion-inventario',
  templateUrl: './dialog-gestion-inventario.component.html',
  styleUrls: ['./dialog-gestion-inventario.component.css']
})
export class DialogGestionInventarioComponent implements OnInit {

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


  displayedColumns: string[] = [
    'descripcion',
    'sede',
    'fechaRegistro',
    'flgEstado',
    'acciones'
  ];

  historialActivo!: data_det;
  dataSource!: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  codTrabajador:any = '';
  constructor(public dialogRef: MatDialogRef<DialogGestionInventarioComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private historialInventariosService: InventariosActivosService,
    @Inject(MAT_DIALOG_DATA) public data: data) { 
      this.dataSource = new MatTableDataSource();
      this.codTrabajador = localStorage.getItem('codTrabajador')!;
    }

  ngOnInit(): void {
    console.log(this.data.data);
    this.tipo = this.data.data.tipo;
    this.cabecera = this.data.data.cabecera;
    this.boton = this.data.data.boton;

    this.dataSource.data = this.data.data.inventario;
  }

  onEmpresaChange(event:any) {

  }

  deleteInventario(data_det:data_det){
    if(confirm('Esta seguro de eliminar el inventario?')){
      this.historialInventariosService.deleteInventariosActivo(data_det.idInventario).subscribe({
        next: (response: any) => {
          console.log(response);
          this.toastr.success('Se elimino el registro correctamente', 'Cerrar', {
            timeOut: 2500,
          });
          this.getInventarios();
        },
        error: (error) => {
          this.toastr.error('Ha ocurrido un error.', 'Cerrar', {
            timeOut: 2500,
          });
          this.getInventarios();
        }
      });
      
    }
  }

  changeInventario(event:any, data_det:data_det){
    if(confirm('Esta seguro de cerrar el inventario?')){
      this.historialInventariosService.updateInventarioActivo(data_det.idInventario).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status == 1) {
            this.toastr.success(response.respuesta, 'Cerrar', {
              timeOut: 2500,
            });
            this.getInventarios();
          } else {
            this.toastr.warning(response.respuesta, 'Cerrar', {
              timeOut: 2500,
            });
            this.getInventarios();
          }
        },
        error: (error) => {
          this.toastr.error('Ha ocurrido un error.', 'Cerrar', {
            timeOut: 2500,
          });
          this.getInventarios();
        }
      });
    }else{
      this.getInventarios();
    }
  }

  getInventarios() {
    this.historialInventariosService.getInventarios().subscribe({
      next: (response: any) => {
        console.log(response);
        this.dataSource.data = response;

      },
      error: (error) => {
        console.log(error)

        this.toastr.error('Ha ocurrido un error.', 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
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