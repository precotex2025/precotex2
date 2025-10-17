import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AprobacionesFactoresService {

  Url: string = environment.url;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  getPersonalSeguridad(tipo:string) {
    const headers = this.Header;
    return this.http.get(this.Url + 'CategoriasActivo', { headers });
  }

  getAprobacionAge(mes:string, ano:string, tipoFactor: string) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorAprobacion/getAprobacionAge?mes=' + mes + '&ano=' + ano + '&tipoFactor=' + tipoFactor, { headers });
  }

  getPagosBono(mes:string, ano:string) {
    const headers = this.Header;
    return this.http.get(this.Url + 'ReportePagoBono?mes=' + mes + '&ano=' + ano, { headers });
  }

  getAprobacionSup(mes:string, ano:string) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorAprobacion/getAprobacionSup?mes=' + mes + '&ano=' + ano, { headers });
  }

  guardarAprobacionGestion(data:any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'FactorAprobacion/setAprobacionGestion', data, { headers });
  }

  guardarAprobacionSol(data:any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'FactorAprobacion/setAprobacionSol', data, { headers });
  }

  getPlanSolAge(fecha1:string, fecha2:string) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorAprobacion/planSolAprobacionAge?fecha1=' + fecha1 + '&fecha2=' + fecha2, { headers });
  }

  getResumenPlanSolAge(fecha1:string, fecha2:string) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorAprobacion/resumenplanSolAprobacionAge?fecha1=' + fecha1 + '&fecha2=' + fecha2, { headers });
  }
  

  getSolAprobacionSup(fecha1:string, fecha2:string) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorAprobacion/getSolAprobacionSup?fecha1=' + fecha1 + '&fecha2=' + fecha2, { headers });
  }

  reporteFactorUniformeAge(fecha1:string, fecha2:string) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorUniforme/reporteFactorUniformeAge?fecha1=' + fecha1 + '&fecha2=' + fecha2, { headers });
  }
  
  reporteFactorUniformeSup(fecha1:string, fecha2:string) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorUniforme/reporteFactorUniformeSup?fecha1=' + fecha1 + '&fecha2=' + fecha2, { headers });
  }

  getReversionUser(mes:string, ano:string) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorAprobacion/obtenerReversionPorUser?mes=' + mes + '&ano=' + ano, { headers });
  }

  reversionPuntajeBono(IdFactorBono:number, tipoFactor:number) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorAprobacion/reversionPuntajeBono?IdFactorBono=' + IdFactorBono + '&tipoFactor=' + tipoFactor, { headers });
  }

  updateReversion(id:number) {
    const headers = this.Header;
    return this.http.get(this.Url + 'FactorAprobacion/updateEstadoReversion?id=' + id, { headers });
  }
  
  
  
}
