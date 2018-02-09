import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';
import { FileService } from '../file.service';
import { Response } from '@angular/http';
import 'rxjs/Rx' ;
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [GroupsService, FileService]
})
export class GroupComponent implements OnInit {

  group = [];
  userFiles = [];
  message : string;

  constructor(private router: Router, private route: ActivatedRoute, private groupsService: GroupsService, private fileService: FileService) { }

  ngOnInit() {
  	console.log(this.route.snapshot.params['id']);
  	var id = this.route.snapshot.params['id'];
    var userId = +sessionStorage.getItem('id');
  	this.groupsService.getGroupById(id)
  		.subscribe(
  			(data) => {
  				console.log(data);
  				this.group = data;
  			},
  			(error) => {
  				console.log(error);
  			})

      this.fileService.getUserFiles(userId)
      .subscribe(
        (data) => {
          console.log(data);
          this.userFiles = data;
        },
        (error) => {
          console.log(error);
        })
  }

  onLogout() {
    sessionStorage.clear();
    this.router.navigate(["/homepage"]);
  }

  onSubmitAddUsers(email: any) {
  	console.log(email);
  	var user = {
  		"email": email.email
  	}
  	console.log(user);
  	var id = this.route.snapshot.params['id'];
  	this.groupsService.addGroupUser(user, id)
  		.subscribe(
  			(data) => {
  				console.log(data);
  				this.message = 'dodano uzytkownika';
  			},
  			(error) => {
  				console.log(error);
  				var err = JSON.parse(error._body);
  				console.log(err);
          		this.message = err.message;
  			})
  }

  onSubmitAddFiles(file: any) {
    console.log(file);
    var userFile = {
      "id": file.fileId
    };
    var id = this.route.snapshot.params['id'];
    this.groupsService.addGroupFile(userFile, id)
    .subscribe(
        (data) => {
          console.log(data);
          this.message = 'dodano plik';
        },
        (error) => {
          console.log(error);
          var err = JSON.parse(error._body);
          console.log(err);
              this.message = 'wystąpił błąd, spróbuj ponownie';
        })
  }

      fileChange(event) {
    this.fileService.addFile(event, +sessionStorage.getItem('id'))
    .subscribe(message => this.message = 'OK',
      message => this.message = "Błąd");
  }

  deleteFile(fileId: number) {
    var groupId = this.route.snapshot.params['id'];
    this.groupsService.deleteGroupFile(fileId, groupId)
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
