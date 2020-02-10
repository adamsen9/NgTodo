import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodoRoutingModule } from './todo-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@NgModule({
  imports: [CommonModule, TodoRoutingModule, SharedModule, MatSidenavModule],
  declarations: [TodoItemComponent, TodoListComponent]
})
export class TodosModule { }
