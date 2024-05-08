import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistorySearchService {
  private _userHistory = new BehaviorSubject<any[]>([]);
  userHistory$ = this._userHistory.asObservable();

  private baseUrl = 'https://imdbapp-5296c-default-rtdb.firebaseio.com';

  constructor(private authService: AuthService, private http: HttpClient)
  {
// Abonnez-vous aux changements de l'ID utilisateur pour mettre à jour l'historique
    this.authService.userId.subscribe(userId => {
    if (userId) {
    this.loadUserHistory(userId);
  }
});
  }

  loadUserHistory(userId: string) {
    this.http.get<any[]>(`${this.baseUrl}/history/${userId}.json`).subscribe({
      next: (history) => {
        // Assurez-vous que history n'est pas undefined avant d'accéder à ses propriétés
        if (history) {
          this._userHistory.next(history);
        } else {
          this._userHistory.next([]);
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'historique :', error);
      }
    });
  }


  saveUserHistory(userId: string, history: any[]): Observable<any> {
    // Faites une requête HTTP pour sauvegarder l'historique vers votre backend
    return this.http.put(`${this.baseUrl}/history/${userId}.json`, history);
  }


  addToHistory(search: any) {
    // Obtenez l'historique actuel
    const currentHistory = this._userHistory.value || [];

    // Utilisez switchMap pour gérer l'observable de l'ID utilisateur
    this.authService.userId.pipe(
      switchMap(userId => {
        if (userId) {
          // Ajoutez la nouvelle recherche (en s'assurant de stocker uniquement les détails du film)
          currentHistory.push(search.results[0]); // Ajoutez uniquement les détails du premier résultat
          // Mettez à jour le sujet BehaviorSubject
          this._userHistory.next(currentHistory);
          // Sauvegardez l'historique mis à jour
          return this.saveUserHistory(userId, currentHistory);
        } else {
          // Si l'ID utilisateur est null, retournez un observable vide
          return EMPTY;
        }
      })
    ).subscribe(() => {
      // Gérez la réponse si nécessaire
      console.log('Historique enregistré avec succès');
    });
  }

  getUserHistory(): Observable<any[]> {
    return this.userHistory$;
  }
}
