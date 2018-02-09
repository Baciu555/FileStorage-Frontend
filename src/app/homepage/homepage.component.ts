import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [UserService]
})
export class HomepageComponent implements OnInit {

  message: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem("token") != null) {
      this.router.navigate(["/main"]);
    }
  }

  onSubmitLogin(user: any) {
    console.log(user);
  	this.userService.login(user)
  	  .subscribe(
  	  	(data) => {
          sessionStorage.setItem("token", btoa(user.email + ':' + user.password));
          sessionStorage.setItem("id", data.id);
          this.router.navigate(["/main"]);
  	  	},
  	  	(responseError) => {
          this.message = 'Niepoprawny email lub haslo';
    })
  }

  onSubmitRegister(user: any) {
  	console.log(user);
    if (user.registerPassword !== user.registerPasswordConfirm) {
      this.message = 'hasła muszą być identyczne';
      return;
    }

    var userDTO = {
      id: 0,
      username: user.registerUsername,
      email: user.registerEmail,
      password: user.registerPassword
    }

    console.log(userDTO);

  	this.userService.addUser(userDTO)
  	  .subscribe(
  	  	(message) => {
  	  		this.message = 'Rejestracja udana, możesz się zalogować';
  	  	},
  	  	(responseError) => {
          var err = JSON.parse(responseError._body);
          this.message = err.errors[0].defaultMessage;
    })
  }

}
