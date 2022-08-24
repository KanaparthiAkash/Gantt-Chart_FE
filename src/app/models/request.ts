import { Task } from 'src/app/models/task';
import { User } from './user';
export interface Request {
    requestId:number;
    requestName?:string|null;
    status?: string | null;
    description?: string | null;
    tasks: Task[];
    users?:User[] | null;
    
    createdBy?:string;
    createdAt:Date;
    updatedBy:string;
    updatedAt:Date;
    isDeleted:boolean;
}
