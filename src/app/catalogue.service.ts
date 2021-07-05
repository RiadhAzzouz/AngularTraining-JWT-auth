import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host:string="http://localhost:8080";

  constructor(private http:HttpClient, private authService:AuthenticationService) { }

  getAllCategories() {
    return this.http.get(this.host+"/categories");
  }

  getAllProducts() {
    return this.http.get(this.host+"/products");
  }

  getRessource(url) {
    return this.http.get(url);
  }

  deleteResource(url) {
    let header = new HttpHeaders({'authorization':this.authService.jwt});
    return this.http.delete(url, {headers:header});
  }

  postResource(url, data) {
    let header = new HttpHeaders({'authorization':this.authService.jwt});
    return this.http.post(url, data, {headers:header});
  }

  putResource(url, data) {
    let header = new HttpHeaders({'authorization':this.authService.jwt});
    return this.http.put(url, data, {headers:header});
  }

  patchResource(url, data) {
    let header = new HttpHeaders({'authorization':this.authService.jwt});
    return this.http.patch(url, data, {headers:header});
  }

  saveProduct(data) {
    let header = new HttpHeaders({'authorization':this.authService.jwt});
    return this.http.post(this.host+"/saveProduct", data, {headers:header});
  }
}
