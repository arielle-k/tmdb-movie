import { Component, OnInit, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute, Params } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.page.html',
  styleUrls: ['./genres.page.scss'],
})
export class GenresPage implements OnInit {
  private platform = inject(Platform); //A importer
  moviesGenre: any;
  title: string='';
  public id: string='';
  loader = true;

  constructor(private tmdb: TmdbService,private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.title = params['name'];
      this.getMoviesGenre(this.id);
    });
  }

  //obtenir les films par genre
  getMoviesGenre(id:string) {
    this.tmdb.getMoviesByGenre(id).pipe(delay(2000)).subscribe((res: any) => {
        this.moviesGenre = res.results;
        this.loader = false;
    });
  }

  //Faire une boucle foreach et map pour ajouter stateWatchLater des films

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Back' : '';
  }

  clicked = false;

  isClick(index: number) {
    this.clicked = !this.clicked;
    // Définir l'état cliqué pour le film spécifique à l'index donné
    this.moviesGenre[index].clicked = !this.moviesGenre[index].clicked;
  }
}
