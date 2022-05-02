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

}