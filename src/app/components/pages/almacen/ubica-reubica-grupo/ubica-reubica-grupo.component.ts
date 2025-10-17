import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UbicacionService } from 'src/app/services/almacen/ubicacion-bulto/ubicacion.service';
import { BultoHiladoGrupoService } from 'src/app/services/almacen/ubicacion-bulto/bulto-hilado-grupo.service';
import { Router } from '@angular/router';



interface data_det {
  id_ubicacion      : number,
  cod_ubicacion     : string,
  tipo              : string,
  num_Tipo          : string,
  piso              : string,
  num_Nicho         : number,
  capacidad         : number,
  cod_Equipo        : string,
  capa_Total_Grupos : number,
  capa_Total_Bolsas : number
}

interface data_det_grupo {
  id_Bulto_Hilado_Grupo: number,
  grupo: string,
  fec_Registro: string,
  usu_Registro: string,
  capa_Total_Bolsas: number,
}

@Component({
  selector: 'app-ubica-reubica-grupo',
  templateUrl: './ubica-reubica-grupo.component.html',
  styleUrls: ['./ubica-reubica-grupo.component.css']
})
export class UbicaReubicaGrupoComponent implements OnInit {

  displayedColumns: string[] = ['ubicacion','tipo','piso','nicho','capacidad']
  dataSource: MatTableDataSource<data_det>;

  displayedColumnsUbi: string[] = ['grupo','bultos','fecReg','usuario']
  dataSourceUbi: MatTableDataSource<data_det_grupo>;  

  formulario = this.formBuilder.group({
    ubicacion_añadir:   [''],
    grupo_añadir:       [''],
    grupo_añadir_btn:   [''],
  })

  isDisabled_BtnGrupo = true;
  codUbicacionDestino: string = "";

  @ViewChild('myinputAddUbi') inputAddUbi!: ElementRef;
  @ViewChild('myinputAddGru') inputAddGru!: ElementRef;
  @ViewChild('mybtnAddGru') btnAddGru!: ElementRef;

  constructor(private formBuilder             : FormBuilder             ,
              private serviceUbicacion        : UbicacionService        ,
              private serviceBultoHiladoGrupo : BultoHiladoGrupoService ,
              private toastr                  : ToastrService           ,
              private router                  : Router
  ) 
  { 
    this.dataSource = new MatTableDataSource(); 
    this.dataSourceUbi = new MatTableDataSource(); 
  }

  ngOnInit(): void {
    this.formulario.get('grupo_añadir')?.disable();
  }

  applyEnterAddGru(event: any) {
    this.AnadirGrupo();
  }

  AnadirGrupo(){

    var codUsuario = localStorage.getItem('codUsuario');
    const codigoUbica: string = this.codUbicacionDestino;//this.formulario.get('ubicacion_añadir')?.value!;
    const codigoGrupo: string = this.formulario.get('grupo_añadir')?.value!;

    if(codigoGrupo.length==0){
      this.toastr.info('Ingrese codigo de Grupo!', 'Cerrar', {
        timeOut: 2500,
         });   
         return;   
    }   
    
    //VINCULA GRUPO CON UBICACIÓN
    let data: any = {
      "accion"        : "U",
      "grupo"         : codigoGrupo,
      "cod_Ubicacion" : codigoUbica,
      "cod_Usuario"   : codUsuario,
      "codigo"        : 0,
      "mensaje"       : ""
    };    
    console.log(data);
    this.serviceBultoHiladoGrupo.postUbicarReubicarGrupo(data).subscribe({
      next: (response: any)=> {
        if(response.success){

          if (response.codeResult == 200){
            this.toastr.success(response.message, '', {
              timeOut: 2500,
            });

            //LISTA GRUPOS DE LA UBICACION 
            this.ListaGruposByCodigoUbicacion(codigoUbica);

          }else{
            this.toastr.info(response.message, '', {
              timeOut: 2500,
            });
          }

          this.formulario.get('grupo_añadir')?.patchValue('');
          this.inputAddGru.nativeElement.focus();

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

  applyEnterAddUbi(event: any) {
    this.AnadirUbicacion()
  }

  AnadirUbicacion(){

    const codigoUbica: string = this.formulario.get('ubicacion_añadir')?.value!;

    if(codigoUbica.length==0){
      this.toastr.info('Ingrese codigo de Ubicación!', 'Cerrar', {
        timeOut: 2500,
         });   
         return;   
    }    

    this.ObtieneInformacionUbicacion(codigoUbica);
  }

  ObtieneInformacionUbicacion(CodUbicacion: string){

    this.serviceUbicacion.getListaUbicacionByCode(CodUbicacion).subscribe({
      next: (response: any)=> {
        if(response.success){
          if (response.totalElements > 0){
            this.codUbicacionDestino = CodUbicacion;
            this.formulario.get('ubicacion_añadir')?.patchValue('');
            this.dataSource.data = response.elements;

            //Activa los botones de Ubicar - Reubicar
            this.formulario.get('grupo_añadir')?.enable();
            this.isDisabled_BtnGrupo = !this.isDisabled_BtnGrupo;
            this.inputAddGru.nativeElement.focus();            

            //Aqui debe de Listar u Obtener los grupos que estan agrupados en la Ubicación
            this.ListaGruposByCodigoUbicacion(CodUbicacion);
          }
          else{
            this.formulario.get('ubicacion_añadir')?.patchValue('');
            this.formulario.get('grupo_añadir')?.disable();
            this.isDisabled_BtnGrupo = true;
            this.inputAddUbi.nativeElement.focus();

            //Limpia las Tablas 
            this.dataSource.data = [];
            this.dataSourceUbi.data = [];

            //Muestra mensaje que no hay datos
            this.toastr.info(response.message, 'Cerrar', {
              timeOut: 2500,
            });   
            
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

  ListaGruposByCodigoUbicacion(CodUbicacion: string){
    this.serviceBultoHiladoGrupo.getListaGruposByCodUbicacion(CodUbicacion).subscribe({
      next: (response: any)=> {
        if(response.success){
          if (response.totalElements > 0){
            this.dataSourceUbi.data = response.elements;
          }
          else{
            this.dataSourceUbi.data = [];
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
