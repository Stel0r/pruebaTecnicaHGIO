import { HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import { breedInfo } from '../../models/breedInfo';
import { RazasService } from '../services/razas.service';

@Component({
  selector: 'app-vista-carrousel',
  imports: [],
  templateUrl: './vista-carrousel.component.html',
  styleUrl: './vista-carrousel.component.css'
})

export class VistaCarrouselComponent {
  nombreRaza:string = "";
  descripcionRaza:string = "";
  breedArray:Array<breedInfo> = [];
  imagenInicial:number = 0;
  constructor(private http: HttpClient,private razasService: RazasService) {
    // this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
    //   console.log(data);
    // });

  }
  ngOnInit() {
    this.cargarRazas()
  }

  actualizarDescripcion() {
    this.nombreRaza = this.breedArray[this.imagenInicial+1].name
    this.descripcionRaza = this.breedArray[this.imagenInicial+1].description
  }

  moverIzquierda() {
    this.imagenInicial = (this.imagenInicial == -1) ? this.breedArray.length-2:this.imagenInicial-1
    this.actualizarDescripcion()
  }

  moverDerecha() {
    this.imagenInicial = this.imagenInicial = (this.imagenInicial == this.breedArray.length-2) ? -1:this.imagenInicial+1
    this.actualizarDescripcion()
  }

  async cargarRazas() {
    this.breedArray = await this.razasService.getRazas()
    this.actualizarDescripcion()
  }
}


