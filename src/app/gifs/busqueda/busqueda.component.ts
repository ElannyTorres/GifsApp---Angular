import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  text: string = 'Busqueda';

  constructor(private gifsService: GifsService) {}

  buscar(termino: string) {
    const valor = this.txtBuscar.nativeElement.value;

    //* si no hay nada escrito no se agrega el vacío
    if(valor.trim().length === 0) {
      return;
    }

    this.txtBuscar.nativeElement.value = '';

    this.gifsService.buscarGifs( valor );
  }
}

