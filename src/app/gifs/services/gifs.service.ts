import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _sevicioGiphy : string = "https://api.giphy.com/v1/gifs";
  private apiKey: string = 'UXtXrQ7u6ZifSAXq2R8rRvgEE5lVr1JK';
  private _historial : string[] = [];
  public resultados : Gif [] = [];

  constructor( private http : HttpClient){
    if( localStorage.getItem('historial')){
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    }

    if(localStorage.getItem('resultados')){
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  }

  get historial(): string[]{
    return [...this._historial];
  }

  
  buscarGifs( query : string = ''){

    query = query.trim().toLowerCase();

    if( !this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const parametros = new HttpParams()
      .set("api_key", this.apiKey)
      .set("q", query)
      .set("limit", "10");
    ;

    const data = this.http.get<SearchGifResponse>(`${this._sevicioGiphy}/search`, { params : parametros })
      .subscribe( resp =>{
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })
 
  }
}
