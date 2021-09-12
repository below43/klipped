import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scratchpad',
  templateUrl: './scratchpad.page.html',
  styleUrls: ['./scratchpad.page.scss'],
})
export class ScratchpadPage implements OnInit {

  constructor() { }

  ngOnInit() {
    var klipped = localStorage.getItem('klipped');
    if (klipped) {
      this.klipped = klipped;
    }
  }

  klipped:string = "Klipped is a simple, privacy-oriented scratchpad.\r\n\r\nWelcome. Klipped is like the back of your hand. Write ideas down. Paste snippets of text. Delete when you’re done. \r\n\r\nJust your text.\r\n\r\nKlipped.app is a browser-based scratchpad. All data is stored in local browser storage (local to your device).\r\n\r\nTap the i button at the bottom for more details...";

  changed(ev:any) {
    localStorage.setItem('klipped', ev);
  }
}
