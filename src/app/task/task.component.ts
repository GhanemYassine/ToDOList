import { Component, OnInit } from '@angular/core';

import { TaskService } from '../shared/task.service'
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private taskservice: TaskService) { }
  submit:boolean;
  success:boolean;
  formControls = this.taskservice.form.controls;

  ngOnInit() {
  }
  onSubmit(){
    this.submit=true;
    if (this.taskservice.form.valid){
      if (this.taskservice.form.get('$key').value == null)
        this.taskservice.addTask(this.taskservice.form.value);
      else
        this.taskservice.updateTask(this.taskservice.form.value);
      this.success = true;
      setTimeout(() => this.success = false,3000);
      this.submit = false;
      this.taskservice.form.reset();
      this.taskservice.form.setValue({
        $key: null,
        name: '',
        description: '',
        status: '',
        date: '',
      });

    }
  }

}
