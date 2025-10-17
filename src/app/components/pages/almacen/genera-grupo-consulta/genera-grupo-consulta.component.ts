import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BultoHiladoGrupoService } from 'src/app/services/almacen/ubicacion-bulto/bulto-hilado-grupo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  selector: 'app-genera-grupo-consulta',
  templateUrl: './genera-grupo-consulta.component.html',
  styleUrls: ['./genera-grupo-consulta.component.css']
})
export class GeneraGrupoConsultaComponent implements OnInit {
  mask: string = '(000) 000-0000';
  Orden_ServicioMascara = [/[0-9]/i, /[0-9]/i, /[0-9]/i, '-', /[0-9]/i, /[0-9]/i, /[0-9]/i, /[0-9]/i, /[0-9]/i,/[0-9]/i];

  displayedColumns: string[] = ['grupo','bolsas','fecha','estado','acciones']
  dataSource: MatTableDataSource<data_det>;

  @ViewChild('myinputAdd') inputAdd!: ElementRef;

  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
    Grupo_Consulta:   [''],
    Fec_Creacion  :   [''],
  })

  constructor(private formBuilder: FormBuilder,
    private bultoHiladoGrupoService : BultoHiladoGrupoService,
    private toastr: ToastrService,
    private router: Router
  ) { this.dataSource = new MatTableDataSource(); }

  ngOnInit(): void {
    this.ListarGrupos(null!);
  }

  applyEnterAdd(event: any) {
    this.AnadirBulto()
  }

  clearDate(event: any) {
    event.stopPropagation();
    this.formulario.controls['Fec_Creacion'].setValue('')
  }

  AnadirBulto() {
    const codigoGrupo: string = this.formulario.get('Grupo_Consulta')?.value!;

    if(codigoGrupo.length==0){
      this.toastr.info('Ingrese codigo de Grupo!', 'Cerrar', {
        timeOut: 2500,
         });   
         return;   
    }

    this.ValidaGrupo(codigoGrupo);
  }

  ListarGrupos(fecReg?: Date) {

    const fechaString: string = this.formulario.controls['Fec_Creacion']?.value?.toString()!;
    const fechaDate: Date = new Date(fechaString); 
    const grupo: string = this.formulario.controls['Grupo_Consulta']?.value?.toString()!;
    
    this.bultoHiladoGrupoService.getListaGrupos(fechaDate, grupo).subscribe({
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

  VerDetalleGrupo(data_det: any) {

    const codigoGrupo: string = data_det["grupo"];
    const idGrupo: number = data_det["id_Bulto_Hilado_Grupo"];
    this.router.navigate(['/pages/almacen/GeneraGrupoConsultaDetalle'], { queryParams: { codigoGrupo, idGrupo } });
 
  }

  GenerarGrupo() {

    const codigoGrupo: string = "";
    const idGrupo: number = 0;
    this.router.navigate(['/pages/almacen/GeneraGrupoConsultaDetalle'], { queryParams: { codigoGrupo, idGrupo } });      

    /*
    var codUsuario = localStorage.getItem('codUsuario');
    let data: any = {
      "accion"                : "C",
      "id_Bulto_Hilado_Grupo" : 0,
      "num_Corre"             : "",
      "cod_Usuario"           : codUsuario,
      "codigo"                : 0,
      "mensaje"               : ""
    };

    this.bultoHiladoGrupoService.postInsertar(data).subscribe({
      next: (response: any)=> {
        if(response.success){
          console.log(response);
          const codigoGrupo: string = "";
          const idGrupo: number = response.codeTransacc;
          this.router.navigate(['/pages/almacen/GeneraGrupoConsultaDetalle'], { queryParams: { codigoGrupo, idGrupo } });          
           
        }else{
          this.toastr.error(response.message, 'Cerrar', {
            timeOut: 2500,
             });          
        }
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Cerrar', {
        timeOut: 2500,
         });
      }      
    });
    */
    
  }

  ValidaGrupo(Grupo: string){
    this.bultoHiladoGrupoService.getValidarGrupo(Grupo).subscribe({
      next: (response: any)=> {
        if(response.success){
          if (response.codeResult == 200){
              //aqui debe de obtener el grupo por codigo de grupo
              this.ObtenerGrupoByCode(Grupo);
          }else{
            this.toastr.info(response.message, '', {
              timeOut: 2500,
            });
          }          
        }else{
          this.toastr.error(response.message, 'Cerrar', {
            timeOut: 2500,
             });          
        }
      },
      error: (error) => {
        console.log('error');
        this.toastr.error(error.error.message, 'Cerrar', {
        timeOut: 2500,
         });
      }   
    });
  }

  ObtenerGrupoByCode(Grupo: string){
    this.bultoHiladoGrupoService.getListaGruposByCode(Grupo).subscribe({
      next: (response: any)=> {
        if(response.success){
          if (response.totalElements > 0){
            //Obtiene Información y redirige
            const codigoGrupo: string = response.elements[0].grupo;
            const idGrupo: number = response.elements[0].id_Bulto_Hilado_Grupo;

            this.router.navigate(['/pages/almacen/GeneraGrupoConsultaDetalle'], { queryParams: { codigoGrupo, idGrupo } });                
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

  Regresar(){
    this.router.navigate(['/pages/almacen/Presentacion']);
  }

}
