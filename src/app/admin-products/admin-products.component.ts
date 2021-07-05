import { CatalogueService } from './../catalogue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  constructor(private catalogueService:CatalogueService) { }

  mode = "list";
  products;

  ngOnInit() {
    this.getAllProducts();
  }

  onNewProd() {
    this.mode = "new-prod";
  }

  addProd(data) {
    this.catalogueService.saveProduct(data)
      .subscribe(res=>{
        console.log("success");
        this.mode="list";
        this.getAllProducts();
      }, err=>{
        console.log(err);
      });
  }

  getAllProducts() {
    this.catalogueService.getAllProducts()
      .subscribe(res=>{
        this.products = res;
      }, err=>{
        console.log(err);
      })
  }

  deleteProd(prod) {
    let c = confirm("Êtes vous sûre ?");
    if(!c) return;
    this.catalogueService.deleteResource(prod._links.self.href)
    .subscribe(data=>{
      this.mode="list";
      this.getAllProducts();
    }, err=>{
      console.log(err);
    })
  }

}
