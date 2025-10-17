import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { Tx_Visor_Permanencia_Tela_Cruda } from 'src/app/models/Tx_Visor_Permanencia_Tela_Cruda';
import { VisorPermanenciaTelaCrudaService } from 'src/app/services/almacen/visor-permanencia/visor-permanencia-tela-cruda.service';

interface data_det {
  Almacen                 : string ;
  Partida                 : string ;
  Cod_Cliente             : string ;
  Cliente                 : string ;
  Cod_tela                : string ;
  Stock                   : number ;
  Proceso                 : string ;
  Cod_OrdTra              : string ;
  Cod_TipTejido           : string ;
  Fec_1er_Ingreso         : string ;
  Fec_Maximo_Permanencia  : string ;
  Dias_Transcurridos      : number ;
  Horas_Transcurridos     : number ;
  Minutos_Transcurridos   : number ;
  Dias_Tiempo_Espera      : number ;
  Ser_OrdComp_Tinto       : string ;
  Tipo                    : string ; 
  flg_Alerta              : string ;
}

@Component({
  selector: 'app-visor-permanencia-tela-cruda',
  templateUrl: './visor-permanencia-tela-cruda.component.html',
  styleUrls: ['./visor-permanencia-tela-cruda.component.css']
})

export class VisorPermanenciaTelaCrudaComponent implements OnInit {
  @ViewChild('myButton') myButton!: ElementRef;
  displayedColumns: string[] = [
    'Almacen'               ,
    'Partida'               ,
    'Cliente'               ,
    'Tipo'                  ,
    'Cod_Tela'              ,
    'Stock'                 , 
    'Proceso'               , 
    'Fecha_Ingreso'         , 
    'Fecha_Permanencia_Max' , 
    'Dias_Transcurridos'    ,
    'Prepa' ]
  dataSource: MatTableDataSource<Tx_Visor_Permanencia_Tela_Cruda>;
  currentPageData : Tx_Visor_Permanencia_Tela_Cruda[] = [];  // Para almacenar los 10 elementos a mostrar
  pageSize = 18;  // Mostrar 18 elementos por página
  currentPage = 0;  // Página actual
  totalRecords = 0;  // Total de registros (para saber cuántos elementos hay en total)

  private refreshSubscription: Subscription = new Subscription();
  
  //Variables de Stock
  g_totalStock: number = 0;
  g_totalStock_S: number = 0;
  g_totalStock_N: number = 0;
  g_totalStock_Ven_Des: number = 0;
  g_totalStock_Ven_Prod: number = 0;

  isVisibleButton: boolean = true; //Controla la visibilidad del boton de reproducir AUDIO
  isVisible: boolean = false;     // Controla la visibilidad del div


  private audio: HTMLAudioElement;
  private intervalId: any;
  private isPlaying: boolean = false;

  constructor(
    private serviceVisorPermanenciaTelaCruda: VisorPermanenciaTelaCrudaService,
    private toastr: ToastrService,
  ) { 
    
    this.dataSource = new MatTableDataSource();  

    // Inicializa el objeto Audio
    this.audio = new Audio('assets/error.mp3'); // Asegúrate de que la ruta sea correcta
    this.audio.load();  // Cargar el archivo de audio
    this.audio.loop = false; // No repetir automáticamente
  }

  ngOnInit(): void {

    const anio: number = 2024;
    this.getObtenerDatosVisorPermanenciaTelaCruda(anio);

    // this.refreshSubscription = interval(300000).subscribe(() => {
    //   this.getObtenerDatosVisorPermanenciaTelaCruda(anio);  // Cada 5 minutos (300000 ms)
    // });  

    this.intervalId = setInterval(() => {
      this.isVisible = !this.isVisible;  // Alterna la visibilidad
    }, 7000);  

    // Cambiar de 10 en 10 cada 10 segundos
    setInterval(() => {
      this.nextPage();
    }, 10000); // Cambia cada 10000 ms (10 segundos)

  }

