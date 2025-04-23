import { Injectable } from '@angular/core';
import { breedInfo } from '../../models/breedInfo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { imageResponse } from '../../models/imageResponse';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RazasService {
  agregarComentario(id: string,value: string) {
    this.razas.forEach((element: breedInfo) => {
      if (element.id == id) {
        element.comentarios.push(value)
      }
    })
  }

  razas: Array<breedInfo> = [];
  constructor(private http: HttpClient) {

  }
  async getRazas(): Promise<breedInfo[]> {
    if (this.razas.length > 0) {
      return this.razas
    }
    let request: Observable<Array<breedInfo>> = this.http.get<Array<breedInfo>>("https://api.thecatapi.com/v1/breeds")
    this.razas = await firstValueFrom(request).then((data: Array<breedInfo>) => {
      return data
    })
    this.razas.forEach(async (element: breedInfo) => {
      await this.http.get<Array<imageResponse>>(`https://api.thecatapi.com/v1/images/search?breed_ids=${element.id}`,{headers:{'x-api-key':environment.catKey}}).subscribe((data: Array<imageResponse>) => {
        element.image = data[0]
        element.comentarios = []
      })
    })
    return this.razas;
  }
}
