import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  providers: [GroupsService]
})
export class GroupsComponent implements OnInit {

  groups = [];
  message: string;

  constructor(private router: Router, private groupsService: GroupsService) { }

  ngOnInit() {
  	if (sessionStorage.getItem("token") == null) {
  		console.log("redirect");
  		this.router.navigate(["/homepage"]);
  	} else {
  		this.groupsService.getGroupsByUserId(+sessionStorage.getItem("id"))
  		.subscribe(groups => this.groups = groups,
  			responseError => this.message = responseError._body);
  	}
  }

  onLogout() {
    sessionStorage.clear();
    this.router.navigate(["/homepage"]);
  }

  onSubmitAddGroup(group: any) {
    var user = [{
      "id": +sessionStorage.getItem("id")
    }];

    group.users = user;
    console.log(group);
    this.groupsService.addGroup(group)
      .subscribe(
          (message) => {
            this.message = 'Dodano grupe';
          },
          (responseError) => {
            this.message = 'Błąd podczas dodawanie grupy, spróbuj ponownie później';
          })
  }
}
