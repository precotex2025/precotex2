import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

interface data_det {
  idPrestamos: number;
  codActivoFijo: number;
  tipo: number;
  responsable: string;
  proveedor: string;
  fechaInicio: string;
  fechaFin: string;
  fechaRegistro: string;
  documentoGuia: string;
  documentoOrden:string;
  documentoContratoPrestamo: string;
  completado: string;
  fechaCompletado: string;
  codUsuario: string;
}

@Component({
  selector: 'app-historial-prestamos',
  templateUrl: './historial-prestamos.component.html',
  styleUrls: ['./historial-prestamos.component.css']
})


export class HistorialPrestamosComponent implements OnInit {

  displayedColumns: string[] = [
    'codActivoFijo',
    'tipo',
    'responsable',
    'proveedor',
    'fechaInicio',
    'fechaFin',
    'fechaRegistro',
    'codUsuario',
    'documentoGuia',
    'documentoOrden',
    'documentoContratoPrestamo',
    'completado',
    'fechaCompletado',
    'acciones'
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<data_det>;


  constructor(private _router:Router, private controlActivoFijoService: ControlActivoFijoService, private toastService: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getPrestamos();
  }


  regresar(){
    this._router.navigate(['/pages/activos/PrestamosReparaciones']);
  }

  EliminarRegistro(data_det:data_det){
    if(confirm("esta seguro de eliminar el registro?")){
      this.controlActivoFijoService.deletePrestamos(data_det.idPrestamos).subscribe({
        next: (response: any) => {
            console.log(response)
            if(response.status  == 1){
              this.toastService.success(response.respuesta, 'Correcto');
              this.getPrestamos();
            }else{
              this.toastService.success(response.respuesta, 'Error');
            }
        },
        error: (error) => {
          console.log(error)
          
        }
      });
    }
  }

  descargarArchivo(documento:string){
    this.toastService.info('Se esta descargando el archivo', 'Información');
    this.controlActivoFijoService.descargarArchivosPrestamo(documento, documento);
  }

  getPrestamos(){
    this.controlActivoFijoService.getPrestamos().subscribe({
      next: (response: any) => {
          console.log(response)
          if(response != null){
            this.dataSource.data = response;
     
          }else{
            this.dataSource.data = [];
          }
      },
      error: (error) => {
        console.log(error)
        this.dataSource.data = [];
      }
    });
  }

  setCompletado(event:any, data_det:data_det){
    console.log(event);
    console.log(data_det);

    this.controlActivoFijoService.setUpdatePrestamos(data_det.idPrestamos).subscribe({
      next: (response: any) => {
          console.log(response)
          if(response.status  == 1){
            this.toastService.success(response.respuesta, 'Correcto');
            this.getPrestamos();
          }else{
            this.toastService.success(response.respuesta, 'Error');
          }
      },
      error: (error) => {
        console.log(error)
        
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
