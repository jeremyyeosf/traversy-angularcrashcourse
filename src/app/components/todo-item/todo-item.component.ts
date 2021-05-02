import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css']
})

export class TodoItemComponent implements OnInit {
    @Input() todo: Todo = new Todo();
    @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter()

    constructor(private todoSvc: TodoService) { }

    ngOnInit(): void {
    }

    // Set Dynamic Classes
    setClasses() {
        let classes = {
            "todo": true,
            'is-complete': this.todo.completed
        }
        return classes
    }

    onToggle(todo: Todo) {
        // Toggle in UI
        todo.completed = !todo.completed
        // Toggle in Server
        this.todoSvc.toggleCompleted(todo).subscribe(todo => {
            console.log(todo)
        })
    }

    onDelete(todo: Todo) {
        this.deleteTodo.emit(todo)
    }
}
