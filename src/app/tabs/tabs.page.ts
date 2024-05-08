import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  displayName: string=''
  constructor(private authservice:AuthService) {}

  ngOnInit() {
    // Souscrire à displayName pour mettre à jour la valeur dans le composant
     this.authservice.displayName.subscribe(displayName => {
     this.displayName = displayName!;
   });


 }

}
