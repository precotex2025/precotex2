import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioRepuestoService {

  baseUrl = environment.url;
  sCod_Usuario = localStorage.getItem('nomUsuario');
  
  Url: string = environment.url;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http: HttpClient) { }


  getInventarios() {
    const headers = this.Header;
    return this.http.get(this.Url + 'Repuestos/getInventarioRep', { headers });
  }

  getReporteInventarioRep(idInventario: Number) {
    const headers = this.Header;
    return this.http.get(this.Url + 'Repuestos/getReporteInventarioRep?idInventario=' + idInventario, { headers });
  }

  

  setInventario(Cod_Almacen:string) {
    const headers = this.Header;
    return this.http.get(this.Url + 'Repuestos/setInventarioRep?codAlmacen=' + Cod_Almacen + '&' + 'codUsuario=' + this.sCod_Usuario, { headers });
  }

  getItemInventario(Cod_Item:string, Cod_Almacen:any) {
    const headers = this.Header;
    return this.http.get(this.Url + 'Repuestos?codItem=' + Cod_Item + '&' + 'codAlmacen=' + Cod_Almacen, { headers });
  }

  saveInventarioRep(form:any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'Repuestos/saveInventarioRep', form, { headers });
  }

  
  

}
