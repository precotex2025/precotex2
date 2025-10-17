import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FactorGestionService } from 'src/app/services/seguridad/factor-gestion.service';
import { FactorPlanSolService } from 'src/app/services/seguridad/factor-plan-sol.service';


interface data {
  response: any;
  tipoFactor: number;
  tipoUsuario: number;
}

interface data_det {
  idGestionBonoDet: number;
  idFactorBono: number;
  criterio: string;
  descripcion: string;
  idFactorBonoNavigation: string;
  idUsuarioEvaluador: number,
  puntaje: number;
  puntajeMaximo: number;
  flgEstado: string;
}

interface data_det2 {
  idGestionBonoDet: number;
  idFactorBono: number;
  criterio: string;
  puntaje: number;
  puntajeMaximo: number;
  flgEstado: string;
}
@Component({
  selector: 'app-factor-puntaje-reversion',
  templateUrl: './factor-puntaje-reversion.component.html',
  styleUrls: ['./factor-puntaje-reversion.component.css']
})
export class FactorPuntajeReversionComponent implements OnInit {

  displayedColumns: string[] = [
    'criterio',
    'puntaje',
    'puntajeMaximo'
  ];

  dataSource!: MatTableDataSource<data_det>;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataSource2!: MatTableDataSource<data_det2>;
  columnsToDisplay2: string[] = this.displayedColumns.slice();


  cambio: boolean = false;
  constructor(private dialogRef: MatDialogRef<FactorPuntajeReversionComponent>, public dialog: MatDialog, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: data, private spinnerService: NgxSpinnerService, private factorGestionService: FactorGestionService, private factorSolService: FactorPlanSolService) {
    this.dataSource = new MatTableDataSource();
    this.dataSource2 = new MatTableDataSource();
  }

  ngOnInit(): void {
    console.log(this.data.tipoFactor);
    if (this.data.tipoFactor == 1) {
      this.dataSource2.data = [];
      this.dataSource.data = this.data.response['segFactorGestionBonoDets']
    } else {
      this.dataSource.data = [];
      this.dataSource2.data = this.data.response['segFactorSolBonoDets']
    }

  }

  closeModal() {
    this.dialogRef.close(this.cambio);
  }

  actualizarPuntaje2(event: any, idSolBonoDet: number) {
    console.log(event);
    var puntaje = event.value;


    this.spinnerService.show();
    this.factorSolService.updateFactorSolDet(puntaje, idSolBonoDet).subscribe({
      next: (response: any) => {
        console.log(response);
        this.spinnerService.hide();
        if (response.status == 1) {
          this.cambio = true;
          this.toastr.success(response.respuesta);
        } else {
          this.toastr.warning(response.respuesta);
          this.spinnerService.hide();
        }
      },
      error: (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.toastr.error(error.error.message, 'Cerrar', {
          timeOut: 2500,
        });
      }
    });

  }

  actualizarPuntaje3(event:any, idSolBonoDet: number, puntajeMaximo: number){
    if(event.target.value != null && event.target.value != undefined){
      this.spinnerService.show();
        this.factorSolService.updateFactorSolDet(event.target.value, idSolBonoDet).subscribe({
          next: (response:any) => {
            console.log(response);
            this.spinnerService.hide();
            if(response.status == 1){
              this.cambio = true;
              this.toastr.info(response.respuesta);
            }else{
              this.toastr.warning(response.respuesta);
              this.spinnerService.hide();
            }
          },
          error: (error) => {
            console.log(error);
            this.spinnerService.hide();
            this.toastr.error(error.error.message, 'Cerrar', {
              timeOut: 2500,
            });
          }
        });
    }
  }
  actualizarPuntaje(event: any, idGestionBonoDet: number, puntajeMaximo: number) {
    console.log(event);
    console.log(idGestionBonoDet);
    if (event != null && event != undefined) {
      var puntaje = Number(event.target.value);

      if (puntaje >= 0 && puntaje <= puntajeMaximo) {
        this.spinnerService.show();
        this.factorGestionService.updateFactorGestionDet(puntaje, idGestionBonoDet).subscribe({
          next: (response: any) => {
            console.log(response);
            this.spinnerService.hide();
            this.cambio = true;
            if (response.status == 1) {
              this.toastr.info(response.respuesta);
            } else {
              this.toastr.warning(response.respuesta);
              this.spinnerService.hide();
            }
          },
          error: (error) => {
            console.log(error);
            this.spinnerService.hide();
            this.toastr.error(error.error.message, 'Cerrar', {
              timeOut: 2500,
            });
          }
        });
      } else {
        event.target.value = '';
        this.toastr.warning("Debes insertar un puntaje válido y menor al puntaje máximo.");
      }
    }
  }


}