  onClick() {
   this.startAudio();
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();  // Para evitar fugas de memoria
  }

  getObtenerDatosVisorPermanenciaTelaCruda(anio: number){
   
    this.serviceVisorPermanenciaTelaCruda.getPermanenciaTelaCruda(anio).subscribe({
      next: (response: any)=> {
        if(response.success){
          if (response.totalElements > 0){
            this.dataSource.data = response.elements;      
            this.totalRecords = response.elements.length;  // Total de registros disponibles      
            this.updatePageData();      
            this.getObtenerTotales();
            this.checkAndPlayAlert();
          }
          //else{
          //  this.dataSource = n
          //}
        }        
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Cerrar', {
        timeOut: 2500,
         });
      }
    });    
    
  }

  updatePageData() {
    // Calcula los elementos a mostrar según la página actual
    const startIndex = this.currentPage * this.pageSize;
    this.currentPageData = this.dataSource.data.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    // Avanza a la siguiente "página" (10 elementos)
    if ((this.currentPage + 1) * this.pageSize < this.totalRecords) {
      this.currentPage++;
    } else {
      this.currentPage = 0;  // Si llegamos al final, volvemos a la primera página

      //Volvemos a traer la informacion Actualizada.
      const anio: number = 2024;
      this.getObtenerDatosVisorPermanenciaTelaCruda(anio);      
    }
    this.updatePageData();
  }

  getObtenerTotales(){
    const oData: Tx_Visor_Permanencia_Tela_Cruda[] = this.dataSource.data

    const oDatosFilterTot_S = oData.filter(item => item.flg_Alerta === 'S');
    const oDatosFilterTot_N = oData.filter(item => item.flg_Alerta === 'N');
    const oDatosFilterTot_Ven_Des_S = oData.filter(item => item.flg_Alerta === 'S' && item.tipo === 'DES.');
    const oDatosFilterTot_Ven_Prod_S = oData.filter(item => item.flg_Alerta === 'S' && item.tipo === 'PROD.');

    this.g_totalStock = parseFloat(oData.reduce((acc, currentValue) => acc + currentValue.stock, 0).toFixed(2));
    this.g_totalStock_S = parseFloat(oDatosFilterTot_S.reduce((acc, currentValue) => acc + currentValue.stock, 0).toFixed(2));
    this.g_totalStock_N = parseFloat(oDatosFilterTot_N.reduce((acc, currentValue) => acc + currentValue.stock, 0).toFixed(2));
    this.g_totalStock_Ven_Des = parseFloat(oDatosFilterTot_Ven_Des_S.reduce((acc, currentValue) => acc + currentValue.stock, 0).toFixed(2));
    this.g_totalStock_Ven_Prod = parseFloat(oDatosFilterTot_Ven_Prod_S.reduce((acc, currentValue) => acc + currentValue.stock, 0).toFixed(2));
  }

  // Verificar si alguna fila tiene Flg_Alerta = 'S' y reproducir el sonido
  checkAndPlayAlert() {
    const oData: Tx_Visor_Permanencia_Tela_Cruda[] = this.dataSource.data
    oData.forEach((item) => {
      if (item.flg_Alerta === 'S') {
        this.myButton.nativeElement.click();
      }
    })
  }  

  // Método para iniciar la reproducción de audio
  startAudio(): void {
    if (this.isPlaying) return;  // Evitar que se reproduzca más de una vez a la vez
    this.isPlaying = true;
    
    // Repetir el audio cada cierto intervalo (ejemplo: 5 segundos)
    this.intervalId = setInterval(() => {
      this.audio.currentTime = 0;  // Reinicia la reproducción del audio
      this.audio.play().catch(error => {
        console.error('Error al intentar reproducir el audio:', error);
      });
    }, 5000); // Reproducir cada 5 segundos
  }
    
  // Método para detener la reproducción del audio
  stopAudio(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Detiene la repetición del audio
      this.isPlaying = false;
    }
  }
  
}
