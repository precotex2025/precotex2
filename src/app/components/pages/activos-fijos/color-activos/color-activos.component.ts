import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


import { SelectionModel } from '@angular/cdk/collections';

import { MatPaginator } from '@angular/material/paginator';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';
import { DialogColorActivosComponent } from './dialog-color-activos/dialog-color-activos.component';
import { ColorActivosService } from 'src/app/services/activos/color-activos.service';


interface data_det {
  codColor: number;
  desColor: string;
}

@Component({
  selector: 'app-color-activos',
  templateUrl: './color-activos.component.html',
  styleUrls: ['./color-activos.component.css']
})
export class ColorActivosComponent implements OnInit {

  displayedColumns: string[] = [
    'codColor',
    'desColor',
    'acciones'
  ]
  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataForExcel = [];
  dataForDelete: Array<number> = [];

  selection = new SelectionModel<data_det>(true, []);
  constructor(
    private colorActivoService: ColorActivosService,
    public dialog: MatDialog,

    private toastr: ToastrService,
) { this.dataSource = new MatTableDataSource(); }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getDescripcionActivos();
  }


  getDescripcionActivos(){
    this.colorActivoService.getColorActivo().subscribe({
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
      cabecera: 'Crear Nuevo Color'
    }
    let dialogRef = this.dialog.open(DialogColorActivosComponent, {
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


  EliminarRegistro(codColor: any) {
    if (confirm("Esta seguro de eliminar este registro?")) {
      this.colorActivoService.deleteColorActivo(
        codColor
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
      cabecera: 'Actualizar Color',
      data: descripcion
    }
    let dialogRef = this.dialog.open(DialogColorActivosComponent, {
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


