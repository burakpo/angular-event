import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelper } from 'angular2-jwt'



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate() {
    var token = localStorage.getItem("jwt");
    var jwtHelper = new JwtHelper();
    if (token && !jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(["user/login"]);
    return false;
  }
}