import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavorisService } from '../services/favoris.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  favoriteMovies:any[] | undefined;
  displayName: string=''
  constructor(private authservice:AuthService,private alertController:AlertController,private router: Router,private favoriteService:FavorisService) {}

  ngOnInit() {
     // Souscrire à displayName pour mettre à jour la valeur dans le composant
      this.authservice.displayName.subscribe(displayName => {
      this.displayName = displayName!;
    });
      //afficher la liste de favoris du user
      this.favoriteService.fetchFavoriteMovies().subscribe();
      this.favoriteService.favoriteMovies$.subscribe(movies => {
      this.favoriteMovies = movies;
    });

  }

  async showLogoutConfirmation() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'danger'
        },
        {
          text: 'Déconnexion',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }
logout() {
  this.authservice.logout();
  this.router.navigateByUrl('/auth');
}
}
