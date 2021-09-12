import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Edit', url: '/scratchpad', icon: 'pencil' },
    { title: 'About', url: '/about', icon: 'information' },
  ];

  constructor() {}
}
