import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

interface Menu {
  Opcion: string,
  Des_Menu: string,
  Ruta_Opcion: string,
  Des_Opcion: string
}

interface IMenu {
  Opcion: string,
  Des_Menu: string,
  Ruta_Opcion: string,
  children: IMenuItem[]
}

interface IMenuItem {
  Opcion: string,
  Ruta_Opcion: string
}
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  sCod_Usuario:any = '';

  menuList!: Observable<IMenu[]>;
  Menu = [];
  objectKeys = Object.keys;
  constructor(
    private loginService: UsersService,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    public router: Router) { }

  ngOnInit(): void {
    this.obtenerMenu()
    this.sCod_Usuario = localStorage.getItem('nomUsuario');
  }

  CerrarSession(){
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  obtenerMenu(){
    var Rol = localStorage.getItem('rol');
    var Cod_Empresa = localStorage.getItem('empresa');
    var empresa = '';
    if(Cod_Empresa == 'ASISTENCIA'){
      empresa = '07'
    }
    this.spinnerService.show();
    this.loginService.getMenu(Rol, empresa).subscribe({
      next: (response:any) => {
        console.log(response);
        this.Menu = response;
        this.spinnerService.hide();
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

  click(ruta_Opcion:any){
    console.log(ruta_Opcion)
  }
}
