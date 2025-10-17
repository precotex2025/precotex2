
import { Component, OnInit, ViewChild, ɵNG_COMP_DEF } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { InventariosActivosService } from 'src/app/services/activos/inventarios-activos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogCrearInventarioComponent } from './dialog-crear-inventario/dialog-crear-inventario.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ExceljsService } from 'src/app/services/exceljs.service';
import { DialogGestionInventarioComponent } from './dialog-gestion-inventario/dialog-gestion-inventario.component';


interface data_det {
  idInventario: number;
  descripcion: string;
  fechaRegistro: string;
  flgEstado: string;
}

@Component({
  selector: 'app-historial-inventarios',
  templateUrl: './historial-inventarios.component.html',
  styleUrls: ['./historial-inventarios.component.css']
})
export class HistorialInventariosComponent implements OnInit {

  dataForExcel:any = [];
  dataExcel:any = [];
  dataForDelete: Array<number> = [];


  displayedColumns: string[] = [
    'codActivo',
    'claseActivo',
    'responsable',
    'empresa',
    'acciones'
  ];

  historialActivo!: data_det;
  dataSource!: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataInventarios: Array<any> = [];
  dataInventariosActivo: Array<any> = [];
  dataEmpresas: Array<any> = [];
  dataSedes: Array<any> = [];
  lecturaActivo: any = null;
  inventarioActivo: any = null;

  activoFijo: any = null;

  codEmpresa: string = '';
  sede: string = '';
  descripcion:string = '';
  medidas:string = '';
  observaciones:string = '';
  numPiso: string = '';
  nomArea: string = '';
  codCenCost: string = '';
  nomUsuario: string = '';
  nomResponsable: string = '';
  codActivo: string = '';
  nomMarca:string = '';
  nomModelo:string = '';
  numSerieEquipo:string = '';

  /////////////////CREAR INVENTARIO 
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
    Ubicacion: [''],
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
    gastosAdicionales: [0],
    descripcionAdicionales: [''],
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
  dataTrabajadores: any = [];
  dataPeriodos: Array<any> = [];
  dataColor: Array<any> = [];
  dataCaja: Array<any> = [];
  ClaseActivos: Array<any> = [];
  dataAsiento: Array<any> = [];
  dataDescripcion: Array<any> = [];
  dataEje: Array<any> = [];
  dataCombustible: Array<any> = [];
  dataEstado: Array<any> = [];
  dataUso: Array<any> = [];

  deshabilitar = false;
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

  mostrarRelacionado = false;
  esMejora = false;

  crearNuevo: any = null;
  usoDesuso: any = "";
  estadoFisico: any = "";
  idInventario:any = "";
  codTrabajador:string = '';
  Celular:string = '';
  Imei:string = '';
  NuevoCodActivo:string = '';
  dataAreas:Array<any> = [];
  constructor(
    private tomaInventariosService: InventariosActivosService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _router: Router,
    private SpinnerService: NgxSpinnerService,
    private exceljsService: ExceljsService,
    private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
    this.codTrabajador = localStorage.getItem('codTrabajador')!;
  }

  ngOnInit(): void {
    this.getInventarioActivo();
    this.getInventarios();
    this.getCentrosCosto();
    this.getDescripcionActivos();
  }

  regresar() {
    this._router.navigate(['pages/activos/OpcionesActivos']);
  }

  changeArea(event: any) {
    console.log(event);
    if (event != undefined && event != null) {
      this.codCenCost = event.codCentroCosto;
      this.formulario.patchValue({
        Ccosto: event.codCentroCosto
      });
    }
  }

