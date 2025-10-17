import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventariosActivosService {
  baseUrl = environment.url;
  sCod_Usuario = '';

  Url: string = environment.url;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  getInventarios() {
    const headers = this.Header;
    return this.http.get(this.Url + 'InventarioActivos/getInventarios', { headers });
  }

  getCentrosCosto() {
    const headers = this.Header;
    return this.http.get(this.Url + 'CentrosCosto', { headers });
  }
  
  getInventariosActivo(){
    const headers = this.Header;
    return this.http.get(this.Url + 'InventarioActivos/getInventarioActivo', { headers });
  }

  deleteInventariosActivo(id:number){
    const headers = this.Header;
    return this.http.delete(this.Url + 'InventarioActivos/' + id, { headers });
  }

  updateInventarioActivo(idHistorial: number){
    const headers = this.Header;
    return this.http.get(this.Url + 'InventarioActivos/updateEstadoInventario?id=' + idHistorial, { headers });
  }

  crearTomaInventario(data:any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'InventarioActivos', data, { headers });
  }

  ObtenerActivoFijoCodigo(Cod_Activo: any) {
    return this.http.get(`${this.Url}ActivosFijo?codActivo=${Cod_Activo}`);
  }

  guardarActivoInventario(data: any) {
    return this.http.post(`${this.Url}InventarioActivos/guardarActivoInventario`, data);
  }
  

  getEmpresas() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/getEmpresas', { headers });
  }

  getUsoDesusos() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/getUsoDesusos', { headers });
  }

  MostrarSedePorEmpresaService(Accion: number) {
    return this.http.get(`${this.Url}AdicionalesActivos/GetSedesEmpresa?id=${Accion}`);
  }


  getCategoria() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/getCategoria', { headers });
  }

  getAfColors() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/getAfColors', { headers });
  }

  getCombustible() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/getCombustible', { headers });
  }

  GetAfTipoCajas() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/GetAfTipoCajas', { headers });
  }

  GetAfEstadoFisico() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/GetAfEstadoFisico', { headers });
  }

  GetNumAsientos() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/GetNumAsientos', { headers });
  }

  GetAfNumEjes() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/GetAfNumEjes', { headers });
  }

  buscarAreaCentro(Cod_CentroCosto: any) {
    return this.http.get(`${this.Url}AdicionalesActivos/GetAreaCentro?codCentro=${Cod_CentroCosto}`);
  }

  exportarTomaInventario(id: any) {
    return this.http.get(`${this.Url}InventarioActivos/getReporteInventario?id=${id}`);
  }

  DescripcionActivo() {
    const headers = this.Header;
    return this.http.get(this.Url + 'DescripcionActivo', { headers });
  }

  MantenimientoActivoFijoService(
    data: any,
  ) {
    const headers = this.Header;
    return this.http.post(this.Url + 'InventarioActivos/createTomaInventario', data, { headers });
  }

}
