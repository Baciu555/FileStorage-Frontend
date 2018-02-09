import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FileService } from '../file.service';
import { Response } from '@angular/http';
import 'rxjs/Rx' ;
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [UserService, FileService]
})
export class AccountComponent implements OnInit {

  user = [];
  message: string;

  constructor(private router: Router, private userService: UserService, private fileService: FileService) { }

  ngOnInit() {
  	if (sessionStorage.getItem("token") == null) {
  		console.log("redirect");
  		this.router.navigate(["/homepage"]);
  	} else {
  		this.userService.getUserById(+sessionStorage.getItem("id"))
  		.subscribe(user => this.user = user,
  			responseError => this.message = responseError._body);
  	}
  }

  onLogout() {
    sessionStorage.clear();
    this.router.navigate(["/homepage"]);
  }

  editUser(user: any) {
    user.id = sessionStorage.getItem("id");
    console.log(user);

    this.userService.editUser(user)
      .subscribe(
        (message) => {
          this.message = 'Zmieniono dane';
        },
        (responseError) => {
          var err = JSON.parse(responseError._body);
          this.message = err.errors[0].defaultMessage;
    })
  }


  fileChange(event) {
    this.fileService.addFile(event, +sessionStorage.getItem("id"))
    .subscribe(message => this.message = 'OK',
      message => this.message = "Błąd");
  }

  deleteFile(id: number) {
    this.fileService.deleteFile(id)
    .subscribe(
      (data) => {
        console.log("usuwanie ok");
      },
      (error) => {
        console.log("usuwanie nie ok");
      }
      );
  }

  downloadFile( id: number, fileName: string) {
    console.log(fileName);
    this.fileService.downloadFile(id)
    .subscribe(
      (data) => {
        this.download(data, fileName);
        console.log("pobieranie ok");
      },
      (error) => {
        console.log("pobieranie nie ok");
      }
      );
  }

  download(data: Response, fileName: string) {
    var blob = new Blob([data], {type: "application/octet-stream"});
    FileSaver.saveAs(blob, fileName);
  }

}
