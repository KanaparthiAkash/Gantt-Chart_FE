import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Request } from 'src/app/models/request';
import { User } from 'src/app/models/user';
import { RequestService } from 'src/app/services/request.service';
import { Task } from 'src/app/models/task';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/models/status';
@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

  BACKLOG = Status.BACKLOG;
  request = {} as Request;
  task = {} as Task;
  tasks: Task[] = [];
  users: User[] = [];
  firstName: string | undefined;
  userProfile: KeycloakProfile = {};

  constructor(public dialogRef: MatDialogRef<CreateRequestComponent>,
    private requestService: RequestService,
    private auth: AuthService,
    private _snackBar: MatSnackBar,) { }

  requestData = new FormGroup({
    users: new FormControl(),
    requestName: new FormControl(''),
    status: new FormControl(''),
    description: new FormControl(''),
  });


  taskData = new FormGroup({
    taskName: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    status: new FormControl(''),
    parentId: new FormControl(''),
    dependOn: new FormControl(''),
    referenceLink: new FormControl(''),
    taskDescription: new FormControl(''),
  });

  async ngOnInit(): Promise<void> {
    this.requestService.getAllUsers().subscribe((users) => this.users = users);
    this.userProfile = await this.auth.loadUserProfile();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.task = Object.assign(this.task, this.taskData.value);
    console.log(this.task);
    this.tasks.push(this.task);
    this.request.tasks = this.tasks;
    this.task = {} as Task;
    console.log(`tasks array -${this.tasks}`);
    this.taskData.reset();

  }

  remove(task: Task): void {
    const index = this.tasks.indexOf(task);

    if (index >= 0) {
      this.tasks.splice(index, 1);
    }
  }

 submitRequest() {
      this.request.requestName = this.requestData.value.requestName;
      this.request.status = this.requestData.value.status;
      this.request.description = this.requestData.value.description;
      this.request.tasks = this.tasks;
      this.request.createdBy = this.userProfile.firstName;
      this.request.users = this.requestData.value.users;
    console.log(this.request);
    this.createRequest(this.request);
  }

  openSnackBar() {
    this._snackBar.open("New Project Created", "close",{
      duration: 2000
    });
  }

  createRequest(request:Request) {
    this.requestService.createRequest(request).subscribe(data => console.log(data));
   
  }

}
