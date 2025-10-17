import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';
import { ToastrService } from 'ngx-toastr';

//import { DialogModeloActivoComponent } from './dialog-modelo-activo/dialog-modelo-activo.component';
import { DialogUbicacionActivosComponent } from './dialog-ubicacion-activos/dialog-ubicacion-activos.component';

interface data_det{
  idAmbiente: number;
  idUbicacion: number;
  idCc: number;
  codGeneral: string;
  codAmbiente: string;
  desAmbiente: string;
  flgActivo: boolean;
}

@Component({
  selector: 'app-ubicacion-activos',
  templateUrl: './ubicacion-activos.component.html',
  styleUrls: ['./ubicacion-activos.component.css']
})
export class UbicacionActivosComponent implements OnInit {

  displayedColumns: string[] = [
    'idAmbiente',
    'codGeneral',
    'desAmbiente',
    'acciones'
  ]
  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  clickedRows = new Set<data_det>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private controlActivoFijoService: ControlActivoFijoService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getUbicacionActivo();
  }

  getUbicacionActivo(){
    this.controlActivoFijoService.AmbienteActivo().subscribe({
      next: (response:any) => {
        this.dataSource.data = response;
        //console.log(response)
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
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

  onAgregarUbicacion(){
    let datos = {
      tipo: 1,
      boton: 'Guardar',
      cabecera: 'Crear Nueva Ubicación'
    }
    let dialogRef = this.dialog.open(DialogUbicacionActivosComponent, {
      disableClose: true,
      width: "700px",
      panelClass: 'my-class',
      data: {
        data: datos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUbicacionActivo();
    });
  }

  onEditarUbicacion(data_det: data_det){
    let datos = {
      tipo: 2,
      boton: 'Actualizar',
      cabecera: 'Actualizar Ubicación',
      data: data_det
    }
    let dialogRef = this.dialog.open(DialogUbicacionActivosComponent, {
      disableClose: true,
      panelClass: 'my-class',
      data: {
        data: datos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUbicacionActivo()
    });
  }

  onAnularUbicacion(id: number){
    console.log(id)
    if (confirm("Esta seguro de eliminar este registro?")) {
      this.controlActivoFijoService.deleteAmbienteActivo(id)
        .subscribe(
          (result: any) => {
              console.log(result)
              this.toastr.success('Se elimino el registro correctamente', 'Cerrar', {
                timeOut: 2500,
              });
              this.getUbicacionActivo();

          },
          (err: HttpErrorResponse) => {
            this.toastr.error('Ha ocurrido un error al eliminar el registro', 'Cerrar', {
              timeOut: 2500,
            });
        });
    }

  }

}
