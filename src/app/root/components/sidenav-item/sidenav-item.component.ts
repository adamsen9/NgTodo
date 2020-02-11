import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent {
  @Output() itemClickedEvent = new EventEmitter();

  itemClicked() {
    this.itemClickedEvent.emit();
  }

}
