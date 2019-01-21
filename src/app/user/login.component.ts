import { Component } from '@angular/core'
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component ({
    templateUrl:'./login.component.html',
    styles: [`
        em { float:right; color:#E05C65; padding-left:10px;}
    `]
})
export class LoginComponent { 
    username:string
    password:string
    mouseOverLogin:boolean;
    constructor(private authService:AuthService,private router:Router){}
    login (formValues){
        this.authService.loginUser(formValues.userName,formValues.password);
        if(this.authService.isAuthenticated()){
            this.router.navigate(['events']);
        }
        else{
            alert("invalid password or username");
        }
    }
    cancel(){
        this.router.navigate(['events']);
    }
}