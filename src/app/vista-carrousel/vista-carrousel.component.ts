import { HttpClient} from '@angular/common/http';
import { Component, EventEmitter, Input, Output, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { breedInfo } from '../../models/breedInfo';
import { RazasService } from '../services/razas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista-carrousel',
  imports: [CommonModule],
  templateUrl: './vista-carrousel.component.html',
  styleUrl: './vista-carrousel.component.css'
})

export class VistaCarrouselComponent {
  @Output() onElementSelected = new EventEmitter<breedInfo|null>();
  @Input() busqueda:string = "";
  breedArray:Array<breedInfo> = [];
  imagenInicial:WritableSignal<number> = signal(0);
  mostrandoDescripcion:boolean = false;
  constructor(private http: HttpClient,private razasService: RazasService) {
    // this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
    //   console.log(data);
    // });

  }
  ngOnInit() {
    this.cargarRazas()
  }

  obtenerImagen(pos:number) {
    
  }


  moverIzquierda() {
    this.imagenInicial.set((this.imagenInicial() == -1) ? this.breedArray.length-2:this.imagenInicial() -1)
    this.mostrandoDescripcion = false
    this.onElementSelected.emit(this.breedArray[this.imagenInicial() +1])
  }

  moverDerecha() {
    this.imagenInicial.set((this.imagenInicial() == this.breedArray.length-2) ? -1:this.imagenInicial() +1)
    this.mostrandoDescripcion = false
    this.onElementSelected.emit(this.breedArray[this.imagenInicial( ) +1])
  }

  async cargarRazas() {
    this.breedArray = await this.razasService.getRazas()
    this.onElementSelected.emit(this.breedArray[this.imagenInicial() +1])

  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes['busqueda']) {
      this.breedArray.forEach((element: breedInfo,index:number) => { 
        if (element.name.toLowerCase() == this.busqueda.toLowerCase()) {
          this.imagenInicial.set(index - 1)
        }
      })
    }
  }
}


