import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RootRoutingModule } from './root-routing.module';
import { TopnavComponent } from './components/topnav/topnav.component';
import { MatIconModule } from '@angular/material/icon';
import { SidenavItemComponent } from './components/sidenav-item/sidenav-item.component';

@NgModule({
  imports: [CommonModule, RootRoutingModule, SharedModule, MatIconModule],
  declarations: [DashboardComponent, SidenavComponent, TopnavComponent, SidenavItemComponent]
})
export class RootModule { }
