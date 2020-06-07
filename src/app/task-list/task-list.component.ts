import { Component, OnInit } from '@angular/core';

import { TaskService } from '../shared/task.service'
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private taskservice: TaskService) { }
  tasks = [];
  deleted: boolean;
  searchText: string = "";

  ngOnInit() {
    this.taskservice.getTasks().subscribe(
      list => {
        this.tasks = list.map(elem => {
          return {
            $key: elem.key,
            ...elem.payload.val()
          };
        });
      });
  }

  onDelete($key){
    if(confirm('Are you sure you want to delete this task ?')){
      this.taskservice.deleteTask($key);
      this.deleted=true;
      setTimeout(() => this.deleted = false, 3000);
    }
  }

  check(task){
    return task.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

}
