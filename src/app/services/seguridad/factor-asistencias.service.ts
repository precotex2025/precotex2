import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactorAsistenciasService {

  Url: string = environment.url;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  getFactorAsistencia(fecha:any) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorAsistencia/mostarFactorAsistencia?fecha=' + fecha, { headers });
  }

  getOperarioRegistros(fecha1:any, fecha2:any, codTrabajador:any, tipTrabajador:any) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorAsistencia/GetOperarioRegistros?fecha1=' + fecha1 + '&fecha2=' + fecha2  + '&codTrabajador=' + codTrabajador + '&tipTrabajador=' + tipTrabajador , { headers });
  }

  
}
