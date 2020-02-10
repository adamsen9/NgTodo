import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent {
  @Output() menuClickedEvent = new EventEmitter();
  @Output() homeClickedEvent = new EventEmitter();

  menuClicked() {
    this.menuClickedEvent.emit();
  }

  homeClicked() {
    this.homeClickedEvent.emit();
  }
}
