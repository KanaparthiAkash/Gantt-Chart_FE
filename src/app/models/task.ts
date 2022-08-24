
export interface Task {
    taskId:number;
    taskName:string;
    startDate:Date;
    endDate:Date;
    request: Request;
    status: string;
    groupId: number;
    parentId: number;
    referenceLink: string;
    completedPercentage: number;
    taskDescription: string;
    dependOn: string;


    createdBy:string;
    createdAt:Date;
    updatedBy:string;
    updatedAt:Date;
    isDeleted:boolean;
}
