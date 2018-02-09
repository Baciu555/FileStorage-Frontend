import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FileService {

	private url: string = "http://localhost:8080/files";

  constructor(private http: Http) { }

  addFile(event: any, id: number) {
  	let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        let headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url + '/users/' + id, formData)
            .map(res => res)
            .catch(this.errorHandler);
    }
  }

  getUserFiles(id: number) {
    return this.http.get(this.url + '/users/' + id)
      .map(res => res.json())
      .catch(this.errorHandler);
  }

  deleteFile(id: number) {
    return this.http.delete(this.url + '/' + id)
      .map(res => res)
      .catch(this.errorHandler);
  }

  downloadFile(id: number) {
    let headers = new Headers({ 
          // 'Authorization': 'Basic ' + btoa(user.email + ':' + user.password)
          //'X-Requested-With': 'XMLHttpRequest' // to suppress 401 browser popup
          'Content-Type': 'application/json', 
          'Accept': 'application/octet-stream'
    });

    let options = new RequestOptions({ 
           headers: headers
    });

  	return this.http.get(this.url + '/' + id, {
            responseType: ResponseContentType.Blob,
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    })
            .map(res => res.json())
            .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.error(error + " XDDD");
    return Observable.throw(error || "Server error");
  }

}
