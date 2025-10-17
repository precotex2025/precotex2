import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { SelectionModel } from '@angular/cdk/collections';

import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

import { CentroCostoService } from 'src/app/services/activos/centro-costo.service';



interface data_det {
  id: number;
  codCentroCosto: string;
  desArea: string;
}

@Component({
  selector: 'app-centros-costo',
  templateUrl: './centros-costo.component.html',
  styleUrls: ['./centros-costo.component.css']
})
export class CentrosCostoComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'codCentroCosto',
    'desArea',
    'acciones'
  ]
  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  clickedRows = new Set<data_det>();

  dataForExcel = [];
  dataForDelete: Array<number> = [];

  selection = new SelectionModel<data_det>(true, []);
  constructor(private formBuilder: FormBuilder,
    private centrosCostoService: CentroCostoService,
    public dialog: MatDialog,
    private toastr: ToastrService,
) { this.dataSource = new MatTableDataSource(); }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getDescripcionActivos();
  }


  getDescripcionActivos(){
    this.centrosCostoService.getCentrosCosto().subscribe({
      next: (response:any) => {
        this.dataSource.data = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 1500,
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


  EliminarRegistro(idDescripcion: any) {
    if (confirm("Esta seguro de eliminar este registro?")) {
      this.centrosCostoService.deleteCentrosCosto(
        idDescripcion
      ).subscribe(
        (result: any) => {
            console.log(result)
            this.toastr.success('Se elimino el registro correctamente', 'Cerrar', {
              timeOut: 1500,
            });
            this.getDescripcionActivos();

        },
        (err: HttpErrorResponse) => {
          this.toastr.error('Ha ocurrido un error al eliminar el registro', 'Cerrar', {
            timeOut: 1500,
          });
      })
    }
  }


}


