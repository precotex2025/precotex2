import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ControlActivoFijoService } from 'src/app/services/activos/control-activo-fijo.service';

@Component({
  selector: 'app-resumen-general',
  templateUrl: './resumen-general.component.html',
  styleUrls: ['./resumen-general.component.css']
})
export class ResumenGeneralComponent implements OnInit {


  codEmpresa:string = '';
  area:string = '';
  sede:string = '';
  dataEmpresas:Array<any> = [];
  dataSedes:Array<any> = [];

  dataResumen:any = "";
  months:any = "";

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private _router: Router, private toastr: ToastrService, private controlActivoFijoService: ControlActivoFijoService) { }

  ngOnInit(): void {
    this.cargarEmpresas();
    this.cargarDashboard();
  }

  selectEmpresa(Accion: any) {
    this.range.patchValue({
      start: null,
      end: null
    });
    this.area = "";
    this.controlActivoFijoService.MostrarSedePorEmpresaService(
      Accion
    ).subscribe(
      (result: any) => {
        this.dataSedes = result
      })
  }


  clearDate(event: any) {
    event.stopPropagation();
    this.range.controls['start'].setValue(new Date())
    this.range.controls['end'].setValue(new Date())
  }

  cargarEmpresas() {
    this.controlActivoFijoService.getEmpresas().subscribe({
      next: (response: any) => {
        this.dataEmpresas = response;
      },
      error: (error:any) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }

  changeMonth(event:any){
    console.log(event);
    this.codEmpresa = "";
    this.sede = "";
    this.area = "";
    
  }

  changeArea(){
    this.codEmpresa = "";
    this.sede = "";
    this.range.patchValue({
      start: null,
      end: null
    })
  }

  regresar(){
    this._router.navigate(['pages/activos/OpcionesActivos']);
  }

  actualizarDashboard(){
    
  }

  cargarDashboard() {
    console.log(this.range.value);
    var fecha = this.range.get('start')?.value
    var fecha2 = this.range.get('end')?.value
    
    this.controlActivoFijoService.getDashboard(fecha, fecha2, this.codEmpresa, this.sede, this.area).subscribe({
      next: (response: any) => {
        console.log(response);
        this.dataResumen = response;
      },
      error: (error:any) => {
        console.log(error);

        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });
  }
}
