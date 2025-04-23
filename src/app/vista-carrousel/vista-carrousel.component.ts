import { HttpClient} from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() onElementSelected = new EventEmitter<breedInfo|null>();
  breedArray:Array<breedInfo> = [];
  imagenInicial:number = 0;
  mostrandoDescripcion:boolean = false;
  constructor(private http: HttpClient,private razasService: RazasService) {
    // this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
    //   console.log(data);
    // });

  }
  ngOnInit() {
    this.cargarRazas()
  }


  moverIzquierda() {
    this.imagenInicial = (this.imagenInicial == -1) ? this.breedArray.length-2:this.imagenInicial-1
    this.mostrandoDescripcion = false
    this.onElementSelected.emit(this.breedArray[this.imagenInicial+1])
  }

  moverDerecha() {
    this.imagenInicial = this.imagenInicial = (this.imagenInicial == this.breedArray.length-2) ? -1:this.imagenInicial+1
    this.mostrandoDescripcion = false
    this.onElementSelected.emit(this.breedArray[this.imagenInicial+1])
  }

  async cargarRazas() {
    this.breedArray = await this.razasService.getRazas()
    this.onElementSelected.emit(this.breedArray[this.imagenInicial+1])

  }
}


