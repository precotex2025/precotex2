import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactorPlanSolService {

  Url: string = environment.url;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  getMontosBono() {
    const headers = this.Header;
    return this.http.get(this.Url + 'DataAux/getMontosBono', { headers });
  }

  getAgentesSeg() {
    const headers = this.Header;
    return this.http.get(this.Url + 'DataAux/getPersonalSeguridad?Cargo=' + 'Agente', { headers });
  }
  getSupervisoresSeg() {
    const headers = this.Header;
    return this.http.get(this.Url + 'DataAux/getPersonalSeguridad?Cargo=' + 'Supervisores', { headers });
  }

  createFactorSolAgente(data:any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'FactorSol/createFactorSol', data, { headers });
  }

  crearFactorSolBonoSup(data:any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'FactorSol/crearFactorSolBonoSup', data, { headers });
  }

  

  updateFactorSolDet(puntaje:number, idSolBonoDet: number) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorSol/actualizarPuntajeSol?puntaje=' + puntaje  + '&idSolBonoDet=' + idSolBonoDet, { headers });
  }
}
