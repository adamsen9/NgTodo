import { Component } from '@angular/core';

@Component({
  selector: 'app-root-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sidenavStatus = false;

  homeClicked($event) {
    console.log($event);
  }
}
