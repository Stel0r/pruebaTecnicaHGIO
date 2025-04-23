import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VistaCarrouselComponent } from "./vista-carrousel/vista-carrousel.component";
import { breedInfo } from '../models/breedInfo';
import { RazasService } from './services/razas.service';
import { FormControl, ReactiveFormsModule, Validators,FormsModule} from '@angular/forms';
import { BarraBusquedaComponent } from "./barra-busqueda/barra-busqueda.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, VistaCarrouselComponent, ReactiveFormsModule, FormsModule, BarraBusquedaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pruebaTecnicaHGIO';
  razaSeleccionada: breedInfo|null = null
  comentario: FormControl = new FormControl('',[Validators.required])

  constructor(private razasService: RazasService) {
    this.razaSeleccionada = null
  }

  agregarComentario() {
    this.razasService.agregarComentario(this.razaSeleccionada!.id,this.comentario.value)
    this.comentario.setValue('')
  }
}


