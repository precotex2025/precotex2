import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import Inputmask from 'inputmask'; // Importamos la librería Inputmask

@Directive({
  selector: '[appMaskedInput]'
})
export class MaskedInputDirective {
  @Input() mask: string = '';
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const inputElement = this.el.nativeElement;  // Obtenemos el elemento input
    const mask = new Inputmask(this.mask);  // Creamos la máscara con Inputmask
    mask.mask(inputElement);  // Aplicamos la máscara al input
  }

}
