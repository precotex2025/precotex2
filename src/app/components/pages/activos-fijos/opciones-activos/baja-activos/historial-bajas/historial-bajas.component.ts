import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

interface data_det {
  codActivo: string;
  descripcion: string;
  tipoBaja: string;
  fechaBaja: string;
  documentoBaja: string;
  observacionBaja: string;
  codUsuarioMod: string;
}
@Component({
  selector: 'app-historial-bajas',
  templateUrl: './historial-bajas.component.html',
  styleUrls: ['./historial-bajas.component.css']
})
export class HistorialBajasComponent implements OnInit {

  displayedColumns: string[] = [
    'codActivo',
    'descripcion',
    'tipoBaja',
    'fechaBaja',
    'documentoBaja',
    'observacionBaja',
    'codUsuarioMod'
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<data_det>;


  constructor(private _router:Router, private controlActivoFijoService: ControlActivoFijoService, private toastService: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getBajas();
  }


  regresar(){
    this._router.navigate(['/pages/activos/BajaActivos']);
  }

  EliminarRegistro(data_det:data_det){
    // if(confirm("esta seguro de eliminar el registro?")){
    //   this.controlActivoFijoService.deletePrestamos(data_det.idPrestamos).subscribe({
    //     next: (response: any) => {
    //         console.log(response)
    //         if(response.status  == 1){
    //           this.toastService.success(response.respuesta, 'Correcto');
    //           this.getPrestamos();
    //         }else{
    //           this.toastService.success(response.respuesta, 'Error');
    //         }
    //     },
    //     error: (error) => {
    //       console.log(error)
          
    //     }
    //   });
    // }
  }

  descargarArchivo(documento:string){
    this.toastService.info('Se esta descargando el archivo', 'Información');
    this.controlActivoFijoService.downloadArchivoBaja(documento, documento);
  }

  getBajas(){
    this.controlActivoFijoService.getActivosBaja().subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
