import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {
  public id:string='';
  person: any;
  // tslint:disable-next-line: variable-name
  person_cast: any = [];

  constructor(private tmdb:TmdbService, private router:ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getPersonDetails(this.id);
      this.getPersonCastMovie(this.id);
    });
  }
  getPersonDetails(id:string) {
    this.tmdb.getPersonDetail(id).subscribe((result: any) => {
      this.person = result;
    });
  }

  getPersonCastMovie(id:string) {
    this.tmdb.getPersonCast(id).subscribe((res: any) => {
      this.person_cast = res.cast;
    });
  }
}
