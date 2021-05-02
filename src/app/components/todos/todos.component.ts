import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service'

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
    todos: Todo[] = []

    constructor(private todoSvc: TodoService) { }

    ngOnInit(): void {
        this.todoSvc.getTodos().subscribe(todos => {
            this.todos = todos
        });
    }

    deleteTodo(todo: Todo) {
        console.log('delete me')
        // Remove from UI
        this.todos = this.todos.filter(t => t.id !== todo.id)
        // Remove from Server
        this.todoSvc.deleteTodo(todo).subscribe();
        console.log('deleting..', todo)

    }

    addTodo(todo: Todo) {
        this.todoSvc.addTodo(todo).subscribe(todo => {
            this.todos.push(todo)
        })
        console.log('adding..', todo)
    }

}
