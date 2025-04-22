import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VistaCarrouselComponent } from "./vista-carrousel/vista-carrousel.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, VistaCarrouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pruebaTecnicaHGIO';
}