  getCentrosCosto() {
    this.tomaInventariosService.getCentrosCosto().subscribe({
      next: (response: any) => {
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

  getInventarios() {
    this.tomaInventariosService.getInventarios().subscribe({
      next: (response: any) => {
        console.log(response);
        this.dataInventarios = response;
        this.dataInventariosActivo = this.dataInventarios.filter(elem => {
          return elem.flgEstado == '1'
        });
        if(this.dataInventariosActivo.length > 0){
          this.inventarioActivo = true;
        }else{
          this.inventarioActivo = false;
        }
        console.log(this.historialActivo);
      },
      error: (error) => {
        console.log(error)

        this.toastr.error('Ha ocurrido un error.', 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  changeActivo(item:any){
    console.log(item);
    this.inventarioActivo = true;
    this.historialActivo = item;
    this.SpinnerService.hide();
    this.cargarEmpresas();
  }

  getInventarioActivo() {
    // this.SpinnerService.show();
    // this.tomaInventariosService.getInventariosActivo().subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //     if (response != null) {
    //       this.inventarioActivo = true;
    //       this.historialActivo = response;
    //       this.SpinnerService.hide();
    //       this.cargarEmpresas();
    //     } else {
    //       this.inventarioActivo = false;
    //       this.SpinnerService.hide();
    //     }
    //   },
    //   error: (error) => {
    //     console.log(error)
    //     this.inventarioActivo = false;
    //     this.toastr.error('Ha ocurrido un error.', 'Cerrar', {
    //       timeOut: 2500,
    //     });
    //     this.SpinnerService.hide();
    //   }
    // });
  }

  onChangeFile(event: any) {
    console.log(event)
  }

  cerrarInventario(): any {
    if (confirm("¿Esta seguro de cerrar la toma de inventario?")) {
      this.tomaInventariosService.updateInventarioActivo(this.historialActivo.idInventario).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status == 1) {
            this.inventarioActivo = false;
            this.lecturaActivo = false;
            this.historialActivo.idInventario = 0;
            //this.historialActivo = new data_det();
            this.toastr.success(response.respuesta, 'Cerrar', {
              timeOut: 2500,
            });

          } else {
            this.inventarioActivo = false;
            this.toastr.warning(response.respuesta, 'Cerrar', {
              timeOut: 2500,
            });
          }
        },
        error: (error) => {
          console.log(error)
          this.inventarioActivo = false;
          this.toastr.error('Ha ocurrido un error.', 'Cerrar', {
            timeOut: 2500,
          });
        }
      });
    }
  }
  EliminarRegistro(data: data_det) {

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
      this.getInventarioActivo();
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
      this.getInventarioActivo();
      this.getInventarios();
    })
  }

  getCodActivo(event: any) {
    var codActivo = event.target.value;
    if (codActivo.length >= 7) {
      this.tomaInventariosService.ObtenerActivoFijoCodigo(codActivo).subscribe({
        next: (response: any) => {
          if (response && response != null) {
            console.log(response);
            this.toastr.info('Se encontró el activo fijo.', 'Cerrar', {
              timeOut: 2500,
            });

            this.activoFijo = response;

            this.codEmpresa = this.activoFijo.codEmpresa;
            this.descripcion = this.activoFijo.descripcion;
            this.sede = this.activoFijo.codEstablecimiento;
            this.numPiso = this.activoFijo.numPiso;
            this.nomArea = this.activoFijo.nomArea;
            this.codCenCost = this.activoFijo.codCenCost != null ? this.activoFijo.codCenCost.trim() : '';
            this.nomUsuario = this.activoFijo.nomUsuario;
            this.nomResponsable = this.activoFijo.nomResponsable;
            this.usoDesuso = this.activoFijo.usoDesuso != null ? this.activoFijo.usoDesuso.toString() : '';
            this.medidas = this.activoFijo.medida != null ? this.activoFijo.medida.toString() : '';
            this.observaciones = this.activoFijo.observacion != null ? this.activoFijo.observacion.toString() : '';
            this.estadoFisico = this.activoFijo.estadoFisico != null ? this.activoFijo.estadoFisico.toString() : '';
            this.nomMarca = this.activoFijo.nomMarca != null ? this.activoFijo.nomMarca.toString() : '';
            this.nomModelo = this.activoFijo.nomModelo != null ? this.activoFijo.nomModelo.toString() : '';
            this.numSerieEquipo = this.activoFijo.numSerieEquipo != null ? this.activoFijo.numSerieEquipo.toString() : '';
            this.lecturaActivo = true;
            this.crearNuevo = false;
            this.selectEmpresa(this.activoFijo.codEmpresa);
          } else {

          }
        },
        error: (error) => {
          console.log(error)
          this.CargarOperacionClase();
          this.MostrarCaja();
          this.MostrarAsiento();
          this.MostrarEje();
          this.MostrarEstado();
          this.MostrarUso();
          this.MostrarColor();
          this.MostrarCombustible();
          this.getDescripcionActivos();
          this.activoFijo = null;
          this.lecturaActivo = false;
          this.crearNuevo = true;
          this.formulario.patchValue({
            CodAct: this.codActivo
          })
          // this.toastr.error(error.message, 'Cerrar', {
          //   timeOut: 2500,
          // });
        }
      });
    } else {
      console.log(codActivo.length);
      this.activoFijo = null;
      this.lecturaActivo = false;
      this.crearNuevo = false;
    }
  }

  exportarExcel() {
    if(this.idInventario != ''){
      this.dataForExcel = [];


      this.tomaInventariosService.exportarTomaInventario(this.idInventario).subscribe({
        next: (response: any) => {
          if(response.length > 0){
            console.log(response[0].nombreInventario)
            this.dataExcel = response;
            this.toastr.success('Exportando reporte', 'Correcto', {
              timeOut: 2500,
            });
            this.dataExcel.forEach((row: any) => {
              this.dataForExcel.push(Object.values(row))
            })
      
            let reportData = {
              title: this.dataExcel[0]["nombreInventario"],
              data: this.dataForExcel,
              headers: Object.keys(this.dataExcel[0])
            }
      
            this.exceljsService.exportExcel(reportData);
            //this.dataSource.data = [];
          }else{
            this.toastr.info('No se encontraron registros', 'Info', {
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
    }else{
      this.toastr.error('Debes seleccionar un inventario para exportar', 'Cerrar', {
        timeOut: 2500,
      });
    }
    
  }

  cargarEmpresas() {
    this.tomaInventariosService.getEmpresas().subscribe({
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

  selectEmpresa(Accion: any) {
    this.tomaInventariosService.MostrarSedePorEmpresaService(
      Accion
    ).subscribe(
      (result: any) => {
        this.dataSedes = result
      })
  }

  actualizarActivoInventario() {
    let datos = {
      idDetalleInventario: 0,
      idInventario: this.historialActivo.idInventario,
      codActivoFijo: this.activoFijo.codActivoFijo,
      codEmpresa: this.codEmpresa,
      sede: this.sede,
      numPiso: this.numPiso,
      nomArea: this.nomArea,
      codCentCost: this.codCenCost,
      nomUsuario: this.nomUsuario,
      codUsuario: localStorage.getItem('codUsuario'),
      nomResponsable: this.nomResponsable,
      usoDesuso: this.usoDesuso,
      estadoFisico: this.estadoFisico,
      nomMarca: this.nomMarca,
      nomModelo: this.nomModelo,
      descripcion: this.descripcion,
      numSerieEquipo: this.numSerieEquipo,
      fechaRegistro: new Date(),
      observaciones: this.observaciones,
      imei: this.Imei,
      celular: this.Celular,
      medida: this.medidas,
      nuevoCodActivo: this.NuevoCodActivo
    }
    this.SpinnerService.show();
    this.tomaInventariosService.guardarActivoInventario(datos).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.status == 1) {
          this.toastr.success(response.respuesta, 'Cerrar', {
            timeOut: 2500,
          });
          this.activoFijo = null;
          this.lecturaActivo = false;
          this.codActivo = '';
          this.codEmpresa = '';
          this.sede = '';
          this.numPiso = '';
          this.nomArea = '';
          this.codCenCost = '';
          this.nomUsuario = '';
          this.nomResponsable = '';
          this.usoDesuso = '';
          this.estadoFisico = '';
          this.nomMarca = '';
          this.nomModelo = '';
          this.numSerieEquipo = '';
          this.observaciones = '';
          this.medidas = '';
          this.Imei = '';
          this.Celular = '';
          this.NuevoCodActivo = '';
          this.SpinnerService.hide();
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

  }

  get f() { return this.formulario.controls; }

  // -----------------------------------CREAR ACTIVO -------------------------------------------

  guardarRegistro() {
    this.submitForm = true;
    var codUsuario = localStorage.getItem('codUsuario');
    console.log(this.formulario.get('Fecha')?.value);
    this.formulario.patchValue({
      CodAct: this.codActivo
    })
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
      fechaAltaActivo: this.formulario.get('fechaAltaActivo')?.value != '' ? this.formulario.get('fechaAltaActivo')?.value : null,
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
      this.SpinnerService.show();
      console.log(this.formulario.value);
      this.tomaInventariosService.MantenimientoActivoFijoService(
        datos
      ).subscribe(
        (result: any) => {
          console.log(result);
          if (result.status == 1) {
            this.SpinnerService.hide();
            this.deshabilitar = false;
            this.toastr.success(result.respuesta, 'Cerrar', {
              timeOut: 2500,
            });
            this.formulario.reset();
            this.formulario.patchValue({
              Cod_Activo_Fijo: 0,
              CodAct: '',
              mejora: false,
              descripcionMejora: '',
              tipoBaja: 0,
              fechaBaja: '',
              documentoBaja: '',
              gastosAdicionales: 0,
              descripcionAdicionales: '',
              precioTotal: 0,
              tasaDepreciacion: 0,
              Fabricacion: new Date(),
              Asiento: 0,
              Ejes: 0,
              Color: 0,
              fechaAltaActivo: '',
              Medidas: '',
              Placa: '',
              Chasis: '',
              Motor: '',
              observacionBaja: '',
              Caja: 0,
              Combustible: 0,
              Ubicacion: '',
              codActivoRelacionado: '', 
              tipoActivo: '1'
            });
            this.activoFijo = null;
            this.codActivo = '';
            this.lecturaActivo = false;
            this.esMejora = false;
            this.mostrarRelacionado = false;
            this.crearNuevo = null;

          } else {
            this.toastr.error('Ha ocurrido un error', 'Cerrar', {
              timeOut: 2500,
            });
            this.deshabilitar = false;
            this.SpinnerService.hide();
          }
        }, (err) => {
          console.log(err);
          this.deshabilitar = false;
          this.toastr.error('Ha ocurrido un error', 'Cerrar', {
            timeOut: 2500,
          });
          this.SpinnerService.hide();
        })
    } else {
      this.toastr.error('Debes llenar los campos obligatorios.', 'Cerrar', {
        timeOut: 2500,
      });
      this.SpinnerService.hide();
    }
  }

  escanearCentro() {
    console.log(this.formulario.get('Ccosto')?.value);

    var centro = this.formulario.get('Ccosto')?.value;
    if (this.formulario.get('Ccosto')?.value != '' && centro?.length == 9) {
      this.tomaInventariosService.buscarAreaCentro(
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
  }
  CambiarContenidoDetalle(Cod_Categoria: any) {
    this.formulario.patchValue({
      Fijar: false
    })
    console.log(Cod_Categoria);
    if (Cod_Categoria == 1) {
      this.detalleCategoria.vehiculos = true;
      this.detalleCategoria.muebles = false;
      this.detalleCategoria.computo = false;
      this.detalleCategoria.otros = false;
    }
    if (Cod_Categoria == 2) {
      this.detalleCategoria.muebles = true;
      this.detalleCategoria.vehiculos = false;
      this.detalleCategoria.computo = false;
      this.detalleCategoria.otros = false;
    }
    if (Cod_Categoria >= 3 && Cod_Categoria <= 9) {
      this.detalleCategoria.muebles = false;
      this.detalleCategoria.vehiculos = false;
      this.detalleCategoria.computo = true;
      this.detalleCategoria.otros = false;
    }
    if (Cod_Categoria > 9) {
      this.detalleCategoria.muebles = false;
      this.detalleCategoria.vehiculos = false;
      this.detalleCategoria.computo = false;
      this.detalleCategoria.otros = true;
    }
  }
  verificarRelacionado() {

  }



  MostrarCaja() {
    this.tomaInventariosService.GetAfTipoCajas().subscribe({
      next: (response: any) => {
        this.dataCaja = response;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  MostrarAsiento() {
    this.tomaInventariosService.GetNumAsientos().subscribe({
      next: (response: any) => {
        this.dataAsiento = response;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  MostrarEje() {
    this.tomaInventariosService.GetAfNumEjes().subscribe({
      next: (response: any) => {
        this.dataEje = response;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  MostrarEstado() {
    this.tomaInventariosService.GetAfEstadoFisico().subscribe({
      next: (response: any) => {
        this.dataEstado = response;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  MostrarUso() {
    this.tomaInventariosService.getUsoDesusos().subscribe({
      next: (response: any) => {
        this.dataUso = response;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });

  }

  MostrarColor() {
    this.tomaInventariosService.getAfColors().subscribe({
      next: (response: any) => {
        this.dataColor = response;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }


  MostrarCombustible() {
    this.tomaInventariosService.getCombustible().subscribe({
      next: (response: any) => {
        this.dataCombustible = response;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  CargarOperacionClase() {
    this.tomaInventariosService.getCategoria().subscribe({
      next: (response: any) => {
        this.ClaseActivos = response;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  getDescripcionActivos() {
    this.tomaInventariosService.DescripcionActivo().subscribe({
      next: (response: any) => {
        this.dataDescripcion = response;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }
}





