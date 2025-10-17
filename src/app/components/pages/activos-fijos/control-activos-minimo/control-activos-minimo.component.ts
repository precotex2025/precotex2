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
import { ExceljsService } from 'src/app/services/exceljs.service';
import { DialogCrearInventarioComponent } from '../opciones-activos/historial-inventarios/dialog-crear-inventario/dialog-crear-inventario.component';
import { DialogGestionInventarioComponent } from '../opciones-activos/historial-inventarios/dialog-gestion-inventario/dialog-gestion-inventario.component';
import { NgxSpinnerService } from 'ngx-spinner';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface data_det {
  idInventario: number;
  descripcion: string;
  fechaRegistro: string;
  flgEstado: string;
}

interface ambiente {
  idAmbiente: number;
  idCc: number;
  idUbicacion: number;
  codGeneral: string;
  codAmbiente: string;
  desAmbiente: string;
  flgActivo: boolean;
}

interface ubicacion {
  idUbicacion: number;
  codUbicacion: string;
  codSede: string;
  codArea: string;
  codPiso: string;
}

interface centroCosto{
  id: number;
  codCentroCosto: string;
  desArea: string;
  codCc: string;
  idArea: number;
}

interface area{
  idArea: number;
  desArea: string;
  codArea: string;
}

interface piso{
  numPiso: number;
  desPiso: string;
  codPiso: string;
}

interface ocupacion{
  codOcupacion: string;
  desOcupacion: string;
}

