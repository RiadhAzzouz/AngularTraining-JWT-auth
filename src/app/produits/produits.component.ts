import { CatalogueService } from './../catalogue.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  constructor(private catalogueService:CatalogueService,
              private route:ActivatedRoute,
              private router:Router) {
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd) {
        let url = atob(route.snapshot.params.urlProds);
        this.getProducts(url);
      }
    })
    
  }

  products;
  ngOnInit() {
  }

  getProducts(url) {
    this.catalogueService.getRessource(url)
      .subscribe(data=>{
        this.products=data;
      }, err=>{
        console.log(err);
      });
  }

}
