import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { BultoHiladoGrupoService } from 'src/app/services/almacen/ubicacion-bulto/bulto-hilado-grupo.service';
import { ActivatedRoute, Router } from '@angular/router';

interface data_det {
  grupo         : string,
  fec_registro  : Date,
  num_Corre     : string,
  cantidad_Cono : number,
  peso_Tara     : number,
  peso_Bruto    : number,
  peso_Neto     : number,
}

@Component({
  selector: 'app-genera-grupo-consulta-detalle',
  templateUrl: './genera-grupo-consulta-detalle.component.html',
  styleUrls: ['./genera-grupo-consulta-detalle.component.css']
})
export class GeneraGrupoConsultaDetalleComponent implements OnInit {

  displayedColumns: string[] = ['bulto','conos','tara','bruto','neto']
  dataSource: MatTableDataSource<data_det>;

  @ViewChild('myinputAdd') inputAdd!: ElementRef;
  @ViewChild('myinputDel') inputDel!: ElementRef;

  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({
    Num_corre:   [''],
    bulto_añadir:     [''],
    bulto_eliminar:   [''],
    Codigo_grupo:   [''] ,
  })

  grupo: string = "";
  id_Bulto_Hilado_Grupo: number = 0;

  constructor(private formBuilder: FormBuilder,
    private bultoHiladoGrupoService : BultoHiladoGrupoService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    //this.ListaGrupoDetalle('G00000000004');

    //Deshabilita control de titulo de Numero de Grupo
    this.formulario.get('Codigo_grupo')?.disable();

    //Obtiene Parametros
    this.route.queryParams.subscribe(params => {
      this.grupo = params['codigoGrupo']; 
      this.id_Bulto_Hilado_Grupo = params['idGrupo'];  // Obtener el parámetro 'id' de la ruta
    }); 

    if(this.grupo.length == 0){
      if(this.id_Bulto_Hilado_Grupo > 0){
        this.ObtenerGrupoById(this.id_Bulto_Hilado_Grupo);
      }
    }else{
      this.formulario.get('Codigo_grupo')?.patchValue(this.grupo);
      this.ListaGrupoDetalle(this.grupo);
    }
  }

  applyEnterAdd(event: any) {
    this.AnadirBulto()
  }

  applyEnterDel(event: any) {
    this.EliminarBulto()
  }

  AnadirBulto() {

    const codigoBulto: string = this.formulario.get('bulto_añadir')?.value!;
    if(codigoBulto.length==0){
      this.toastr.info('Ingrese codigo de Bulto!', 'Cerrar', {
        timeOut: 2500,
         });   
         return;   
    }    

    var codUsuario = localStorage.getItem('codUsuario');
    let data: any = {
      "accion"                : "I",
      "id_Bulto_Hilado_Grupo" : this.id_Bulto_Hilado_Grupo,
      "num_Corre"             : codigoBulto,
      "cod_Usuario"           : codUsuario,
      "codigo"                : 0,
      "mensaje"               : ""
    };

    this.bultoHiladoGrupoService.postInsertar(data).subscribe({
      next: (response: any)=> {
        if(response.success){

          if (response.codeResult == 200){
            this.toastr.success(response.message, '', {
              timeOut: 2500,
            });

            //AQUI OBTIENE EL CODIGO DE BULTOHILADOGRUPO
            const IdBultoHiladoGrupo: number =  response.codeTransacc;
            this.ListaGrupoDetalleById(IdBultoHiladoGrupo);

          }else{
            this.toastr.info(response.message, '', {
              timeOut: 2500,
            });
          }

          this.formulario.get('bulto_añadir')?.patchValue('');
          this.inputAdd.nativeElement.focus();

        }else{
          console.log(response);
          this.toastr.error(response.message, 'Cerrar', {
            timeOut: 2500,
          });          
        }
      },
      error: (error) => {
        this.toastr.error(error.message, 'Cerrar', {
        timeOut: 2500,
         });
      }  
    });
  }

  EliminarBulto(){
    const codigoBulto: string = this.formulario.get('bulto_eliminar')?.value!;
    if(codigoBulto.length==0){
      this.toastr.info('Ingrese codigo de Bulto!', 'Cerrar', {
        timeOut: 2500,
         });   
         return;   
    }  

    var codUsuario = localStorage.getItem('codUsuario');
    let data: any = {
      "accion"                : "D",
      "id_Bulto_Hilado_Grupo" : this.id_Bulto_Hilado_Grupo,
      "num_Corre"             : codigoBulto,
      "cod_Usuario"           : codUsuario,
      "codigo"                : 0,
      "mensaje"               : ""
    };

    this.bultoHiladoGrupoService.postInsertar(data).subscribe({
      next: (response: any)=> {
        if(response.success){

          if (response.codeResult == 200){
            this.toastr.success(response.message, '', {
              timeOut: 2500,
            });
            //this.ListaGrupoDetalle('G00000000004');
            this.ListaGrupoDetalle(this.grupo);
          }else{
            this.toastr.info(response.message, '', {
              timeOut: 2500,
            });
          }

          this.formulario.get('bulto_eliminar')?.patchValue('');
          this.inputDel.nativeElement.focus();

        }else{
          console.log(response);
          this.toastr.error(response.message, 'Cerrar', {
            timeOut: 2500,
          });          
        }
      },
      error: (error) => {
        this.toastr.error(error.message, 'Cerrar', {
        timeOut: 2500,
         });
      }  
    });    
  }

  Regresar(){
    this.router.navigate(['/pages/almacen/GeneracionGrupoConsulta']);
  }

  ObtenerGrupoById(IdBultoHiladoGrupo: number){
    this.bultoHiladoGrupoService.getListaGruposById(IdBultoHiladoGrupo).subscribe({
      next: (response: any)=> {
        if(response.success){
          if (response.totalElements > 0){
            //console.log(response);
            //console.log(response.elements[0]["grupo"]);
            //debugger;
            //this.dataSource.data = response.elements;
            this.grupo = response.elements[0].grupo;
            console.log(response.elements[0].grupo);
            //this.ListaGrupoDetalle(this.grupo);
          }
        }        
      },
      error: (error) => {
        this.toastr.error(error.message, 'Cerrar', {
        timeOut: 2500,
         });
      }      
    });
    
  }

  ListaGrupoDetalle(grupo: string){
    this.bultoHiladoGrupoService.getListaGruposDet(grupo).subscribe({
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
        this.toastr.error(error.message, 'Cerrar', {
        timeOut: 2500,
         });
      }      
    });
  }
  
  ListaGrupoDetalleById(IdBultoHiladoGrupo: number){
    this.bultoHiladoGrupoService.getListaGruposDetById(IdBultoHiladoGrupo).subscribe({
      next: (response: any)=> {
        if(response.success){
          if (response.totalElements > 0){
            //Obtiene informacion de un solo registro porque igual todos se repiten 
            this.grupo = response.elements[0].grupo;
            this.id_Bulto_Hilado_Grupo = response.elements[0].id_Bulto_Hilado_Grupo;
            this.formulario.get('Codigo_grupo')?.patchValue(this.grupo);
            //Llena informacion al Datatable 
            this.dataSource.data = response.elements;
          }
          else{
            this.dataSource.data = []
          }
        }        
      },
      error: (error) => {
        this.toastr.error(error.message, 'Cerrar', {
        timeOut: 2500,
         });
      }      
    });
  }  
}
