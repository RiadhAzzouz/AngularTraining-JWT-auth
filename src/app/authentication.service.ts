import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  hostAuth:string="http://localhost:8085";
  jwt:string;
  username:string;
  roles:Array<String>;

  constructor(private httpClient:HttpClient, private router:Router) { }

  login(data) {
    return this.httpClient.post(this.hostAuth+"/login", data, {observe:'response'});
  }

  saveToken(jwt:string) {
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  parseJWT() {
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    this.username = objJWT.obj;
    this.roles = objJWT.roles;
  }

  isAdmin() {
    return this.roles.indexOf('ADMIN')>=0;
  }

  isUser() {
    return this.roles.indexOf('USER')>=0;
  }

  isAuthenticated() {
    return this.roles;
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.parseJWT();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl("/login");
    this.initParams();
  }

  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }
}
