import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from "ngx-spinner";
import { ExceljsService } from 'src/app/services/exceljs.service';

import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';
import { MY_DATE_FORMATS } from 'src/app/my-date-formats';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ToastrService } from 'ngx-toastr';
import { DialogAdjuntosComponent } from './dialog-adjuntos/dialog-adjuntos.component';
import { DialogHistorialUbicacionesComponent } from './dialog-historial-ubicaciones/dialog-historial-ubicaciones.component';
import { DialogFamiliaresActivoComponent } from './dialog-familiares-activo/dialog-familiares-activo.component';
import { DialogPrestamosReparacionesComponent } from './dialog-prestamos-reparaciones/dialog-prestamos-reparaciones.component';
import { DialogDepreciacionActivoComponent } from './dialog-depreciacion-activo/dialog-depreciacion-activo.component';


interface data_det {
  codActivoFijo: number;
  empresa: string;
  sede: string;
  piso: string;
  area: string;
  centroCosto: string;
  responsable: string;
  codUsuario: string;
  claseActivo: string;
  codActivo: string;
  descripcion: string;
  marca: string;
  modelo: string;
  serie: string;
  color: string;
  medida: string;
  serieMotor: string;
  serieChasis: string;
  placa: string;
  tipoCombustible: string;
  tipoCaja: string;
  cantidadAsiento: string;
  cantidadEje: string;
  anoFabricacion: string;
  usoDesuso: string;
  observacion: string;
  fecRegistro: string;
  precioTotal: string;
  depreciacion: string;
  depreciacionMensual: string;
  fechaAlta: string;
  valorActual: string;
}

declare var JsBarcode: any;

