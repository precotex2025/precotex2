import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  Url: string = environment.url;
  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http: HttpClient) {

  

  }
  loginUser(login:any){
    const headers = this.Header;
    console.log('loginUser');
    console.log(this.Url + 'Login')
    return this.http.post(this.Url + 'Login', login, {headers} );
  }

  getMenu(Rol:any, Cod_Empresa:any){
    const headers = this.Header;
    return this.http.get(this.Url + 'Usuarios/getMenuRol?Rol=' + Rol + '&Cod_Empresa=' + Cod_Empresa, {headers} );
  }


  validarUser():boolean{
    var token = localStorage.getItem('token');
    if(token){
      return true;
    }else{
      return false;
    }
  }

}
