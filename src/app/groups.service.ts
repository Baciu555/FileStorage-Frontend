import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class GroupsService {

  private url: string = "http://localhost:8080/groups";

  constructor(private http: Http) { }

  getGroupById(id: number) {
  	return this.http.get(this.url + '/' + id)
    .map(response => response.json())
    .catch(this.errorHandler);
  }

  getGroupsByUserId(id: number) {
  	return this.http.get(this.url + '/user/' + id)
    .map(response => response.json())
    .catch(this.errorHandler);
  }

  addGroup(group: any) {
    return this.http.post(this.url, group)
    .map(response => response.json())
    .catch(this.errorHandler);
  }

  addGroupUser(user: any, id: number) {
    return this.http.post(this.url + '/' + id + '/users', user)
    .map(response => response)
    .catch(this.errorHandler);
  }

  addGroupFile(file: any, id: number) {
    return this.http.post(this.url + '/' + id + '/file', file)
    .map(response => response)
    .catch(this.errorHandler);
  }

  deleteGroupFile(fileId: number, groupId: number) {
    return this.http.delete(this.url + '/' + groupId + '/files/' + fileId)
    .map(response => response)
    .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.error(error + " XDDD");
    return Observable.throw(error || "Server error");
  }

}
