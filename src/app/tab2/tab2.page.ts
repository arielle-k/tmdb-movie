import { Component } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { delay } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  genreslist: any;
  loader = true;

  constructor(private tmdb: TmdbService,private router: Router) {}

  ngOnInit() {
    this.MovieGenre();
  }

  MovieGenre() {
    this.tmdb.getGenres().pipe(delay(2000)).subscribe((res: any) => {
      this.genreslist = res.genres;
      this.loader = false;
    });
  }
  navigateToGenre(id: string, name: string) {
    this.router.navigate(['/genres', id, name]);
  }
}
