import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  loginForm!: FormGroup;

  hide:boolean = true;
  @ViewChild('contraseña') inputContraseña!: ElementRef;

  constructor(private formBuilder: FormBuilder, private _router:Router, private toastr: ToastrService, private userService: UsersService, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      CodUsuario: ['', Validators.required],
      Password: ['', Validators.required],      
    });

  }

  validarUsuario(){
    this.spinnerService.show();
    this.userService.loginUser(this.loginForm.value).subscribe({
      next: (response:any) => {
        console.log(response);
        this.spinnerService.hide();
        if(response.message){
          this.toastr.error(response.message, 'Error de Login', {
            timeOut: 2500,
          });
        }else{
          this.toastr.success('LOGIN CORRECTO', 'Correcto', {
            timeOut: 2500,
          });
          localStorage.setItem('idUsuario', response.idUsuario);
          localStorage.setItem('codUsuario', response.codUsuario);
          localStorage.setItem('nomUsuario', response.nomUsuario);
          localStorage.setItem('tipTrabajador', response.tipTrabajador);
          localStorage.setItem('codTrabajador', response.codTrabajador);
          localStorage.setItem('empresa', response.empresa);
          localStorage.setItem('rol', response.rol);
          localStorage.setItem('token', response.token);
          this._router.navigate(['pages/principal']);
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

  focusContra(){
    this.inputContraseña.nativeElement.focus();
  }

  

}
