import { Component, OnInit, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute); //Si tu veux rediriger vers une route specifique
  private platform = inject(Platform); //A importer
  constructor() {}

  ngOnInit() {
    console.log("Coucou")
  }

  elements = [1, 2, 3, 4, 5];

  clicked = false;

  isClick() {
    this.clicked = !this.clicked;
  }

  //Button retour vers la page precedente
  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Back' : '';
  }
}
