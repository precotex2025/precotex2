import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CtrolInventarioHiloTejeduriaService } from 'src/app/services/Tejeduria/ctrol-inventario-hilo-tejeduria.service';

@Component({
  selector: 'app-control-hilo-tejeduria-inventario',
  templateUrl: './control-hilo-tejeduria-inventario.component.html',
  styleUrls: ['./control-hilo-tejeduria-inventario.component.css']
})
export class ControlHiloTejeduriaInventarioComponent implements OnInit {

  formulario: FormGroup;
  accion: string = "I";
  @ViewChild('Lote') loteInput!: ElementRef;
  // Definimos la máscara para el formato 000-000000
  mask: Array<string | RegExp> = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private ctrlInventarioHiloTejeduriaService: CtrolInventarioHiloTejeduriaService,
  ) { 

    //* Declaramos formulario para obtener los controles */
    this.formulario = this.formBuilder.group({    
      Lote:   ['', [Validators.required]],
      Semana: ['', [Validators.required, Validators.pattern('[0-9]{2}')]],
      Titulo: ['', [Validators.required]],
      OC: ['', [Validators.required]],
      Color: ['', [Validators.required]],
      Conera: ['', [Validators.required]],
      Hilo_Tipo: ['', [Validators.required]],
      Hilo_Codigo: ['', [Validators.required]],
      Peso_Bruto: ['', [Validators.required]],
      Ubicacion: ['', [Validators.required]],
      Tara: ['', [Validators.required]],
      Pallet: ['', [Validators.required]],
      Peso_Neto: ['', [Validators.required]],
      Proveedor: ['', [Validators.required]],
      Diferencia: ['', [Validators.required]],
      Observacion: ['' ],
    })
  }

  // Métodos de acceso a los controles del formulario
  //get lote() { return this.formulario.get('Lote'); }

  ngOnInit(): void {
    this.loteInput.nativeElement.focus();
  }

  //#region Funciones
  ConfirmaRegistro(){

    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched(); // Marca todos los controles como tocados para que se muestren los errores
      return;
    }

    Swal.fire({
      title: this.accion == 'I'? '¿Desea registrar' + ' el control de inventario?': '¿Desea actualizar' + ' el control de inventario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.accion == 'I'?'Sí, generar': 'Sí, actualizar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
          this.Guardar();
      }else{
        this.matSnackBar.open("Proceso cancelado", 'Cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
        });        
      }
    });

  }

  Guardar(){

    //console.log('Peso_Bruto');
    //console.log(this.formulario.get('Peso_Bruto')?.value );
    //return;

    //Validar la información important
    const SerOrd = this.formulario.get('OC')?.value.split('-')

    let data: any = {
        tipo           : this.accion ,
        lote			    : this.formulario.get('Lote')?.value        ,
        num_Semana				: this.formulario.get('Semana')?.value      ,
        titulo				: this.formulario.get('Titulo')?.value      ,
        ser_OrdComp		: SerOrd[0],
        cod_OrdComp		: SerOrd[1],
        color				  : this.formulario.get('Color')?.value       ,
        hilo_Tipo			: this.formulario.get('Hilo_Tipo')?.value   ,
        hilo_Codigo		: String(this.formulario.get('Hilo_Codigo')?.value) ,        
        ubicacion			: this.formulario.get('Ubicacion')?.value 	,

        cantidad_Cono				: this.formulario.get('Conera')?.value      ,
        peso_Tara				  : this.formulario.get('Tara')?.value 	      ,
        peso_Bruto		: this.formulario.get('Peso_Bruto')?.value  ,
        peso_Neto			: this.formulario.get('Peso_Neto')?.value 	,	
        pallet				: this.formulario.get('Pallet')?.value 	    ,
        diferencia		: this.formulario.get('Diferencia')?.value 			,
        
        observacion		: this.formulario.get('Observacion')?.value 		,
        proveedor			: this.formulario.get('Proveedor')?.value 			,
        usu_Registro		: localStorage.getItem('codUsuario')
    }

    this.ctrlInventarioHiloTejeduriaService.postCrudCtrolInventarioHiloTejeduria(data).subscribe({
      next: (response: any)=> {
        if(response.success){

          if (response.codeResult > 0){
            this.matSnackBar.open(response.message, 'Cerrar', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 1500,
            });
                
            // Limpiar los valores
            this.formulario.reset();
            //this.LimpiarForm('R');

            // Marcar todos los controles como "pristine" (no sucios) y "untouched" (no tocados)
            this.formulario.markAsPristine();
            this.formulario.markAsUntouched();

            this.HabilitaControles();

          }
        }else{
          this.matSnackBar.open(response.message, 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 1500,
          })
        }
      },
      error: (error) => {
        this.matSnackBar.open(error.message, 'Cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1500,
        })
      }
    });    

  }

  onInputChange() {
    const loteValue = this.formulario.get('Lote')?.value;
    
    if (loteValue && loteValue.length >= 4) {
      this.ctrlInventarioHiloTejeduriaService.getObtenerCtrolInventarioHiloTejeduriaByLote(loteValue).subscribe({
        next: (response: any)=> {
          if(response.success){
            if (response.totalElements > 0){
              this.accion = 'U';
              this.LlenarForm(response);
            } else {
              this.matSnackBar.open('NO EXISTE INFORMACIÓN ', 'Cerrar', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 1500,
              })
              this.accion = 'I';
              this.HabilitaControles();
              this.LimpiarForm('');

              // Marcar todos los controles como "pristine" (no sucios) y "untouched" (no tocados)
              this.formulario.markAsPristine();
              this.formulario.markAsUntouched();

            }             
          }    
        },
        error: (error) => {
          this.matSnackBar.open(error.message, 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 1500,
          })
        }        
      });
    }
  }

  
  ResetForm(){  
    this.formulario.reset();
    this.formulario.markAsPristine();
    this.formulario.markAsUntouched();
    this.HabilitaControles();
    this.accion = 'I';
    this.loteInput.nativeElement.focus();
  }


  LimpiarForm(estado:string){
    if (estado == 'R')
    {
      this.formulario.get('Lote')?.setValue('');
    }

    this.formulario.get('Semana')?.setValue('');
    this.formulario.get('Titulo')?.setValue('');
    this.formulario.get('OC')?.setValue('');
    this.formulario.get('Color')?.setValue('');
    this.formulario.get('Hilo_Tipo')?.setValue('');
    this.formulario.get('Hilo_Codigo')?.setValue('');    
    this.formulario.get('Ubicacion')?.setValue('');
    this.formulario.get('Conera')?.setValue('');
    this.formulario.get('Tara')?.setValue('');
    this.formulario.get('Peso_Bruto')?.setValue('');
    this.formulario.get('Peso_Neto')?.setValue('');
    this.formulario.get('Pallet')?.setValue('');
    this.formulario.get('Diferencia')?.setValue('');
    this.formulario.get('Observacion')?.setValue('');
    this.formulario.get('Proveedor')?.setValue('');
  }

  LlenarForm(response: any){

    //this.formulario.get('Lote')?.setValue('');
    this.formulario.get('Semana')?.setValue(response.elements[0].num_Semana);
    this.formulario.get('Titulo')?.setValue(response.elements[0].titulo);
    this.formulario.get('OC')?.setValue(response.elements[0].ser_OrdComp + '-' + response.elements[0].cod_OrdComp);
    this.formulario.get('Color')?.setValue(response.elements[0].color);
    this.formulario.get('Hilo_Tipo')?.setValue(response.elements[0].hilo_Tipo);
    this.formulario.get('Hilo_Codigo')?.setValue(response.elements[0].hilo_Codigo);    
    this.formulario.get('Ubicacion')?.setValue(response.elements[0].ubicacion);
    this.formulario.get('Conera')?.setValue(response.elements[0].cantidad_Cono);
    this.formulario.get('Tara')?.setValue(response.elements[0].peso_Tara);
    this.formulario.get('Peso_Bruto')?.setValue(response.elements[0].peso_Bruto);
    this.formulario.get('Peso_Neto')?.setValue(response.elements[0].peso_Neto);
    this.formulario.get('Pallet')?.setValue(response.elements[0].pallet);
    this.formulario.get('Diferencia')?.setValue(response.elements[0].diferencia);
    this.formulario.get('Observacion')?.setValue(response.elements[0].observacion);
    this.formulario.get('Proveedor')?.setValue(response.elements[0].proveedor);

    this.DeshabilitaControles();
  }

  DeshabilitaControles(){
    this.formulario.get('Semana')?.disable();
    this.formulario.get('Titulo')?.disable();
    this.formulario.get('OC')?.disable();
    this.formulario.get('Color')?.disable();
    this.formulario.get('Hilo_Tipo')?.disable();
    this.formulario.get('Hilo_Codigo')?.disable();    
    //this.formulario.get('Ubicacion')?.disable();
    this.formulario.get('Conera')?.disable();
    this.formulario.get('Tara')?.disable();
    this.formulario.get('Peso_Bruto')?.disable();
    this.formulario.get('Peso_Neto')?.disable();
    this.formulario.get('Pallet')?.disable();
    this.formulario.get('Diferencia')?.disable();
    //this.formulario.get('Observacion')?.disable();
    this.formulario.get('Proveedor')?.disable();    
  }

  HabilitaControles() {
    this.formulario.get('Semana')?.enable();
    this.formulario.get('Titulo')?.enable();
    this.formulario.get('OC')?.enable();
    this.formulario.get('Color')?.enable();
    this.formulario.get('Hilo_Tipo')?.enable();
    this.formulario.get('Hilo_Codigo')?.enable();    
    //this.formulario.get('Ubicacion')?.disable();
    this.formulario.get('Conera')?.enable();
    this.formulario.get('Tara')?.enable();
    this.formulario.get('Peso_Bruto')?.enable();
    this.formulario.get('Peso_Neto')?.enable();
    this.formulario.get('Pallet')?.enable();
    this.formulario.get('Diferencia')?.enable();
    //this.formulario.get('Observacion')?.disable();
    this.formulario.get('Proveedor')?.enable();        
  }

    // Función que se ejecuta cuando se pega algo en el input
    onPaste(event: ClipboardEvent): void {
      // Previene el comportamiento predeterminado de pegar
      event.preventDefault();
      
      // Obtén el texto pegado
      const pastedText = event.clipboardData?.getData('text');
      console.log(pastedText);
      // Elimina los espacios del texto pegado
      const cleanedText = pastedText?.replace(/\s+/g, '');  // Reemplaza todos los espacios con nada
  
      // Establece el valor limpio en el campo de entrada
      //const input = event.target as HTMLInputElement;
      //input.value = cleanedText;

      this.formulario.get('Lote')?.setValue(cleanedText);
  
      // Si usas un formulario reactivo (FormControl), actualiza el valor manualmente
      // this.miFormulario.controls['Lote'].setValue(cleanedText);
    }

  //#endregion

}
