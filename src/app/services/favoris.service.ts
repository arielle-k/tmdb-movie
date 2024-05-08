import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  private _favoriteMovies = new BehaviorSubject<any[]>([]);
  favoriteMovies$ = this._favoriteMovies.asObservable();
  private baseUrl = 'https://imdbapp-5296c-default-rtdb.firebaseio.com'

  constructor(private authService: AuthService, private http: HttpClient) { }

  addToFavorites(movie: any): Observable<any> {
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('No user found!');
        }
        // Ajoutez le film à la liste des films favoris de l'utilisateur.
        return this.http.post(
          `${this.baseUrl}/favorite-movies/${userId}.json`,
          movie
        );
      })
    );
  }

  fetchFavoriteMovies(): Observable<any[]> {
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error('User not found!');
        }
        return this.http.get<{ [key: string]: any }>(`${this.baseUrl}/favorite-movies/${userId}.json`);
      }),
      map(response => {
        const moviesArray = Object.keys(response).map(key => response[key]);
        return moviesArray || [];
      }),
      tap((favoriteMovies: any[]) => {
        this._favoriteMovies.next(favoriteMovies);
      })
    );
  }
}
