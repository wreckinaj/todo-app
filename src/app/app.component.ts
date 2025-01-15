import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule],
  animations: [
    trigger('slideInOut', [
      state('void', style({ transform: 'translateX(-100%)' })),
      transition(':enter', [animate('300ms ease-out', style({ transform: 'translateX(0)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
    ]),
    trigger('toggleDone', [
      state('done', style({
        textDecoration: 'line-through',
        color: 'gray'
      })),
      state('active', style({
        textDecoration: 'none',
        color: 'black'
      })),
      transition('done <=> active', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class AppComponent {
  componentTitle = "My To Do List";

  filter: "all" | "active" | "done" = "all";

  allItems = [
    { description: "eat", done: true },
    { description: "sleep", done: false },
    { description: "play", done: false },
    { description: "laugh", done: false },
  ];

  addItem(description: string) {
    if (!description) return;
    this.allItems.unshift({
      description,
      done: false,
    });
  }

  editItem(item: any) {
    const newDescription = prompt('Edit task', item.description);
    if (newDescription && newDescription !== item.description) {
      item.description = newDescription;
    }
  }

  toggleDone(item: any) {
    item.done = !item.done;
  }

  deleteItem(item: any) {
    this.allItems = this.allItems.filter(i => i !== item);
  }

  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === "done" ? item.done : !item.done
    );
  }

  trackByDescription(index: number, item: any): string {
    return item.description;
  }
}
