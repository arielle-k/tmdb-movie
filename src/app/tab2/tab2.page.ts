import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {

  constructor() {}

  public categories = [
    {
      name: 'Action',
    },
    {
      name: 'Romance',
    },
    {
      name: 'Aventure',
    },
    {
      name: 'Horror',
    },
    {
      name: 'Action',
    },
    {
      name: 'Action',
    },
    {
      name: 'Action',
    },
  ];
}
