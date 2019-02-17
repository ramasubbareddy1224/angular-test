import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-test';
  username="";
  userList=[];
  isSearchClicked = false;
  
  constructor(public usersvc:UserService){

  }

  searchUser(){
      this.isSearchClicked=true;
      this.usersvc.getUsers(this.username).subscribe(res=> {
        this.userList=res;
      });
  }
}
