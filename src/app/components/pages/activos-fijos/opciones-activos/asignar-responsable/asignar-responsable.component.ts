
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


interface data_det {
  codActivoFijo: number;
  codActivo: number;
  claseActivo: string;
  responsable: string;
  empresa: string;
}
@Component({
  selector: 'app-asignar-responsable',
  templateUrl: './asignar-responsable.component.html',
  styleUrls: ['./asignar-responsable.component.css']
})
export class AsignarResponsableComponent implements OnInit {

  displayedColumns: string[] = [
    'codActivo',
    'claseActivo',
    'responsable',
    'empresa',
    'acciones'
  ];

  codActivo:string = '';
  dataActivos:any = [];


  formulario = this.formBuilder.group({
    //-----------NUEVO
    cargo: ['', Validators.required],
    codCenCost: ['', Validators.required],
    responsable: ['', Validators.required],
    ubicacion: ['', Validators.required],
    area: ['', Validators.required],
    unidad: ['', Validators.required],
    dataActivos: [ '', Validators.required]
  });
  constructor(
    private controlActivoFijoService: ControlActivoFijoService,
    public dialog: MatDialog,
    private _router: Router,
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
  }

  regresar(){
    this._router.navigate(['pages/activos/OpcionesActivos']);
  }

  onChangeFile(event:any){
    console.log(event)
  }

  EliminarRegistro(data:data_det){

  }

  agregarActivo(){
    if(this.codActivo != ''){
      this.controlActivoFijoService.ObtenerActivoFijoCodigo(this.codActivo).subscribe({
        next: (response: any) => {
            console.log(response)
            if(response != null){
  
              if(this.dataActivos.length > 0){
                var array = this.dataActivos.filter((element:any) => {
                  return element.codActivo == response['codActivo']
                });
                if(array.length == 0){
                  
                  this.dataActivos.push(response);
                  this.codActivo = '';
                  this.toastr.success('Registro agregado correctamente', 'Correcto', {
                    timeOut: 2500,
                  });
                }else{
                  this.toastr.info('Registro se agrego anteriormente', 'Info', {
                    timeOut: 2000,
                  });
                }
              }else{
                var centroCosto = response['codCenCost'];
                this.formulario.patchValue({
                  ubicacion: response['ubicacion'],
                  area: response['nomArea'],
                  codCenCost: centroCosto
                })
                this.dataActivos.push(response);
                this.codActivo = '';
                this.toastr.success('Registro agregado correctamente', 'Correcto', {
                  timeOut: 2500,
                });
              }
            }else{
              
            }
        },
        error: (error) => {
          console.log(error)
          
        }
      });
    }else{
      this.toastr.warning('Debes digitar el código del activo', 'Advertencia', {
        timeOut: 2500,
      });
    }
    
  }

  guardarRegistro(){
    if(this.dataActivos.length == 0){
      this.toastr.info('Debes agregar al menos un activo', 'Advertencia', {
        timeOut: 2500,
      });
      return;
    }else{
      this.formulario.patchValue({
        dataActivos: this.dataActivos
      });
    }
    if(this.formulario.valid){
      this.spinnerService.show();
      var codCentro = this.formulario.get('codCenCost')?.value + '-' + this.formulario.get('area')?.value + '.pdf';
      this.controlActivoFijoService.descargarArchivos(this.formulario.value, codCentro);
      setTimeout(() => {
        this.toastr.success('Se asigno el responsable correctamente.', 'Correcto', {
          timeOut: 2500,
        });
        this.formulario.reset();
        this.dataActivos = [];
        this.codActivo = '';
        this.spinnerService.hide();  
      }, 1000);
      this.formulario.reset();
      
    }else{
      this.toastr.info('Debes completar los campos obligatorios.', 'Advertencia', {
        timeOut: 2500,
      });
    }
  }

  eliminarActivo(codActivo: string){
    console.log(codActivo);
    this.dataActivos = this.dataActivos.filter((element:any) => {
      return element.codActivo !== codActivo
    });

  }
}
