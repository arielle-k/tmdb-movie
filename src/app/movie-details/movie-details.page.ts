import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';
import { FavorisService } from '../services/favoris.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute); //Si tu veux rediriger vers une route specifique
  private platform = inject(Platform); //A importer

  public id:string='';
  public video: boolean | undefined;
  //movie: any;
  relatedvideo: any;
  casts: any = [];
  backdrops: any = [];
  recomendMovies: any = [];

  @Input() movie: any;
  @Output() movieAddedToFavorites = new EventEmitter<any>();

  constructor(private tmdb:TmdbService,private router: ActivatedRoute,private alertController: AlertController,private favoris:FavorisService) {}

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getSingleMoviesVideos(this.id);
      this.getSingleMoviesDetails(this.id);
      this.getCast(this.id);
      this.getBackropsImages(this.id);
      this.getRecomendMovie(this.id);
    });
  }

  getSingleMoviesDetails(id: string){
    this.tmdb.getMovie(id).subscribe((res: any) => {
      this.movie = res;
    });
  }

  getSingleMoviesVideos(id:string) {
    this.tmdb.getMovieVideos(id).subscribe((res: any) => {
      if (res.results.length) {
        this.video = res.results[0];
        this.relatedvideo = res.results;
      }
    });
  }



  getCast(id:string) {
    this.tmdb.getMovieCredits(id).subscribe((res: any) => {
      this.casts = res.cast;
    });
  }

  getBackropsImages(id:string) {
    this.tmdb.getBackdropsImages(id).subscribe((res: any) => {
      this.backdrops = res.backdrops;
    });
  }

  getRecomendMovie(id:string) {
    this.tmdb.getRecomendMovies(id).subscribe((res: any) => {
      this.recomendMovies = res.results;
    });
  }

  clicked = false;

  isClick() {
    this.clicked = !this.clicked;
    this.onAddToFavorites();
  }

  //Button retour vers la page precedente
  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Back' : '';
  }

  //ajouter favorite

  async onAddToFavorites() {
    try {
      await this.favoris.addToFavorites(this.movie).toPromise();
      console.log('Movie added to favorites successfully.');
      this.presentSuccessAlert();
      this.movieAddedToFavorites.emit(this.movie);
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
      // Vous pouvez également afficher un pop-up d'erreur si nécessaire
    }
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Favoris ajouté',
      message: 'Le film a été ajouté à vos favoris avec succès!',
      buttons: ['OK']
    });

    await alert.present();
  }


}
