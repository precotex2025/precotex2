import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlActivoFijoService {
  baseUrl = environment.url;
  sCod_Usuario = '';

  Url: string = environment.url;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  getEmpresas() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/getEmpresas', { headers });
  }

  getInventarios() {
    const headers = this.Header;
    return this.http.get(this.Url + 'InventarioActivos/getInventarios', { headers });
  }

  guardarActivoInventario(data: any) {
    return this.http.post(`${this.Url}InventarioActivos/guardarActivoInventario`, data);
  }

  MantenimientoActivoInventService(
    data: any,
    id: number
  ) {
    const headers = this.Header;
    return this.http.put(this.Url + 'InventarioActivos/' + id, data, { headers });
  }
  

  exportarTomaInventario(data: any) {
    return this.http.post(`${this.Url}InventarioActivos/getReporteInventario`, data);
  }

  resumenTomaInventario(data: any) {
    return this.http.post(`${this.Url}InventarioActivos/getResumenInventario`, data);
  }

  getNuevoCod(NuevoCodActivo: any) {
    return this.http.get(`${this.Url}ActivosFijo/obtenerNuevoCod?NuevoCodActivo=${NuevoCodActivo}`);
  }

  getDashboard(fecha:any, fecha2:any, CodEmpresa:any, Sede:any, Area:any) {
    const headers = this.Header;

    var FechaInicio1 = "";
    var FechaFin1 = "";

    if(fecha != "" && fecha != null  && fecha2 != "" && fecha2 != null){
      var m = new Date(fecha);
    var f = new Date(fecha2);
    FechaInicio1 =
      m.getUTCFullYear() + "/" +
      ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" +
      ("0" + m.getUTCDate()).slice(-2);

     FechaFin1 =
      f.getUTCFullYear() + "/" +
      ("0" + (f.getUTCMonth() + 1)).slice(-2) + "/" +
      ("0" + f.getUTCDate()).slice(-2);
    }
    

    return this.http.get(`${this.Url}ActivosFijo/getResumenGeneral?fecha=${FechaInicio1}&fecha2=${FechaFin1}&CodEmpresa=${CodEmpresa}&Sede=${Sede}&Area=${Area}`, { headers });
  }

  getUsoDesusos() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/getUsoDesusos', { headers });
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

  getCentrosCosto() {
    const headers = this.Header;
    return this.http.get(this.Url + 'CentrosCosto', { headers });
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

  reporteHistorialActivo(FechaInicio: Date, FechaFin: Date) {
    var m = new Date(FechaInicio);
    var f = new Date(FechaFin);
    var FechaInicio1 =
      m.getUTCFullYear() + "/" +
      ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" +
      ("0" + m.getUTCDate()).slice(-2);

    var FechaFin1 =
      f.getUTCFullYear() + "/" +
      ("0" + (f.getUTCMonth() + 1)).slice(-2) + "/" +
      ("0" + f.getUTCDate()).slice(-2);
    return this.http.get(`${this.Url}ActivosFijo/getHistorialActivos?FechaInicio=${FechaInicio1}&FechaFin=${FechaFin1}`);
  }

  reporteHistorialActivos(FechaInicio: Date, FechaFin: Date) {
    var m = new Date(FechaInicio);
    var f = new Date(FechaFin);
    var FechaInicio1 =
      m.getUTCFullYear() + "/" +
      ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" +
      ("0" + m.getUTCDate()).slice(-2);

    var FechaFin1 =
      f.getUTCFullYear() + "/" +
      ("0" + (f.getUTCMonth() + 1)).slice(-2) + "/" +
      ("0" + f.getUTCDate()).slice(-2);
    return this.http.get(`${this.Url}HistorialActivos?Fecha_Inicio=${FechaInicio1}&Fecha_Fin=${FechaFin1}`);
  }

  reporteHistorialMejoras(FechaInicio: Date, FechaFin: Date) {
    var m = new Date(FechaInicio);
    var f = new Date(FechaFin);
    var FechaInicio1 =
      m.getUTCFullYear() + "/" +
      ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" +
      ("0" + m.getUTCDate()).slice(-2);

    var FechaFin1 =
      f.getUTCFullYear() + "/" +
      ("0" + (f.getUTCMonth() + 1)).slice(-2) + "/" +
      ("0" + f.getUTCDate()).slice(-2);
    return this.http.get(`${this.Url}ActivosFijo/getHistorialMejoras?FechaInicio=${FechaInicio1}&FechaFin=${FechaFin1}`);
  }

  reporteValorCentro(CodEmpresa: string, Sede: string, CentroCosto: string, Area: string) {
    return this.http.get(`${this.Url}ActivosFijo/getValorCentro?CodEmpresa=${CodEmpresa}&Sede=${Sede}&CentroCosto=${CentroCosto}&Area=${Area}`);
  }


  DescripcionActivo() {
    const headers = this.Header;
    return this.http.get(this.Url + 'DescripcionActivo', { headers });
  }

  saveDescripcionActivo(data: any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'DescripcionActivo', data, { headers });
  }

  updateDescripcionActivo(id: number, data: any) {
    const headers = this.Header;
    return this.http.put(this.Url + 'DescripcionActivo/' + id, data, { headers });
  }

  deleteDescripcionActivo(id: number) {
    const headers = this.Header;
    return this.http.delete(this.Url + 'DescripcionActivo/' + id, { headers });
  }


  MarcaActivo() {
    const headers = this.Header;
    return this.http.get(this.Url + 'MarcaActivo', { headers });
  }

  saveMarcaActivo(data: any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'MarcaActivo', data, { headers });
  }

  updateMarcaActivo(id: number, data: any) {
    const headers = this.Header;
    return this.http.put(this.Url + 'MarcaActivo/' + id, data, { headers });
  }

  deleteMarcaActivo(id: number) {
    const headers = this.Header;
    return this.http.delete(this.Url + 'MarcaActivo/' + id, { headers });
  }


  ModeloActivo() {
    const headers = this.Header;
    return this.http.get(this.Url + 'ModeloActivo', { headers });
  }

  saveModeloActivo(data: any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'ModeloActivo', data, { headers });
  }

  updateModeloActivo(id: number, data: any) {
    const headers = this.Header;
    return this.http.put(this.Url + 'ModeloActivo/' + id, data, { headers });
  }

  deleteModeloActivo(id: number) {
    const headers = this.Header;
    return this.http.delete(this.Url + 'ModeloActivo/' + id, { headers });
  }

  UbicacionActivo() {
    const headers = this.Header;
    return this.http.get(this.Url + 'UbicacionActivo', { headers });
  }

  AmbienteActivo() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AmbienteActivo', { headers });
  }

  saveAmbienteActivo(data: any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'AmbienteActivo', data, { headers });
  }

  updateAmbienteActivo(id: number, data: any) {
    console.log(id)
    const headers = this.Header;
    return this.http.put(this.Url + 'AmbienteActivo/' + id, data, { headers });
  }

  deleteAmbienteActivo(id: number) {
    const headers = this.Header;
    return this.http.delete(this.Url + 'AmbienteActivo/' + id, { headers });
  }

  MostrarSedePorEmpresaService(Accion: number) {
    return this.http.get(`${this.Url}AdicionalesActivos/GetSedesEmpresa?id=${Accion}`);
  }

  MantenimientoActivoFijoService(
    data: any,
  ) {
    const headers = this.Header;
    return this.http.post(this.Url + 'ActivosFijo', data, { headers });
  }


  deleteActivoFijoService(id: any) {
    const headers = this.Header;
    return this.http.delete(this.Url + 'ActivosFijo/' + id, { headers });
  }

  deleteInventarioActivo(id: any, idInventario:any) {
    const headers = this.Header;
    return this.http.delete(this.Url + 'ActivosFijo/deleteInventarioActivo?id=' + id + '&idInventario=' + idInventario, { headers });
  }

  


  getDescripcionActivos(Opcion: any, IdDescripcion: any, Descripcion: any, Cod_Categoria: any) {
    return this.http.get(`${this.baseUrl}/app_AF_OBTENER_DESCRIPCION.php?Opcion=${Opcion}&IdDescripcion=${IdDescripcion}&Descripcion=${Descripcion}&Cod_Categoria=${Cod_Categoria}`);
  }


  ObtenerActivoFijoCodigo(Cod_Activo: any) {
    return this.http.get(`${this.Url}ActivosFijo?codActivo=${Cod_Activo}`);
  }

  guardarAdjuntosActivo(data: any) {
    return this.http.post(`${this.Url}AdjuntosActivos`, data);
  }

  saveFotoActivo(data: any) {
    return this.http.post(`${this.Url}AdjuntosActivos/saveFotoActivo`, data);
  }



  guardarActasBajaActivo(data: any) {
    return this.http.post(`${this.Url}ActivosFijo/actualizarEstadoBaja`, data);
  }

  ObtenerActivoFijoGuia(nroGuia: any) {
    return this.http.get(`${this.Url}ActivosFijo/obtenerActivoGuia?NroGuia=${nroGuia}`);
  }

  public descargarFormatoBaja(data: any, nombres: string) {
    const headers = this.Header;
    let fileName = data;
    return this.http.post(this.Url + 'FormatoDiversos/downloadPdfBaja', data, { headers, responseType: "blob" }).subscribe(response => {
      this.downLoadFile(response, nombres)
    });
  }

  public downloadPdfPrestamo(data: any, nombres: string) {
    const headers = this.Header;
    let fileName = data;
    return this.http.post(this.Url + 'FormatoDiversos/downloadPdfPrestamo', data, { headers, responseType: "blob" }).subscribe(response => {
      this.downLoadFile(response, nombres)
    });
  }



  getHistorialActivos(codActivo: any) {
    return this.http.get(`${this.Url}ActivosUbicacion?CodActivo=${codActivo}`);
  }

  getDocumentosActivoFijo(codActivo: any) {
    return this.http.get(`${this.Url}AdjuntosActivos?codActivoFijo=${codActivo}`);
  }

  getPrestamosActivo(codActivo: any) {
    return this.http.get(`${this.Url}Prestamos/getPrestamosId?CodActivo=${codActivo}`);
  }

  getFamiliaActivoFijo(codActivo: any) {
    return this.http.get(`${this.Url}ActivosFijo/getFamiliasActivo?codActivoFijo=${codActivo}`);
  }

  getActivosUbicacion(codActivo: any) {
    return this.http.get(`${this.Url}ActivosUbicacion/getUbicacionActivos?codActivoFijo=${codActivo}`);
  }

  getDepreciacionActivo(codActivo: any) {
    return this.http.get(`${this.Url}ActivosFijo/getDepreciacionActivo?codActivoFijo=${codActivo}`);
  }

  guardarHistorialActivos(data: any) {
    return this.http.post(`${this.Url}ActivosUbicacion`, data);
  }

  asignarResponsableActivo(data: any) {
    return this.http.post(`${this.Url}AsignarResponsable/downloadPdfResponsable`, data);
  }

  createPrestamo(data: any) {
    return this.http.post(`${this.Url}Prestamos/crearPrestamos`, data);
  }

  getPrestamos() {
    return this.http.get(`${this.Url}Prestamos`);
  }

  getActivosBaja() {
    return this.http.get(`${this.Url}ActivosFijo/getBajaActivos`);
  }

  deletePrestamos(idPrestamos: number) {
    return this.http.delete(`${this.Url}Prestamos?IdPrestamos=` + idPrestamos);
  }

  setUpdatePrestamos(idPrestamos: number) {
    return this.http.get(`${this.Url}Prestamos/setPrestamosCompleto?IdPrestamos=` + idPrestamos);
  }

  public descargarArchivosPrestamo(data: any, nombres: string) {
    const headers = this.Header;
    let fileName = data;
    return this.http.get(this.Url + 'Prestamos/downloadArchivoPrestamo?afDocumento=' + data, { headers, responseType: "blob" }).subscribe(response => {
      this.downLoadFile(response, nombres)
    });
  }

  public downloadArchivoBaja(data: any, nombres: string) {
    const headers = this.Header;
    let fileName = data;
    return this.http.get(this.Url + 'ActivosFijo/downloadArchivoBaja?afDocumento=' + data, { headers, responseType: "blob" }).subscribe(response => {
      this.downLoadFile(response, nombres)
    });
  }




  public descargarArchivos(data: any, nombres: string) {
    const headers = this.Header;
    let fileName = data;
    return this.http.post(this.Url + 'AsignarResponsable/downloadPdfResponsable', data, { headers, responseType: "blob" }).subscribe(response => {
      this.downLoadFile(response, nombres)
    });
  }

  downLoadFile(data: any, filename: string) {
    console.log(data);
    let dataType = data.type;
    let binaryData = [];
    binaryData.push(data);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
    if (filename) {
      downloadLink.setAttribute('download', filename);
    }
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  public descargarArchivoAdjunto(data: any, nombres: string) {
    const headers = this.Header;
    let fileName = data;
    return this.http.post(this.Url + 'AdjuntosActivos/downloadArchivoAdjunto', data, { headers, responseType: "blob" }).subscribe(response => {
      console.log(response);
      this.downLoadFile(response, nombres)
    });
  }

  getPisos() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/getAfPisos', { headers });
  }

  getAreas() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/getAfAreas', { headers });
  }

  getUbicaciones() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/getAfUbicaciones', { headers });
  }

  getAmbientes() {
    const headers = this.Header;
    return this.http.get(this.Url + 'AdicionalesActivos/getAfAmbientes', { headers });
  }

  getPersonalResponsable(nroDocIde: string) {
    const headers = this.Header;
    return this.http.get(this.Url + 'DataAux/getPersonalDocIdent?nroDocIde=' + nroDocIde, { headers });
  }

  getPersonalLista() {
    const headers = this.Header;
    return this.http.get(this.Url + 'DataAux/getPersonalLista', { headers });
  }

  getOcupaciones() {
    const headers = this.Header;
    return this.http.get(this.Url + 'DataAux/getAsOcupacions', { headers });
  }

}
