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
  texto:string = "Bienvenido :3";
  breedArray:Array<breedInfo> = [];
  constructor(private http: HttpClient,private razasService: RazasService) {
    // this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
    //   console.log(data);
    // });

  }
  ngOnInit() {
    this.cargarRazas()
  }

  async cargarRazas() {
    this.breedArray = await this.razasService.getRazas()
  }
}


