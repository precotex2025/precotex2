import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


interface data {
  data: any

}
@Component({
  selector: 'app-dialog-aprobacion-observacion',
  templateUrl: './dialog-aprobacion-observacion.component.html',
  styleUrls: ['./dialog-aprobacion-observacion.component.css']
})
export class DialogAprobacionObservacionComponent implements OnInit {

  observacion: string = '';
  constructor(private dialogRef: MatDialogRef<DialogAprobacionObservacionComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: data) { }

  ngOnInit(): void {
  }

  guardarObservacion(){
    if(this.observacion != ''){
      this.dialogRef.close(this.observacion);
    }else{
      this.toastr.error('Debes ingresar una observación', 'Cerrar', {
        timeOut: 1500,
      });
    }  
  }
}