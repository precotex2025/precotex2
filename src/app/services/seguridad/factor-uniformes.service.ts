import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactorUniformesService {

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

  getFactorUniformeAge() {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorUniforme/getAgenteUniforme', { headers });
  }

  getFactorUniformeSup() {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorUniforme/getSupUniforme', { headers });
  }

  updateFactorUniforme(data:any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'FactorUniforme/updateFactorUniforme', data, { headers });
  }

  updateFactorUniformeObs(data:any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'FactorUniforme/updateFactorUniformeObs', data, { headers });
  }

  getEstablecimientos() {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorUniforme/getEstablecimientos', { headers });
  }

  

  
  
}
