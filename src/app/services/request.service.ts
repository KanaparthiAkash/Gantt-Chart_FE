import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../models/task';
import { User } from '../models/user';
import { Request } from '../models/request';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

 
  constructor(private http: HttpClient) { }

  getAllRequest = (): Observable<Request[]> => {
    let url = "http://localhost:9000/api/requests";
    return this.http.get<Request[]>(url);
  }

  getRequestsById = (id: number): Observable<Task[]> => { 
    let url = "http://localhost:9000/api/task/req-id/";
    return this.http.get<Task[]>(url+id);
  }

  getAllUsers = (): Observable<User[]> => {
    let url = "http://localhost:9000/api/users";
    return this.http.get<User[]>(url);
  }

  getRequestsForUser = (userName: string|undefined): Observable<Request[]> => { 
    let url = "http://localhost:9000/api/requests/user/";
    return this.http.get<Request[]>(url+userName);
  }

  getRequestsByCreated = (name: string | undefined): Observable<Request[]> => { 
    let url = "http://localhost:9000/api/requests/get-by-created/";
    return this.http.get<Request[]>(url + name);
  }

  createRequest = (createRequest:Request): Observable<string> => {
    const url = "http://localhost:9000/api/requests";
    return this.http.post<string>(url, createRequest, {
      responseType: 'text' as 'json'
    });
  };
}
