import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

  private url: string = "http://localhost:8080/users";

  constructor(private http: Http) { }

  getUserById(id: number) {
    return this.http.get(this.url + '/' + id)
    .map(response => response.json())
    .catch(this.errorHandler);
  }

  addUser(user: any) {
    return this.http.post(this.url, user)
    .map(response => response.json())
    .catch(this.errorHandler);
  }

  login(user: any) {
   //  var obj = {email: user.email, password: user.password};
  	// var headers = new Headers({ 
   //        'Authorization': 'Basic ' + btoa(user.email + ':' + user.password),
   //        //'X-Requested-With': 'XMLHttpRequest', // to suppress 401 browser popup
   //        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
   //        'Accept': 'application/json'
   //  });

   //  let options = new RequestOptions(  {headers: headers, withCredentials: true} );

   //  let body = this.serializeObj(obj);

   	return this.http.post("http://localhost:8080/login", user)
   		.map(response => response.json())
    	.catch(this.errorHandler);
    }

    editUser(user: any) {
      return this.http.put(this.url, user)
       .map(response => response.json())
      .catch(this.errorHandler);
    }


  errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || "Server error");
  }

  private serializeObj(obj) {
    var result = [];
    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}

}
