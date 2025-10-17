import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

interface data {
  data: any
}

interface ubicacion {
  idUbicacion: number;
  codUbicacion: string;
  codSede: string;
  codArea: string;
  codPiso: string;
}

@Component({
  selector: 'app-dialog-ubicacion-activos',
  templateUrl: './dialog-ubicacion-activos.component.html',
  styleUrls: ['./dialog-ubicacion-activos.component.css']
})
export class DialogUbicacionActivosComponent implements OnInit {

  formulario = this.formBuilder.group({
    idAmbiente: [0,],
    idUbicacion: [0, Validators.required],
    idCc: [0, Validators.required],
    codGeneral: ['', Validators.required],
    codSede: [''],
    codPiso: [''],
    codArea: [''],
    desArea: [''],
    centroCosto: ['', Validators.required],
    codAmbiente: ['', Validators.required],
    desAmbiente: ['', Validators.required],
    flgActivo:[true]
  })

  dataUbicacion: ubicacion[] = [];
  dataSedes: Array<any> = [];
  dataPisos: Array<any> = [];
  dataCc: Array<any> = [];
  centroCosto: Array<any> = [];
  //dataUsuario: Array<any> = [];
  //ClaseActivos: Array<any> = [];
  //usuario: any = "";
  //existeCo: boolean = true;

  //Empresa: string = "";

  tipo: any;
  cabecera = '';
  boton = '';
  codGeneral: string = '';
  idArea: number = 0;
  idCCost: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogUbicacionActivosComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private controlActivoFijoService: ControlActivoFijoService,
    @Inject(MAT_DIALOG_DATA) public data: data
  ) { }

  ngOnInit(): void {
    console.log(this.data.data.data)
    this.tipo = this.data.data.tipo;
    this.cabecera = this.data.data.cabecera;
    this.boton = this.data.data.boton;

    if (this.tipo == 2) {
      //this.centroCosto = this.dataCc.filter(d => d.idArea == ubicacion[0].idArea);

      this.formulario.patchValue({
        idAmbiente: this.data.data.data.idAmbiente,
        idUbicacion: this.data.data.data.idUbicacion,
        idCc: this.data.data.data.idCc,
        codGeneral: this.data.data.data.codGeneral,
        codAmbiente: this.data.data.data.codAmbiente,
        desAmbiente: this.data.data.data.desAmbiente,
        //centroCosto: this.centroCosto[0].codCentroCosto
      });
      
      this.formulario.controls['desArea'].disable();
      this.codGeneral = this.data.data.data.codGeneral.substring(0,7);
      this.idCCost = this.data.data.data.idCc;
    }

    this.listarSedes(1);
  }

  listarUbicaciones() {
    this.controlActivoFijoService.UbicacionActivo().subscribe({
      next: (response: any) => {
        this.dataUbicacion = response;
        console.log(this.dataUbicacion)
        if(this.tipo == 2){
          let ubicacion: any[];
          let sede: any[];
          let piso: any[];

          ubicacion = this.dataUbicacion.filter(d => d.idUbicacion == this.data.data.data.idUbicacion);
          piso = this.dataPisos.filter(d => d.codPiso == ubicacion[0].codPiso);
          sede = this.dataSedes.filter(d => d.codEstablecimiento == ubicacion[0].codSede);
          this.idArea = ubicacion[0].idArea

          this.formulario.patchValue({
            desArea: ubicacion[0].desArea,
            codArea: ubicacion[0].desArea.substring(4,100),
            codSede: ubicacion[0].codSede.concat(" - ").concat(sede[0].desEstablecimiento),
            codPiso: ubicacion[0].codPiso.concat(" - ").concat(piso[0].desPiso)
          });
        }

        this.listarCentrosCosto();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  listarPisos() {
    this.controlActivoFijoService.getPisos().subscribe({
      next: (response: any) => {
        this.dataPisos = response;
        //console.log(this.dataPisos)
        this.listarUbicaciones();
        

      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  listarSedes(empresa: any) {
    this.controlActivoFijoService.MostrarSedePorEmpresaService(empresa)
      .subscribe((result: any) => {
        this.dataSedes = result
        console.log(this.dataSedes)
        this.listarPisos();
    
      });
  }

  listarCentrosCosto() {
    this.controlActivoFijoService.getCentrosCosto().subscribe({
      next: (response: any) => {
        this.dataCc = response;

        if (this.tipo == 2) {
          // Filtrar por el id almacenado para asignar codCentroCosto
          this.centroCosto = this.dataCc.filter(d => d.id == this.idCCost);
    
          this.formulario.patchValue({
            centroCosto: this.centroCosto[0].codCentroCosto
          });
          
          // Filtrar por el idArea para cargar los centros de costo del area
          this.centroCosto = this.dataCc.filter(d => d.idArea == this.idArea);
        }
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  guardarAmbiente(){
    console.log(this.formulario)

    if(this.tipo == 1){
      this.controlActivoFijoService.saveAmbienteActivo(this.formulario.value
        ).subscribe(
          (result: any) => {
            if(result['idAmbiente']){
              this.toastr.success('Se registro correctamente la ubicación', 'Cerrar', {
                timeOut: 2500,
              });
              this.dialogRef.close();
            }else{
              this.toastr.error('Ha ocurrido un error al registrar unicación', 'Cerrar', {
                timeOut: 2500,
              });
            }
          },
          (err: HttpErrorResponse) => {
            this.toastr.error(err.message, 'Cerrar', {
              timeOut: 2500,
            });
          });
    }else{

      this.controlActivoFijoService.updateAmbienteActivo(this.data.data.data.idAmbiente, this.formulario.value
        ).subscribe(
          (result: any) => {
              this.toastr.success('Se actualizo correctamente la ubicación', 'Cerrar', {
                timeOut: 2500,
              });
              this.dialogRef.close(); 
          },
          (err: HttpErrorResponse) => {
            this.toastr.error('Ha ocurrido un error al actualizar el registro', 'Cerrar', {
              timeOut: 2500,
            });
        });
    }
  }

  changeUbicacion(event: any) {
    console.log(event);
    console.log(event.codArea);
    if (event != undefined && event != null) {
      let sede: any[];
      let piso: any[];
      piso = this.dataPisos.filter(d => d.codPiso == event.codPiso);
      sede = this.dataSedes.filter(d => d.codEstablecimiento == event.codSede);
      this.centroCosto = this.dataCc.filter(d => d.idArea == event.idArea);
      console.log(this.centroCosto)
      this.codGeneral = sede[0].codEstablecimiento.concat(piso[0].codPiso).concat(event.codArea);

      this.formulario.patchValue({
        idUbicacion: event.idUbicacion,
        codArea: event.desArea.substring(4,100),
        codSede: event.codSede.concat(" - ").concat(sede[0].desEstablecimiento),
        codPiso: event.codPiso.concat(" - ").concat(piso[0].desPiso)
      })
    }
  }

  generarCodigo(){
    let codAmbiente = this.formulario.get('codAmbiente')?.value;
    //console.log(Cod_Activo)
    if (codAmbiente != null && codAmbiente.length == 2){
      this.formulario.patchValue({
        codGeneral: this.codGeneral.concat(codAmbiente)
      });
    } else{
      this.formulario.patchValue({
        codGeneral: ""
      });
    }
  }

  selectCCosto(item: any){
    console.log(item.id)
    this.formulario.patchValue({
      idCc: item.id
    });
  }

}
