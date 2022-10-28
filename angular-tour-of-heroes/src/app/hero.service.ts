import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) { }
  private heroesUrl = `https://app.sketchdeck.com/api/hero?id=`;
  private heroes: Hero[] = []

  getHeroes(): Hero[] {
    const heroIds = [12, 13, 14, 15, 16, 17, 18, 19, 20];
    const heroesFromAPI = heroIds.map((id) => this.getHero(id));

    forkJoin(heroesFromAPI).subscribe((res) => {
      let count = 0
      res.forEach((hero) => {
        hero.image = `../assets/hero${count}.jpg`
        count++
        this.heroes.push(hero)
      })
    })

    return this.heroes;
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(this.heroesUrl + id)
  }
}
