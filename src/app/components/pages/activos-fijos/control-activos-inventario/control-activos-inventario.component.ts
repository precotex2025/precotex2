import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

import { DialogAgregarDescripcionComponent } from '../control-activos/dialog-agregar-descripcion/dialog-agregar-descripcion.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-control-activos-inventario',
  templateUrl: './control-activos-inventario.component.html',
  styleUrls: ['./control-activos-inventario.component.css']
})
export class ControlActivosInventarioComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  submitForm = false;
  formulario = this.formBuilder.group({
    //-----------NUEVO
    Cod_Activo_Fijo: [0],
    Empresa: ['', Validators.compose([Validators.required])],
    Sede: ['', Validators.compose([Validators.required])],
    Piso: ['', Validators.compose([Validators.required])],
    Ccosto: ['', Validators.compose([Validators.required])],
    Area: ['', Validators.compose([Validators.required])], //, Validators.pattern("^[a-zA-Z0-9 _-]{1,80}$")
    Responsable: ['', Validators.compose([Validators.required])], //, Validators.pattern("^[a-zA-Z0-9 _-]{1,50}$")
    Usuario: ['', Validators.compose([Validators.required])], //, Validators.pattern("^[a-zA-Z0-9 _-]{1,50}$")
    CodAct: ['', Validators.compose([Validators.required])], //, Validators.pattern("^[a-zA-Z0-9_-]{1,9}$")
    ClaseAct: ['', Validators.compose([Validators.required])],
    //UsuarioLog: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9_-]$")])],
    Fijar: [false],
    Ubicacion: ['', Validators.required],
    //NUEVOS CAMPOS
    tasaDepreciacion: [0],
    nroGuia: [''],
    tipoActivo: ['1', Validators.required],
    tiempoVidaUtil: [''],
    tipoVidaUtil: [''],
    fechaAltaActivo: [''],
    codActivoRelacionado: [''],
    precioTotal: [0],
    mejora: [false],
    descripcionMejora: [''],
    tipoBaja: [0],
    fechaBaja: [''],
    documentoBaja: [''],
    Imei: [''],
    Capacidad: [''],
    Celular: [''],
    fechaVencimiento: [''],
    gastosAdicionales: [0],
    descripcionAdicionales: [''],
    nuevoCodActivo: [''],
    Descripcion: ['', Validators.compose([Validators.required])], //, Validators.pattern("^[a-zA-Z0-9 _-]{1,200}$")
    Marca: [''], //, Validators.pattern("^[a-zA-Z0-9 _-]{1,50}$")
    Modelo: [''], //, Validators.pattern("^[a-zA-Z0-9 _-]{1,50}$")
    Serie: [''], //, Validators.pattern("^[a-zA-Z0-9_-]{1,20}$")
    Estado: [0], //, Validators.pattern("^[a-zA-Z0-9_-]$")
    Uso: [0], //, Validators.pattern("^[a-zA-Z0-9_-]$")
    Observacion: [''], //, Validators.pattern("^[a-zA-Z0-9 _-]{0,200}$")
    Color: [0], //, Validators.pattern("^[a-zA-Z0-9_-]$")
    Medidas: [''], //, Validators.pattern("^[a-zA-Z0-9_-]{1,20}$")
    Motor: [''], //, Validators.pattern("^[a-zA-Z0-9_-]{1,20}$")
    Chasis: [''], //, Validators.pattern("^[a-zA-Z0-9_-]{1,20}$")
    Placa: [''], //, Validators.pattern("^[a-zA-Z0-9_-]{1,7}$")
    Combustible: [0], //, Validators.pattern("^[a-zA-Z0-9_-]$")
    Caja: [0], //, Validators.pattern("^[a-zA-Z0-9_-]$")
    Asiento: [0], //, Validators.pattern("^[a-zA-Z0-9_-]$")
    Fabricacion: [new Date()], //, Validators.pattern("^[a-zA-Z0-9_-]{1,50}$")
    Ejes: [0], //, Validators.pattern("^[a-zA-Z0-9_-]$")
    Fecha: [new Date()],
    observacionBaja: ['']
  })
  data: any = [];
  dataEmpresas: any = [];
  dataTrabajadores: any = [];
  dataPeriodos: Array<any> = [];
  dataSedes: Array<any> = [];
  dataColor: Array<any> = [];
  dataCaja: Array<any> = [];
  ClaseActivos: Array<any> = [];
  dataAsiento: Array<any> = [];
  dataDescripcion: Array<any> = [];
  dataEje: Array<any> = [];
  dataCombustible: Array<any> = [];
  dataEstado: Array<any> = [];
  dataUso: Array<any> = [];
  sede: string = '';

  detalleCategoria = {
    vehiculos: false,
    muebles: false,
    computo: false,
    comunicaciones: false,
    laboratorio: false,
    energia: false,
    electrodomesticos: false,
    maquinas_industriales: false,
    diversos: false,
    otros: false
  }

  dataFijar = {
    empresa: false,
    sede: false,
    piso: false,
    area: false,
    centro: false,
    ubicacion: false,
    tasaDepreciacion: false,
    nroGuia: false,
    tipoActivo: false,
    tiempoVidaUtil: false,
    tipoVidaUtil: false,
    fechaAltaActivo: false,
    codActivoRelacionado: false,
    precioTotal: false,
    mejora: false,
    descripcionMejora: false,
    responsable: false,
    usuario: false,
    clase: false,
    descripcion: false,
    marca: false,
    modelo: false,
    serie: false,
    motor: false,
    chasis: false,
    placa: false,
    color: false,
    medidas: false,
    estado: false,
    uso: false,
    combustible: false,
    caja: false,
    asiento: false,
    fabricacion: false,
    ejes: false,
    observacion: false
  }

  deshabilitar: boolean = false;
  dataAreas: Array<any> = [];
  sCod_Usuario = ''

  validarForm = false;

  mostrarRelacionado = false;
  esMejora = false;
  mostrarNuevo = false;
  Cod_Accion = ""
  Cod_Item_Cab = 0
  Cod_Empresa = 0
  Planta = ""
  Piso = 0
  Cod_CenCost = ""
  Nom_Area = ""
  Nom_Responsable = ""
  Nom_Usuario = ""
  Ubicacion = ""
  Cod_Activo = ""
  Clase_Activo = 0

  codTrabajador = '';
  tipo = 1;
  constructor(private formBuilder: FormBuilder,
    private controlActivoFijoService: ControlActivoFijoService,
    private _router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog) {
      this.codTrabajador = localStorage.getItem('codTrabajador')!;
  }

  ngOnInit(): void {
    this.cargarEmpresas();
    this.CargarOperacionClase();
    this.MostrarCaja();
    this.MostrarAsiento();
    this.MostrarEje();
    this.MostrarEstado();
    this.MostrarUso();
    this.MostrarColor();
    this.MostrarCombustible();
    this.getDescripcionActivos();
    this.getCentrosCosto();
    console.log(this.formulario);
  }
  ngAfterViewInit(): void {
  }

  get f() { return this.formulario.controls; }

  MostrarCaja() {
    this.controlActivoFijoService.GetAfTipoCajas().subscribe({
      next: (response: any) => {
        this.dataCaja = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  changeArea(event: any){
    console.log(event);
    if(event != undefined && event != null){
      this.formulario.patchValue({
        Ccosto: event.codCentroCosto
      })
    }
  }

  getCentrosCosto(){
    this.controlActivoFijoService.getCentrosCosto().subscribe({
      next: (response:any) => {
        console.log(response);
        this.dataAreas = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }
  MostrarAsiento() {
    this.controlActivoFijoService.GetNumAsientos().subscribe({
      next: (response: any) => {
        this.dataAsiento = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  MostrarEje() {
    this.controlActivoFijoService.GetAfNumEjes().subscribe({
      next: (response: any) => {
        this.dataEje = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  MostrarEstado() {
    this.controlActivoFijoService.GetAfEstadoFisico().subscribe({
      next: (response: any) => {
        this.dataEstado = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  MostrarUso() {
    this.controlActivoFijoService.getUsoDesusos().subscribe({
      next: (response: any) => {
        this.dataUso = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });

  }

  MostrarColor() {
    this.controlActivoFijoService.getAfColors().subscribe({
      next: (response: any) => {
        this.dataColor = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }


  MostrarCombustible() {
    this.controlActivoFijoService.getCombustible().subscribe({
      next: (response: any) => {
        this.dataCombustible = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  cargarEmpresas() {
    this.controlActivoFijoService.getEmpresas().subscribe({
      next: (response: any) => {
        this.dataEmpresas = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  CargarOperacionClase() {
    this.controlActivoFijoService.getCategoria().subscribe({
      next: (response: any) => {
        this.ClaseActivos = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  escanearCentro() {
    console.log(this.formulario.get('Ccosto')?.value);

    var centro = this.formulario.get('Ccosto')?.value;
    if (this.formulario.get('Ccosto')?.value != '' && (centro?.length == 9 || centro?.length == 6)) {
      this.controlActivoFijoService.buscarAreaCentro(
        this.formulario.get('Ccosto')?.value
      ).subscribe(
        (result: any) => {
          if (result.status == 1) {
            this.formulario.patchValue({
              Area: result.respuesta
            })
          } else {
            this.formulario.patchValue({
              Area: ''
            })
          }
        },
        (err: HttpErrorResponse) => {

          this.formulario.patchValue({
            Area: ''
          })
        })
    }
  }
  getDescripcionActivos() {
    this.controlActivoFijoService.DescripcionActivo().subscribe({
      next: (response: any) => {
        this.dataDescripcion = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  agregarDescripcion() {
    let datos = {
      tipo: 1,
      boton: 'Guardar',
      cabecera: 'Crear Nueva Descripción'
    }
    let dialogRef = this.dialog.open(DialogAgregarDescripcionComponent, {
      disableClose: true,
      panelClass: 'my-class',
      data: {
        data: datos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDescripcionActivos();


    })
  }

  changeDescripcion(event: any) {
    console.log(event);
    if (event != '' && event != undefined) {
      this.formulario.patchValue({
        ClaseAct: event.codCategoria
      })
      this.CambiarContenidoDetalle(event.codCategoria);
    } else {
      this.formulario.patchValue({
        ClaseAct: ''
      })
      this.CambiarContenidoDetalle('');
    }

  }
  selectTipoActivo(event: number) {
    console.log(event);
    if (event > 1 && event != null) {
      this.mostrarRelacionado = true;
    } else {
      this.mostrarRelacionado = false;
    }

  }
  mostrarMejora(event: any) {
    console.log(event.checked)
    this.esMejora = event.checked;
    if(event.checked == true){
      this.formulario.patchValue({
        tipoActivo: "2"
      });
      this.mostrarRelacionado = true;
    }
  }
  CambiarContenidoDetalle(Cod_Categoria: any) {
    // this.formulario.patchValue({
    //   Fijar: false
    // })
    console.log(Cod_Categoria);
    if (Cod_Categoria == 1) {
      this.detalleCategoria.vehiculos = true;
      this.detalleCategoria.muebles = false;
      this.detalleCategoria.computo = false;
      this.detalleCategoria.energia = false;
      this.detalleCategoria.otros = false;
    }
    if (Cod_Categoria == 2) {
      this.detalleCategoria.muebles = true;
      this.detalleCategoria.vehiculos = false;
      this.detalleCategoria.computo = false;
      this.detalleCategoria.energia = false;
      this.detalleCategoria.otros = false;
    }
    if (Cod_Categoria >= 3 && Cod_Categoria <= 5) {
      this.detalleCategoria.muebles = false;
      this.detalleCategoria.vehiculos = false;
      this.detalleCategoria.energia = false;
      this.detalleCategoria.computo = true;
      this.detalleCategoria.otros = false;
    }

    if (Cod_Categoria == 6) {
      this.detalleCategoria.muebles = false;
      this.detalleCategoria.vehiculos = false;
      this.detalleCategoria.energia = true;
      this.detalleCategoria.otros = false;
    }

    if (Cod_Categoria >= 7 && Cod_Categoria <= 9) {
      this.detalleCategoria.muebles = false;
      this.detalleCategoria.vehiculos = false;
      this.detalleCategoria.computo = true;
      this.detalleCategoria.energia = false;
      this.detalleCategoria.otros = false;
    }
    if (Cod_Categoria > 9) {
      this.detalleCategoria.muebles = false;
      this.detalleCategoria.vehiculos = false;
      this.detalleCategoria.computo = false;
      this.detalleCategoria.energia = false;
      this.detalleCategoria.otros = true;
    }
  }
  selectEmpresa(Accion: any) {
    this.controlActivoFijoService.MostrarSedePorEmpresaService(
      Accion
    ).subscribe(
      (result: any) => {
        this.dataSedes = result
      })
  }
  selectUsuario(event: any) {

  }


  FijarCabecera(valor: any, campo: any) {
    if (campo == 'empresa') {
      this.dataFijar.empresa = valor.checked;
    }
    if (campo == 'sede') {
      this.dataFijar.sede = valor.checked;
    }
    console.log(this.dataFijar);
    if (campo == 'piso') {
      this.dataFijar.piso = valor.checked;
    }
    if (campo == 'area') {
      this.dataFijar.area = valor.checked;
    }
    if (campo == 'centro') {
      this.dataFijar.centro = valor.checked;
    }
    if (campo == 'ubicacion') {
      this.dataFijar.ubicacion = valor.checked;
    }
    if (campo == 'responsable') {
      this.dataFijar.responsable = valor.checked;
    }
    if (campo == 'usuario') {
      this.dataFijar.usuario = valor.checked;
    }
    if (campo == 'clase') {
      this.dataFijar.clase = valor.checked;
    }
    if (campo == 'descripcion') {
      this.dataFijar.descripcion = valor.checked;
    }
    if (campo == 'marca') {
      this.dataFijar.marca = valor.checked;
    }
    if (campo == 'modelo') {
      this.dataFijar.modelo = valor.checked;
    }
    if (campo == 'serie') {
      this.dataFijar.serie = valor.checked;
    }
    if (campo == 'motor') {
      this.dataFijar.motor = valor.checked;
    }
    if (campo == 'chasis') {
      this.dataFijar.chasis = valor.checked;
    }
    if (campo == 'placa') {
      this.dataFijar.placa = valor.checked;
    }
    if (campo == 'color') {
      this.dataFijar.color = valor.checked;
    }
    if (campo == 'medidas') {
      this.dataFijar.medidas = valor.checked;
    }
    if (campo == 'estado') {
      this.dataFijar.estado = valor.checked;
    }
    if (campo == 'uso') {
      this.dataFijar.uso = valor.checked;
    }
    if (campo == 'combustible') {
      this.dataFijar.combustible = valor.checked;
    }
    if (campo == 'caja') {
      this.dataFijar.caja = valor.checked;
    }
    if (campo == 'asiento') {
      this.dataFijar.asiento = valor.checked;
    }
    if (campo == 'fabricacion') {
      this.dataFijar.fabricacion = valor.checked;
    }
    if (campo == 'ejes') {
      this.dataFijar.ejes = valor.checked;
    }
    if (campo == 'observacion') {
      this.dataFijar.observacion = valor.checked;
    }
    if (campo == 'tasaDepreciacion') {
      this.dataFijar.tasaDepreciacion = valor.checked;
    }
    if (campo == 'nroGuia') {
      this.dataFijar.nroGuia = valor.checked;
    }
    if (campo == 'tipoActivo') {
      this.dataFijar.tipoActivo = valor.checked;
    }
    if (campo == 'tiempoVidaUtil') {
      this.dataFijar.tiempoVidaUtil = valor.checked;
    }
    if (campo == 'tipoVidaUtil') {
      this.dataFijar.tipoVidaUtil = valor.checked;
    }
    if (campo == 'fechaAltaActivo') {
      this.dataFijar.fechaAltaActivo = valor.checked;
    }
    if (campo == 'codActivoRelacionado') {
      this.dataFijar.codActivoRelacionado = valor.checked;
    }
    if (campo == 'precioTotal') {
      this.dataFijar.precioTotal = valor.checked;
    }
  }

  guardarRegistro() {
    this.submitForm = true;
    var codUsuario = localStorage.getItem('codUsuario');
    console.log(this.formulario.get('Fecha')?.value);
    let datos = {
      codActivoFijo: this.formulario.get('Cod_Activo_Fijo')?.value,
      codEmpresa: this.formulario.get('Empresa')?.value,
      codEstablecimiento: this.formulario.get('Sede')?.value,
      numPiso: this.formulario.get('Piso')?.value,
      codCenCost: this.formulario.get('Ccosto')?.value,
      nomArea: this.formulario.get('Area')?.value,
      codActivo: this.formulario.get('CodAct')?.value,
      codCategoria: this.formulario.get('ClaseAct')?.value,
      nomResponsable: this.formulario.get('Responsable')?.value,
      nomUsuario: this.formulario.get('Usuario')?.value,
      codUsuario: codUsuario,
      fecRegistro: new Date(),
      codUsuarioMod: codUsuario,
      fecUltModificacion: new Date(),
      codEquipo: 'PRXWIND526',
      ubicacion: this.formulario.get('Ubicacion')?.value,
      descripcion: this.formulario.get('Descripcion')?.value,
      nomMarca: this.formulario.get('Marca')?.value,
      nomModelo: this.formulario.get('Modelo')?.value,
      numSerieMotor: this.formulario.get('Motor')?.value,
      numSerieChasis: this.formulario.get('Chasis')?.value,
      numSerieEquipo: this.formulario.get('Serie')?.value,
      numPlaca: this.formulario.get('Placa')?.value,
      color: this.formulario.get('Color')?.value,
      tipoCombustible: this.formulario.get('Combustible')?.value,
      tipoCaja: this.formulario.get('Caja')?.value,
      cantAsiento: this.formulario.get('Asiento')?.value,
      anoFabricacion: this.formulario.get('Fabricacion')?.value,
      cantEje: this.formulario.get('Ejes')?.value,
      medida: this.formulario.get('Medidas')?.value,
      estadoFisico: this.formulario.get('Estado')?.value,
      usoDesuso: this.formulario.get('Uso')?.value,
      observacion: this.formulario.get('Observacion')?.value,
      tipoActivo: this.formulario.get('tipoActivo')?.value,
      codActivoRelacionado: this.formulario.get('codActivoRelacionado')?.value,
      nuevoCodActivo: this.formulario.get('nuevoCodActivo')?.value,
      precio: 0,
      igv: 0,
      flete: 0,
      precioTotal: this.formulario.get('precioTotal')?.value,
      gastosAdicionales: this.formulario.get('gastosAdicionales')?.value,
      descripcionAdicionales: this.formulario.get('descripcionAdicionales')?.value,
      mejora: this.formulario.get('mejora')?.value == true ? '1' : '',
      descripcionMejora: this.formulario.get('descripcionMejora')?.value,
      tipoBaja: this.formulario.get('tipoBaja')?.value,
      fechaBaja: this.formulario.get('fechaBaja')?.value != '' ? this.formulario.get('fechaBaja')?.value : null,
      documentoBaja: this.formulario.get('documentoBaja')?.value,
      nroGuia: this.formulario.get('nroGuia')?.value,
      tasaDepreciacion: this.formulario.get('tasaDepreciacion')?.value,
      tiempoVidaUtil: this.formulario.get('tiempoVidaUtil')?.value,
      tipoVidaUtil: this.formulario.get('tipoVidaUtil')?.value,
      celular: this.formulario.get('Celular')?.value,
      imei: this.formulario.get('Imei')?.value,
      capacidad: this.formulario.get('Capacidad')?.value,
      fechaAltaActivo: this.formulario.get('fechaAltaActivo')?.value != '' ? this.formulario.get('fechaAltaActivo')?.value : null,
      fechaVencimiento: this.formulario.get('fechaVencimiento')?.value != '' ? this.formulario.get('fechaVencimiento')?.value : null,
      observacionBaja: this.formulario.get('observacionBaja')?.value != '' ? this.formulario.get('observacionBaja')?.value : null
    }
    console.log(this.formulario);
    if (this.formulario.get('tipoActivo')?.value != '1') {
      if (this.formulario.get('codActivoRelacionado')?.value == '') {
        this.toastr.error('Si el activo no es un tipo Padre, debes ingresar el código de activo relacionado.', 'Cerrar', {
          timeOut: 3500,
        });
        return;
      }
    }
    if (this.formulario.valid) {
      this.deshabilitar = true;
      this.controlActivoFijoService.MantenimientoActivoFijoService(
        datos
      ).subscribe(
        (result: any) => {
          console.log(result);
          if (result.status == 1) {
            this.deshabilitar = false;
            this.toastr.success(result.respuesta, 'Cerrar', {
              timeOut: 2500,
            });
            this.formulario.patchValue({
              Cod_Activo_Fijo: 0,
              CodAct: '',
              mejora: false,
              descripcionMejora: '',
              tipoBaja: 0,
              fechaBaja: '',
              fechaVencimiento: '',
              documentoBaja: '',
              gastosAdicionales: 0,
              descripcionAdicionales: '',
              precioTotal: 0,
              tipoActivo: '1',
              nuevoCodActivo: '',
              Celular: '',
              Imei: '',
              Capacidad: ''
            });
            this.esMejora = false;
            this.mostrarNuevo = false;
            this.mostrarRelacionado = false;
            this.detalleCategoria.muebles = false;
            this.detalleCategoria.vehiculos = false;
            this.detalleCategoria.computo = false;
            this.detalleCategoria.otros = false;
            this.mostrarRelacionado = false;
            if (this.dataFijar.empresa == false) {
              this.formulario.patchValue({
                Empresa: ''
              })
            }
            if (this.dataFijar.sede == false) {
              this.formulario.patchValue({
                Sede: ''
              })
            }
            if (this.dataFijar.piso == false) {
              this.formulario.patchValue({
                Piso: ''
              })
            }
            if (this.dataFijar.centro == false) {
              this.formulario.patchValue({
                Ccosto: ''
              })
            }
            if (this.dataFijar.area == false) {
              this.formulario.patchValue({
                Area: ''
              })
            }
            if (this.dataFijar.responsable == false) {
              this.formulario.patchValue({
                Responsable: ''
              })
            }
            if (this.dataFijar.usuario == false) {
              this.formulario.patchValue({
                Usuario: ''
              })
            }
            if (this.dataFijar.clase == false) {
              this.formulario.patchValue({
                ClaseAct: ''
              })
            }else{
              this.CambiarContenidoDetalle(this.formulario.get('ClaseAct')?.value);
            }
            if (this.dataFijar.ubicacion == false) {
              this.formulario.patchValue({
                Ubicacion: ''
              })
            }
            if (this.dataFijar.descripcion == false) {
              this.formulario.patchValue({
                Descripcion: ''
              })
            }else{

            }
            if (this.dataFijar.marca == false) {
              this.formulario.patchValue({
                Marca: ''
              })
            }
            if (this.dataFijar.modelo == false) {
              this.formulario.patchValue({
                Modelo: ''
              })
            }
            if (this.dataFijar.motor == false) {
              this.formulario.patchValue({
                Motor: ''
              })
            }
            if (this.dataFijar.chasis == false) {
              this.formulario.patchValue({
                Chasis: ''
              })
            }
            if (this.dataFijar.serie == false) {
              this.formulario.patchValue({
                Serie: ''
              })
            }
            if (this.dataFijar.placa == false) {
              this.formulario.patchValue({
                Placa: ''
              })
            }
            if (this.dataFijar.estado == false) {
              this.formulario.patchValue({
                Estado: 0
              })
            }
            if (this.dataFijar.uso == false) {
              this.formulario.patchValue({
                Uso: 0
              })
            }
            if (this.dataFijar.observacion == false) {
              this.formulario.patchValue({
                Observacion: ''
              })
            }
            if (this.dataFijar.color == false) {
              this.formulario.patchValue({
                Color: 0
              })
            }
            if (this.dataFijar.medidas == false) {
              this.formulario.patchValue({
                Medidas: ''
              })
            }
            if (this.dataFijar.combustible == false) {
              this.formulario.patchValue({
                Combustible: 0
              })
            }
            if (this.dataFijar.caja == false) {
              this.formulario.patchValue({
                Caja: 0
              })
            }
            if (this.dataFijar.asiento == false) {
              this.formulario.patchValue({
                Asiento: 0
              })
            }
            if (this.dataFijar.fabricacion == false) {
              this.formulario.patchValue({
                Fabricacion: new Date()
              })
            }
            if (this.dataFijar.ejes == false) {
              this.formulario.patchValue({
                Ejes: 0
              })
            }
            if (this.dataFijar.tasaDepreciacion == false) {
              this.formulario.patchValue({
                tasaDepreciacion: 0
              })
            }
            if (this.dataFijar.nroGuia == false) {
              this.formulario.patchValue({
                nroGuia: ''
              })
            }
            if (this.dataFijar.tipoActivo == false) {
              this.formulario.patchValue({
                tipoActivo: '1'
              })
            }

            if (this.dataFijar.tiempoVidaUtil == false) {
              this.formulario.patchValue({
                tiempoVidaUtil: ''
              })
            }

            if (this.dataFijar.tipoVidaUtil == false) {
              this.formulario.patchValue({
                tipoVidaUtil: ''
              })
            }

            if (this.dataFijar.fechaAltaActivo == false) {
              this.formulario.patchValue({
                fechaAltaActivo: ''
              })
            }

            if (this.dataFijar.codActivoRelacionado == false) {
              this.formulario.patchValue({
                codActivoRelacionado: ''
              })
            }
            if (this.dataFijar.precioTotal == false) {
              this.formulario.patchValue({
                precioTotal: 0
              })
            }

          } else {
            this.toastr.error('Ha ocurrido un error', 'Cerrar', {
              timeOut: 2500,
            });
            this.deshabilitar = false;
          }
        }, (err) => {
          console.log(err);
          this.deshabilitar = false;
          this.toastr.error('Ha ocurrido un error', 'Cerrar', {
            timeOut: 2500,
          });
        })
    } else {
      this.toastr.error('Debes llenar los campos obligatorios.', 'Cerrar', {
        timeOut: 2500,
      });
    }
  }

  nuevoRegistro() {
    this.formulario.reset();
    this.formulario.patchValue({
      Cod_Activo_Fijo: 0,
      Color: 0,
      Combustible: 0,
      Caja: 0,
      Asiento: 0,
      Ejes: 0,
      mejora: false,
      tipoActivo: '1',
      precioTotal: 0,
      Uso: 0,
      Fabricacion: new Date(),
      descripcionMejora: '',
      tipoBaja: 0,
      fechaBaja: '',
      tasaDepreciacion: 0,
      documentoBaja: '',
      gastosAdicionales: 0,
      descripcionAdicionales: ''
    })
    this.mostrarNuevo = false;
    this.detalleCategoria.muebles = false;
    this.detalleCategoria.vehiculos = false;
    this.detalleCategoria.computo = false;
    this.detalleCategoria.otros = false;
    this.mostrarRelacionado = false;
    this.esMejora = false;
    this.dataSedes = [];
    this.dataFijar = {
      empresa: false,
      sede: false,
      piso: false,
      area: false,
      centro: false,
      ubicacion: false,
      tasaDepreciacion: false,
      nroGuia: false,
      tipoActivo: false,
      tiempoVidaUtil: false,
      tipoVidaUtil: false,
      fechaAltaActivo: false,
      codActivoRelacionado: false,
      precioTotal: false,
      mejora: false,
      descripcionMejora: false,
      responsable: false,
      usuario: false,
      clase: false,
      descripcion: false,
      marca: false,
      modelo: false,
      serie: false,
      motor: false,
      chasis: false,
      placa: false,
      color: false,
      medidas: false,
      estado: false,
      uso: false,
      combustible: false,
      caja: false,
      asiento: false,
      fabricacion: false,
      ejes: false,
      observacion: false
    };
  }
  verificarRelacionado() {
    var Cod_Activo = this.formulario.get('codActivoRelacionado')?.value;
    if (Cod_Activo != null && Cod_Activo.length >= 7) {
      this.controlActivoFijoService.ObtenerActivoFijoCodigo(Cod_Activo).subscribe({
        next: (response:any) => {
          
          console.log(response);
          if(response && response != null){
            this.formulario.patchValue({
              codActivoRelacionado: response['codActivo']
            })
          }
        },
        error: (error: HttpErrorResponse) => {
          this.formulario.patchValue({
            codActivoRelacionado: ''
          })
          console.log(error)
          // this.toastr.error(error.message, 'Cerrar', {
          //   timeOut: 2500,
          // });
        }
      });
     
    }
  }
  verificarEditar() {
    var Cod_Activo = this.formulario.get('CodAct')?.value;
    console.log(Cod_Activo)
    if (Cod_Activo != null && Cod_Activo.length >= 7) {
      this.controlActivoFijoService.ObtenerActivoFijoCodigo(
        Cod_Activo
      ).subscribe(
        (result: any) => {
          console.log(result);

          if (result != null) {
            var fechaAlta = "";
            if(result['fechaAltaActivo'] != null){
              fechaAlta = result['fechaAltaActivo'].substring(0, 10)
            }
            this.mostrarNuevo = true;
            //this.matSnackBar.open('Registro encontrado.', 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 2500 })
            console.log(result['tipoActivo']);
            this.formulario.patchValue({
              Cod_Activo_Fijo: result['codActivoFijo'],
              Empresa: result['codEmpresa'],
              Sede: result['codEstablecimiento'],
              Piso: result['numPiso'],
              Ccosto: result['codCenCost'],
              Area: result['nomArea'],
              Responsable: result['nomResponsable'],
              Usuario: result['nomUsuario'],
              CodAct: result['codActivo'],
              ClaseAct: result['codCategoria'],
              Ubicacion: result['ubicacion'],
              Descripcion: result['descripcion'],
              Marca: result['nomMarca'],
              Modelo: result['nomModelo'],
              Serie: result['numSerieEquipo'],
              Estado: result['estadoFisico'],
              Uso: result['usoDesuso'],
              Observacion: result['observacion'],
              Color: result['color'],
              Medidas: result['medida'] != '' &&  result['medida'] != null ? result['medida'].trim() : '',
              Motor: result['numSerieMotor'] != undefined ? result['numSerieMotor'] : '',
              Chasis: result['numSerieChasis'] != undefined ? result['numSerieChasis'] : '',
              Placa: result['numPlaca'] != undefined ? result['numPlaca'] : '',
              Combustible: result['tipoCombustible'] != undefined ? result['tipoCombustible'] : '',
              Caja: result['tipoCaja'] != undefined ? result['tipoCaja'] : '',
              Asiento: result['cantAsiento'] != undefined ? result['cantAsiento'] : '',
              Ejes: result['cantEje'] != undefined ? result['cantEje'] : '',
              precioTotal: result['precioTotal'] != null ? result['precioTotal'] : 0,
              gastosAdicionales: result['gastosAdicionales'] != null ? result['gastosAdicionales'] : 0,
              tipoActivo: result['tipoActivo'].toString(),
              descripcionAdicionales: result['descripcionAdicionales'] != null ? result['descripcionAdicionales'] : '',
              mejora: result['mejora'] != null ? result['mejora'].trim() : false,
              descripcionMejora: result['descripcionMejora'] != null ? result['descripcionMejora'] : '',
              tipoBaja: result['tipoBaja'] != null ? result['tipoBaja'] : 0,
              fechaBaja: result['fechaBaja'],
              documentoBaja: result['documentoBaja'] != null ? result['documentoBaja'] : '',
              nroGuia: result['nroGuia'] != null ? result['nroGuia'].trim() : '',
              tasaDepreciacion: result['tasaDepreciacion'] ? result['tasaDepreciacion'] : 0,
              tiempoVidaUtil: result['tiempoVidaUtil'] != null ? result['tiempoVidaUtil'].trim() : '',
              tipoVidaUtil: result['tipoVidaUtil'] != null ? result['tipoVidaUtil'] : '',
              Celular: result['celular'] != null ? result['celular'] : '',
              Capacidad: result['capacidad'] != null ? result['capacidad'] : '',
              Imei: result['imei'] != null ? result['imei'] : '',
              fechaVencimiento: result['fechaVencimiento'],
              fechaAltaActivo: fechaAlta,
              codActivoRelacionado: result['codActivoRelacionado'] != null ? result['codActivoRelacionado'].trim() : '',
              observacionBaja: result['observacionBaja'] != null ? result['observacionBaja'].trim() : ''
            })
            
            if (result['mejora'] == '1') {
              this.esMejora = true;
            } else {
              this.esMejora = false;
            }
            if (result['tipoActivo'] == 1) {
              this.mostrarRelacionado = false;
            } else {
              this.mostrarRelacionado = true;
            }
            this.selectEmpresa(result['codEmpresa']);
            this.CambiarContenidoDetalle(result['codCategoria']);
          }else{
            this.mostrarNuevo = false;
          }
        })
    }
  }
}

