import { Component } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { HistorySearchService } from '../services/history-search.service';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  //searchRes: any;
  //searchStr:string='';
  results: any[] = [];
  recommendedMovies: any[]=[];
  history: any[] = [];
  constructor(private tmdb: TmdbService, private historySearch:HistorySearchService, ) {}




  searchMovie(event: any) {
    const query = event.target.value;

    // Vérifiez si la longueur de la requête est suffisante pour lancer la recherche
    if (query.length >= 3) {
      this.tmdb.searchMovies(query).subscribe(
        (data) => {
          this.results = data.results;
          console.log(this.results);
          //Ajouter la recherche à l'historique après avoir reçu les résultats
          this. historySearch.addToHistory(data);
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
    } else {
      // Réinitialisez la liste des résultats si la requête est trop courte
      this.results = [];
    }
  }





}
