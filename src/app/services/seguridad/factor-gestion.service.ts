import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactorGestionService {

  Url: string = environment.url;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  getAgentesSeg() {
    const headers = this.Header;
    return this.http.get(this.Url + 'DataAux/getPersonalSeguridad?Cargo=' + 'Agente', { headers });
  }
  getSupervisoresSeg() {
    const headers = this.Header;
    return this.http.get(this.Url + 'DataAux/getPersonalSeguridad?Cargo=' + 'Supervisores', { headers });
  }

  createFactorGestion(data:any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'FactorGestion/createFactorGestion', data, { headers });
  }

  createFactorGestionSup(data:any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'FactorGestion/createFactorGestionSup', data, { headers });
  }

  updateFactorGestionDet(puntaje:number, idGestionBonoDet: number) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorGestion/actualizarPuntajeGestion?puntaje=' + puntaje  + '&idGestionBonoDet=' + idGestionBonoDet, { headers });
  }


  
}
