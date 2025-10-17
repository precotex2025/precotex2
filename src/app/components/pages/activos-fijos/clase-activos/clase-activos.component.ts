import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { CentroCostoService } from 'src/app/services/activos/centro-costo.service';
import { DialogClaseActivosComponent } from './dialog-clase-activos/dialog-clase-activos.component';
import { CategoriasActivosService } from 'src/app/services/activos/categorias-activos.service';




interface data_det {
  codCategoria: number;
  nombreCategoria: string;
  fechaRegistro: string;
  codUsuario: string;
  codEquipo: string;
}

@Component({
  selector: 'app-clase-activos',
  templateUrl: './clase-activos.component.html',
  styleUrls: ['./clase-activos.component.css']
})
export class ClaseActivosComponent implements OnInit {

  displayedColumns: string[] = [
    'codCategoria',
    'nombreCategoria',
    'fechaRegistro',
    'acciones'
  ]
  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  clickedRows = new Set<data_det>();

  dataForExcel = [];
  dataForDelete: Array<number> = [];

  selection = new SelectionModel<data_det>(true, []);
  constructor(
    private categoriasActivosService: CategoriasActivosService,
    public dialog: MatDialog,
    private toastr: ToastrService,) { this.dataSource = new MatTableDataSource(); }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getDescripcionActivos();
  }


  getDescripcionActivos(){
    this.categoriasActivosService.getCategoriasActivo().subscribe({
      next: (response:any) => {
        this.dataSource.data = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  agregarDescripcion(){
    let datos = {
      tipo: 1,
      boton: 'Guardar',
      cabecera: 'Crear Nueva Clase de Activo'
    }
    let dialogRef = this.dialog.open(DialogClaseActivosComponent, {
      disableClose: true,
      panelClass: 'my-class',
      data: {
        data: datos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDescripcionActivos();
      
 
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'items por pagina';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1}  - ${endIndex} de ${length}`;
    };

  }


  EliminarRegistro(idDescripcion: any) {
    if (confirm("Esta seguro de eliminar este registro?")) {
      this.categoriasActivosService.deleteCategoriasActivo(
        idDescripcion
      ).subscribe(
        (result: any) => {
            console.log(result)
            this.toastr.success('Se elimino el registro correctamente', 'Cerrar', {
              timeOut: 2500,
            });
            this.getDescripcionActivos();

        },
        (err: HttpErrorResponse) => {
          this.toastr.error('Ha ocurrido un error al eliminar el registro', 'Cerrar', {
            timeOut: 2500,
          });
      })
    }
  }
  openModificarActivo(descripcion: data_det) {
    console.log(descripcion);
    let datos = {
      tipo: 2,
      boton: 'Actualizar',
      cabecera: 'Actualizar Clase de Activo',
      data: descripcion
    }
    let dialogRef = this.dialog.open(DialogClaseActivosComponent, {
      disableClose: true,
      panelClass: 'my-class',
      data: {
        data: datos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDescripcionActivos();
      
 
    })
  }

}


