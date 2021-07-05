import { CatalogueService } from './../catalogue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories;
  mode='list';
  currentCategory;

  constructor(private catalogueService:CatalogueService) { }

  ngOnInit() {
    this.onGetAllCategories();
  }

  onGetAllCategories() {
    this.catalogueService.getAllCategories()
    .subscribe(data=>{
      this.categories = data;
    }, err=>{
      console.log(err);
    })
  }

  onDeleteCat(cat) {
    let c = confirm("Etes vous sûre ?");
    if(!c) return;
    this.catalogueService.deleteResource(cat._links.self.href)
      .subscribe(data=>{
        this.onGetAllCategories();
      }, err=>{
        console.log(err);
      })
  }

  onNewCat() {
    this.mode = 'new-cat'
  }

  onSaveCat(data) {
    let url = this.catalogueService.host+"/categories";
    this.catalogueService.postResource(url, data)
      .subscribe(data=>{
        this.mode='list';
        this.onGetAllCategories();
      }, err=>{ 
        console.log(err);
      })
  }

  onUpdateCat(data) {
    this.catalogueService.putResource(this.currentCategory._links.self.href, data)
      .subscribe(data=>{
        this.mode='list';
        this.onGetAllCategories();
      }, err=>{ 
        console.log(err);
      })
  }

  onEditCat(cat) {
    this.catalogueService.getRessource(cat._links.self.href)
      .subscribe(data=>{
        this.mode='edit-cat';
        this.currentCategory=data;
      }, err=>{ 
        console.log(err);
      })
  }

}
