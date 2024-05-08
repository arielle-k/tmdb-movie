import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WatchLaterService {
  private _watchLaterMovies = new BehaviorSubject<any[]>([]);
  watchLaterMovies$ = this._watchLaterMovies.asObservable();

  private baseUrl = 'https://imdbapp-5296c-default-rtdb.firebaseio.com'

  constructor(private authService: AuthService, private http: HttpClient) { }

  addToWatchLater(movie: any): Observable<any> {
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('No user found!');
        }
        // Ajoutez le film à la liste des films a regarder plus tard de l'utilisateur.
        return this.http.post(
          `${this.baseUrl}/watch-later/${userId}.json`,
          movie
        );
      })
    );
  }

  fetchWatchLaterMovies(): Observable<any[]> {
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error('User not found!');
        }
        return this.http.get<any[]>(`${this.baseUrl}/watch-later/${userId}.json`);
      }),
      map(response => {
        if (!response) {
          return [];
        }

        // Utiliser Object.values pour récupérer les valeurs des propriétés
        const moviesArray = Object.values(response);
        return moviesArray || [];
      }),
      tap((watchLaterMovies: any[]) => {
        this._watchLaterMovies.next(watchLaterMovies);
      })
    );
  }
}
