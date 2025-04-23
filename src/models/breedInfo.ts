import { imageResponse } from './imageResponse';
export class breedInfo {
  id: string;
  name: string;
  description: string;
  life_span: string;
  origin: string;
  image: imageResponse;
  comentarios: string[] = [];
}