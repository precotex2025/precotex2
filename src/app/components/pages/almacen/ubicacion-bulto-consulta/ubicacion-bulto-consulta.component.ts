import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { BultoHiladoGrupoService } from 'src/app/services/almacen/ubicacion-bulto/bulto-hilado-grupo.service';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/models/Proveedor';
import { map, Observable, startWith } from 'rxjs';
import { FormBuilder } from '@angular/forms';

interface data_det {
    num_Corre     : string,
    cantidad_Cono : number,
    cod_OrdProv   : string,
    num_Semana    : string,
    nom_Conera    : string,
    peso_Neto     : number,
    grupo         : string,
    cod_ubicacion : string
}

@Component({
  selector: 'app-ubicacion-bulto-consulta',
  templateUrl: './ubicacion-bulto-consulta.component.html',
  styleUrls: ['./ubicacion-bulto-consulta.component.css']
})
export class UbicacionBultoConsultaComponent implements OnInit {
  dataProveedor: Array<any> = [];
  selectedProveedor: any;

  listar_Proveedor: Proveedor[] = [];
  filtroProveedor:  Observable<Proveedor[]> | undefined;

  displayedColumns: string[] = [
    'bulto',
    'conos',
    'grupo',
    'Ubi'
  ]
  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({    
    NomProveedor:  [''],
  })

  Cod_Proveedor = ''


  constructor(
    private bultoHiladoGrupoService : BultoHiladoGrupoService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { this.dataSource = new MatTableDataSource();}

  ngOnInit(): void {
    this.getListaProveedores();
  }

  getListaBultosUbicacion(sCodProveedor:string, sCodLote: string, sNumSemana: string, sNomConera: string){
    this.bultoHiladoGrupoService.getBultoUbicacion(sCodProveedor, sCodLote, sNumSemana, sNomConera).subscribe({
      next: (response: any)=> {
        if(response.success){
          if (response.totalElements > 0){
            this.dataSource.data = response.elements;
          }
          else{
            this.dataSource.data = []
          }
        }        
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Cerrar', {
        timeOut: 2500,
         });
      }
    });
  }

  getListaProveedores(){
    this.bultoHiladoGrupoService.getProveedores().subscribe({
      next: (response: any) => {
        if(response.success){
          if (response.totalElements > 0){
              //this.dataProveedor = response.elements;
              this.listar_Proveedor = response.elements;
              console.log(this.listar_Proveedor );
              this.RecargarProveedores();
          }
        }
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Cerrar', {
        timeOut: 2500,
         });
      }
    });
  }

  RecargarProveedores(){
    this.filtroProveedor = this.formulario.controls['NomProveedor'].valueChanges.pipe(
      startWith(''),
      map(option => (option ? this._filterProveedor(option) : this.listar_Proveedor.slice())),
    );    
  }

  private _filterProveedor(value: string): Proveedor[] {        
    const filterValue = value.toLowerCase();    
    return this.listar_Proveedor.filter(option => String(option.des_Proveedor).toLowerCase().indexOf(filterValue ) > -1 || 
    option.des_Proveedor.toLowerCase().indexOf(filterValue ) > -1);
  }

  CambiarValorProveedor(Cod_Proveedor: string){
    this.Cod_Proveedor = Cod_Proveedor
  }

  applyFilterLote(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (filterValue.length > 0){
      if (this.Cod_Proveedor === "") {
        this.toastr.error("Seleccione proveedor", 'Cerrar', {
          timeOut: 2500,
          });      
          return;
      }
      this.getListaBultosUbicacion(this.Cod_Proveedor, filterValue, '', '');
    }
  }

  applyFilterAny(event: Event, columna: string){

    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Filtrar solo la columna específica
    this.dataSource.filterPredicate = (data: data_det, filter: string) => {
      switch (columna) {
        case 'sem':
          return data.num_Semana.toLowerCase().includes(filter);
        case 'con':
          return data.nom_Conera.toLowerCase().includes(filter);
        default:
          return true; // No filtra por otras columnas
      }
    };    

    // Asignar el filtro
    this.dataSource.filter = filterValue;
  }

  Regresar(){
    this.router.navigate(['/pages/almacen/Presentacion']);
  }



}
