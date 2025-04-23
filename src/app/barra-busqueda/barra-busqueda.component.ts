import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { RazasService } from '../services/razas.service';
import { breedInfo } from '../../models/breedInfo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrl: './barra-busqueda.component.css',
  imports: [CommonModule,FormsModule]
})
export class BarraBusquedaComponent {
  razas : Array<string> = [];
  resultados: Array<string> = [];
  ultimaBusqueda: Subject<string>;
  @Output() realizarBusqueda : EventEmitter<string> = new EventEmitter<string>();
  constructor(private razaService: RazasService) {
    this.ultimaBusqueda = new Subject<string>();

  }
  ngOnInit(){
    this.cargarRazas()
    
    this.ultimaBusqueda.pipe(debounceTime(500)).subscribe((valor) => {
      this.buscarRaza(valor)
    })
  }

  seleccionRaza(busqueda: string) {
    this.realizarBusqueda.emit(busqueda);
    this.resultados = [];
    (document.getElementById("barraBusqueda")! as HTMLInputElement).value = ""
  }

  async buscarRaza(busqueda:string) {
    if(busqueda == ""){
      this.resultados = []
      return
    }
    this.resultados = this.razas.filter((element:string) => {
      if (element.toLowerCase().includes(busqueda.toLowerCase())) {
        return true
      }else{
        return false
      }
    }).slice(0,3)
  }

  manejarCambio(event: Event) {
    this.resultados = []
    const input = event.target as HTMLInputElement;
    this.ultimaBusqueda.next(input.value);
  }

  async cargarRazas() {
    this.razas = (await this.razaService.getRazas()).map((element: breedInfo) => {
      return element.name})
  }
}


