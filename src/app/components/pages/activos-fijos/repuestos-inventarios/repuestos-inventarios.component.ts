import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InventarioRepuestoService } from 'src/app/services/activos/inventario-repuesto.service';
import { ExceljsService } from 'src/app/services/exceljs.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface data_det {
  idInventario: number;
  fechaRegistro: string;
  codUsuario: string;
  codAlmacen: string;
}

@Component({
  selector: 'app-repuestos-inventarios',
  templateUrl: './repuestos-inventarios.component.html',
  styleUrls: ['./repuestos-inventarios.component.css']
})
export class RepuestosInventariosComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  submitForm = false;
  formulario = this.formBuilder.group({
    //-----------NUEVO
    Id: [0],
    codAlmacen: ['', Validators.compose([Validators.required])],
    ubicacion: ['', Validators.compose([Validators.required])],
    codItem: ['', Validators.compose([Validators.required])],
    descripcion: ['', Validators.compose([Validators.required])],
    conteo: ['', Validators.compose([Validators.required])],
    stock: ['', Validators.compose([Validators.required])],
    unidadMedida: ['', Validators.compose([Validators.required])],
    diferencia: [0, Validators.compose([Validators.required])],
    codUsuario: ['', ],
    fecRegistro: ['', ],
    codUsuarioModifico: ['',],
    fecModificacion: ['', ],
    cantidadAnterior: [0],
    idInventario: ['', Validators.compose([Validators.required])]
  })

  tipo = 1
  dataFijar = {
    empresa: false,
    sede: false,
    ubicacion: false
  }

  deshabilitar = false
  dataEmpresas: Array<any> = [];
  dataSedes: Array<any> = [];
  dataForExcel:Array<any> = [];
  dataAgentes:Array<any> = [];
  dataAgentesAdmin:Array<any> = [];
  dataSourceExcel:Array<any> = [];
  codAlmacen = '';
  displayedColumns: string[] = [
    'idInventario',
    'fechaRegistro',
    'codUsuario',
    'codAlmacen',
    'acciones'
  ];

  
  dataSource!: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor(private formBuilder: FormBuilder, private inventarioRepuestoService: InventarioRepuestoService, private SpinnerService: NgxSpinnerService,
    private toastr: ToastrService, private exceljsService: ExceljsService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getInventarioRep();
  }

  nuevoRegistro(){

  }

  FijarCabecera(event: any, dato: string) {
    //console.log(event)
    this.dataFijar.ubicacion = event.checked;
  }

  exportarReporte(data:any){
    console.log(data.idInventario);
    this.dataForExcel = [];
    this.dataAgentes = [];
    this.dataAgentesAdmin = [];
    this.dataSourceExcel = [];
     this.inventarioRepuestoService.getReporteInventarioRep(data.idInventario).subscribe({
      next: (response: any) => {
        console.log(response);
        this.SpinnerService.hide();
        this.dataForExcel = response;
        this.dataAgentes = response;
        this.dataAgentes.forEach((item: any) => {
          let datos = {
            ['Cod. Almacen']: item.codAlmacen,
            ['Cod. Item']: item.codItem,
            ['Descripcion']: item.descripcion,
            ['Unidad Medida']: item.unidadMedida,
            Conteo: item.conteo,
            ['Stock Sistema']: item.stock,
            ['Diferencia']: item.diferencia,
            ['Precio'] : item.precio,
            ['Cod. Usuario']: item.codUsuario,
            ['Fec. Registro']: item.fecRegistro,
            ['Cod. Usuario Modifico']: item.codUsuarioModifico,
            ['Fec. Modificacion']: item.fecModificacion,
            ['Conteo Anterior']: item.cantidadAnterior,
            ['Ubicacion']: item.ubicacion
          }
          this.dataAgentesAdmin.push(datos);
        })

        if (this.dataAgentesAdmin.length > 0) {
          this.dataAgentesAdmin.forEach((row: any) => {
            this.dataSourceExcel.push(Object.values(row))
          })

          let reportData = {
            title: 'INVENTARIO REPUESTOS ' + data.idInventario.toString(),
            data: this.dataSourceExcel,
            headers: Object.keys(this.dataAgentesAdmin[0])
          }

          this.exceljsService.exportExcel(reportData);
        } else {
          this.toastr.error('No se encontraron registros.', 'Cerrar', {
            timeOut: 2500,
          });
        }
      },
      error: (error) => {
        console.log(error);
        this.dataForExcel = [];
        this.SpinnerService.hide();
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  guardarRegistro() {
    if (this.formulario.valid) {
      
      this.SpinnerService.show();
      this.inventarioRepuestoService.saveInventarioRep(this.formulario.value).subscribe({
        next: (response: any) => {
          console.log(response);
         
          if (response.status == 1) {
            if(this.dataFijar.ubicacion == false){
              this.formulario.patchValue({
                ubicacion: ''
              })
            }
            this.SpinnerService.hide();
            this.formulario.patchValue({
              Id: 0,
              codItem: '',
              descripcion: '',
              conteo: '',
              stock: '',
              unidadMedida: '',
              diferencia: 0,
              codUsuario: '',
              fecRegistro: '',
              codUsuarioModifico: '',
              fecModificacion: '',
              cantidadAnterior: 0,
              idInventario: ''
            });

            this.toastr.success(response.respuesta, 'Cerrar', {
              timeOut: 2500,
            });
          } else {
            this.toastr.warning('Ha ocurrido un error al realizar el registro.', 'Cerrar', {
              timeOut: 2500,
            });
          }
        },
        error: (error) => {
          console.log(error);
          this.SpinnerService.hide();
          this.toastr.warning('Ya se registro el corte de inventario para este almacen el día de hoy', 'Cerrar', {
            timeOut: 2500,
          });
        }
      });
    } else {
      this.toastr.warning('Debes ingresar los campos requeridos', 'Cerrar', {
        timeOut: 2500,
      });
    }
  }

  inputConteo() {
    var conteo = this.formulario.get('conteo')!.value;

    if (Number(conteo) >= 0) {
      console.log(conteo);
      this.formulario.patchValue({
        diferencia: Number(this.formulario.get('conteo')!.value) - Number(this.formulario.get('stock')!.value)
      });
    } else {
      this.formulario.patchValue({
        diferencia: 0
      });

    }
  }



  changeCodItem(event: any) {
    console.log(event);
    var item = event.target.value;
    if (item.length >= 3) {
      var familia = item.substring(0, 2);

      if(item.length == 3){
        var codigo = item.substring(2, 3);
        item = familia + '00000' + codigo;
      }else if(item.length == 4){
        var codigo = item.substring(2, 4);
        item = familia + '0000' + codigo;
      }else if(item.length == 5){
        var codigo = item.substring(2, 5);
        item = familia + '000' + codigo;
      }else if(item.length == 6){
        var codigo = item.substring(2, 6);
        item = familia + '00' + codigo;
      }else if(item.length == 7){
        var codigo = item.substring(2, 7);
        item = familia + '0' + codigo;
      }else if(item.length == 8){
        
      }
      console.log(item);
      this.formulario.patchValue({
        codItem: item
      });
      if (this.formulario.get('codAlmacen')!.value != '') {
        this.SpinnerService.show();
        this.inventarioRepuestoService.getItemInventario(item, this.formulario.get('codAlmacen')!.value).subscribe({
          next: (response: any) => {
            console.log(response);
            this.SpinnerService.hide();
            if (response != null) {
              if (response.ubicacion != null) {
                this.formulario.patchValue({
                  ubicacion: response.ubicacion
                });
              } else {
                this.formulario.patchValue({
                  Id: response.id,
                  descripcion: response.descripcion,
                  conteo: response.conteo,
                  stock: response.stock,
                  unidadMedida: response.unidadMedida,
                  diferencia: response.diferencia,
                  codUsuario: response.codUsuario,
                  fecRegistro: response.fecRegistro,
                  idInventario: response.idInventario,
                  cantidadAnterior: response.cantidadAnterior
                });
              }
              if(this.formulario.get('Id')?.value == 0){
                const str = new Date().toLocaleString('en-Es', { year: 'numeric', month: '2-digit', day: '2-digit' });
                var dia = str.substring(3, 5);
                var mes = str.substring(0, 2);
                var anio = str.substring(6, 10);
                var totaldia = anio + '-' + mes + '-' + dia;
                this.formulario.patchValue({
                  codUsuario: localStorage.getItem('nomUsuario'),
                  fecRegistro: totaldia,
                  fecModificacion: null
                })
              }else{
                const str = new Date().toLocaleString('en-Es', { year: 'numeric', month: '2-digit', day: '2-digit' });
                var dia = str.substring(3, 5);
                var mes = str.substring(0, 2);
                var anio = str.substring(6, 10);
                var totaldia = anio + '-' + mes + '-' + dia;
                this.formulario.patchValue({
                  codUsuarioModifico: localStorage.getItem('nomUsuario'),
                  fecModificacion: totaldia,
                  cantidadAnterior: response.conteo
                })
              }

            } else {
              this.toastr.warning('No se encontraron registros', 'Cerrar', {
                timeOut: 2500,
              });
            }
          },
          error: (error) => {
            console.log(error);
            this.SpinnerService.hide();
            this.toastr.warning('No se encontraron registros', 'Cerrar', {
              timeOut: 2500,
            });
          }
        });
      } else {
        this.toastr.warning('Debes seleccionar el ALMACEN a realizar el inventario', 'Cerrar', {
          timeOut: 2500,
        });
      }
    } else {
      this.toastr.warning('Debes ingresar el código del item', 'Cerrar', {
        timeOut: 2500,
      });
    }
    //getItemInventario
  }

  createCorte() {
    if (this.codAlmacen != '') {
      this.SpinnerService.show();
      this.inventarioRepuestoService.setInventario(this.codAlmacen).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.respuesta == 'OK') {
            this.toastr.success('Se registro correctamente el inventario.', 'Cerrar', {
              timeOut: 2500,
            });
            this.SpinnerService.hide();
            this.getInventarioRep();
          } else {
            this.toastr.warning('Ha ocurrido un error al registrar el corte de inventario', 'Cerrar', {
              timeOut: 2500,
            });
            this.getInventarioRep();
            this.SpinnerService.hide();
          }
        },
        error: (error) => {
          console.log(error);
          this.getInventarioRep();
          this.SpinnerService.hide();
          this.toastr.warning('Ya se registro el corte de inventario para este almacen el día de hoy', 'Cerrar', {
            timeOut: 2500,
          });
        }
      });
    } else {
      this.toastr.info('Debes seleccionar el Almacen', 'Cerrar', {
        timeOut: 2500,
      });
    }
  }

  getInventarioRep() {
    this.inventarioRepuestoService.getInventarios().subscribe({
      next: (response: any) => {
        console.log(response);
        if (response) {
          this.dataSource.data = response;
        }
      },
      error: (error) => {
        console.log(error);
        this.SpinnerService.hide();
        this.toastr.error('Ha ocurrido un error al obtener los datos', 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }
}
