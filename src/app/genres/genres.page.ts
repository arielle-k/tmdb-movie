import { Component, OnInit, inject } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.page.html',
  styleUrls: ['./genres.page.scss'],
})
export class GenresPage implements OnInit {
  private platform = inject(Platform); //A importer

  constructor() {}

  public cards = [
    {
        source: "https://images.unsplash.com/photo-1705783679154-c47fab616434?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        source: "https://images.unsplash.com/photo-1705719418761-3808881d06b4?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        source: "https://images.unsplash.com/photo-1705615427885-800da48ba0b7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        source: "https://images.unsplash.com/photo-1705522409239-87c3c13496e8?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        source: "https://images.unsplash.com/photo-1705351953374-76117bc519e1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        source: "https://images.unsplash.com/photo-1705773895630-0b15890ded6e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        source: "https://images.unsplash.com/photo-1682687981907-170c006e3744?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
];

  ngOnInit() {
    console.log("H")
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Back' : '';
  }

  clicked = false;

  isClick() {
    this.clicked = !this.clicked;
  }
}
