import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodoRoutingModule } from './todo-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  imports: [CommonModule, TodoRoutingModule, SharedModule, MatSidenavModule],
  declarations: [NavbarComponent, DashboardComponent, TodoItemComponent, TodoListComponent, TopnavComponent, SidenavComponent]
})
export class TodosModule { }
