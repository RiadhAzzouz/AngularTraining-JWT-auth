import { CatalogueService } from './../catalogue.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private catService:CatalogueService, private router:Router) {}

  categories;
  currentCategory;

  ngOnInit() {
    this.getCategories();
  }

  onGetProducts(cat) {
    this.currentCategory = cat;
    let url = cat._links.products.href;
    this.router.navigateByUrl("/products/"+btoa(url));
  }

  getCategories() {
    this.catService.getAllCategories()
      .subscribe(data=>{
        this.categories=data
      }, err=>{
        console.log(err);
      })
  }

}
