import { Component } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { delay, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HistorySearchService } from '../services/history-search.service';

interface Recommendation {
  results: any[]; // Remplacez any par le type réel des résultats
  // Autres propriétés si nécessaires
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  films: any[] = [];
  movies: any[] = [];
  topRated: any;
  nowPlaying: any;
  upComingMovie:any;
  genrelist:any[]=[];
  //responsiveOptions;
  loader = true;
  totalResults: any;
  total_results: any;
  searchRes: any;
  popularMovie:any;
  displayName: string=''
  recommendedMovies: any[]=[];
  history: any[] = [];

  constructor(private tmdb:TmdbService, private authservice:AuthService, private historySearch:HistorySearchService) {}

  ngOnInit(){
    this.getTopRatedMovies(1);
    this.trendingMovies(1);
    this.getUpComingMovies(1)
    this.getPopular(1)

    //charger les recommendations:
    this.historySearch.getUserHistory().subscribe(history => {
      this.history = history;
      this.loadRecommendations(this.history);
    });

    //recuperer le nom du user authentifier
    this.authservice.displayName.subscribe(displayName => {
      this.displayName = displayName!;
    });

}

getTopRatedMovies(page: number) {
  this.tmdb.getTopRatedMovies(page).pipe(delay(2000)).subscribe((res: any) => {
    this.topRated = res.results;
    this.totalResults = res.total_results;
    this.loader = false;
  },
  error => console.log(error));
}
trendingMovies(page: number) {
  this.tmdb.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
    this.nowPlaying = res.results;
    this.loader = false;
  });
}
getUpComingMovies(page: number) {
  this.tmdb.getUpComingMovies(page).pipe(delay(2000)).subscribe((res: any) => {
    this.upComingMovie = res.results;
    this.loader = false;
  });
}

getPopular(page: number) {
  this.tmdb.getPopular(page).pipe(delay(2000)).subscribe((res: any) => {
    this.popularMovie = res.results;
    this.loader = false;
  });
}

//gerer la recommendation du user
loadRecommendations(history: any[]) {
  this.authservice.userId.pipe(take(1)).subscribe(userId => {
    // Vérifiez si l'ID utilisateur est disponible et si l'historique n'est pas vide
    if (userId && history && history.length > 0) {
      // Utilisez le premier film de l'historique pour obtenir les recommandations
      const referenceMovieId = history[0].id;

      console.log('Reference Movie ID:', referenceMovieId);

      this.tmdb.getRecomendMovies(referenceMovieId).subscribe(
        (recommendations: Recommendation) => {
          // Traitez les recommandations comme nécessaire dans votre application
          console.log('Recommendations based on history:', recommendations);
          this.recommendedMovies = recommendations.results || [];
        },
        (error: any) => {
          console.error('Error fetching recommendations based on history:', error);
        }
      );
    } else {
      // L'historique est vide ou l'ID utilisateur est indisponible, gérer selon vos besoins
      console.log('User has no search history or userId is unavailable.');
      this.recommendedMovies = []; // Assurez-vous que la liste des recommandations est vide
    }
  });
}
}
