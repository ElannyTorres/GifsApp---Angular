import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif } from '../interface/gifs.interface'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'UouANs4f7E8ylUqjfqPG4ENNAK2uDLHx';
  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs'

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];

    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];

  }

  buscarGifs( query: string ): void {

    query = query.trim().toLowerCase();

    //* Agregar búsqueda al historial
    if( !this._historial.includes(query)) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);
      console.log(params.toString());

    this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search`, { params })
      .subscribe( resp => {
        this.resultados = resp.data;

        localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      } )

  }

}
