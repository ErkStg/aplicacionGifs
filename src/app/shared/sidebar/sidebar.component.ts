import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';
import { BusquedaComponent } from 'src/app/gifs/busqueda/busqueda.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent {

  get historial(){
    return this.GifsService.historial;
  }

  constructor( private GifsService : GifsService){}

  buscar( query : string){
    this.GifsService.buscarGifs(query);
  }
}
