import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';
import { RequestService } from 'src/app/services/request.service';
import { Task } from 'src/app/models/task';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface tableData   {
  pID: number,
  pName: string,
  pStart: string,
  pEnd: string,
  pClass: string,
  pLink: string,
  pMile: number,
  pRes: string,
  pComp: number,
  pGroup: number,
  pParent: number,
  pOpen: number,
  pDepend: string,
  pCaption: string,
  pNotes: string
}


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  @ViewChild("editor") editor!: GanttEditorComponent;
  public editorOptions!: GanttEditorOptions;
  public data: any[] = [];
  id!: number;
  tasks: Task[] = [];
  
  some!: object;

  constructor(private activatedrouter: ActivatedRoute,
    private requestService: RequestService,
    public dialogRef: MatDialogRef<RequestDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public dat: any
  ) { }

  ngOnInit(): void {

    this.editorOptions = {
      vFormat: "day",
      vEditable: true,
      vEventsChange: {
        taskname: () => {
          console.log("taskname");
        }
      }
    };

    this.activatedrouter.paramMap.subscribe((params: any) => {
      let id = params.get('id');
      if (id) {
        this.id = parseInt(id);
      }
    });
    this.requestService.getRequestsById(this.dat).subscribe((data) => {
      this.tasks = data;
      console.log(this.tasks);
      this.data = this.tasks.map((task) => {
        return {
          pID: task.taskId, // id
        pName: task.taskName, // task name displayed on the left side
        pStart: task.startDate, // start date for each task 
        pEnd: task.endDate, // end date for each task
        pClass: task.status, // used to denote the status of task in bar by changing color
        pLink: task.referenceLink, // used to link any website 
        pMile: 0,
        pRes: task.createdBy, // dentoes the person who created the task
        pComp: task.completedPercentage, // denotes the completed status inside the bar
        pGroup: task.groupId, // used to map multiple task to a single group || still some confusion
        pParent: task.parentId, // one parent task has set of child tasks
        pOpen:0,
        pDepend: task.dependOn, // task depended on another task
        pCaption: "Hi there",
        pNotes: task.taskDescription  
        }
      })
    });
  }


}
