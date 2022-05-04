import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroes } from '../interfaces/heroes.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient ) { }

  getHeroes():Observable<Heroes[]>{
    
    return this.http.get<Heroes[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroePorId( id: string ):Observable<Heroes>{
    return this.http.get<Heroes>(`${ this.baseUrl }/heroes/${ id }`);
  }

  getSugerencias( termino: string ): Observable<Heroes []>{

    return this.http.get<Heroes[]>(`${ this.baseUrl }/heroes?q=${ termino}&_limit=6`);
  }

  agregarHeroe( heroe: Heroes ): Observable<Heroes>{
    return this.http.post<Heroes>(`${ this.baseUrl }/heroes`, heroe);
  }

}
