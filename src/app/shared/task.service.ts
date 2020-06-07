import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firebase: AngularFireDatabase) { }
  taskList: AngularFireList<any>;
  
  form = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required),
    date: new FormControl ('',Validators.required)
  });

  getTasks(){
    this.taskList = this.firebase.list('tasks');
    return this.taskList.snapshotChanges();
  }

  addTask(task){
    this.taskList.push({
      name: task.name,
      description : task.description,
      status: task.status,
      date: task.date
    });
  }

  updateTask(task){
    this.taskList.update(task.$key,{
      name: task.name,
      description: task.description,
      status: task.status,
      date: task.date
    });
  }

  deleteTask($key: string){
    this.taskList.remove($key);
  }
  populateForm(task){
      this.form.setValue(task);
  }
}