@Component({
  selector: 'app-control-activos-minimo',
  templateUrl: './control-activos-minimo.component.html',
  styleUrls: ['./control-activos-minimo.component.css']
})
export class ControlActivosMinimoComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  submitForm = false;
  idInventario: any = '';
  dataExcel: Array<any> = [];
  dataForExcel: Array<any> = [];
  dataSourceExcel: Array<any> = [];
  totalRegistros = 0;
  historialActivo!: data_det;
  formulario = this.formBuilder.group({
    //-----------NUEVO
    Cod_Activo_Fijo: [0],
    Empresa: ['', Validators.compose([Validators.required])],
    CodGeneral: ['', Validators.compose([Validators.required])], //, Validators.pattern("^[a-zA-Z0-9_-]{1,9}$")
    Sede: ['', Validators.compose([Validators.required])],
    numPiso: ['', Validators.compose([Validators.required])],
    desPiso:[''],
    Ccosto: ['', Validators.compose([Validators.required])],
    Area: ['', Validators.compose([Validators.required])], //, Validators.pattern("^[a-zA-Z0-9 _-]{1,80}$")
    DocResponsable: ['', Validators.compose([Validators.required])], //, Validators.pattern("^[a-zA-Z0-9 _-]{1,50}$")
    Responsable: ['', Validators.compose([Validators.required])], //, Validators.pattern("^[a-zA-Z0-9 _-]{1,50}$")
    DocUsuario: ['', Validators.compose([Validators.required])], //, Validators.pattern("^[a-zA-Z0-9 _-]{1,50}$")
    Usuario: ['', Validators.compose([Validators.required])], //, Validators.pattern("^[a-zA-Z0-9 _-]{1,50}$")
    Cargo:[''],
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

  id_Inventario = "";
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
  //dataCc: Array<any> = [];
  dataCc: centroCosto[] = [];
  //dataAmbiente: Array<any> = [];
  dataAmbiente: ambiente[] = [];
  //dataPisos: Array<any> = [];
  dataPisos: piso[] = [];
  //dataAreas: Array<any> = [];
  dataAreas: area[] = [];
  //dataUbicacion: Array<any> = [];
  dataUbicacion: ubicacion[] = [];
  dataPersonal: Array<any> = [];
  dataPersonalLista: Array<any> = [];
  //dataOcupacion: Array<any> = [];
  dataOcupacion: ocupacion[] = [];
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
    codgeneral: false,
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
  sCod_Usuario = ''

  validarForm = false;

  mostrarRelacionado = false;
  esMejora = false;
  mostrarNuevo = false;
  Cod_Accion = ""
  Cod_Item_Cab = 0
  Cod_Empresa = 0
  Planta = ""
  //Piso = 0
  Cod_CenCost = ""
  Nom_Area = ""
  Nom_Responsable = ""
  Nom_Usuario = ""
  Ubicacion = ""
  Cod_Activo = ""
  Clase_Activo = 0

  codTrabajador = '';
  tipo = 1;


  dataInventarios: Array<any> = [];
  dataModelos: Array<any> = [];
  dataMarcas: Array<any> = [];
  dataInventariosActivo: Array<any> = [];
  inventarioActivo = false;
  constructor(private formBuilder: FormBuilder,
    private controlActivoFijoService: ControlActivoFijoService,
    private _router: Router,
    private toastr: ToastrService,
    private exceljsService: ExceljsService,
    private SpinnerService: NgxSpinnerService,
    private dialog: MatDialog) {
    this.codTrabajador = localStorage.getItem('codTrabajador')!;
  }

  ngOnInit(): void {
    this.getInventarios();
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
    this.getModelosActivo();
    this.getMarcasActivo();
    this.MostrarAmbientes();
    this.MostrarPisos();
    this.MostrarAreas();
    this.MostrarUbicaciones();
    this.MostrarOcupaciones();
    this.cargarListaPersonal();
    //this.personalResponsable('47263704');
    //console.log(this.formulario);

    //console.log(this.historialActivo);
  }
  ngAfterViewInit(): void {
  }

  get f() { return this.formulario.controls; }

  getInventarios() {
    this.controlActivoFijoService.getInventarios().subscribe({
      next: (response: any) => {
        console.log(response);
        this.dataInventarios = response;
        this.dataInventariosActivo = this.dataInventarios.filter(elem => {
          return elem.flgEstado == '1'
        });
        if (this.dataInventariosActivo.length > 0) {
          this.inventarioActivo = true;
        } else {
          this.inventarioActivo = false;
        }
      },
      error: (error) => {
        console.log(error)

        this.toastr.error('Ha ocurrido un error.', 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  changeCodActivo(event:any){
    this.controlActivoFijoService.getNuevoCod(event.target.value).subscribe({
      next: (response: any) => {
        console.log(response);
        if(response.status == 1){
          this.toastr.warning('El Nuevo código de Activo ya existe.', 'Cerrar', {
            timeOut: 2500,
          });
          this.formulario.patchValue({
            nuevoCodActivo: ''
          })
        }
      },
      error: (error) => {
        console.log(error)

        this.toastr.error('Ha ocurrido un error.', 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

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

  changeArea(event: any) {
    console.log(event);
    if (event != undefined && event != null) {
      this.formulario.patchValue({
        Ccosto: event.codCentroCosto
      })
    }
  }

  getCentrosCosto() {
    this.controlActivoFijoService.getCentrosCosto().subscribe({
      next: (response: any) => {
        console.log(response);
        this.dataCc = response;
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
        //console.log("this.dataDescripcion")
        //console.log(this.dataDescripcion)
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  getModelosActivo(){
    this.controlActivoFijoService.ModeloActivo().subscribe({
      next: (response:any) => {
        this.dataModelos = response;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  getMarcasActivo(){
    this.controlActivoFijoService.MarcaActivo().subscribe({
      next: (response:any) => {
        this.dataMarcas = response;
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
    if (event.checked == true) {
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
        console.log(this.dataSedes)
      })
  }
  selectUsuario(event: any) {

  }

  changeSelection(event:any){
    console.log(event)
    this.idInventario = event.value;
  }

  FijarCabecera(valor: any, campo: any) {
    if (campo == 'empresa') {
      this.dataFijar.empresa = valor.checked;
    }
    if (campo == 'codgeneral') {
      this.dataFijar.codgeneral = valor.checked;
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
    console.log("aqui 1!")
    console.log(this.formulario.get('Cod_Activo_Fijo')!.value);
    if (this.historialActivo.idInventario == 0) {
      console.log("aqui!")
      //CREACION SIN TOMA DE INVENTARIO
      this.submitForm = true;
      var codUsuario = localStorage.getItem('codUsuario');
      console.log(this.formulario.get('Fecha')?.value);
      let datos = {
        codActivoFijo: this.formulario.get('Cod_Activo_Fijo')?.value,
        codEmpresa: this.formulario.get('Empresa')?.value,
        codEstablecimiento: this.formulario.get('Sede')?.value,
        numPiso: this.formulario.get('numPiso')?.value,
        desPiso: this.formulario.get('numPiso')?.value,
        codCenCost: this.formulario.get('Ccosto')?.value,
        nomArea: this.formulario.get('Area')?.value,
        codActivo: this.formulario.get('CodAct')?.value,
        codGeneral: this.formulario.get('CodGeneral')?.value,
        codCategoria: this.formulario.get('ClaseAct')?.value,
        nomResponsable: this.formulario.get('Responsable')?.value,
        dniResponsable: this.formulario.get('DocResponsable')?.value,
        nomUsuario: this.formulario.get('Usuario')?.value,
        dniUsuario: this.formulario.get('DocUsuario')?.value,
        ocupacionUsuario: this.formulario.get('Cargo')?.value,
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
              this.changeActivoInventario();
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
              if (this.dataFijar.ubicacion == false) {
                this.formulario.patchValue({
                  Ubicacion: ''
                })
              }
              if (this.dataFijar.sede == false) {
                this.formulario.patchValue({
                  Sede: ''
                })
              }
              if (this.dataFijar.piso == false) {
                this.formulario.patchValue({
                  numPiso: '',
                  desPiso: ''
                })
              }
              if (this.dataFijar.centro == false && this.dataFijar.area == false) {
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
                  Responsable: '',
                  DocResponsable: ''
                })
              }
              if (this.dataFijar.codgeneral == false) {
                this.formulario.patchValue({
                  CodGeneral: ''
                })
              }
              if (this.dataFijar.usuario == false) {
                this.formulario.patchValue({
                  Usuario: '',
                  DocUsuario: '',
                  Cargo:''
                })
              }
              if (this.dataFijar.clase == false) {
                this.formulario.patchValue({
                  ClaseAct: ''
                })
              } else {
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
              } else {

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
    } else {
      this.submitForm = true;
      console.log("aqui2");
      console.log(this.formulario)
      var codUsuario = localStorage.getItem('codUsuario');
      console.log(this.formulario.get('Fecha')?.value);

      if (this.formulario.get('tipoActivo')?.value != '1') {
        console.log("aqui3");
        if (this.formulario.get('codActivoRelacionado')?.value == '') {
          this.toastr.error('Si el activo no es un tipo Padre, debes ingresar el código de activo relacionado.', 'Cerrar', {
            timeOut: 3500,
          });
          return;
        }
      }
      
      if (this.formulario.valid) {
        console.log("aqui4");
        if (this.formulario.get('Cod_Activo_Fijo')!.value != 0) {
          this.deshabilitar = true;
          //TOMA DE INVENTARIO
          let datos = {
            idDetalleInventario: 0,
            idInventario: this.historialActivo.idInventario,
            codActivoFijo: this.formulario.get('Cod_Activo_Fijo')!.value, //activoFijo.codActivoFijo,
            codEmpresa: this.formulario.get('Empresa')!.value,
            sede: this.formulario.get('Sede')!.value,
            numPiso: this.formulario.get('numPiso')!.value,
            desPiso: this.formulario.get('desPiso')!.value,
            nomArea: this.formulario.get('Area')!.value,
            codGeneral: this.formulario.get('CodGeneral')?.value,
            codCentCost: this.formulario.get('Ccosto')!.value,
            nomUsuario: this.formulario.get('Usuario')!.value,
            dniUsuario: this.formulario.get('DocUsuario')!.value,
            codUsuario: localStorage.getItem('codUsuario'),
            ocupacionUsuario: this.formulario.get('Cargo')?.value,
            nomResponsable: this.formulario.get('Responsable')!.value,
            dniResponsable: this.formulario.get('DocResponsable')!.value,
            ubicacion: this.formulario.get('Ubicacion')!.value,
            usoDesuso: this.formulario.get('Uso')!.value?.toString(),
            estadoFisico: this.formulario.get('Estado')!.value?.toString(),
            nomMarca: this.formulario.get('Marca')!.value,
            nomModelo: this.formulario.get('Modelo')!.value,
            descripcion: this.formulario.get('Descripcion')!.value,
            numSerieEquipo: this.formulario.get('Serie')!.value,
            fechaRegistro: new Date(),
            codCategoria: this.formulario.get('ClaseAct')!.value,
            observaciones: this.formulario.get('Observacion')!.value,
            color: this.formulario.get('Color')!.value,
            imei: this.formulario.get('Imei')!.value,
            celular: this.formulario.get('Celular')!.value,
            medida: this.formulario.get('Medidas')!.value,
            nuevoCodActivo: this.formulario.get('nuevoCodActivo')!.value
          }
          this.SpinnerService.show();
          this.controlActivoFijoService.guardarActivoInventario(datos).subscribe({
            next: (response: any) => {
              console.log(response);
              this.deshabilitar = false;
              this.SpinnerService.hide();
              if (response.status == 1) {
                this.changeActivoInventario();
                this.toastr.success(response.respuesta, 'Cerrar', {
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
                    numPiso: '',
                    desPiso: ''
                  })
                }
                if (this.dataFijar.centro == false && this.dataFijar.area == false) {
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
                    Responsable: '',
                    DocResponsable: ''
                  })
                }
                if (this.dataFijar.codgeneral == false) {
                  this.formulario.patchValue({
                    CodGeneral: ''
                  })
                }  
                if (this.dataFijar.usuario == false) {
                  this.formulario.patchValue({
                    Usuario: '',
                    DocUsuario: '',
                    Cargo: ''
                  })
                }
                if (this.dataFijar.clase == false) {
                  this.formulario.patchValue({
                    ClaseAct: ''
                  })
                } else {
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
                } else {

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
                this.toastr.warning(response.respuesta, 'Cerrar', {
                  timeOut: 2500,
                });
                this.SpinnerService.hide();
              }
            },
            error: (error) => {
              console.log(error);
              this.SpinnerService.hide();
              this.toastr.error('Ha ocurrido un error al guardar los cambios', 'Cerrar', {
                timeOut: 2500,
              });
            }
          });
        } else {
          //CREACION SIN TOMA DE INVENTARIO
          this.submitForm = true;
          var codUsuario = localStorage.getItem('codUsuario');
          console.log(this.formulario.get('Fecha')?.value);
          let datos = {
            codActivoFijo: this.formulario.get('Cod_Activo_Fijo')?.value,
            codEmpresa: this.formulario.get('Empresa')?.value,
            codEstablecimiento: this.formulario.get('Sede')?.value,
            numPiso: this.formulario.get('numPiso')?.value,
            desPiso: this.formulario.get('desPiso')?.value,
            codCenCost: this.formulario.get('Ccosto')?.value,
            nomArea: this.formulario.get('Area')?.value,
            codGeneral: this.formulario.get('CodGeneral')?.value,
            codActivo: this.formulario.get('CodAct')?.value,
            codCategoria: this.formulario.get('ClaseAct')?.value,
            nomResponsable: this.formulario.get('Responsable')?.value,
            dniResponsable: this.formulario.get('DocResponsable')?.value,
            nomUsuario: this.formulario.get('Usuario')?.value,
            dniUsuario: this.formulario.get('DocUsuario')?.value,
            ocupacionUsuario: this.formulario.get('Cargo')?.value,
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
            this.controlActivoFijoService.MantenimientoActivoInventService(
              datos,
              this.historialActivo.idInventario
            ).subscribe(
              (result: any) => {
                console.log(result);
                if (result.status == 1) {
                  this.deshabilitar = false;
                  this.changeActivoInventario();
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
                      numPiso: '',
                      desPiso: ''
                    })
                  }
                  if (this.dataFijar.centro == false && this.dataFijar.area == false) {
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
                      Responsable: '',
                      DocResponsable: ''
                    })
                  }
                  if (this.dataFijar.codgeneral == false) {
                    this.formulario.patchValue({
                      CodGeneral: ''
                    })
                  }    
                  if (this.dataFijar.usuario == false) {
                    this.formulario.patchValue({
                      Usuario: '',
                      DocUsuario: '',
                      Cargo: ''
                    })
                  }
                  if (this.dataFijar.clase == false) {
                    this.formulario.patchValue({
                      ClaseAct: ''
                    })
                  } else {
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
                  } else {

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
      }

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
      descripcionAdicionales: '',
      Ubicacion: ''
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
      codgeneral: false,
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
        next: (response: any) => {

          console.log(response);
          if (response && response != null) {
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

  eliminarActivo(){
    if (confirm("Esta seguro de eliminar este registro?")) {
      this.controlActivoFijoService.deleteActivoFijoService(
        this.formulario.get('Cod_Activo_Fijo')?.value
      ).subscribe(
        (result: any) => {
          console.log(result)
          this.toastr.success('Se elimino el registro correctamente', 'Cerrar', {
            timeOut: 2500,
          });
          this.nuevoRegistro();

        },
        (err: HttpErrorResponse) => {
          this.toastr.error('Ha ocurrido un error al eliminar el registro', 'Cerrar', {
            timeOut: 2500,
          });
        })
    }
  }
  
  deleteInventarioActivo(){
    if (this.historialActivo.idInventario != 0) {
      if (confirm("Esta seguro de eliminar el inventario del activo?")) {
        this.controlActivoFijoService.deleteInventarioActivo(
          this.formulario.get('Cod_Activo_Fijo')?.value,
          this.historialActivo.idInventario
        ).subscribe(
          (result: any) => {
            console.log(result)
            this.toastr.success('Se elimino el registro del inventario correctamente', 'Cerrar', {
              timeOut: 2500,
            });
            this.nuevoRegistro();
  
          },
          (err: HttpErrorResponse) => {
            this.toastr.error('Ha ocurrido un error al eliminar el registro', 'Cerrar', {
              timeOut: 2500,
            });
          })
      }
    }else{
      this.toastr.error('Debes seleccionar un inventario aperturado.', 'Cerrar', {
        timeOut: 2500,
      });
    }
    
  }

  verificarEditar() {
    var Cod_Activo = this.formulario.get('CodAct')?.value;
    //console.log(Cod_Activo)
    if (Cod_Activo != null && Cod_Activo.length >= 7) {
      this.controlActivoFijoService.ObtenerActivoFijoCodigo(
        Cod_Activo
      ).subscribe(
        (result: any) => {
          console.log(result);

          if (result != null) {
            var fechaAlta = "";
            let piso: piso[];
            piso = this.dataPisos.filter(d => d.numPiso == result['numPiso'].toString());

            if (result['fechaAltaActivo'] != null) {
              fechaAlta = result['fechaAltaActivo'].substring(0, 10)
            }
            this.mostrarNuevo = true;
            //this.matSnackBar.open('Registro encontrado.', 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 2500 })
            //console.log(result['tipoActivo']);
            this.formulario.patchValue({
              Cod_Activo_Fijo: result['codActivoFijo'],
              Empresa: result['codEmpresa'],
              Sede: result['codEstablecimiento'],
              numPiso: result['numPiso'],
              //desPiso: result['desPiso'],
              desPiso: piso[0].desPiso,
              Ccosto: result['codCenCost'],
              Area: result['nomArea'],
              CodGeneral: result['codGeneral'],
              Responsable: result['nomResponsable'],
              DocResponsable: result['dniResponsable'],
              Usuario: result['nomUsuario'],
              DocUsuario: result['dniUsuario'],
              Cargo: result['ocupacionUsuario'],
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
              Medidas: result['medida'] != '' && result['medida'] != null ? result['medida'].trim() : '',
              nuevoCodActivo: result['nuevoCodActivo'] != '' && result['nuevoCodActivo'] != null ? result['nuevoCodActivo'].trim() : '',
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
          } else {
            this.mostrarNuevo = false;
          }
        })
    }
  }


  //TOMA DE INVENTARIO

  exportarExcel() {
    if (this.idInventario != '') {
      this.dataForExcel = [];
      this.dataExcel = [];
      this.dataSourceExcel = [];

      let datos = {
        idInventario: this.idInventario
      }
      this.SpinnerService.show();
      this.controlActivoFijoService.exportarTomaInventario(datos).subscribe({
        next: (response: any) => {
          if (response.length > 0) {
            console.log(response[0].nombreInventario)
            this.dataExcel = response;
            this.toastr.success('Exportando reporte', 'Correcto', {
              timeOut: 2500,
            });
            this.SpinnerService.hide();
            // this.dataExcel.forEach((row: any) => {
            //   this.dataForExcel.push(Object.values(row))
            // })

            // let reportData = {
            //   title: this.dataExcel[0]["nombreInventario"],
            //   data: this.dataForExcel,
            //   headers: Object.keys(this.dataExcel[0])
            // }

            

            this.dataExcel.forEach((item: any) => {
              let datos = {
                ['Empresa']: item.empresa,
                ['Sede']: item.sede,
                ['Piso']: item.piso,
                ['Area']: item.area,
                ['Codigo General']: item.codGeneral,
                ['Ubicacion']: item.ubicacion?.toUpperCase(),
                ['Centro Costo']: item.centroCosto,
                ['Dni Responsable']: item.dniResponsable?.toUpperCase(),
                ['Responsable']: item.responsable?.toUpperCase(),
                ['Dni Usuario']: item.dniUsuario?.toUpperCase(),
                ['Usuario']: item.nomUsuario?.toUpperCase(),
                ['Clase Activo']: item.claseActivo,
                ['Cod. Activo']: item.codActivo?.toUpperCase(),
                ['Descripción']: item.descripcion,
                ['Marca']: item.marca?.toUpperCase(),
                ['Modelo']: item.modelo?.toUpperCase(),
                ['Serie']: item.serie?.toUpperCase(),
                ['Medidas']: item.medida,
                ['Uso/Desuso']: item.usoDesuso,
                ['Estado Físico']: item.estadoFisico,
                ['Observación']: item.observacion,
                ['Color']: item.desColor,
                ['Celular']: item.celular,
                ['Imei']: item.imei,
                ['Fecha Registro']: item.fecRegistro,
                ['Cod Usuario Modifico']: item.codUsuarioModifico,
                ['Nuevo Cod. Activo']: item.nuevoCodActivo
              }
              this.dataForExcel.push(datos);

            });

            this.dataForExcel.forEach((row: any) => {
              this.dataSourceExcel.push(Object.values(row))
            })

            let reportData = {
              title: 'REPORTE INVENTARIO DE ACTIVOS',
              data: this.dataSourceExcel,
              headers: Object.keys(this.dataForExcel[0])
            }

            this.exceljsService.exportExcel(reportData);
            //this.dataSource.data = [];
          } else {
            this.SpinnerService.hide();
            this.toastr.info('No se encontraron registros', 'Info', {
              timeOut: 2500,
            });
          }
        },
        error: (error) => {
          console.log(error);
          this.SpinnerService.hide();
          this.toastr.error(error.error.message, 'Cerrar', {
            timeOut: 2500,
          });
        }
      });
    } else {
      this.toastr.error('Debes seleccionar un inventario para exportar', 'Cerrar', {
        timeOut: 2500,
      });
    }

  }


  crearTomadeInventario() {
    let datos = {
      tipo: 1,
      boton: 'Guardar',
      cabecera: 'Crear Toma de Inventario'
    }
    let dialogRef = this.dialog.open(DialogCrearInventarioComponent, {
      disableClose: true,
      panelClass: 'my-class',
      data: {
        data: datos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getInventarios();
    })
  }

  gestionTomadeInventario() {
    let datos = {
      tipo: 1,
      boton: 'Guardar',
      cabecera: 'Gestión Toma de Inventario',
      inventario: this.dataInventarios
    }
    let dialogRef = this.dialog.open(DialogGestionInventarioComponent, {
      disableClose: true,
      panelClass: 'my-class',
      data: {
        data: datos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getInventarios();
    })
  }

  changeActivo(item: any) {
    console.log(item);
    this.inventarioActivo = true;
    this.historialActivo = item;

    let datos = {
      idInventario: [item.idInventario.toString()]
    }

    this.id_Inventario = item.idInventario.toString();
    this.SpinnerService.show();
    this.controlActivoFijoService.resumenTomaInventario(datos).subscribe({
      next: (response: any) => {
        this.totalRegistros = response.inventario
        this.SpinnerService.hide();
      },
      error: (error) => {
        console.log(error);
        this.SpinnerService.hide();
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });

  }

  changeActivoInventario() {

    let datos = {
      idInventario: [this.id_Inventario]
    }
    this.SpinnerService.show();
    this.controlActivoFijoService.resumenTomaInventario(datos).subscribe({
      next: (response: any) => {
        this.totalRegistros = response.inventario;
        this.SpinnerService.hide();
      },
      error: (error) => {
        console.log(error);
        this.SpinnerService.hide();
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });

  }

  changeSelect(event:any){
    console.log(event);
    if(event.value == 'null'){
      this.historialActivo.idInventario = 0;
      console.log(this.historialActivo)
    }else{
      this.historialActivo.idInventario = event.value;
    }
  }

  MostrarAmbientes() {
    this.controlActivoFijoService.getAmbientes().subscribe({
      next: (response: any) => {
        this.dataAmbiente = response;
        //console.log(this.dataAmbiente)
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  MostrarPisos() {
    this.controlActivoFijoService.getPisos().subscribe({
      next: (response: any) => {
        this.dataPisos = response;
        //console.log(this.dataPisos)
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  MostrarAreas() {
    this.controlActivoFijoService.getAreas().subscribe({
      next: (response: any) => {
        this.dataAreas = response;
        //console.log(this.dataAreas)
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  MostrarUbicaciones() {
    this.controlActivoFijoService.getUbicaciones().subscribe({
      next: (response: any) => {
        this.dataUbicacion = response;
        console.log("this.dataUbicacion")
        console.log(this.dataUbicacion)
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  MostrarOcupaciones() {
    this.controlActivoFijoService.getOcupaciones().subscribe({
      next: (response: any) => {
        this.dataOcupacion = response;
        console.log(this.dataOcupacion)
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  onBuscarPersonal(tipo: string) {
    let nroDocIde = tipo == "R" ? this.formulario.get('DocResponsable')?.value : this.formulario.get('DocUsuario')?.value;

    if(tipo == "U" && nroDocIde == "000" && nroDocIde.length >= 3){
      this.formulario.patchValue({
        Usuario: "USO COMUN",
        Cargo: "USO COMUN"
      });

    } else{
      if (nroDocIde != null && nroDocIde.length >= 8){
        let ocupacion: ocupacion[];

        this.controlActivoFijoService.getPersonalResponsable(nroDocIde).subscribe({
          next: (response: any) => {
            this.dataPersonal = response;
  
            if(this.dataPersonal.length > 0){
              if(tipo == "R"){
                this.formulario.patchValue({Responsable: this.dataPersonal[0].nombreTrabajador});
              }
              else{
                ocupacion = this.dataOcupacion.filter(d => d.codOcupacion == this.dataPersonal[0].codOcupacion);

                this.formulario.patchValue({
                  Usuario: this.dataPersonal[0].nombreTrabajador,
                  Cargo: ocupacion[0].desOcupacion
                });
              }
              //console.log(this.dataPersonal)
            } else{
              this.toastr.error("Número de documento inválido", 'Cerrar', {
                timeOut: 2500,
              });
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
    }

  }

  onCodigoGeneral(){
    let lc_Codigo = this.formulario.get('CodGeneral')?.value;
    
    if (lc_Codigo != null && lc_Codigo.length >= 7){
      let ambiente: ambiente[];
      let ubicacion: ubicacion[];
      let centroCosto: centroCosto[];
      let area: area[];
      let piso: piso[];

      ambiente = this.dataAmbiente.filter(d => d.codGeneral == lc_Codigo);
      
      if(ambiente.length>0){
        ubicacion = this.dataUbicacion.filter(d => d.idUbicacion == ambiente[0].idUbicacion);
        centroCosto = this.dataCc.filter(d => d.id == ambiente[0].idCc);
        area = this.dataAreas.filter(d => d.idArea == centroCosto[0].idArea);
        piso = this.dataPisos.filter(d => d.codPiso == ubicacion[0].codPiso);

        this.formulario.patchValue({
          Sede: ubicacion[0].codSede,
          numPiso: ubicacion[0].codPiso,
          desPiso: piso[0].desPiso,
          //Area: ubicacion[0].codArea,
          //desArea: area[0].desArea,
          Area: area[0].desArea,
          Ccosto: centroCosto[0].codCc,
          Ubicacion: ambiente[0].desAmbiente
        });
        //console.log(ambiente)
      } else{
        this.toastr.error("Código general inválido", 'Cerrar', {
          timeOut: 2500,
        });
      }
  
    }
    
  }

  cargarListaPersonal(){
    this.controlActivoFijoService.getPersonalLista().subscribe({
      next: (response: any) => {
        this.dataPersonalLista = response;
        console.log(this.dataPersonalLista)
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  changePersonal(event: any, tipo: string) {
    console.log(event);
    if (event != '' && event != undefined) {
      if(tipo =='R')
        this.formulario.patchValue({DocResponsable: event.nroDocIde.trim()});
      else
        this.formulario.patchValue({DocUsuario: event.nroDocIde.trim()});
    } else {
      if(tipo =='R')
        this.formulario.patchValue({DocResponsable: ''});
      else
        this.formulario.patchValue({DocUsuario: ''});
    }

  }



}

