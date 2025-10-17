import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';
import { DialogModeloActivoComponent } from './dialog-modelo-activo/dialog-modelo-activo.component';

interface data_det {
  idModelo: number;
  Modelo: string;
}

@Component({
  selector: 'app-modelos-activo',
  templateUrl: './modelos-activo.component.html',
  styleUrls: ['./modelos-activo.component.css']
})
export class ModelosActivoComponent implements OnInit {

  displayedColumns: string[] = [
    'idModelo',
    'modelo',
    'acciones'
  ]
  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  clickedRows = new Set<data_det>();

  dataForExcel = [];
  dataForDelete: Array<number> = [];

  constructor(
    private controlActivoFijoService: ControlActivoFijoService,
    public dialog: MatDialog,
    private toastr: ToastrService,
) { this.dataSource = new MatTableDataSource(); }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getModelosActivo();
  }


  getModelosActivo(){
    this.controlActivoFijoService.ModeloActivo().subscribe({
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

  agregarModelo(){
    let datos = {
      tipo: 1,
      boton: 'Guardar',
      cabecera: 'Crear Nuevo Modelo'
    }
    let dialogRef = this.dialog.open(DialogModeloActivoComponent, {
      disableClose: true,
      panelClass: 'my-class',
      data: {
        data: datos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getModelosActivo();
      
 
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


  EliminarRegistro(idModelo: any) {
    if (confirm("Esta seguro de eliminar este registro?")) {
      this.controlActivoFijoService.deleteModeloActivo(
        idModelo
      ).subscribe(
        (result: any) => {
            console.log(result)
            this.toastr.success('Se elimino el registro correctamente', 'Cerrar', {
              timeOut: 2500,
            });
            this.getModelosActivo();

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
      cabecera: 'Actualizar Modelo',
      data: descripcion
    }
    let dialogRef = this.dialog.open(DialogModeloActivoComponent, {
      disableClose: true,
      panelClass: 'my-class',
      data: {
        data: datos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getModelosActivo()
      
 
    })
  }

}
