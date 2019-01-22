import { Injectable } from '@angular/core'
import { IUser } from './user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
    currentUser: IUser
    invalidLogin: boolean;

    constructor(private http:HttpClient,private router: Router) {
    }
    loginUser(userName: string, password: string) {
        let form = {UserName: userName,Password:password};
        let credentials = JSON.stringify(form);
        this.http.post("http://localhost:21888/api/auth/login", credentials, {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          })
        }).subscribe(response => {
          let token = (<any>response).token;
          localStorage.setItem("jwt", token);
          this.invalidLogin = false;
        }, err => {
          this.invalidLogin = true;
        });
        localStorage.setItem('user', userName);
        this.setCurrentUser();
    }
    setCurrentUser(){
        if (this.isAuthenticated()) {
            this.currentUser = {
                id: 1,
                userName: localStorage.getItem('user'),
                firstName: "John",
                lastName: "Doe"
            }
        }
    }
    isAuthenticated() {
        return !!localStorage.getItem('user');
    }
    updateCurrentUser(firstName, lastName) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }
}