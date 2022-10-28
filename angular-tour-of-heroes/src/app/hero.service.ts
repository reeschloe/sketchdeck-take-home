import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) { }
  private heroes: Hero[] = [];
  private heroesUrl = `https://app.sketchdeck.com/api/hero?id=`

  getHeroes(): Observable<Hero[]> {
    const heroIds = [12, 13, 14, 15, 16, 17, 18, 19, 20];

    const heroesFromAPI = heroIds.map((id) => this.getHero(id));

    const heroes = forkJoin(heroesFromAPI)
    console.log(heroes)
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(this.heroesUrl + id)
  }
}