@Component({
  selector: 'app-historial-activos',
  templateUrl: './historial-activos.component.html',
  styleUrls: ['./historial-activos.component.css'],
  providers: [
    {

      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class HistorialActivosComponent implements OnInit {

  public data_det = [{
    codActivoFijo: '',
    empresa: '',
    sede: '',
    piso: '',
    area: '',
    centroCosto: '',
    responsable: '',
    codUsuario: '',
    claseActivo: '',
    codActivo: '',
    descripcion: '',
    marca: '',
    modelo: '',
    serie: '',
    color: '',
    medida: '',
    serieMotor: '',
    serieChasis: '',
    placa: '',
    tipoCombustible: '',
    tipoCaja: '',
    cantidadAsiento: '',
    cantidadEje: '',
    anoFabricacion: '',
    usoDesuso: '',
    observacion: '',
    fecRegistro: '',
  }]


  Fecha_Auditoria: any = ""
  Fecha_Auditoria2: any = ""

  // range = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl(),
  // });
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  //* Declaramos formulario para obtener los controles */
  formulario = this.formBuilder.group({

  })



  displayedColumns: string[] = [
    'select',
    'empresa',
    'sede',
    'piso',
    'area',
    'centroCosto',
    'ubicacion',
    'responsable',
    'codUsuario',
    'claseActivo',
    'codActivo',
    'nuevoCodActivo',
    'descripcion',
    'marca',
    'modelo',
    'serie',
    'color',
    'medida',
    'serieMotor',
    'serieChasis',
    'placa',
    'tipoCombustible',
    'tipoCaja',
    'cantidadAsiento',
    'cantidadEje',
    'anoFabricacion',
    'usoDesuso',
    'observacion',
    'celular',
    'imei',
    'capacidad',
    'fecRegistro',
    'fechaAlta',
    'precioTotal',
    'depreciacion',
    'depreciacionMensual',
    'valorActual',
    'acciones'
  ]
  dataSource: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  clickedRows = new Set<data_det>();

  dataActivo: any;
  selectedRowIndex = -1;

  dataForExcel: Array<any> = [];
  dataSourceExcel: Array<any> = [];
  dataForDelete: Array<number> = [];

  empPerformance = [
    { ID: 10011, NAME: "A", DEPARTMENT: "Sales", MONTH: "Jan", YEAR: 2020, SALES: 132412, CHANGE: 12, LEADS: 35 },
    { ID: 10012, NAME: "A", DEPARTMENT: "Sales", MONTH: "Feb", YEAR: 2020, SALES: 232324, CHANGE: 2, LEADS: 443 },
    { ID: 10013, NAME: "A", DEPARTMENT: "Sales", MONTH: "Mar", YEAR: 2020, SALES: 542234, CHANGE: 45, LEADS: 345 },
    { ID: 10014, NAME: "A", DEPARTMENT: "Sales", MONTH: "Apr", YEAR: 2020, SALES: 223335, CHANGE: 32, LEADS: 234 },
    { ID: 10015, NAME: "A", DEPARTMENT: "Sales", MONTH: "May", YEAR: 2020, SALES: 455535, CHANGE: 21, LEADS: 12 },
  ];



  selection = new SelectionModel<data_det>(true, []);
  constructor(private formBuilder: FormBuilder,
    private SeguridadActivoFijoReporteService: ControlActivoFijoService,
    public dialog: MatDialog,
    private SpinnerService: NgxSpinnerService,
    private excelService: ExceljsService,
    private toastr: ToastrService,
    private _router: Router,
    private route: ActivatedRoute,
    private exceljsService: ExceljsService) { this.dataSource = new MatTableDataSource(); }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      console.log(res);
      if (res['start'] != null && res['start'] != undefined) {
        //this.range.controls['start'].setValue(GlobalVariable.start)
        //this.range.controls['end'].setValue(GlobalVariable.end)
        this.range.get('start')?.value;
        // this.range.patchValue({
        //   start: res['start'],
        //   end: res['end']
        // })
        console.log(this.range);
        this.buscarReporteControlActivos();
      }
    })
  }

  highlight(row: any) {
    if (this.selectedRowIndex != row.codActivoFijo) {
      this.selectedRowIndex = row.codActivoFijo;
      this.dataActivo = row;
    } else {
      this.selectedRowIndex = -1;
      this.dataActivo = null;
    }
    console.log(this.selectedRowIndex);
    console.log(row);
  }

  createBarcode(texto: string) {

    var id = '#barcode';
    JsBarcode(id, texto);

  }

  createBarcode2(texto: string) {

    var id = '#barcode2';
    JsBarcode(id, texto);

  }

  generateExcel() {

    this.dataForExcel = [];
    if (this.dataSource.data.length == 0) {
      this.toastr.info('No existen registros.', 'Cerrar', {
        timeOut: 2500,
      });
    }
    else {
      if (this.Fecha_Auditoria != null && this.Fecha_Auditoria2 != null) {
        this.SeguridadActivoFijoReporteService.reporteHistorialActivos(
          this.Fecha_Auditoria,
          this.Fecha_Auditoria2
        ).subscribe(
          (result: any) => {
            if (result.length > 0) {
              console.log(result)
              this.dataSourceExcel = result
              this.SpinnerService.hide();

              this.dataSourceExcel.forEach((row: any) => {
                this.dataForExcel.push(Object.values(row))
              })

              let reportData = {
                title: 'REPORTE INVENTARIO DE ACTIVOS',
                data: this.dataForExcel,
                headers: Object.keys(this.dataSourceExcel[0])
              }

              this.exceljsService.exportExcel(reportData);
            }
            else {
              // this.toastr.error('No existen registros', 'Cerrar', {
              //   timeOut: 2500,
              // });

              this.dataSource.data.forEach((item: any) => {
                let datos = {
                  ['Empresa']: item.empresa,
                  ['Sede']: item.sede,
                  ['Piso']: item.piso,
                  ['Area']: item.area,
                  ['Ubicacion']: item.ubicacion?.toUpperCase(),
                  ['Centro Costo']: item.centroCosto,
                  ['Responsable']: item.responsable?.toUpperCase(),
                  ['Usuario']: item.nomUsuario?.toUpperCase(),
                  ['Clase Activo']: item.claseActivo,
                  ['Cod. Activo']: item.codActivo,
                  ['Descripción']: item.descripcion,
                  ['Marca']: item.marca?.toUpperCase(),
                  ['Modelo']: item.modelo?.toUpperCase(),
                  ['Serie']: item.serie,
                  ['Color']: item.color,
                  ['Medidas']: item.medida,
                  ['Serie Motor']: item.serieMotor,
                  ['Serie Chasis']: item.serieChasis,
                  ['Placa']: item.placa,
                  ['Tipo Combustible']: item.tipoCombustible,
                  ['Tipo Caja']: item.tipoCaja,
                  ['Cantidad Asientos']: item.cantidadAsiento,
                  ['Cantidad Eje']: item.cantidadEje,
                  ['Año Fabricación']: item.anoFabricacion,
                  ['Uso/Desuso']: item.usoDesuso,
                  ['Estado Físico']: item.estadoFisico,
                  ['Observación']: item.Observación,
                  ['Celular']: item.celular,
                  ['Imei']: item.imei,
                  ['Capacidad']: item.capacidad,
                  ['Fecha Vencimiento']: item.fechaVencimiento,
                  ['Fecha Registro']: item.fecRegistro,
                  ['Cod Usuario Modifico']: item.codUsuarioModifico,
                  ['Nuevo Cod. Activo']: item.nuevoCodActivo,
                  ['Cod. Contabilidad']: item.codContabilidad,
                  ['Precio']: item.precioTotal,
                  ['Moneda']: item.moneda,
                  ['Valor Actual']: item.valorActual,
                  ['Valor Actual Mejora']: item.valorActualMejoras,
                  ['Depreciación']: item.depreciacion,
                  ['Depreciación Mensual']: item.depreciacionMensual,
                  ['Meses Depreciados']: item.meses,
                  ['tipoActivo']: item.tipoActivo == '1' ? 'ACTIVO FIJO PADRE' : item.tipoActivo == '2' ? 'ACTIVO FIJO HIJO' : 'ACTIVO FIJO NIETO',
                  ['Fecha Alta']: item.fechaAlta,
                  ['Fecha Baja']: item.fechaBaja,
                  ['Fecha Mejora']: item.fechaMejora
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

              this.SpinnerService.hide();
            }
          },
          (err: HttpErrorResponse) => {
            this.SpinnerService.hide();
            this.toastr.error('No existen registros', 'Cerrar', {
              timeOut: 2500,
            });
          })
      } else {
        this.toastr.error('Debes seleccionar un rango de fechas', 'Cerrar', {
          timeOut: 2500,
        });
        this.SpinnerService.hide();
      }

      //this.dataSource.data = [];

    }
  }

  eliminarActivos() {
    console.log(this.selection.selected);
    this.dataForDelete = [];
    if (this.selection.selected.length > 0) {
      if (confirm("Esta seguro de eliminar este registro?")) {
        this.selection.selected.forEach((element) => {
          this.dataForDelete.push(element.codActivoFijo);
        });

        console.log(this.dataForDelete);

        for (let i = 0; i < this.dataForDelete.length; i++) {
          this.SeguridadActivoFijoReporteService.deleteActivoFijoService(
            this.dataForDelete[i]
          ).subscribe(
            (result: any) => {
              console.log(result)
              if (i == (this.dataForDelete.length - 1)) {
                this.toastr.success('Se elimino los registros correctamente.', 'Cerrar', {
                  timeOut: 2500,
                });
                this.buscarReporteControlActivos();
              }
            },
            (err: HttpErrorResponse) => {
              this.toastr.error('Ha ocurrido un error al eliminar los registros.', 'Cerrar', {
                timeOut: 2500,
              });
            })

        }
      }

    } else {
      this.toastr.error('Debes seleccionar al menos un elemento a eliminar', 'Cerrar', {
        timeOut: 2500,
      });
    }

  }

  imprimirTicket() {
    if (this.selection.selected.length == 2) {
      console.log(this.selection.selected);
      let printContents, printContents2, popupWin, cod_referencia;
      this.createBarcode(this.selection.selected[0].codActivo);
      this.createBarcode2(this.selection.selected[1].codActivo);
      console.log(this.selection.selected[1].codActivo);
      cod_referencia = '-';

      printContents = document.getElementById('print-section')!.innerHTML;
      printContents2 = document.getElementById('print-section2')!.innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin!.document.open();
      popupWin!.document.write(`
      <html>
      <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <!-- Fonts -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css"
              integrity="sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+" crossorigin="anonymous">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700">
          <!-- Styles -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css"
              integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

      
              <title>Print tab</title>
            <style>
              .print {
                  font: bold 2em "Trebuchet MS", Arial, Sans-Serif;
              }
              #imagen {
                width: 75px;
                margin-top: 25px;
                margin-right: 30px;
                rotate: -90deg;
            }

            #container {
                position: absolute;
                bottom: 0;
            }

            #text {
                font-size: 8px;
                margin-bottom: 0px;
                width:70%;
                text-align:center;
            }

            #img {
                margin-bottom: 0px;
                width:30%;
            }
            .preco {
                position: absolute;
                left: 220px;
            }
            #barcode{
              width:140px;
              max-height: 71px;
              height: 71px;
            }
            #barcode2{
              width:140px;
              max-height: 71px;
              height: 71px;
            }
            </style>
      </head>
      
      <body onload="window.print();window.close();">
      <div style:width:100%; id="container">
      <div style="width:100%; display:flex;">
          <div style="width:200px">
              <div style="width:100%;display:flex;">
                  <div id="img">
                      <div class="position-absolute start-0">
                          <img src="assets/logo.jpg" id="imagen" alt="">
                      </div>
                  </div>
                  <div id="text">
                       ${printContents}
                      INVENTARIO 2023 - CONTROL PATRIMONIAL
                  </div>
              </div>
          </div>
          <div style="width:200px">
            <div style="width:100%;display:flex;">
              <div id="img" style="margin-left:10px;">
                  <div class="position-absolute start-0">
                      <img src="assets/logo.jpg" id="imagen" alt="">
                  </div>
              </div>
              <div id="text">
                   ${printContents2}
                  INVENTARIO 2023 - CONTROL PATRIMONIAL
              </div>
            </div>
          </div>
          <!-- <div class="col-5 text-center p-0 border border-black" id="colum">
              <svg id="barcode"></svg>
              <p id="text">INVENTARIO 2023 - CONTROL PATRIMONIAL</p> 
          </div> -->
      </div>
     </div>
      </body>
      
      </html>`
      );
      popupWin!.document.close();
    } else {
      this.toastr.warning('Debes seleccionar al menos uno o dos activos para imprimir Ticket ', 'Cerrar', {
        timeOut: 2500,
      });
    }
  }

  regresar() {
    this._router.navigate(['pages/activos/OpcionesActivos']);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    console.log(this.isAllSelected());
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: data_det): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codActivoFijo + 1}`;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'items por pagina';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1}  - ${endIndex} de ${length}`;
    };

  }


  clearDate(event: any) {
    event.stopPropagation();
    this.range.controls['start'].setValue(new Date())
    this.range.controls['end'].setValue(new Date())
  }



  buscarReporteControlActivos() {
    this.dataSource.data = [];
    this.selection.clear();
    this.SpinnerService.show();

    this.Fecha_Auditoria = this.range.get('start')?.value
    this.Fecha_Auditoria2 = this.range.get('end')?.value


    if (this.Fecha_Auditoria != null && this.Fecha_Auditoria2 != null) {
      this.SeguridadActivoFijoReporteService.reporteHistorialActivo(
        this.Fecha_Auditoria,
        this.Fecha_Auditoria2
      ).subscribe(
        (result: any) => {
          if (result.length > 0) {
            console.log(result)
            this.dataSource.data = result
            this.SpinnerService.hide();
          }
          else {
            this.toastr.error('No existen registros', 'Cerrar', {
              timeOut: 2500,
            });
            this.dataSource.data = []
            this.SpinnerService.hide();
          }
        },
        (err: HttpErrorResponse) => {
          this.SpinnerService.hide();
          this.toastr.error('No existen registros', 'Cerrar', {
            timeOut: 2500,
          });
        })
    } else {
      this.toastr.error('Debes seleccionar un rango de fechas', 'Cerrar', {
        timeOut: 2500,
      });
      this.SpinnerService.hide();
    }


  }

  EliminarRegistro(Cod_Activo_Fijo: any) {
    if (confirm("Esta seguro de eliminar este registro?")) {
      this.SeguridadActivoFijoReporteService.deleteActivoFijoService(
        Cod_Activo_Fijo
      ).subscribe(
        (result: any) => {
          console.log(result)
          this.toastr.success('Se elimino el registro correctamente', 'Cerrar', {
            timeOut: 2500,
          });
          this.buscarReporteControlActivos();

        },
        (err: HttpErrorResponse) => {
          this.toastr.error('Ha ocurrido un error al eliminar el registro', 'Cerrar', {
            timeOut: 2500,
          });
        })
    }
  }

  depreciacionActivo(data_det: any) {
    let dialogRef = this.dialog.open(DialogDepreciacionActivoComponent, {
      disableClose: true,
      panelClass: 'my-class',
      data: data_det,
      minWidth: '90%',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }
  openModificarActivo(Cod_Activo_Fijo: any) {
    console.log(Cod_Activo_Fijo);
    // this.SeguridadActivoFijoReporteService.verActivoFijo(
    //   'O',
    //   Cod_Activo_Fijo
    // ).subscribe(
    //   (result: any) => {
    //     if (result.length > 0) {
    //       console.log(this.range.value)
    //       var Fecha_Auditoria = this.range.get('start')?.value
    //       var Fecha_Auditoria2 = this.range.get('end')?.value
    //       //GlobalVariable.start = Fecha_Auditoria;
    //       //GlobalVariable.end = Fecha_Auditoria2;
    //       let data = {
    //         start: Fecha_Auditoria,
    //         end: Fecha_Auditoria2
    //       }
    //       let objeto = Object.assign({}, this.range.value, result[0]);
    //       console.log(objeto)
    //       this._router.navigate(['/ActualizarActivosFijo'], { queryParams: objeto, skipLocationChange: true });

    //     }
    //     else {
    //       //this.matSnackBar.open("No existen registros...!!", 'Cerrar', { horizontalPosition: 'center', verticalPosition: 'top', duration: 2500 })
    //       this.dataSource.data = []
    //       this.SpinnerService.hide();
    //     }
    //   },
    //   (err: HttpErrorResponse) =>{ 
    //     //this.matSnackBar.open(err.message, 'Cerrar', {duration: 2500})
    // })
  }

  buscarArchivosAdjuntos() {
    if (this.selectedRowIndex != -1) {
      console.log(this.selectedRowIndex);
      let dialogRef = this.dialog.open(DialogAdjuntosComponent, {
        disableClose: true,
        panelClass: 'my-class',
        data: this.dataActivo,
        minWidth: '90%',
        maxHeight: '90vh'
      });

      dialogRef.afterClosed().subscribe(result => {

      })
    } else {
      this.toastr.warning('Debes seleccionar un registro', 'Advertencia', {
        timeOut: 2500,
      });
    }
  }

  historialUbicacionActivos() {
    if (this.selectedRowIndex != -1) {
      console.log(this.selectedRowIndex);
      let dialogRef = this.dialog.open(DialogHistorialUbicacionesComponent, {
        disableClose: true,
        panelClass: 'my-class',
        data: this.dataActivo,
        minWidth: '90%',
        maxHeight: '90vh'
      });

      dialogRef.afterClosed().subscribe(result => {

      })
    } else {
      this.toastr.warning('Debes seleccionar un registro', 'Advertencia', {
        timeOut: 2500,
      });
    }
  }

  historialPrestamos() {
    if (this.selectedRowIndex != -1) {
      console.log(this.selectedRowIndex);
      let dialogRef = this.dialog.open(DialogPrestamosReparacionesComponent, {
        disableClose: true,
        panelClass: 'my-class',
        data: this.dataActivo,
        minWidth: '90%',
        maxHeight: '90vh'
      });

      dialogRef.afterClosed().subscribe(result => {

      })
    } else {
      this.toastr.warning('Debes seleccionar un registro', 'Advertencia', {
        timeOut: 2500,
      });
    }
  }

  familiaresActivo() {
    if (this.selectedRowIndex != -1) {
      console.log(this.selectedRowIndex);
      let dialogRef = this.dialog.open(DialogFamiliaresActivoComponent, {
        disableClose: true,
        panelClass: 'my-class',
        data: this.dataActivo,
        minWidth: '90%',
        maxHeight: '90vh'
      });

      dialogRef.afterClosed().subscribe(result => {

      })
    } else {
      this.toastr.warning('Debes seleccionar un registro', 'Advertencia', {
        timeOut: 2500,
      });
    }
  }
}

